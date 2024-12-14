import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 bg-binance-gray px-2 py-1.5 rounded-lg hover:bg-opacity-80 transition-colors min-w-[48px] justify-center text-sm"
    >
      <Globe size={14} className="text-binance-yellow" />
      <span>{language === 'zh' ? '中' : 'EN'}</span>
    </button>
  );
};