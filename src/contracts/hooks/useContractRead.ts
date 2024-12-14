import { useEffect, useState } from 'react';
import { useContract } from './useContract';

export function useContractRead(functionName: string, args: any[] = []) {
  const { publicClient, address, abi } = useContract();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!publicClient || !address) return;
      
      setIsLoading(true);
      try {
        const result = await publicClient.readContract({
          address,
          abi,
          functionName,
          args
        });
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // 设置轮询
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [publicClient, address, functionName, JSON.stringify(args)]);

  return { data, isLoading, error };
}