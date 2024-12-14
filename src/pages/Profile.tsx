import React from 'react';
import { User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAccount } from 'wagmi';
import Layout from '../components/Layout';
import { UserInfo } from '../components/profile/UserInfo/UserInfo';
import { ProfileActions } from '../components/profile/ProfileActions/ProfileActions';
import { ReferralCard } from '../components/profile/ReferralCard';
import { BackgroundPattern } from '../components/ui/BackgroundPattern';
import { useWallet } from '../hooks/useWallet';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const { isConnected } = useAccount();
  const { connect } = useWallet();

  const renderContent = () => {
    if (!isConnected) {
      return (
        <BackgroundPattern className="bg-binance-gray rounded-lg p-8 text-center">
          <p className="text-binance-text mb-6">{t('pleaseConnect')}</p>
          <button
            onClick={connect}
            className="inline-flex items-center gap-2 bg-binance-yellow text-black px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg font-medium"
          >
            <User size={24} />
            {t('connectWallet')}
          </button>
        </BackgroundPattern>
      );
    }

    return (
      <>
        <UserInfo />
        <ReferralCard />
        <ProfileActions />
      </>
    );
  };

  return (
    <Layout title={t('profile')} icon={<User className="text-binance-yellow" />}>
      <div className="p-4 max-w-screen-xl mx-auto space-y-6 pb-20">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default Profile;