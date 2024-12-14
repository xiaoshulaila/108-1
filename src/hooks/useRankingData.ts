import { useState, useEffect } from 'react';
import { useContractReads } from 'wagmi';
import { CONTRACT_CONFIG } from '../config/contract';
import { formatEther, type Address } from 'viem';
import type { RankingItem } from '../types/rankings';
import { fetchPromotionCounts } from '../utils/contractCalls';

export function useRankingData() {
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 使用 useContractReads 同时获取多个数据
  const { data, isError } = useContractReads({
    contracts: [
      {
        ...CONTRACT_CONFIG,
        functionName: 'getTop10Promoters',
      },
      {
        ...CONTRACT_CONFIG,
        functionName: 'calculatePromotionRewards',
      }
    ],
    watch: true,
    cacheTime: 0,
  });

  useEffect(() => {
    const processData = async () => {
      try {
        setIsLoading(true);

        // 获取地址列表
        const addresses = data?.[0].result as Address[] || [];
        
        if (addresses.length === 0) {
          setRankings([]);
          return;
        }

        // 获取奖励数据
        const rewards = data?.[1].result as bigint[] || [];

        // 获取推广数量
        const referralCounts = await fetchPromotionCounts(addresses);

        // 组合数据
        const rankingData: RankingItem[] = addresses.map((address, index) => ({
          rank: index + 1,
          address,
          reward: `${Number(formatEther(rewards[index] || 0n)).toFixed(3)} BNB`,
          referrals: referralCounts[index]
        }));

        setRankings(rankingData);
      } catch (error) {
        console.error('Error processing ranking data:', error);
        setRankings([]);
      } finally {
        setIsLoading(false);
      }
    };

    processData();
  }, [data]);

  return {
    rankings,
    isLoading,
    error: isError ? new Error('Failed to fetch ranking data') : null
  };
}