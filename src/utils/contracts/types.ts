import type { Address, Hex } from 'viem';

export interface ContractCallParams {
  functionName: string;
  args?: readonly unknown[];
}

export interface EthCallParams {
  to: Address;
  data: Hex;
}

export interface ContractFunction {
  type: 'function';
  name: string;
  inputs: {
    type: string;
    name: string;
  }[];
  outputs: {
    type: string;
    name: string;
  }[];
  stateMutability: string;
}