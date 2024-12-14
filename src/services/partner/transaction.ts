import { ethers } from 'ethers';
import { getEthersContract } from '../ethers/contract';
import type { TransactionParams } from '../../types/transaction';

export async function sendUpgradeTransaction({
  onSuccess,
  onError,
  onPending
}: TransactionParams) {
  const contract = getEthersContract();

  try {
    // Get gas settings
    const provider = contract.provider as ethers.providers.Web3Provider;
    const gasPrice = await provider.getGasPrice();
    const adjustedGasPrice = gasPrice.mul(110).div(100);

    // Send transaction
    const tx = await contract.BuyPartner({
      value: ethers.utils.parseEther('1'),
      gasPrice: adjustedGasPrice
    });

    // Transaction pending
    onPending?.(tx.hash);

    // Wait for confirmation
    await tx.wait();
    
    onSuccess?.();
  } catch (error: any) {
    onError?.(error);
    throw error;
  }
}