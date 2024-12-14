import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useLuckyPoolData } from '../../hooks/useLuckyPoolData';
import { formatAddress } from '../../utils/address';
import { useAccount } from 'wagmi';

const LuckyPool: React.FC = () => {
  const { t } = useLanguage();
  const { address } = useAccount();
  const { luckyPoolBalance, lastWinner, isInLuckyPool, isLoading } = useLuckyPoolData();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">{t('luckyPool')}</h2>
      
      <div className="bg-binance-gray rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-binance-text">{t('currentPool')}</span>
          <span className="text-xl font-bold text-binance-yellow">
            {isLoading ? '...' : `${luckyPoolBalance.toFixed(4)} BNB`}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-binance-text">{t('lastWinner')}</span>
          <span className="font-mono">
            {isLoading ? '...' : formatAddress(lastWinner)}
          </span>
        </div>
        
        <div className="pt-4 border-t border-binance-border">
          <p className="text-center mb-2">
            {isInLuckyPool ? t('inPoolTrue') : t('inPoolFalse')}
          </p>
          <p className="text-sm text-binance-yellow text-center">
            {t('poolInfo')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LuckyPool;