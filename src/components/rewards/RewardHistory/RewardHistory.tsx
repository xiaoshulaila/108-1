import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { RewardType } from '../../../types/rewards';
import { RewardTabs } from './RewardTabs';
import { RewardTable } from './RewardTable';
import { usePromotionRewards } from '../../../hooks/rewards/usePromotionRewards';
import { useLuckyRewards } from '../../../hooks/rewards/useLuckyRewards';
import { useFomoRewards } from '../../../hooks/rewards/useFomoRewards';
import type { RewardHistoryProps } from './types';

export const RewardHistory: React.FC<RewardHistoryProps> = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<RewardType>('promotionRewards');

  const promotionRewards = usePromotionRewards();
  const luckyRewards = useLuckyRewards();
  const fomoRewards = useFomoRewards();

  const rewardData = {
    promotionRewards,
    luckyRewards,
    fomoRewards
  };

  const currentRewards = rewardData[activeTab];

  if (currentRewards.isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">{t('rewardHistory')}</h2>
        <div className="bg-binance-gray rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-binance-border rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">{t('rewardHistory')}</h2>
      <RewardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <RewardTable 
        records={currentRewards.records}
        emptyMessage={currentRewards.emptyMessage}
      />
    </div>
  );
};