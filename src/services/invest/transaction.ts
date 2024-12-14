import { ethers } from 'ethers';
import { getEthersContract } from '../ethers/contract';
import { estimateGasSettings } from './gas';
import type { InvestParams } from '../../types/invest';

export async function sendInvestTransaction({
  referrer,
  onSuccess,
  onError,
  onPending
}: InvestParams) {
  const contract = getEthersContract();

  try {
    // Get gas settings
    const { gasPrice } = await estimateGasSettings();

    // Estimate gas
    const gasEstimate = await contract.estimateGas.invest(
      referrer,
      { value: ethers.utils.parseEther('1.08') }
    );

    // Add 10% to gas limit
    const gasLimit = gasEstimate.mul(110).div(100);

    // Send transaction
    const tx = await contract.invest(
      referrer,
      {
        value: ethers.utils.parseEther('1.08'),
        gasLimit,
        gasPrice
      }
    );

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