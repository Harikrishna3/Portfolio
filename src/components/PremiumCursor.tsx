import { useEffect, useRef } from 'react';

export const PremiumCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    // Actual mouse position
    const mouse = useRef({ x: -200, y: -200 });
    // Smoothly interpolated position (slightly behind mouse)
    const pos = useRef({ x: -200, y: -200 });

    // Trail history: array of {x, y} snapshots
    const trail = useRef<{ x: number; y: number }[]>([]);

    const isHoveringRef = useRef(false);
    const hoverColorRef = useRef('#00d4ff');

    // Burst particles on click
    const bursts = useRef<{
        x: number; y: number;
        vx: number; vy: number;
        size: number; life: number; color: string;
    }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const TRAIL_LENGTH = 28;        // how many trail dots
        const DOT_SIZE_START = 5;       // front of tail (biggest)
        const SMOOTHNESS = 0.18;        // how quickly pos chases mouse
        const ACCENT = '#FFD700';
        const BASE = '#00d4ff';

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            const target = e.target as HTMLElement;
            const clickable =
                target.tagName === 'BUTTON' || target.tagName === 'A' ||
                !!target.closest('button') || !!target.closest('a') ||
                getComputedStyle(target).cursor === 'pointer';
            isHoveringRef.current = clickable;
            hoverColorRef.current = clickable ? ACCENT : BASE;
        };

        const onMouseDown = () => {
            // Burst 30 shimmer particles from current pos
            for (let i = 0; i < 30; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;
                bursts.current.push({
                    x: pos.current.x,
                    y: pos.current.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: Math.random() * 4 + 2,
                    life: 1,
                    color: Math.random() > 0.5 ? ACCENT : BASE,
                });
            }
        };

        let animId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            // Smoothly chase the real mouse
            pos.current.x += (mouse.current.x - pos.current.x) * SMOOTHNESS;
            pos.current.y += (mouse.current.y - pos.current.y) * SMOOTHNESS;

            // Push current smooth position to trail
            trail.current.push({ x: pos.current.x, y: pos.current.y });
            if (trail.current.length > TRAIL_LENGTH) {
                trail.current.shift();
            }

            // Draw tail: oldest = smallest/most transparent, newest = biggest/opaque
            const len = trail.current.length;
            for (let i = 0; i < len; i++) {
                const t = i / (len - 1);           // 0 = oldest (tail end), 1 = newest (head)
                const alpha = t * t;                // quadratic: very faint at tail end
                const size = DOT_SIZE_START * t;    // smallest at tail end

                const color = hoverColorRef.current;

                ctx.beginPath();
                ctx.arc(trail.current[i].x, trail.current[i].y, Math.max(size, 0.5), 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = alpha;
                if (t > 0.7) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = color;
                } else {
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
            }

            // Draw burst particles
            ctx.shadowBlur = 8;
            for (let i = bursts.current.length - 1; i >= 0; i--) {
                const b = bursts.current[i];
                b.x += b.vx;
                b.y += b.vy;
                b.vx *= 0.93;
                b.vy *= 0.93;
                b.life -= 0.025;
                b.size *= 0.97;

                if (b.life <= 0) { bursts.current.splice(i, 1); continue; }

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
                ctx.fillStyle = b.color;
                ctx.shadowColor = b.color;
                ctx.globalAlpha = b.life;
                ctx.fill();
            }

            // Update the glowing dot element
            if (dotRef.current) {
                const color = hoverColorRef.current;
                const scale = isHoveringRef.current ? 1.6 : 1;
                dotRef.current.style.transform =
                    `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0) scale(${scale})`;
                dotRef.current.style.backgroundColor = color;
                dotRef.current.style.boxShadow =
                    `0 0 18px ${color}, 0 0 40px ${color}66, 0 0 4px #fff`;
            }

            animId = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
        };
    }, []);

    return (
        <>
            <style>{`
                * { cursor: none !important; }
                .cursor-dot {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 100000;
                    transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.08s ease;
                    will-change: transform;
                }
            `}</style>
            <div className="cursor-dot" ref={dotRef} />
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 99999,
                }}
            />
        </>
    );
};
