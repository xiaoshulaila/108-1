import { type Hash } from 'viem';

export interface InvestError extends Error {
  code?: number;
  cause?: {
    reason?: string;
    shortMessage?: string;
    data?: {
      message?: string;
    };
  };
}

export interface InvestResult {
  hash: Hash;
  wait: () => Promise<void>;
}

export interface GasSettings {
  gasLimit: bigint;
  gasPrice: bigint;
}

export interface InvestParams {
  referrer: string;
  onSuccess?: () => void;
  onError?: (error: InvestError) => void;
  onPending?: (hash: Hash) => void;
}