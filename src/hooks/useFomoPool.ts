import { useContractRead } from 'wagmi';
import { CONTRACT_CONFIG } from '../config/contract';
import { formatEther } from 'viem';

export function useFomoPool() {
  const { 
    data: rawFomoPool,
    isLoading,
    error 
  } = useContractRead({
    ...CONTRACT_CONFIG,
    functionName: 'fomoPool',
    watch: true, // Enable watching for changes
    pollingInterval: 3000, // Poll every 3 seconds
    cacheTime: 0, // Disable caching to always get fresh data
    staleTime: 0, // Data is immediately stale to force refetch
  });

  // Convert BigInt to number and format to ETH
  const fomoPool = rawFomoPool ? Number(formatEther(rawFomoPool)) : 0;

  return {
    fomoPool,
    isLoading,
    error
  };
}