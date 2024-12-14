import React from 'react';
import { ModalProps } from './types';

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1E2329] rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        
        {children}
        
        <button
          onClick={onClose}
          className="mt-4 w-full p-3 rounded-lg bg-binance-gray text-binance-text hover:bg-opacity-80 transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );
};