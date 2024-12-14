import { type PublicClient, type Address } from 'viem';
import { GasSettings } from '../../types/invest';

interface EstimateGasParams {
  publicClient: PublicClient;
  address: Address;
  abi: any[];
  functionName: string;
  args: any[];
  value: bigint;
  account: Address;
}

export async function estimateGasSettings({
  publicClient,
  address,
  abi,
  functionName,
  args,
  value,
  account
}: EstimateGasParams): Promise<GasSettings> {
  // 验证交易可行性
  await publicClient.simulateContract({
    address,
    abi,
    functionName,
    args,
    value,
    account,
  });

  // 获取 gas 价格并增加 10%
  const gasPrice = await publicClient.getGasPrice();
  const adjustedGasPrice = (gasPrice * 110n) / 100n;

  // 获取 gas 限制并增加 10%
  const gasEstimate = await publicClient.estimateContractGas({
    address,
    abi,
    functionName,
    args,
    value,
    account,
  });
  const gasLimit = (gasEstimate * 110n) / 100n;

  return {
    gasLimit,
    gasPrice: adjustedGasPrice
  };
}