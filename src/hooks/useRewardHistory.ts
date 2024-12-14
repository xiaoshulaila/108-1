import { useState, useEffect } from 'react';
import { useContractReads } from 'wagmi';
import { CONTRACT_CONFIG } from '../config/contract';
import { formatEther, type Address } from 'viem';
import type { RewardRecord } from '../types/rewards';

export function useRewardHistory() {
  const [records, setRecords] = useState<RewardRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isError } = useContractReads({
    contracts: Array.from({ length: 10 }, (_, i) => ({
      ...CONTRACT_CONFIG,
      functionName: 'rewardDistributionHistory',
      args: [BigInt(i)]
    })),
    watch: true,
  });

  useEffect(() => {
    if (!data) return;

    const processedRecords: RewardRecord[] = data
      .map((result, index) => {
        if (result.status !== 'success' || !result.result) return null;

        const [recipient, amount] = result.result as [Address, bigint];
        
        // Skip empty records
        if (recipient === '0x0000000000000000000000000000000000000000' || amount === 0n) {
          return null;
        }

        return {
          recipient,
          amount: `${Number(formatEther(amount)).toFixed(3)} BNB`,
          type: 'promotion'
        };
      })
      .filter((record): record is RewardRecord => record !== null);

    setRecords(processedRecords);
    setIsLoading(false);
  }, [data]);

  return {
    records,
    isLoading,
    error: isError ? new Error('Failed to fetch reward history') : null
  };
}