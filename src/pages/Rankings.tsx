import React from 'react';
import { Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAccount, useContractRead } from 'wagmi';
import Layout from '../components/Layout';
import RankingTable from '../components/RankingTable';
import { useRankingPool } from '../hooks/useRankingPool';
import { CONTRACT_CONFIG } from '../config/contract';

const Rankings: React.FC = () => {
  const { t } = useLanguage();
  const { address } = useAccount();
  const { rankingPool, isLoading: isPoolLoading } = useRankingPool();

  // 获取用户的推广数量
  const { data: promotionCount, isLoading: isPromotionLoading } = useContractRead({
    ...CONTRACT_CONFIG,
    functionName: 'promotionCount',
    args: [address || '0x0000000000000000000000000000000000000000'],
    watch: true,
    enabled: !!address,
  });

  return (
    <Layout title={t('rankings')} icon={<Trophy className="text-binance-yellow" />}>
      <div className="p-4 max-w-screen-xl mx-auto pb-20">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-binance-gray rounded-lg p-4">
              <div className="text-binance-text">{t('promotionPool')}</div>
              <div className="text-xl font-bold mt-1 text-binance-yellow">
                {isPoolLoading ? '...' : `${rankingPool.toFixed(4)} BNB`}
              </div>
            </div>
            <div className="bg-binance-gray rounded-lg p-4">
              <div className="text-binance-text">{t('yourPromotions')}</div>
              <div className="text-xl font-bold mt-1">
                {!address ? (
                  t('pleaseConnect')
                ) : isPromotionLoading ? (
                  '...'
                ) : (
                  promotionCount?.toString() || '0'
                )}
              </div>
            </div>
          </div>

          <RankingTable />
        </div>
      </div>
    </Layout>
  );
};

export default Rankings;