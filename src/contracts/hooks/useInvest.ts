import { useCallback } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_CONFIG } from '../config';

export function useInvest() {
  const { address } = useAccount();
  
  const { 
    writeAsync: writeContract,
    isPending: isLoading,
    isSuccess,
    error
  } = useContractWrite({
    ...CONTRACT_CONFIG,
    functionName: 'invest',
  });

  const invest = useCallback(async (referrer: string) => {
    if (!address) throw new Error('Wallet not connected');

    try {
      const tx = await writeContract({
        args: [referrer],
        value: parseEther('1.08')
      });
      return tx;
    } catch (error) {
      console.error('Investment failed:', error);
      throw error;
    }
  }, [address, writeContract]);

  return {
    invest,
    isLoading,
    isSuccess,
    error
  };
}