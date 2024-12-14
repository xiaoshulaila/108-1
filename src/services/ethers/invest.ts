import { ethers } from 'ethers';
import { getEthersContract } from './contract';

export async function invest(referrer: string) {
  try {
    const contract = getEthersContract();
    
    // Get gas estimate
    const gasEstimate = await contract.estimateGas.invest(
      referrer,
      { value: ethers.utils.parseEther('1.08') }
    );

    // Add 10% to gas limit
    const gasLimit = gasEstimate.mul(110).div(100);

    // Get current gas price
    const provider = contract.provider as ethers.providers.Web3Provider;
    const gasPrice = await provider.getGasPrice();
    
    // Add 10% to gas price
    const adjustedGasPrice = gasPrice.mul(110).div(100);

    // Send transaction
    const tx = await contract.invest(
      referrer,
      {
        value: ethers.utils.parseEther('1.08'),
        gasLimit,
        gasPrice: adjustedGasPrice
      }
    );

    // Wait for confirmation
    return await tx.wait();
  } catch (error: any) {
    console.error('Investment failed:', error);
    throw error;
  }
}