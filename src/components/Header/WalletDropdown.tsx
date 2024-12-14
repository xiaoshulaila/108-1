import React from 'react';
import { LogOut } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface WalletDropdownProps {
  onClose: () => void;
}

const WalletDropdown: React.FC<WalletDropdownProps> = ({ onClose }) => {
  const { disconnectWallet } = useWallet();
  const { t } = useLanguage();

  const handleDisconnect = () => {
    disconnectWallet();
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-[200px] bg-binance-gray rounded-lg shadow-lg overflow-hidden border border-binance-border">
      <button
        onClick={handleDisconnect}
        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-black/20 transition-colors"
      >
        <LogOut size={16} />
        <span>{t('disconnectWallet')}</span>
      </button>
    </div>
  );
};

export default WalletDropdown;