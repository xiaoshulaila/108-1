import { createPublicClient, http, type Address } from 'viem';
import { sepolia } from 'viem/chains';
import { CONTRACT_CONFIG } from '../config/contract';

// 创建公共客户端
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
});

/**
 * 获取地址的推广数量
 */
export async function fetchPromotionCounts(addresses: Address[]): Promise<number[]> {
  try {
    const counts = await Promise.all(
      addresses.map(async (address) => {
        try {
          const count = await publicClient.readContract({
            ...CONTRACT_CONFIG,
            functionName: 'promotionCount',
            args: [address]
          }) as bigint;
          
          return Number(count);
        } catch (error) {
          console.error(`Error fetching promotion count for ${address}:`, error);
          return 0;
        }
      })
    );

    return counts;
  } catch (error) {
    console.error('Error fetching promotion counts:', error);
    return addresses.map(() => 0);
  }
}