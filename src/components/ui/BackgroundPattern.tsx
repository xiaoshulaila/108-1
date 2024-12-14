import React from 'react';
import { Flame } from 'lucide-react';

interface BackgroundPatternProps {
  children: React.ReactNode;
  className?: string;
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute bottom-0 right-0 opacity-5 transform -rotate-12 pointer-events-none">
        <img 
          src="https://bin.bnbstatic.com/static/images/bnb-for/brand.png" 
          alt=""
          className="w-24 h-24 object-contain"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};