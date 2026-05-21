import { useMemo } from "react";

const petalColors = ["#ff9900", "#cc5500", "#ffcc00", "#ff3333", "#ffc107"];

export function DivinePetals({ count = 25 }: { count?: number }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 15}s`,
      animationDelay: `-${Math.random() * 15}s`,
      width: `${8 + Math.random() * 10}px`,
      height: `${12 + Math.random() * 12}px`,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      rotate: `${Math.random() * 360}deg`,
      zIndex: Math.floor(Math.random() * 10),
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: p.left,
            top: "-10%",
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            borderRadius: "50% 0 50% 50%",
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            boxShadow: `0 0 10px ${p.color}88`,
            transform: `rotate(${p.rotate})`,
            zIndex: p.zIndex,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}
