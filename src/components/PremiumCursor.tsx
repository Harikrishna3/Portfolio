import { useEffect, useRef, useState } from 'react';

// Final Crystal Clear Premium Cursor: No orbits, no stick. Just the glow and its magic trail.
export const PremiumCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });
    const particles = useRef<any[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverColor, setHoverColor] = useState('#00d4ff');

    const lastMouse = useRef({ x: 0, y: 0 });
    const velocity = useRef(0);

    const config = {
        dotSize: 10,
        dotColor: '#00d4ff',
        accentColor: '#FFD700',
        smoothness: 0.12,
        maxParticles: 180,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Speed Calculation
            const dx = e.clientX - lastMouse.current.x;
            const dy = e.clientY - lastMouse.current.y;
            velocity.current = Math.sqrt(dx * dx + dy * dy);
            
            lastMouse.current.x = e.clientX;
            lastMouse.current.y = e.clientY;
            
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            const target = e.target as HTMLElement;
            const isClickable = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || getComputedStyle(target).cursor === 'pointer';
            
            if (isClickable) {
                setIsHovering(true);
                setHoverColor(config.accentColor);
            } else {
                setIsHovering(false);
                setHoverColor(config.dotColor);
            }
        };

        const handleClick = () => {
            // Exploding Shimmer on Click
            for (let i = 0; i < 35; i++) {
                particles.current.push(new Particle(mouse.current.x, mouse.current.y, true));
            }
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            life: number;
            isBurst: boolean;
            color: string;
            decay: number;

            constructor(x: number, y: number, isBurst = false) {
                this.x = x;
                this.y = y;
                this.isBurst = isBurst;
                // Burst goes in all directions, trail drifts slightly upward
                this.vx = (Math.random() - 0.5) * (isBurst ? 16 : 2.5);
                this.vy = (Math.random() - 0.5) * (isBurst ? 16 : 2.5) - (isBurst ? 0 : 0.6); 
                this.size = Math.random() * (isBurst ? 6 : 3) + 1;
                this.life = 1;
                this.color = isBurst ? config.accentColor : (Math.random() > 0.6 ? config.dotColor : '#FFFFFF');
                this.decay = Math.random() * 0.008 + 0.006; 
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                if (this.size > 0.1) this.size -= 0.03;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.life;
                ctx.fill();
                
                if (this.life > 0.5) {
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = this.color;
                } else {
                    ctx.shadowBlur = 0;
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            pos.current.x += (mouse.current.x - pos.current.x) * config.smoothness;
            pos.current.y += (mouse.current.y - pos.current.y) * config.smoothness;

            // DYNAMIC DENSITY: Generate particles proportional to mouse speed
            const particleCount = Math.floor(velocity.current / 4); 
            for (let i = 0; i < Math.min(particleCount, 6); i++) {
                // Shake position slightly for a more "magical" spray
                const offset = (Math.random() - 0.5) * 5;
                particles.current.push(new Particle(pos.current.x + offset, pos.current.y + offset));
            }

            // Decay velocity so sparkles stop when mouse stops
            velocity.current *= 0.9;

            for (let i = 0; i < particles.current.length; i++) {
                particles.current[i].update();
                particles.current[i].draw();
                if (particles.current[i].life <= 0) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }

            if (particles.current.length > config.maxParticles) particles.current.shift();

            if (dotRef.current) {
                // Focus: Just the glowing dot core
                dotRef.current.style.transform = `translate3d(${pos.current.x - config.dotSize / 2}px, ${pos.current.y - config.dotSize / 2}px, 0) scale(${isHovering ? 1.5 : 1})`;
                dotRef.current.style.backgroundColor = hoverColor;
                dotRef.current.style.boxShadow = `0 0 25px ${hoverColor}, 0 0 50px ${hoverColor}44, 0 0 5px #FFFFFF`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleClick);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleClick);
        };
    }, [isHovering, hoverColor]);

    return (
        <>
            <style>{`
                body { cursor: none !important; }
                a, button { cursor: none !important; }
                .cursor-core {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 100000;
                    transition: background-color 0.3s ease, box-shadow 0.3s ease;
                }
            `}</style>
            <div className="cursor-core" ref={dotRef} />
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 99999,
                }}
            />
        </>
    );
};
