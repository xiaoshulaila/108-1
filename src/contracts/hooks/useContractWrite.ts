import { useState } from 'react';
import { useContract } from './useContract';

export function useContractWrite(functionName: string) {
  const { walletClient, address, abi } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const write = async ({ args = [], value }: { args?: any[], value?: bigint } = {}) => {
    if (!walletClient || !address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const hash = await walletClient.writeContract({
        address,
        abi,
        functionName,
        args,
        value
      });

      return hash;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { write, isLoading, error };
}