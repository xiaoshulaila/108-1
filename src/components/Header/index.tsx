import React from 'react';
import Logo from '../Logo';
import WalletButton from './WalletButton';
import LanguageSwitch from './LanguageSwitch';

const Header: React.FC = () => {
  return (
    <div className="bg-[#0C0E12] border-b border-binance-border">
      <header className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <Logo />
        <div className="flex items-center space-x-4">
          <LanguageSwitch />
          <WalletButton />
        </div>
      </header>
    </div>
  );
};

export default Header;