import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { SUPPORTED_WALLETS } from '../utils/wallet';
import { clearWalletStorage } from '../utils/storage';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const connect = async () => {
    try {
      if (!window.ethereum) {
        window.open(SUPPORTED_WALLETS[0].downloadUrl, '_blank');
        return;
      }

      await connectAsync({ 
        connector: injected({
          shimDisconnect: true,
          autoConnect: false
        })
      });
    } catch (error) {
      if ((error as any)?.code !== 4001) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const disconnect = async () => {
    try {
      await disconnectAsync();
      clearWalletStorage();
      window.location.reload();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return {
    address,
    isConnected,
    connect,
    disconnect
  };
}