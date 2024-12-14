import type { Address } from 'viem';
import { CONTRACT_CONFIG } from '../../config/contract';
import { encodeContractCall, decodeAddress, decodeNumber } from './encoding';
import { ethCall } from './provider';

/**
 * Fetches promotion leaderboard addresses
 */
export async function fetchLeaderboardAddresses(): Promise<Address[]> {
  try {
    const addresses: Address[] = [];
    
    for (let i = 0; i < 10; i++) {
      // Encode function call with index
      const data = encodeContractCall({
        functionName: 'promotionLeaderboard',
        args: [i] // Note: Using number instead of BigInt
      });

      // Make the call
      const result = await ethCall({
        to: CONTRACT_CONFIG.address,
        data
      });

      // Decode the result
      const address = decodeAddress(result);
      
      // Break if we get zero address
      if (address === '0x0000000000000000000000000000000000000000') {
        break;
      }
      
      addresses.push(address);
    }

    return addresses;
  } catch (error) {
    console.error('Error fetching leaderboard addresses:', error);
    return [];
  }
}

/**
 * Fetches promotion counts for given addresses
 */
export async function fetchPromotionCounts(addresses: Address[]): Promise<number[]> {
  try {
    return await Promise.all(
      addresses.map(async (address) => {
        const data = encodeContractCall({
          functionName: 'promotionCount',
          args: [address]
        });
        
        const result = await ethCall({
          to: CONTRACT_CONFIG.address,
          data
        });

        return decodeNumber(result);
      })
    );
  } catch (error) {
    console.error('Error fetching promotion counts:', error);
    return addresses.map(() => 0);
  }
}