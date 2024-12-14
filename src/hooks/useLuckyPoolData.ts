import { useContractReads } from 'wagmi';
import { CONTRACT_CONFIG } from '../config/contract';
import { formatEther } from 'viem';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export function useLuckyPoolData() {
  const { address } = useAccount();
  const [luckyPoolBalance, setLuckyPoolBalance] = useState(0);
  const [lastWinner, setLastWinner] = useState('');
  const [isInLuckyPool, setIsInLuckyPool] = useState(false);

  const { data, isLoading } = useContractReads({
    contracts: [
      {
        ...CONTRACT_CONFIG,
        functionName: 'luckyPoolBalance',
      },
      {
        ...CONTRACT_CONFIG,
        functionName: 'Thepreviousluckywinner',
      },
      {
        ...CONTRACT_CONFIG,
        functionName: 'isLuckPool',
        args: [address || '0x0000000000000000000000000000000000000000'],
      }
    ],
    watch: true,
    pollingInterval: 3000,
    enabled: !!address,
  });

  useEffect(() => {
    if (!data) return;

    // 更新幸运奖池余额
    if (data[0].status === 'success' && data[0].result !== undefined) {
      const newBalance = Number(formatEther(data[0].result as bigint));
      setLuckyPoolBalance(newBalance);
    }

    // 更新上一个幸运赢家
    if (data[1].status === 'success' && data[1].result !== undefined) {
      setLastWinner(data[1].result as string);
    }

    // 更新是否在幸运奖池中
    if (data[2].status === 'success' && data[2].result !== undefined) {
      setIsInLuckyPool(Boolean(data[2].result));
    }
  }, [data]);

  return {
    luckyPoolBalance,
    lastWinner,
    isInLuckyPool,
    isLoading,
  };
}