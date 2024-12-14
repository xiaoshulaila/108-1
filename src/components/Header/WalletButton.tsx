import React from 'react';
import { Wallet } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWallet } from '../../hooks/useWallet';
import { formatAddress } from '../../utils/address';

export const WalletButton: React.FC = () => {
  const { t } = useLanguage();
  const { address, isConnected, connect, disconnect } = useWallet();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 bg-binance-gray px-3 py-1.5 rounded-lg hover:bg-opacity-80 transition-colors text-sm"
    >
      <Wallet size={16} className="text-binance-yellow" />
      <span>
        {isConnected ? formatAddress(address!) : t('connectWallet')}
      </span>
    </button>
  );
};