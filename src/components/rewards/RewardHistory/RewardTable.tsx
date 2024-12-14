import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { formatAddress } from '../../../utils/address';
import { RewardTableProps } from './types';

export const RewardTable: React.FC<RewardTableProps> = ({ records, emptyMessage }) => {
  const { t } = useLanguage();

  if (records.length === 0) {
    return (
      <div className="bg-binance-gray rounded-lg p-8 text-center text-binance-text">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="bg-binance-gray rounded-lg overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-binance-border">
            <th className="text-left p-4 text-binance-text whitespace-nowrap">{t('address')}</th>
            <th className="text-right p-4 text-binance-text whitespace-nowrap">{t('reward')}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index} className="border-b border-binance-border last:border-0">
              <td className="p-4 font-mono">{formatAddress(record.recipient)}</td>
              <td className="p-4 text-right text-binance-yellow">{record.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};