import React from "react";

// Diya with a flickering flame
export const DeepaAnimation = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex flex-col items-center justify-end ${className} scale-150 origin-bottom`} style={{ width: '60px', height: '60px' }}>
      {/* Flame */}
      <div className="absolute bottom-[20px] z-10 origin-bottom animate-flicker">
        <svg width="24" height="36" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C10 0 0 15 0 20C0 25.5228 4.47715 30 10 30C15.5228 30 20 25.5228 20 20C20 15 10 0 10 0Z" fill="url(#flame-grad)"/>
          <path d="M10 10C10 10 4 20 4 23C4 26.3137 6.68629 29 10 29C13.3137 29 16 26.3137 16 23C16 20 10 10 10 10Z" fill="#FFE500"/>
          <defs>
            <linearGradient id="flame-grad" x1="10" y1="0" x2="10" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF9900" />
              <stop offset="1" stopColor="#FF3300" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Diya Base */}
      <div className="relative z-20">
        <svg width="60" height="30" viewBox="0 0 50 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 5C0 5 15 25 25 25C35 25 50 5 50 5C50 5 35 15 25 15C15 15 0 5 0 5Z" fill="#D4AF37"/>
          <path d="M5 2C5 2 15 10 25 10C35 10 45 2 45 2C45 2 35 5 25 5C15 5 5 2 5 2Z" fill="#B8860B"/>
        </svg>
      </div>
    </div>
  );
};

// Dhoop with rising smoke
export const DhoopAnimation = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex flex-col items-center justify-end ${className} scale-150 origin-bottom`} style={{ width: '40px', height: '80px' }}>
      {/* Smoke container */}
      <div className="absolute bottom-[35px] flex flex-col items-center justify-end h-[60px] overflow-visible">
        {/* We use SVG for better smoke paths */}
        <svg width="50" height="70" viewBox="0 0 40 60" className="overflow-visible">
          <path d="M20 60 C 20 40, 10 30, 20 10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="4" className="animate-smoke-1" strokeLinecap="round" filter="blur(3px)"/>
          <path d="M20 60 C 20 40, 30 30, 20 10" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="5" className="animate-smoke-2" strokeLinecap="round" filter="blur(4px)"/>
        </svg>
      </div>
      {/* Dhoop Cone */}
      <div className="relative z-20">
        <svg width="36" height="48" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 0L30 35C30 35 25 40 15 40C5 40 0 35 0 35L15 0Z" fill="#4A3B32"/>
          {/* Glowing Tip */}
          <circle cx="15" cy="2" r="3" fill="#FF5722" className="animate-pulse" />
          <path d="M15 0L30 35C30 35 25 40 15 40C5 40 0 35 0 35L15 0Z" fill="url(#dhoop-grad)" opacity="0.5"/>
          <defs>
             <linearGradient id="dhoop-grad" x1="0" y1="0" x2="30" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#000000" stopOpacity="0"/>
              <stop offset="1" stopColor="#000000" stopOpacity="0.6"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
