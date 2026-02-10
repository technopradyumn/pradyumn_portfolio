import React from 'react';

export const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505] overflow-hidden pointer-events-none">
      {/* 1. Base Gradient - Deep Blue/Black */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_60%)]"></div>
      
      {/* 2. Secondary Glow - Top Right */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full"></div>
      
      {/* 3. Secondary Glow - Bottom Left */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-950/20 blur-[120px] rounded-full"></div>

      {/* 4. Grid Pattern Overlay (Subtle Tech Feel) */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }}
      ></div>
    </div>
  );
};