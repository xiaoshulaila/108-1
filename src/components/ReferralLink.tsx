import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAccount } from 'wagmi';
import { getReferralLink } from '../utils/referral';
import { copyToClipboard } from '../utils/clipboard';

const ReferralLink: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();
  const { address } = useAccount();

  const referralLink = address ? getReferralLink(address) : t('pleaseConnect');

  const handleCopy = async () => {
    if (!address) return;
    
    try {
      await copyToClipboard(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-binance-text">{t('referralLink')}</span>
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 min-w-0 bg-binance-gray text-binance-text px-4 py-3 rounded-lg cursor-text select-all"
          onClick={(e) => e.currentTarget.select()}
        />
        <button
          onClick={handleCopy}
          disabled={!address}
          className="bg-binance-gray px-4 py-3 rounded-lg hover:bg-opacity-80 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? (
            <Check size={20} className="text-green-500" />
          ) : (
            <Copy size={20} className="text-binance-yellow" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ReferralLink;