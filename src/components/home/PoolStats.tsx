import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUserStats } from '../../hooks/useUserStats';

export const PoolStats: React.FC = () => {
  const { t } = useLanguage();
  const { currentIndex, threeOutOneIndex, isLoading } = useUserStats();

  // 计算下一个出局会员编号
  const nextExitNumber = threeOutOneIndex + 1;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#2B3139] rounded-lg p-4">
        <div className="text-binance-text">{t('totalUsers')}</div>
        <div className="text-xl font-bold mt-1">
          {isLoading ? '...' : currentIndex}
        </div>
      </div>
      <div className="bg-[#2B3139] rounded-lg p-4">
        <div className="text-binance-text">{t('exitNumber')}</div>
        <div className="text-xl font-bold mt-1">
          {isLoading ? '...' : threeOutOneIndex}
        </div>
      </div>
      <div className="bg-[#2B3139] rounded-lg p-4">
        <div className="text-binance-text">{t('nextExitMember')}</div>
        <div className="text-xl font-bold mt-1 text-binance-yellow">
          {isLoading ? '...' : nextExitNumber}
        </div>
      </div>
      <div className="bg-[#2B3139] rounded-lg p-4">
        <div className="text-binance-text">{t('referrals')}</div>
        <div className="text-xl font-bold mt-1">0</div>
      </div>
    </div>
  );
};