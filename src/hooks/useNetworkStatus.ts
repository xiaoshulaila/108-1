import { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { switchNetwork } from '../utils/network';

export function useNetworkStatus() {
  const chainId = useChainId();
  const { isConnected } = useAccount();
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  useEffect(() => {
    setIsCorrectNetwork(chainId === sepolia.id);
  }, [chainId]);

  const handleNetworkSwitch = async () => {
    if (isConnected && !isCorrectNetwork) {
      await switchNetwork();
    }
  };

  return {
    isCorrectNetwork,
    switchNetwork: handleNetworkSwitch
  };
}