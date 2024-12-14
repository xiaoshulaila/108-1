import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useWallet } from '../hooks/useWallet';
import { SUPPORTED_WALLETS, WalletType } from '../services/wallet';

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
              <button
                key={key}
                onClick={() => isInstalled 
                  ? handleConnect(key as WalletType)
                  : handleDownload(wallet.downloadUrl)
                }
                className="w-full flex items-center justify-between p-4 rounded-lg bg-[#2B3139] hover:bg-[#2B3139]/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{wallet.icon}</span>
                  <span>{wallet.name}</span>
                </div>
                <span className="text-sm text-binance-text">
                  {isInstalled ? t('connect') : t('install')}
                </span>
              </button>
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