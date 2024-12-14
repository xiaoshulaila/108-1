import { useState, useEffect } from 'react';
import { getRankingData } from '../../utils/contracts';
import type { RankingItem } from '../../types/rankings';

export function useRankingData() {
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await getRankingData();
        
        if (isMounted) {
          setRankings(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching ranking data:', err);
          setError(err instanceof Error ? err : new Error('Failed to fetch ranking data'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // 设置轮询
    const interval = setInterval(fetchData, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { rankings, isLoading, error };
}