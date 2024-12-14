import { getAddress } from 'viem';

/**
 * Decodes an address from the contract response
 * @param hexString The hex string returned from the contract
 * @returns The decoded address
 */
export function decodeAddress(hexString: string): string {
  try {
    // Remove '0x' prefix if exists and pad to 64 characters
    const cleaned = hexString.replace('0x', '').padStart(64, '0');
    
    // Take the last 40 characters (20 bytes) for the address
    const addressHex = '0x' + cleaned.slice(-40);
    
    // Convert to checksum address
    return getAddress(addressHex);
  } catch (error) {
    console.error('Error decoding address:', error);
    return '0x0000000000000000000000000000000000000000';
  }
}

/**
 * Encodes function data for contract calls
 */
export function encodeFunctionData(params: {
  abi: any[];
  functionName: string;
  args: any[];
}): string {
  const { abi, functionName, args } = params;
  
  // Find the function in the ABI
  const func = abi.find(
    (item) => item.type === 'function' && item.name === functionName
  );
  
  if (!func) {
    throw new Error(`Function ${functionName} not found in ABI`);
  }

  // Create the function signature
  const signature = `${functionName}(${func.inputs.map((input: any) => input.type).join(',')})`;
  
  // Get the function selector (first 4 bytes of the hash)
  const selector = window.ethereum!.request({
    method: 'eth_call',
    params: [{
      data: signature
    }, 'latest']
  }).slice(0, 10);

  // Encode the arguments
  const encodedArgs = args.map((arg, index) => {
    const type = func.inputs[index].type;
    if (type === 'address') {
      return arg.toLowerCase().padStart(64, '0');
    } else if (type === 'uint256') {
      return BigInt(arg).toString(16).padStart(64, '0');
    }
    return arg;
  }).join('');

  return selector + encodedArgs;
}