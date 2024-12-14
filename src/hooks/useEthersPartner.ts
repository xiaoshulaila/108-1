import { useState } from 'react';
import { useAccount } from 'wagmi';
import { upgradeToPartner } from '../services/ethers/partner';
import { useNetworkStatus } from './useNetworkStatus';

export function useEthersPartner() {
  const { address } = useAccount();
  const { isCorrectNetwork } = useNetworkStatus();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpgrade = async () => {
    if (!address || !isCorrectNetwork) return;

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await upgradeToPartner();
      setIsSuccess(true);
    } catch (err: any) {
      let message = 'upgradeError';
      
      if (err.code === 4001) {
        message = 'userRejected';
      } else if (err.message?.includes('insufficient funds')) {
        message = 'insufficientFunds';
      }
      
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    upgrade: handleUpgrade,
    isLoading,
    error,
    isSuccess
  };
}