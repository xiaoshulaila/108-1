import { sepolia } from 'wagmi/chains';

export const NETWORK_CONFIG = {
  chainId: '0xaa36a7',
  chainName: 'Sepolia',
  nativeCurrency: {
    name: 'Sepolia ETH',
    symbol: 'SEP',
    decimals: 18
  },
  rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/Kx3gVvt2Ydq9iPg6Phiw8cwTIUiy6R8n'],
  blockExplorerUrls: ['https://sepolia.etherscan.io']
};

export async function switchNetwork() {
  if (!window.ethereum) return;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: NETWORK_CONFIG.chainId }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [NETWORK_CONFIG],
        });
      } catch (addError) {
        console.error('Failed to add Sepolia network:', addError);
      }
    }
  }
}