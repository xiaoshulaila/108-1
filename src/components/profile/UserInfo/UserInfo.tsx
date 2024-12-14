import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAccount } from 'wagmi';
import { useUserInfo } from '../../../hooks/useUserInfo';
import { formatAddress } from '../../../utils/address';
import { UserInfoSkeleton } from './UserInfoSkeleton';
import { HelpCircle } from 'lucide-react';
import { BackgroundPattern } from '../../ui/BackgroundPattern';

export const UserInfo: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { userInfo, isLoading } = useUserInfo(address);

  if (!isConnected || !address) {
    return null;
  }

  if (isLoading) {
    return <UserInfoSkeleton />;
  }

  if (!userInfo.hasJoined) {
    return (
      <BackgroundPattern className="bg-binance-gray rounded-lg p-6 space-y-6">
        <p className="text-center text-binance-text">
          {t('notJoined')}
        </p>
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-binance-yellow text-black font-medium py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            {t('joinNow')}
          </button>
          <button
            onClick={() => navigate('/faq')}
            className="flex items-center gap-2 px-6 bg-binance-gray text-white font-medium py-3 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            <HelpCircle size={20} />
            <span className="text-center">{t('gameRules')}</span>
          </button>
        </div>
      </BackgroundPattern>
    );
  }

  const infoItems = [
    { label: t('userNumber'), value: userInfo.userId.toString() },
    { 
      label: t('userRole'), 
      value: userInfo.isPartner ? t('partner') : t('member'),
      highlight: userInfo.isPartner
    },
    { label: t('uplineAddress'), value: formatAddress(userInfo.uplineAddress), isAddress: true },
    { label: t('referrals'), value: userInfo.directReferrals.toString() },
    { label: t('hasExited'), value: userInfo.hasThreeOutOne ? t('yes') : t('no') },
  ];

  return (
    <BackgroundPattern className="bg-binance-gray rounded-lg p-6">
      <div className="space-y-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-binance-text">{item.label}</span>
            <span className={`
              ${item.isAddress ? 'font-mono text-sm' : ''}
              ${item.highlight ? 'text-binance-yellow font-semibold' : ''}
            `}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </BackgroundPattern>
  );
};