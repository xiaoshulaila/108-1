import { useEffect, useCallback } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { switchNetwork } from '../utils/network';

export function useNetwork() {
  const chainId = useChainId();
  const { isConnected } = useAccount();

  const handleNetworkSwitch = useCallback(async () => {
    if (isConnected && chainId !== sepolia.id) {
      await switchNetwork();
    }
  }, [chainId, isConnected]);

  useEffect(() => {
    handleNetworkSwitch();
  }, [handleNetworkSwitch]);

  return {
    isCorrectNetwork: chainId === sepolia.id,
    switchNetwork: handleNetworkSwitch
  };
}