import React from 'react';
import { NavItem } from './types';

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center space-y-1 w-full py-2 ${
        isActive ? 'text-[#F0B90B]' : 'text-[#848E9C] hover:text-[#F0B90B]'
      }`}
    >
      <Icon size={20} />
      <span className="text-xs">{item.label}</span>
    </button>
  );
};

export default NavButton;