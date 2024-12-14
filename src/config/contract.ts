import { sepolia } from 'wagmi/chains';
import Dream108ABI from '../contracts/abi/Dream108.json';

export const CONTRACT_CONFIG = {
  address: '0x97153ab3718Ee99aA9b48d1115F6388aDEF75a99' as `0x${string}`,
  abi: Dream108ABI,
  chainId: sepolia.id
} as const;