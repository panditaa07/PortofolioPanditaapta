import React, { useState } from "react";
import Lottie from "lottie-react";

const LottieAnimation = ({ 
  animationData, 
  className = "", 
  onHoverScale = 1.05,
  ...props 
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Subtle background glow */}
      <div className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/5 to-[#a855f7]/5 rounded-full blur-xl transition-all duration-500 ${
        isHovering ? "opacity-30 scale-110" : "opacity-20 scale-100"
      }`}></div>

      {/* Lottie Animation Container */}
      <div className="relative z-10 opacity-90 transform transition-all duration-300">
        <Lottie 
          animationData={animationData}
          loop
          autoplay
          className={`w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] transition-all duration-300 ${
            isHovering 
              ? `scale-${onHoverScale * 100} brightness-110` 
              : "scale-100"
          } ${animationLoaded ? 'opacity-100' : 'opacity-0'}`}
          onDOMLoaded={() => {
            setAnimationLoaded(true);
          }}
          onError={(error) => {
            // Lottie animation failed to load
            setAnimationLoaded(false);
          }}
          {...props}
        />
      </div>

      {/* Subtle pulse effect */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
        isHovering ? "opacity-30" : "opacity-15"
      }`}>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-2xl rounded-full animate-pulse`}></div>
      </div>
    </div>
  );
};

export default LottieAnimation;
