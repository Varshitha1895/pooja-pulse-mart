import { useEffect, useState } from "react";
import ramaImg from "@/assets/gods/rama.png";
import krishnaImg from "@/assets/gods/krishna.png";
import ganeshaImg from "@/assets/gods/ganesha.png";

const gods = [ramaImg, krishnaImg, ganeshaImg];

export function DivineBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Change god every 600px of scrolling
  const activeIndex = Math.min(Math.floor(scrollY / 600), gods.length - 1);
  
  // Parallax shift based on mouse movement (max +/- 25px)
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  
  const xOffset = (mouseX / windowWidth - 0.5) * -50;
  const yOffset = (mouseY / windowHeight - 0.5) * -50;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-black">
      <style>{`
        @keyframes divine-breathe {
          0%, 100% { transform: scale(1); filter: brightness(0.9) contrast(1.1); }
          50% { transform: scale(1.03); filter: brightness(1.2) contrast(1.2); }
        }
        .animate-divine {
          animation: divine-breathe 10s ease-in-out infinite;
        }
      `}</style>
      
      {gods.map((god, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translate(${isActive ? xOffset : 0}px, ${isActive ? yOffset : 0}px) scale(1.1)`,
              transition: "opacity 1.5s ease-in-out, transform 0.3s ease-out"
            }}
          >
            <img 
              src={god} 
              alt="Divine Presence" 
              className="w-full h-full object-cover animate-divine mix-blend-screen"
            />
          </div>
        );
      })}
      
      {/* Divine gradient overlay to blend into the rest of the site smoothly */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none" />
    </div>
  );
}
