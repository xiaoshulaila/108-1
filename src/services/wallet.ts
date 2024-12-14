import { injected } from 'wagmi/connectors';

export const SUPPORTED_WALLETS = {
  metamask: {
    name: 'MetaMask',
    icon: '🦊',
    downloadUrl: 'https://metamask.io/download/',
    connector: injected,
    detect: () => typeof window !== 'undefined' && !!window.ethereum?.isMetaMask,
  }
} as const;

export type WalletType = keyof typeof SUPPORTED_WALLETS;