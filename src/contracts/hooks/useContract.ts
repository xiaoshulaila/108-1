import { createPublicClient, http, createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';
import { CONTRACT_CONFIG } from '../config';

export function useContract() {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
  });

  const walletClient = typeof window !== 'undefined' && window.ethereum
    ? createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum)
      })
    : null;

  return {
    publicClient,
    walletClient,
    address: CONTRACT_CONFIG.addresses[sepolia.id],
    abi: CONTRACT_CONFIG.abi
  };
}