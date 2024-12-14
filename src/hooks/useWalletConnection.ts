import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const connect = async () => {
    try {
      if (!window.ethereum?.isMetaMask) {
        window.open('https://metamask.io/download/', '_blank');
        return;
      }

      await connectAsync({ 
        connector: injected()
      });
    } catch (error) {
      if ((error as any)?.code !== 4001) { // Ignore user rejection
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const disconnect = async () => {
    try {
      await disconnectAsync();
      // Only clear wallet-related storage
      localStorage.removeItem('wagmi.wallet');
      localStorage.removeItem('wagmi.connected');
      localStorage.removeItem('wagmi.account');
      // Reload only if connected
      if (isConnected) {
        window.location.reload();
      }
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