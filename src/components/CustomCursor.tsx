import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useSpring(0, { stiffness: 450, damping: 30 });
    const cursorY = useSpring(0, { stiffness: 450, damping: 30 });

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' || 
                target.tagName === 'A' || 
                target.closest('button') || 
                target.closest('a') ||
                getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        
        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    useEffect(() => {
        cursorX.set(mousePosition.x);
        cursorY.set(mousePosition.y);
    }, [mousePosition, cursorX, cursorY]);

    return (
        <>
            {/* Outer Ring */}
            <motion.div
                animate={{
                    width: isHovering ? 64 : 36,
                    height: isHovering ? 64 : 36,
                    x: mousePosition.x - (isHovering ? 32 : 18),
                    y: mousePosition.y - (isHovering ? 32 : 18),
                    borderColor: isHovering ? '#38BDF8' : '#FACC15',
                    backgroundColor: isHovering ? 'rgba(56, 189, 248, 0.15)' : 'rgba(250, 204, 21, 0.1)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    borderRadius: '50%',
                    border: '2px solid',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    backdropFilter: 'blur(2px)',
                }}
            />
            {/* Inner Dot */}
            <motion.div
                animate={{
                    width: isHovering ? 12 : 8,
                    height: isHovering ? 12 : 8,
                    x: mousePosition.x - (isHovering ? 6 : 4),
                    y: mousePosition.y - (isHovering ? 6 : 4),
                    backgroundColor: isHovering ? '#38BDF8' : '#FACC15',
                    boxShadow: isHovering 
                        ? '0 0 15px #38BDF8' 
                        : '0 0 10px #FACC15',
                }}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                }}
            />
        </>
    );
};
 
