import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWallet } from '../../hooks/useWallet';

const ProfileActions: React.FC = () => {
  const { t } = useLanguage();
  const { disconnect } = useWallet();

  const handleUpgradePartnership = () => {
    console.log('Upgrading partnership...');
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleUpgradePartnership}
        className="w-full bg-binance-yellow text-black font-medium py-3 rounded-lg hover:bg-binance-yellow/90 transition-colors"
      >
        {t('upgradePartner')}
      </button>
      
      <button
        onClick={disconnect}
        className="w-full bg-binance-gray text-white font-medium py-3 rounded-lg hover:bg-opacity-80 transition-colors"
      >
        {t('logout')}
      </button>
    </div>
  );
};

export default ProfileActions;