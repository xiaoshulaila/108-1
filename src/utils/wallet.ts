export interface WalletInfo {
  name: string;
  check: () => boolean;
  downloadUrl: string;
}

export const SUPPORTED_WALLETS: WalletInfo[] = [
  {
    name: 'MetaMask',
    check: () => window.ethereum?.isMetaMask ?? false,
    downloadUrl: 'https://metamask.io/download/'
  },
  {
    name: 'TokenPocket',
    check: () => window.ethereum?.isTokenPocket ?? false,
    downloadUrl: 'https://www.tokenpocket.pro/en/download/app'
  },
  {
    name: 'OKX Wallet',
    check: () => window.ethereum?.isOKExWallet ?? false,
    downloadUrl: 'https://www.okx.com/web3'
  }
];

export function detectWalletProvider() {
  if (!window.ethereum) return null;
  
  const detectedWallet = SUPPORTED_WALLETS.find(wallet => wallet.check());
  return detectedWallet ? window.ethereum : null;
}

export function getWalletDownloadUrl() {
  // Default to MetaMask download if no wallet is detected
  return SUPPORTED_WALLETS[0].downloadUrl;
}