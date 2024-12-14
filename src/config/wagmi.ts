import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// 使用公共 RPC
const rpcUrl = 'https://eth-sepolia.g.alchemy.com/v2/Kx3gVvt2Ydq9iPg6Phiw8cwTIUiy6R8n';

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(rpcUrl, {
      batch: true,
      retryCount: 3,
      retryDelay: 1000,
    }),
  },
  connectors: [
    injected()
  ],
});