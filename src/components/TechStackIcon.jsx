import React from 'react';

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="group p-6 rounded-3xl glass-card flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-glow-blue cursor-pointer">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-accent-blue rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
        <img
          src={TechStackIcon}
          alt={`${Language} icon`}
          loading="lazy"
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="text-text-secondary font-semibold text-sm md:text-base tracking-wide group-hover:text-text-primary transition-colors duration-300 font-body">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;
