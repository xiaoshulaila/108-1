import { ethers, Contract } from 'ethers';

export async function getUpgradeGasSettings(contract: Contract) {
  try {
    // 获取当前gas价格
    const provider = contract.provider as ethers.providers.Web3Provider;
    const gasPrice = await provider.getGasPrice();
    
    // gas价格增加10%
    const adjustedGasPrice = gasPrice.mul(110).div(100);

    // 估算gas限制
    const gasEstimate = await contract.estimateGas.BuyPartner({
      value: ethers.utils.parseEther('0.1') // 修正为0.1 BNB
    });

    // gas限制增加10%
    const gasLimit = gasEstimate.mul(110).div(100);

    return {
      gasPrice: adjustedGasPrice,
      gasLimit
    };
  } catch (error) {
    console.error('Gas estimation failed:', error);
    throw error;
  }
}