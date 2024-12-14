import { useMemo } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '../../config/contract';

export function useInvestContract() {
  return useMemo(() => {
    if (!window.ethereum) return null;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    return new ethers.Contract(
      CONTRACT_CONFIG.address,
      CONTRACT_CONFIG.abi,
      signer
    );
  }, []);
}