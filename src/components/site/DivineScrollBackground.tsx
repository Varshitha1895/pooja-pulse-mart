import { useScroll, useTransform, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import vrindavanImg from "@/assets/gods/vrindavan_scroll.png";

export function DivineScrollBackground() {
  const routerState = useRouterState();
  const { scrollYProgress } = useScroll();
  
  if (routerState.location.pathname === "/") {
    return null;
  }
  
  // As the user scrolls down (0 to 1), the background shifts from top to bottom
  const yPos = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // We can also add a slight parallax scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#FAFAF5]">
      <motion.div 
        className="absolute inset-0 w-full h-full bg-no-repeat opacity-60"
        style={{ 
          backgroundImage: `url(${vrindavanImg})`,
          backgroundSize: "cover",
          backgroundPositionX: "center",
          backgroundPositionY: yPos,
          scale: scale
        }}
      />
      {/* Light overlay to maintain a very light, clean background color */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none" />
    </div>
  );
}
