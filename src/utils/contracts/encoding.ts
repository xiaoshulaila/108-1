import { encodeFunctionData as viemEncodeFunctionData, getAddress, type Address, type Hex } from 'viem';
import { CONTRACT_CONFIG } from '../../config/contract';
import type { ContractCallParams } from './types';

/**
 * Encodes contract function call data
 */
export function encodeContractCall({ functionName, args = [] }: ContractCallParams): Hex {
  try {
    return viemEncodeFunctionData({
      abi: CONTRACT_CONFIG.abi,
      functionName,
      args: args.map(arg => {
        // Convert numbers to BigInt for uint256 parameters
        if (typeof arg === 'number') {
          return BigInt(arg);
        }
        console.log(arg, );
        return arg;
      })
    });
  } catch (error) {
    console.error(`Error encoding function ${functionName}:`, error);
    throw error;
  }
}

/**
 * Decodes an address from contract response
 */
export function decodeAddress(hexString: string): Address {
  try {
    if (!hexString || hexString === '0x') {
      return '0x0000000000000000000000000000000000000000';
    }

    const cleaned = hexString.replace('0x', '');
    
    // Handle different hex string lengths
    if (cleaned.length === 40) {
      return getAddress(`0x${cleaned}`);
    }
    
    if (cleaned.length === 64) {
      const addressPart = cleaned.slice(24);
      return getAddress(`0x${addressPart}`);
    }

    return '0x0000000000000000000000000000000000000000';
  } catch (error) {
    console.error('Error decoding address:', error);
    return '0x0000000000000000000000000000000000000000';
  }
}

/**
 * Decodes a number from contract response
 */
export function decodeNumber(hexString: string): number {
  try {
    if (!hexString || hexString === '0x') {
      return 0;
    }

    const cleaned = hexString.replace('0x', '');
    return parseInt(cleaned, 16);
  } catch (error) {
    console.error('Error decoding number:', error);
    return 0;
  }
}