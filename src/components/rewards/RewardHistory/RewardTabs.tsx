import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { RewardType } from '../../../types/rewards';
import { RewardTabProps } from './types';

const REWARD_TABS: RewardType[] = ['promotionRewards', 'luckyRewards', 'fomoRewards'];

export const RewardTabs: React.FC<RewardTabProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap rounded-lg bg-binance-gray p-1 mb-4">
      {REWARD_TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 py-2 px-4 rounded-md text-sm transition-colors ${
            activeTab === tab
              ? 'bg-binance-yellow text-black'
              : 'text-binance-text hover:text-white'
          }`}
        >
          {t(tab)}
        </button>
      ))}
    </div>
  );
};