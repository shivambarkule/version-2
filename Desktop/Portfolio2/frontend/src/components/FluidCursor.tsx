"use client";

import { useEffect, useRef } from 'react';

export default function FluidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animationId = useRef<number>();

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      if (cursor && cursorDot) {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (cursor && cursorDot) {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
      }
    };

    const animate = () => {
      const { x: mouseX, y: mouseY } = mousePosition.current;
      const { x: cursorX, y: cursorY } = cursorPosition.current;

      // Calculate velocity for fluid effect
      const deltaX = mouseX - cursorX;
      const deltaY = mouseY - cursorY;
      
      // Smooth following with easing
      cursorPosition.current.x += deltaX * 0.15;
      cursorPosition.current.y += deltaY * 0.15;

      // Calculate velocity for expansion effect
      velocity.current.x = deltaX * 0.02;
      velocity.current.y = deltaY * 0.02;

      // Calculate expansion based on velocity
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      const expansion = Math.min(speed * 2, 20); // Max expansion of 20px
      
      // Apply transform with fluid expansion
      if (cursor) {
        const scale = 1 + expansion * 0.1;
        const skewX = velocity.current.x * 0.5;
        const skewY = velocity.current.y * 0.5;
        
        cursor.style.transform = `
          translate3d(${cursorPosition.current.x - 50}px, ${cursorPosition.current.y - 50}px, 0)
          scale(${scale})
          skew(${skewX}deg, ${skewY}deg)
        `;
      }

      // Dot follows more closely
      if (cursorDot) {
        cursorDot.style.transform = `
          translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)
        `;
      }

      animationId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  return (
    <>
      {/* Main fluid cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-50 opacity-0 transition-opacity duration-300"
        style={{
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)',
          borderRadius: '50%',
          mixBlendMode: 'difference',
          filter: 'blur(1px)',
        }}
      />
      
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 opacity-0 transition-opacity duration-300"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'white',
          borderRadius: '50%',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}