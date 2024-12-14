export function handleInvestError(error: any): string {
  // 用户取消交易
  if (error.code === 4001) {
    return 'userRejected';
  }

  // 合约错误
  const errorMessage = error.message?.toLowerCase() || '';
  
  if (errorMessage.includes('insufficient funds')) {
    return 'insufficientFunds';
  }
  
  if (errorMessage.includes('inviter has not joined')) {
    return 'referrerNotJoined';
  }

  // 记录未知错误
  console.error('投资失败:', error);
  return 'investError';
}