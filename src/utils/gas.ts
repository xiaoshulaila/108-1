import { type PublicClient, type Address } from 'viem';

interface GasSettingsParams {
  publicClient: PublicClient;
  address: Address;
  abi: any[];
  functionName: string;
  args: any[];
  value: bigint;
  account: Address;
}

export async function getGasSettings({
  publicClient,
  address,
  abi,
  functionName,
  args,
  value,
  account
}: GasSettingsParams) {
  try {
    // Simulate transaction first to validate
    await publicClient.simulateContract({
      address,
      abi,
      functionName,
      args,
      value,
      account,
    });

    // Get current gas price
    const gasPrice = await publicClient.getGasPrice();
    const adjustedGasPrice = (gasPrice * 110n) / 100n; // Add 10%

    // Get gas estimate
    const gasEstimate = await publicClient.estimateContractGas({
      address,
      abi,
      functionName,
      args,
      value,
      account,
    });
    const gasLimit = (gasEstimate * 110n) / 100n; // Add 10%

    return {
      gasLimit,
      gasPrice: adjustedGasPrice
    };
  } catch (error: any) {
    // If simulation fails, throw with better error message
    if (error.cause?.reason) {
      throw new Error(`Transaction would fail: ${error.cause.reason}`);
    }
    throw error;
  }
}