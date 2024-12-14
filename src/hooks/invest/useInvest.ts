import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useNetworkStatus } from '../useNetworkStatus';
import { useReferral } from '../useReferral';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG } from '../../config/contract';

export function useInvest() {
  const { address } = useAccount();
  const { isCorrectNetwork } = useNetworkStatus();
  const { referrer } = useReferral();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pendingHash, setPendingHash] = useState<string | null>(null);

  const invest = async () => {
    if (!address || !isCorrectNetwork || !window.ethereum) return;

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    setPendingHash(null);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_CONFIG.address,
        CONTRACT_CONFIG.abi,
        signer
      );

      // 获取gas价格并增加10%
      const gasPrice = await provider.getGasPrice();
      const adjustedGasPrice = gasPrice.mul(110).div(100);

      // 估算gas限制并增加10%
      const gasEstimate = await contract.estimateGas.invest(
        referrer,
        { value: ethers.utils.parseEther('1.08') }
      );
      const gasLimit = gasEstimate.mul(110).div(100);

      // 发送交易
      const tx = await contract.invest(
        referrer,
        {
          value: ethers.utils.parseEther('1.08'),
          gasPrice: adjustedGasPrice,
          gasLimit
        }
      );

      // 更新pending状态
      setPendingHash(tx.hash);

      // 等待交易确认
      await tx.wait();
      
      // 更新成功状态
      setIsSuccess(true);
      setError(null);

    } catch (err: any) {
      // 处理错误
      let message = 'investError';
      
      if (err.code === 4001) {
        message = 'userRejected';
      } else if (err.message?.includes('insufficient funds')) {
        message = 'insufficientFunds';
      } else if (err.message?.includes('inviter has not joined')) {
        message = 'referrerNotJoined';
      }
      
      setError(message);
      setIsSuccess(false);
      console.error('Investment failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    invest,
    isLoading,
    error,
    isSuccess,
    pendingHash
  };
}