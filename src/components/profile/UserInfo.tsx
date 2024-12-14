import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAccount } from 'wagmi';
import { useUserInfo } from '../../hooks/useUserInfo';
import { formatAddress } from '../../utils/address';

const UserInfo: React.FC = () => {
  const { t } = useLanguage();
  const { address } = useAccount();
  const { userInfo, isLoading } = useUserInfo(address);

  if (!address) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-binance-gray rounded-lg p-6 space-y-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 bg-binance-border rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!userInfo.userId) {
    return (
      <div className="bg-binance-gray rounded-lg p-6">
        <p className="text-center text-binance-text">
          {t('notJoined')}
        </p>
      </div>
    );
  }

  const infoItems = [
    { label: t('userNumber'), value: userInfo.userId.toString() },
    { label: t('userRole'), value: userInfo.isPartner ? t('partner') : t('member') },
    { label: t('uplineAddress'), value: formatAddress(userInfo.uplineAddress), isAddress: true },
    { label: t('totalReferrals'), value: userInfo.directReferrals.toString() },
    { label: t('hasExited'), value: userInfo.hasThreeOutOne ? t('yes') : t('no') },
  ];

  return (
    <div className="bg-binance-gray rounded-lg p-6 space-y-4">
      {infoItems.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-binance-text">{item.label}</span>
          <span className={item.isAddress ? 'font-mono text-sm' : ''}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};