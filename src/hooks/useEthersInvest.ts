import { useState } from 'react';
import { useAccount } from 'wagmi';
import { invest } from '../services/ethers/invest';
import { useReferral } from './useReferral';
import { useNetworkStatus } from './useNetworkStatus';

export function useEthersInvest() {
  const { address } = useAccount();
  const { isCorrectNetwork } = useNetworkStatus();
  const { referrer } = useReferral();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInvest = async () => {
    if (!address || !isCorrectNetwork) return;

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await invest(referrer);
      setIsSuccess(true);
    } catch (err: any) {
      let message = 'investError';
      
      if (err.code === 4001) {
        message = 'userRejected';
      } else if (err.message?.includes('insufficient funds')) {
        message = 'insufficientFunds';
      } else if (err.message?.includes('inviter has not joined')) {
        message = 'referrerNotJoined';
      }
      
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    invest: handleInvest,
    isLoading,
    error,
    isSuccess
  };
}