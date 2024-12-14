import { useContractReads } from 'wagmi';
import { useLanguage } from '../../contexts/LanguageContext';
import { CONTRACT_CONFIG } from '../../config/contract';
import { formatEther } from 'viem';
import type { RewardData } from '../../types/rewards';
import { ZERO_ADDRESS } from '../../utils/constants';

export function usePromotionRewards(): RewardData {
  const { t } = useLanguage();
  const contracts = Array.from({ length: 10 }, (_, i) => ({
    ...CONTRACT_CONFIG,
    functionName: 'rewardDistributionHistory',
    args: [BigInt(i)]
  }));

  const { data, isLoading } = useContractReads({
    contracts,
    watch: true,
  });

  const records = data
    ?.map(result => {
      if (result.status !== 'success' || !result.result) return null;

      const [recipient, amount] = result.result as [string, bigint];
      
      if (recipient === ZERO_ADDRESS || amount === 0n) {
        return null;
      }

      return {
        recipient,
        amount: `${Number(formatEther(amount)).toFixed(3)} BNB`
      };
    })
    .filter((record): record is NonNullable<typeof record> => record !== null);

  return {
    records: records || [],
    isLoading,
    emptyMessage: t('noPromotionRewards')
  };
}