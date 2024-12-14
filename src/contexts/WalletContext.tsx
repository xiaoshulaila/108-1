import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { detectWalletProvider } from '../utils/wallet';
import { useLanguage } from './LanguageContext';

interface WalletContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
});

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const checkConnection = async () => {
      const wallet = detectWalletProvider();
      if (wallet?.provider) {
        try {
          const accounts = await wallet.provider.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error('Failed to get accounts:', error);
        }
      }
    };

    checkConnection();

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const connectWallet = async () => {
    const wallet = detectWalletProvider();
    
    if (!wallet) {
      window.open('https://www.okx.com/web3', '_blank');
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await wallet.provider.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error: any) {
      // User rejected request (code 4001) - This is normal behavior, don't show error
      if (error?.code !== 4001) {
        console.error('Wallet connection failed:', error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        connectWallet,
        disconnectWallet,
        isConnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);