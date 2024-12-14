import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface PoolAmountProps {
  amount: number;
  isLoading: boolean;
}

export const PoolAmount: React.FC<PoolAmountProps> = ({ amount, isLoading }) => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-6">
      <h2 className="text-xl text-binance-text mb-2">{t('poolAmount')}</h2>
      <p className="text-4xl font-bold text-binance-yellow">
        {isLoading ? '...' : `${amount.toFixed(3)} BNB`}
      </p>
    </div>
  );
};