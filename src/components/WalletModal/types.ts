export interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface WalletButtonProps {
  icon: string;
  name: string;
  isInstalled: boolean;
  onConnect: () => void;
  onDownload: () => void;
  connectText: string;
  installText: string;
}