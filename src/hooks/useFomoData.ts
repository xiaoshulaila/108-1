import { useContractReads } from 'wagmi';
import { CONTRACT_CONFIG } from '../config/contract';
import { formatEther } from 'viem';

export function useFomoData() {
  const { data, isLoading } = useContractReads({
    contracts: [
      {
        ...CONTRACT_CONFIG,
        functionName: 'fomoPool',
      },
      {
        ...CONTRACT_CONFIG,
        functionName: 'fomoEndTime',
      }
    ],
    watch: true,
    pollingInterval: 1000, // 每秒更新一次
    cacheTime: 0, // 禁用缓存
    staleTime: 0, // 数据始终视为过期，强制刷新
  });

  const fomoPool = data?.[0].status === 'success' && data[0].result !== undefined
    ? Number(formatEther(data[0].result as bigint))
    : 0;

  const fomoEndTime = data?.[1].status === 'success' && data[1].result !== undefined
    ? Number(data[1].result)
    : 0;

  return {
    fomoPool,
    fomoEndTime,
    isLoading,
  };
}