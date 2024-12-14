import { useContractWrite, useContractRead } from '../contracts/hooks';
import { parseEther } from 'viem';
import { useSearchParams } from 'react-router-dom';
import { useAccount } from 'wagmi';

export const useInvestment = () => {
  const [searchParams] = useSearchParams();
  const { address } = useAccount();
  
  // Get referrer from URL or use default
  const referrer = searchParams.get('ref') || address || '0x0000000000000000000000000000000000000000';

  // Read contract states
  const { data: fomoEndTime = 0n } = useContractRead('fomoEndTime');
  const { data: isOpenInvest = false } = useContractRead('isOpeninvest');
  const { data: currentIndex = 0n } = useContractRead('currentIndex');
  const { data: fomoPool = 0n } = useContractRead('fomoPool');

  // Investment function
  const { write, isLoading } = useContractWrite('invest');

  const handleInvest = async () => {
    if (!address) return;
    
    try {
      await write({
        args: [referrer],
        value: parseEther('1.08')
      });
    } catch (error) {
      console.error('Investment failed:', error);
    }
  };

  return {
    handleInvest,
    isLoading,
    fomoEndTime: Number(fomoEndTime),
    isOpenInvest: Boolean(isOpenInvest),
    currentIndex: Number(currentIndex),
    fomoPool: Number(fomoPool) / 1e18, // Convert from wei to ETH
  };
};