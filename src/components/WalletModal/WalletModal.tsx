import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWallet } from '../../hooks/useWallet';
import { Modal } from '../ui/Modal';
import { SUPPORTED_WALLETS } from '../../services/wallet';
import { WalletModalProps } from './types';
import { WalletButton } from './WalletButton';

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { connectWallet, getInstalledWallets } = useWallet();

  const handleConnect = async () => {
    try {
      await connectWallet();
      onClose();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDownload = () => {
    window.open(SUPPORTED_WALLETS.metamask.downloadUrl, '_blank');
  };

  const isInstalled = getInstalledWallets().length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('connectWallet')}
    >
      <WalletButton
        icon={SUPPORTED_WALLETS.metamask.icon}
        name={SUPPORTED_WALLETS.metamask.name}
        isInstalled={isInstalled}
        onConnect={handleConnect}
        onDownload={handleDownload}
        connectText={t('connect')}
        installText={t('install')}
      />
    </Modal>
  );
};

export default WalletModal;