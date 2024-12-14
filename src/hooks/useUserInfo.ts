import { useContractRead } from 'wagmi';
import { CONTRACT_CONFIG } from '../config/contract';
import type { UserInfo } from '../types/user';

export function useUserInfo(address: string | undefined) {
  const { data, isLoading } = useContractRead({
    ...CONTRACT_CONFIG,
    functionName: 'investors',
    args: [address || '0x0000000000000000000000000000000000000000'],
    watch: true,
    enabled: !!address,
  });

  const userInfo: UserInfo = {
    userId: 0,
    isPartner: false,
    uplineAddress: '0x0000000000000000000000000000000000000000',
    directReferrals: 0,
    hasThreeOutOne: false,
    hasJoined: false
  };

  if (data) {
    const [
      addr,
      inviter,
      _partner,
      userId,
      directReferrals,
      isPartner,
      hasThreeOutOne
    ] = data as [string, string, string, bigint, bigint, boolean, boolean];

    // Check if the address has joined by verifying it's not the zero address
    if (addr !== '0x0000000000000000000000000000000000000000') {
      userInfo.hasJoined = true;
      userInfo.userId = Number(userId);
      userInfo.isPartner = isPartner;
      userInfo.uplineAddress = inviter;
      userInfo.directReferrals = Number(directReferrals);
      userInfo.hasThreeOutOne = hasThreeOutOne;
    }
  }

  return {
    userInfo,
    isLoading
  };
}