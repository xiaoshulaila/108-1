import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors';

// 创建配置
const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/Kx3gVvt2Ydq9iPg6Phiw8cwTIUiy6R8n')
  },
  connectors: [
    injected({
      shimDisconnect: true, // 启用断开连接功能
      autoConnect: false, // 禁用自动连接
    })
  ]
});

// 配置 QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 1000,
    },
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}