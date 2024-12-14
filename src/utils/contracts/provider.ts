import type { EthCallParams } from './types';

/**
 * Checks if ethereum provider is available
 */
export function checkProvider(): void {
  if (!window.ethereum) {
    throw new Error('No Ethereum provider found. Please install a wallet.');
  }
}

/**
 * Makes an eth_call to the contract
 */
export async function ethCall(params: EthCallParams): Promise<string> {
  checkProvider();

  try {
    const result = await window.ethereum.request({
      method: 'eth_call',
      params: [params, 'latest']
    });

    if (!result) {
      throw new Error('Empty response from provider');
    }

    return result;
  } catch (error) {
    console.error('eth_call failed:', error);
    throw error;
  }
}