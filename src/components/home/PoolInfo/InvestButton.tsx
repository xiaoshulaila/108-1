import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface InvestButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isConnected: boolean;
  isCorrectNetwork: boolean;
}

export const InvestButton: React.FC<InvestButtonProps> = ({
  onClick,
  isLoading,
  isConnected,
  isCorrectNetwork
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        disabled={!isConnected || !isCorrectNetwork || isLoading}
        className="w-full bg-binance-yellow text-black font-bold py-4 rounded-lg text-xl hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {!isConnected 
          ? t('connectWallet')
          : !isCorrectNetwork
            ? t('switchNetwork')
            : isLoading 
              ? t('processing')
              : t('joinNow')}
      </button>

      <p className="text-sm text-binance-yellow text-center">
        {t('fomoHint')}
      </p>
    </div>
  );
};