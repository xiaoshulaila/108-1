import { useContractRead } from 'wagmi';
import { useLanguage } from '../../contexts/LanguageContext';
import { CONTRACT_CONFIG } from '../../config/contract';
import { ZERO_ADDRESS } from '../../utils/constants';

export function useLuckyRewards() {
  const { t } = useLanguage();
  const { data: winner, isLoading } = useContractRead({
    ...CONTRACT_CONFIG,
    functionName: 'Thepreviousluckywinner',
    watch: true,
  });

  const records = winner && winner !== ZERO_ADDRESS
    ? [{
        recipient: winner as string,
        amount: '1.000 BNB'
      }]
    : [];

  return {
    records,
    isLoading,
    emptyMessage: t('noLuckyRewards')
  };
}