import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useNetworkStatus } from '../useNetworkStatus';
import { ethers } from 'ethers';
import { usePartnerContract } from './usePartnerContract';
import { handleUpgradeError } from './handleUpgradeError';
import { getUpgradeGasSettings } from './getUpgradeGasSettings';
import type { TransactionState } from '../types/transaction';

export function useUpgradePartner() {
  const { address } = useAccount();
  const { isCorrectNetwork } = useNetworkStatus();
  const contract = usePartnerContract();
  
  const [state, setState] = useState<TransactionState>({
    isLoading: false,
    error: null,
    isSuccess: false,
    hash: null
  });

  const upgrade = async () => {
    if (!address || !isCorrectNetwork || !contract) return;

    setState({ isLoading: true, error: null, isSuccess: false, hash: null });

    try {
      // 获取gas设置
      const { gasPrice, gasLimit } = await getUpgradeGasSettings(contract);

      // 发送升级交易
      const tx = await contract.BuyPartner({
        value: ethers.utils.parseEther('1'), // 修正为0.1 BNB
        gasPrice,
        gasLimit
      });

      // 更新pending状态
      setState(prev => ({ ...prev, hash: tx.hash }));

      // 等待交易确认
      await tx.wait();
      
      // 更新成功状态
      setState(prev => ({ 
        ...prev,
        isSuccess: true,
        isLoading: false 
      }));

    } catch (err: any) {
      // 处理错误
      const errorMessage = handleUpgradeError(err);
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false
      }));
    }
  };

  return {
    upgrade,
    ...state
  };
}