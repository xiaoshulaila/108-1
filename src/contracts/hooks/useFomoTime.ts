import { useContractRead } from 'wagmi';
import { CONTRACT_CONFIG } from '../config';

export function useFomoTime() {
  const { 
    data: rawFomoEndTime,
    isLoading,
    error 
  } = useContractRead({
    ...CONTRACT_CONFIG,
    functionName: 'fomoEndTime',
    watch: true,
    pollingInterval: 1000, // Poll every second
  });

  // Convert BigInt to number
  const fomoEndTime = rawFomoEndTime ? Number(rawFomoEndTime) : 0;

  return {
    fomoEndTime,
    isLoading,
    error
  };
}