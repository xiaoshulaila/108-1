import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import RankingRow from './RankingRow';
import { useRankingData } from '../../hooks/useRankingData';
import RankingSkeleton from './RankingSkeleton';
import EmptyRankings from './EmptyRankings';

const RankingTable: React.FC = () => {
  const { t } = useLanguage();
  const { rankings, isLoading, error } = useRankingData();

  if (isLoading) {
    return <RankingSkeleton />;
  }

  if (error || !rankings || rankings.length === 0) {
    return <EmptyRankings />;
  }

  return (
    <div className="bg-binance-gray rounded-lg overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-binance-border">
            <th className="text-left p-3 text-binance-text font-medium whitespace-nowrap">
              {t('rank')}
            </th>
            <th className="text-left p-3 text-binance-text font-medium whitespace-nowrap">
              {t('address')}
            </th>
            <th className="text-right p-3 text-binance-text font-medium whitespace-nowrap">
              {t('reward')}
            </th>
            <th className="text-right p-3 text-binance-text font-medium whitespace-nowrap">
              {t('referrals')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((item) => (
            <RankingRow key={item.rank} data={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;