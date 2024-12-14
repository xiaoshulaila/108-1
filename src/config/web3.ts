import { Chain } from 'wagmi';
import { bsc } from 'wagmi/chains';

export const SUPPORTED_CHAINS: Chain[] = [bsc];

export const WEB3_CONFIG = {
  projectId: '76324e177a97189df5a09bd258e51a51',
  chains: SUPPORTED_CHAINS,
  defaultChain: bsc
};