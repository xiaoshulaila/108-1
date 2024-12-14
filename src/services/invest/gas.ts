import { ethers } from 'ethers';
import { getEthersContract } from '../ethers/contract';

export async function estimateGasSettings() {
  const contract = getEthersContract();
  const provider = contract.provider as ethers.providers.Web3Provider;

  // Get current gas price
  const gasPrice = await provider.getGasPrice();
  // Add 10% to gas price
  const adjustedGasPrice = gasPrice.mul(110).div(100);

  return {
    gasPrice: adjustedGasPrice
  };
}