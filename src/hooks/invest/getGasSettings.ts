import { ethers, Contract } from 'ethers';

export async function getGasSettings(contract: Contract, referrer: string) {
  // 获取当前gas价格
  const provider = contract.provider as ethers.providers.Web3Provider;
  const gasPrice = await provider.getGasPrice();
  
  // gas价格增加10%
  const adjustedGasPrice = gasPrice.mul(110).div(100);

  // 估算gas限制
  const gasEstimate = await contract.estimateGas.invest(
    referrer,
    { value: ethers.utils.parseEther('1.08') }
  );

  // gas限制增加10%
  const gasLimit = gasEstimate.mul(110).div(100);

  return {
    gasPrice: adjustedGasPrice,
    gasLimit
  };
}