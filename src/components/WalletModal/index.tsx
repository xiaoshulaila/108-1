import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWallet } from '../../hooks/useWallet';
import { SUPPORTED_WALLETS, WalletType } from '../../services/wallet';
import WalletButton from './WalletButton';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { connectWallet, getInstalledWallets } = useWallet();
  
  if (!isOpen) return null;

  const installedWallets = getInstalledWallets();
  
  const handleConnect = async (walletType: WalletType) => {
    try {
      await connectWallet(walletType);
      onClose();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1E2329] rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{t('connectWallet')}</h2>
        
        <div className="space-y-3">
          {Object.entries(SUPPORTED_WALLETS).map(([key, wallet]) => {
            const isInstalled = installedWallets.some(([type]) => type === key);
            
            return (
              <WalletButton
                key={key}
                icon={wallet.icon}
                name={wallet.name}
                isInstalled={isInstalled}
                onConnect={() => handleConnect(key as WalletType)}
                onDownload={() => handleDownload(wallet.downloadUrl)}
                connectText={t('connect')}
                installText={t('install')}
              />
            );
          })}
        </div>
        
        <button
          onClick={onClose}
          className="mt-4 w-full p-3 rounded-lg bg-binance-gray text-binance-text hover:bg-opacity-80 transition-colors"
        >
          {t('cancel')}
        </button>
      </div>
    </div>
  );
};

export default WalletModal;