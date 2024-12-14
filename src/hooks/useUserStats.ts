import { useContractReads } from 'wagmi';
import { CONTRACT_CONFIG } from '../config/contract';

export function useUserStats() {
  const { data, isLoading } = useContractReads({
    contracts: [
      {
        ...CONTRACT_CONFIG,
        functionName: 'currentIndex',
      },
      {
        ...CONTRACT_CONFIG,
        functionName: 'threeOutOneIndex',
      }
    ],
    watch: true,
    cacheTime: 0,
    staleTime: 0,
  });

  const currentIndex = data?.[0].status === 'success' && data[0].result !== undefined
    ? Number(data[0].result)
    : 0;

  const threeOutOneIndex = data?.[1].status === 'success' && data[1].result !== undefined
    ? Number(data[1].result)
    : 0;

  return {
    currentIndex,
    threeOutOneIndex,
    isLoading,
  };
}