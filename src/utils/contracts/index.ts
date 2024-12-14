import { CONTRACT_CONFIG } from '../../config/contract';
import { formatEther, type Address } from 'viem';

/**
 * 检查以太坊提供者
 */
function checkProvider(): void {
  if (!window.ethereum) {
    throw new Error('No Ethereum provider found');
  }
}

/**
 * 执行合约调用
 */
async function callContract(data: string): Promise<string> {
  checkProvider();
  
  return window.ethereum.request({
    method: 'eth_call',
    params: [{
      to: CONTRACT_CONFIG.address,
      data
    }, 'latest']
  });
}

/**
 * 获取排行榜地址
 */
export async function getLeaderboardAddress(index: number): Promise<Address> {
  try {
    // promotionLeaderboard(uint256)
    const data = `0xa87302af${index.toString(16).padStart(64, '0')}`;
    const result = await callContract(data);
    
    if (!result || result === '0x' || result === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      return '0x0000000000000000000000000000000000000000';
    }
    
    return `0x${result.slice(-40)}` as Address;
  } catch (error) {
    console.error('Error getting leaderboard address:', error);
    return '0x0000000000000000000000000000000000000000';
  }
}

/**
 * 获取推广数量
 */
export async function getPromotionCount(address: string): Promise<number> {
  try {
    // promotionCount(address)
    const data = `0x70712939000000000000000000000000${address.slice(2)}`;
    const result = await callContract(data);
    return parseInt(result, 16);
  } catch (error) {
    console.error('Error getting promotion count:', error);
    return 0;
  }
}

/**
 * 获取推广奖励
 */
export async function getPromotionRewards(): Promise<string[]> {
  try {
    // calculatePromotionRewards()
    const data = '0x54ba73c5';
    const result = await callContract(data);
    
    // 解析返回的数组数据
    const values = result.slice(2).match(/.{64}/g) || [];
    return values.map(hex => {
      const value = BigInt(`0x${hex}`);
      return `${Number(formatEther(value)).toFixed(2)} BNB`;
    });
  } catch (error) {
    console.error('Error getting promotion rewards:', error);
    return [];
  }
}

/**
 * 获取完整的排行榜数据
 */
export async function getRankingData() {
  try {
    const addresses: Address[] = [];
    const referrals: number[] = [];
    
    // 获取地址列表
    for (let i = 0; i < 10; i++) {
      const address = await getLeaderboardAddress(i);
      if (address === '0x0000000000000000000000000000000000000000') {
        break;
      }
      addresses.push(address);
    }
    
    // 获取推广数量
    for (const address of addresses) {
      const count = await getPromotionCount(address);
      referrals.push(count);
    }
    
    // 获取奖励
    const rewards = await getPromotionRewards();
    
    // 组合数据
    return addresses.map((address, index) => ({
      rank: index + 1,
      address,
      reward: rewards[index] || '0 BNB',
      referrals: referrals[index] || 0
    }));
  } catch (error) {
    console.error('Error getting ranking data:', error);
    return [];
  }
}