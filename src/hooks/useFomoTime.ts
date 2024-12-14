import { useContractRead } from 'wagmi';
import { CONTRACT_CONFIG } from '../config/contract';

export function useFomoTime() {
  const { 
    data: rawFomoEndTime,
    isLoading,
    error 
  } = useContractRead({
    ...CONTRACT_CONFIG,
    functionName: 'fomoEndTime',
    watch: true, // Enable watching for changes
    pollingInterval: 1000, // Poll every second
    cacheTime: 0, // Disable caching to always get fresh data
    staleTime: 0, // Data is immediately stale to force refetch
  });

  // Convert BigInt to number
  const fomoEndTime = rawFomoEndTime ? Number(rawFomoEndTime) : 0;

  return {
    fomoEndTime,
    isLoading,
    error
  };
}