import { useContractReads } from 'wagmi';
import { useLanguage } from '../../contexts/LanguageContext';
import { CONTRACT_CONFIG } from '../../config/contract';
import { formatEther } from 'viem';
import { ZERO_ADDRESS } from '../../utils/constants';

export function useFomoRewards() {
  const { t } = useLanguage();
  const { data, isLoading } = useContractReads({
    contracts: [
      {
        ...CONTRACT_CONFIG,
        functionName: 'Thepreviousfomowinner',
      },
      {
        ...CONTRACT_CONFIG,
        functionName: 'Thepreviousfomobonus',
      }
    ],
    watch: true,
  });

  const winner = data?.[0].result;
  const bonus = data?.[1].result;

  const records = winner && winner !== ZERO_ADDRESS && bonus
    ? [{
        recipient: winner as string,
        amount: `${Number(formatEther(bonus as bigint)).toFixed(3)} BNB`
      }]
    : [];

  return {
    records,
    isLoading,
    emptyMessage: t('noFomoRewards')
  };
}