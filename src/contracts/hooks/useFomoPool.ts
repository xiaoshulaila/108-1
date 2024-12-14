import { useContractRead } from 'wagmi';
import { CONTRACT_CONFIG } from '../config';
import { formatEther } from 'viem';

export function useFomoPool() {
  const { 
    data: rawFomoPool,
    isLoading,
    error 
  } = useContractRead({
    ...CONTRACT_CONFIG,
    functionName: 'fomoPool',
    watch: true,
    pollingInterval: 3000, // Poll every 3 seconds
  });

  // Convert BigInt to number and format to ETH
  const fomoPool = rawFomoPool ? Number(formatEther(rawFomoPool)) : 0;

  return {
    fomoPool,
    isLoading,
    error
  };
}