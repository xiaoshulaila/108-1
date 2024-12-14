import { useLanguage } from '../../contexts/LanguageContext';
import { InvestError } from '../../types/invest';

export function handleInvestError(error: InvestError): string {
  const { t } = useLanguage();

  // 用户取消交易
  if (error.code === 4001) {
    return t('userRejected');
  }

  // 合约错误
  const revertReason = 
    error.cause?.reason || 
    error.cause?.shortMessage || 
    error.cause?.data?.message ||
    error.message;

  if (revertReason) {
    if (revertReason.includes('inviter has not joined')) {
      return t('referrerNotJoined');
    }
    if (revertReason.includes('insufficient funds')) {
      return t('insufficientFunds');
    }
    if (revertReason.includes('gas required exceeds allowance')) {
      return t('gasFeeTooHigh');
    }
  }

  // 记录未知错误
  console.error('Investment failed:', {
    code: error.code,
    message: error.message,
    cause: error.cause,
    fullError: error
  });

  return t('unknownError');
}