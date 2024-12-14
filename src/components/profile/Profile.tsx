import React from 'react';
import { User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAccount } from 'wagmi';
import Layout from '../Layout';
import UserInfo from './UserInfo';
import ProfileActions from './ProfileActions';
import ReferralLink from '../ReferralLink';
import { useWallet } from '../../hooks/useWallet';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const { isConnected } = useAccount();
  const { connect } = useWallet();

  return (
    <Layout title={t('profile')} icon={<User className="text-binance-yellow" />}>
      <div className="p-4 max-w-screen-xl mx-auto space-y-6 pb-20">
        {!isConnected ? (
          <div className="bg-binance-gray rounded-lg p-6 text-center">
            <p className="text-binance-text mb-4">{t('pleaseConnect')}</p>
            <button
              onClick={connect}
              className="inline-flex items-center gap-2 bg-binance-yellow text-black px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors text-lg font-medium"
            >
              <User size={24} />
              {t('connectWallet')}
            </button>
          </div>
        ) : (
          <>
            <UserInfo />
            <div className="bg-binance-gray rounded-lg p-6">
              <ReferralLink />
            </div>
            <ProfileActions />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;