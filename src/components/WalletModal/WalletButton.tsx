import React from 'react';
import { WalletButtonProps } from './types';

export const WalletButton: React.FC<WalletButtonProps> = ({
  icon,
  name,
  isInstalled,
  onConnect,
  onDownload,
  connectText,
  installText,
}) => {
  return (
    <button
      onClick={() => isInstalled ? onConnect() : onDownload()}
      className="w-full flex items-center justify-between p-4 rounded-lg bg-[#2B3139] hover:bg-[#2B3139]/80 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span>{name}</span>
      </div>
      <span className="text-sm text-binance-text">
        {isInstalled ? connectText : installText}
      </span>
    </button>
  );
};