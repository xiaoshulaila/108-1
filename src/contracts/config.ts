import { sepolia } from 'wagmi/chains';
import Dream108ABI from './abi/Dream108.json';

export const CONTRACT_ADDRESS = '0xD13925E866D629582a06cEce2e89Cbe52c3552C3';

export const CONTRACT_CONFIG = {
  address: CONTRACT_ADDRESS,
  abi: Dream108ABI,
  chain: sepolia
};