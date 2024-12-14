import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { formatAddress } from '../../../utils/address';
import type { UserInfoContentProps } from './types';

export const UserInfoContent: React.FC<UserInfoContentProps> = ({ userInfo, className = '' }) => {
  const { t } = useLanguage();

  const infoItems = [
    { label: t('userNumber'), value: userInfo.userId.toString() },
    { label: t('userRole'), value: userInfo.isPartner ? t('partner') : t('member') },
    { label: t('uplineAddress'), value: formatAddress(userInfo.uplineAddress), isAddress: true },
    { label: t('totalReferrals'), value: userInfo.directReferrals.toString() },
    { label: t('hasExited'), value: userInfo.hasThreeOutOne ? t('yes') : t('no') },
  ];

  return (
    <div className={`bg-binance-gray rounded-lg p-6 space-y-4 ${className}`}>
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