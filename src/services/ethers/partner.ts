import { ethers } from 'ethers';
import { getEthersContract } from './contract';

export async function upgradeToPartner() {
  try {
    const contract = getEthersContract();
    
    // Get gas price
    const provider = contract.provider as ethers.providers.Web3Provider;
    const gasPrice = await provider.getGasPrice();
    const adjustedGasPrice = gasPrice.mul(110).div(100);

    // Send transaction
    const tx = await contract.BuyPartner({
      value: ethers.utils.parseEther('1'),
      gasPrice: adjustedGasPrice
    });

    // Wait for confirmation
    return await tx.wait();
  } catch (error: any) {
    console.error('Partner upgrade failed:', error);
    throw error;
  }
}