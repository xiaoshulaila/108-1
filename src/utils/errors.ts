import { type Hash } from 'viem';

interface InvestError extends Error {
  code?: number;
  cause?: {
    reason?: string;
    shortMessage?: string;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function handleInvestError(error: InvestError): void {
  // User rejected transaction
  if (error.code === 4001) {
    console.log('Transaction rejected by user');
    return;
  }

  // Contract revert errors
  const revertReason = 
    error.cause?.reason || 
    error.cause?.shortMessage || 
    error.cause?.data?.message ||
    error.message;

  if (revertReason) {
    if (revertReason.includes('inviter has not joined')) {
      console.error('Investment failed: The referrer has not joined the system');
      return;
    }
    if (revertReason.includes('insufficient funds')) {
      console.error('Investment failed: Insufficient funds');
      return;
    }
    if (revertReason.includes('gas required exceeds allowance')) {
      console.error('Investment failed: Gas price too high');
      return;
    }
  }

  // Log other errors with full context
  console.error('Investment failed:', {
    code: error.code,
    message: error.message,
    cause: error.cause,
    fullError: error
  });
}