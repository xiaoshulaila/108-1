import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { RewardType } from '../../types/rewards';
import { usePromotionRewards } from '../../hooks/rewards/usePromotionRewards';
import { useLuckyRewards } from '../../hooks/rewards/useLuckyRewards';
import { useFomoRewards } from '../../hooks/rewards/useFomoRewards';
import { formatAddress } from '../../utils/address';

const RewardHistory: React.FC = () => {
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
  const tabs: RewardType[] = ['promotionRewards', 'luckyRewards', 'fomoRewards'];

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
      
      {/* Tabs */}
      <div className="flex flex-wrap rounded-lg bg-binance-gray p-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
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

      {/* Records Table */}
      {currentRewards.records.length === 0 ? (
        <div className="bg-binance-gray rounded-lg p-8 text-center text-binance-text">
          {currentRewards.emptyMessage}
        </div>
      ) : (
        <div className="bg-binance-gray rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-binance-border">
                <th className="text-left p-4 text-binance-text whitespace-nowrap">{t('address')}</th>
                <th className="text-right p-4 text-binance-text whitespace-nowrap">{t('reward')}</th>
              </tr>
            </thead>
            <tbody>
              {currentRewards.records.map((record, index) => (
                <tr key={index} className="border-b border-binance-border last:border-0">
                  <td className="p-4 font-mono">{formatAddress(record.recipient)}</td>
                  <td className="p-4 text-right text-binance-yellow">{record.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RewardHistory;