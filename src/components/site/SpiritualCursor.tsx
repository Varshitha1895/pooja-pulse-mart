import { useEffect, useRef } from "react";

export function SpiritualCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch devices for usability
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let particles: { x: number; y: number; id: number; life: number; vx: number; vy: number }[] = [];
    let particleId = 0;
    
    let lastX = 0;
    let lastY = 0;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        if (!isVisible) {
          cursorRef.current.style.opacity = '1';
          isVisible = true;
        }

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        
        // Calculate orientation angle so the butterfly "faces" the direction it's flying
        // If no significant movement, maintain last angle
        let angle = cursorRef.current.dataset.angle ? parseFloat(cursorRef.current.dataset.angle) : 0;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; 
          cursorRef.current.dataset.angle = angle.toString();
        }
        
        // Offset by 12px to center the 24x24 SVG
        cursorRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0) rotate(${angle}deg)`;
      }

      // Generate divine dust particles occasionally as the butterfly moves
      if (Math.random() > 0.4 && (Math.abs(e.clientX - lastX) > 2 || Math.abs(e.clientY - lastY) > 2)) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          id: particleId++,
          life: 1.0,
          vx: (Math.random() - 0.5) * 2, // Slight random horizontal drift
          vy: Math.random() * 1.5 + 0.5 // Float downwards
        });
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Highly optimized manual DOM manipulation loop for the trail
    let animationFrameId: number;
    const render = () => {
      if (trailsRef.current) {
        particles = particles.filter(p => p.life > 0);
        
        // Generate raw HTML for absolute performance, bypassing React overhead for 60fps particles
        trailsRef.current.innerHTML = particles.map(p => {
          p.life -= 0.025; // fade speed
          p.x += p.vx;
          p.y += p.vy;
          
          return `<div style="
            position: absolute;
            left: ${p.x - 2}px;
            top: ${p.y - 2}px;
            width: 4px;
            height: 4px;
            background: #FFD700;
            border-radius: 50%;
            opacity: ${p.life};
            box-shadow: 0 0 8px 2px rgba(255, 215, 0, 0.6);
            pointer-events: none;
            transform: scale(${p.life * 1.5});
          "></div>`;
        }).join('');
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div ref={trailsRef} className="fixed inset-0 pointer-events-none z-[9998]" />
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 transition-opacity duration-500 hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <div className="animate-butterfly-hover drop-shadow-[0_8px_16px_rgba(255,140,0,0.6)] origin-center">
           <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/24/svg" className="origin-center" style={{ transform: 'rotate(-90deg)' }}>
            
            <defs>
              <radialGradient id="wingGradientLeft" cx="80%" cy="80%" r="80%">
                <stop offset="0%" stopColor="#ffb347" />
                <stop offset="60%" stopColor="#ff7b00" />
                <stop offset="100%" stopColor="#a33a00" />
              </radialGradient>
              <radialGradient id="wingGradientRight" cx="20%" cy="80%" r="80%">
                <stop offset="0%" stopColor="#ffb347" />
                <stop offset="60%" stopColor="#ff7b00" />
                <stop offset="100%" stopColor="#a33a00" />
              </radialGradient>
            </defs>

            {/* Left Wing Group */}
            <g className="animate-wing-left origin-center" style={{ transformOrigin: '32px 32px' }}>
              {/* Top wing */}
              <path d="M32 30 C 15 5, 0 10, 2 25 C 4 40, 15 42, 32 32" fill="url(#wingGradientLeft)" stroke="#1a1a1a" strokeWidth="1.5" />
              <path d="M32 30 C 15 5, 0 10, 2 25 C 4 40, 15 42, 32 32" fill="none" stroke="#1a1a1a" strokeWidth="4" />
              {/* White dots on top edge */}
              <circle cx="8" cy="18" r="1" fill="white" />
              <circle cx="5" cy="22" r="1.2" fill="white" />
              <circle cx="12" cy="11" r="1" fill="white" />
              {/* Veins */}
              <path d="M32 30 C 20 20, 10 18, 2 25" stroke="#1a1a1a" strokeWidth="1" />
              <path d="M32 30 C 18 12, 10 10, 8 18" stroke="#1a1a1a" strokeWidth="1" />
              <path d="M20 20 C 15 28, 8 30, 4 40" stroke="#1a1a1a" strokeWidth="1" />
              
              {/* Bottom wing */}
              <path d="M32 34 C 15 35, 5 50, 15 60 C 25 65, 30 55, 32 34" fill="url(#wingGradientLeft)" stroke="#1a1a1a" strokeWidth="1.5" />
              <path d="M32 34 C 15 35, 5 50, 15 60 C 25 65, 30 55, 32 34" fill="none" stroke="#1a1a1a" strokeWidth="4" />
              {/* White dots on bottom edge */}
              <circle cx="12" cy="54" r="1.5" fill="white" />
              <circle cx="18" cy="59" r="1" fill="white" />
              <circle cx="8" cy="48" r="1" fill="white" />
              {/* Veins */}
              <path d="M32 34 C 20 40, 10 48, 15 60" stroke="#1a1a1a" strokeWidth="1" />
              <path d="M32 34 C 15 45, 8 50, 8 48" stroke="#1a1a1a" strokeWidth="1" />
            </g>

            {/* Right Wing Group */}
            <g className="animate-wing-right origin-center" style={{ transformOrigin: '32px 32px' }}>
              {/* Top wing */}
              <path d="M32 30 C 49 5, 64 10, 62 25 C 60 40, 49 42, 32 32" fill="url(#wingGradientRight)" stroke="#1a1a1a" strokeWidth="1.5" />
              <path d="M32 30 C 49 5, 64 10, 62 25 C 60 40, 49 42, 32 32" fill="none" stroke="#1a1a1a" strokeWidth="4" />
              {/* White dots on top edge */}
              <circle cx="56" cy="18" r="1" fill="white" />
              <circle cx="59" cy="22" r="1.2" fill="white" />
              <circle cx="52" cy="11" r="1" fill="white" />
              {/* Veins */}
              <path d="M32 30 C 44 20, 54 18, 62 25" stroke="#1a1a1a" strokeWidth="1" />
              <path d="M32 30 C 46 12, 54 10, 56 18" stroke="#1a1a1a" strokeWidth="1" />
              <path d="M44 20 C 49 28, 56 30, 60 40" stroke="#1a1a1a" strokeWidth="1" />

              {/* Bottom wing */}
              <path d="M32 34 C 49 35, 59 50, 49 60 C 39 65, 34 55, 32 34" fill="url(#wingGradientRight)" stroke="#1a1a1a" strokeWidth="1.5" />
              <path d="M32 34 C 49 35, 59 50, 49 60 C 39 65, 34 55, 32 34" fill="none" stroke="#1a1a1a" strokeWidth="4" />
              {/* White dots on bottom edge */}
              <circle cx="52" cy="54" r="1.5" fill="white" />
              <circle cx="46" cy="59" r="1" fill="white" />
              <circle cx="56" cy="48" r="1" fill="white" />
              {/* Veins */}
              <path d="M32 34 C 44 40, 54 48, 49 60" stroke="#1a1a1a" strokeWidth="1" />
              <path d="M32 34 C 49 45, 56 50, 56 48" stroke="#1a1a1a" strokeWidth="1" />
            </g>

            {/* Body */}
            <path d="M30 18 C 32 12, 32 12, 34 18 L 34 42 C 32 48, 32 48, 30 42 Z" fill="#2a1f1a" />
            {/* Head */}
            <circle cx="32" cy="14" r="3" fill="#2a1f1a" />
            
            {/* Antennae */}
            <path d="M31 12 C 26 5, 20 2, 18 5" fill="none" stroke="#2a1f1a" strokeWidth="1.5" />
            <path d="M33 12 C 38 5, 44 2, 46 5" fill="none" stroke="#2a1f1a" strokeWidth="1.5" />
            {/* Antennae tips */}
            <circle cx="18" cy="5" r="1.5" fill="#2a1f1a" />
            <circle cx="46" cy="5" r="1.5" fill="#2a1f1a" />

          </svg>
        </div>
      </div>
    </>
  );
}
