import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useWallet } from '../../../hooks/useWallet';
import { useUserInfo } from '../../../hooks/useUserInfo';
import { useEthersPartner } from '../../../hooks/useEthersPartner';
import { useAccount } from 'wagmi';

export const ProfileActions: React.FC = () => {
  const { t } = useLanguage();
  const { disconnect } = useWallet();
  const { address } = useAccount();
  const { userInfo } = useUserInfo(address);
  const { upgrade, isLoading, error, isSuccess } = useEthersPartner();

  return (
    <div className="space-y-4">
      {userInfo.hasJoined && !userInfo.isPartner && (
        <>
          <button
            onClick={upgrade}
            disabled={isLoading}
            className="w-full bg-binance-yellow text-black font-medium py-3 rounded-lg hover:bg-binance-yellow/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t('processing') : t('upgradePartner')}
          </button>

          {error && (
            <p className="text-center text-red-500">
              {t(error)}
            </p>
          )}

          {isSuccess && (
            <p className="text-center text-green-500">
              {t('upgradeSuccess')}
            </p>
          )}
        </>
      )}
      
      <button
        onClick={disconnect}
        className="w-full bg-binance-gray text-white font-medium py-3 rounded-lg hover:bg-opacity-80 transition-colors"
      >
        {t('logout')}
      </button>
    </div>
  );
};