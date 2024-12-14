export function handleUpgradeError(error: any): string {
  // 用户取消交易
  if (error.code === 4001) {
    return 'userRejected';
  }

  // 合约错误
  const errorMessage = error.message?.toLowerCase() || '';
  
  if (errorMessage.includes('insufficient funds')) {
    return 'insufficientFunds';
  }

  if (errorMessage.includes('incorrect investment amount')) {
    return 'incorrectAmount';
  }

  // 记录未知错误
  console.error('升级失败:', error);
  return 'upgradeError';
}