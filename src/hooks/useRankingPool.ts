import { useContractRead } from 'wagmi';
import { CONTRACT_CONFIG } from '../config/contract';
import { formatEther } from 'viem';

export function useRankingPool() {
  const { 
    data: rawRankingPool,
    isLoading,
    error 
  } = useContractRead({
    ...CONTRACT_CONFIG,
    functionName: 'rankingPool',
    watch: true,
    pollingInterval: 3000,
    cacheTime: 0,
    staleTime: 0,
  });

  // Convert BigInt to number and format to BNB
  const rankingPool = rawRankingPool ? Number(formatEther(rawRankingPool)) : 0;

  return {
    rankingPool,
    isLoading,
    error
  };
}