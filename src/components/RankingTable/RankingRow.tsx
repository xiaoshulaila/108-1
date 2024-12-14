import React from 'react';
import { formatAddress } from '../../utils/address';
import type { RankingItem } from '../../types/rankings';

interface RankingRowProps {
  data: RankingItem;
}

const RankingRow: React.FC<RankingRowProps> = ({ data }) => {
  const { rank, address, reward, referrals } = data;
  
  return (
    <tr className="border-b border-binance-border last:border-0 hover:bg-binance-gray/50 transition-colors">
      <td className="p-3">
        <span className={`${rank <= 3 ? 'text-binance-yellow font-bold' : ''}`}>
          {rank}
        </span>
      </td>
      <td className="p-3 font-mono text-sm">
        {formatAddress(address)}
      </td>
      <td className="p-3 text-right text-binance-yellow">
        {reward}
      </td>
      <td className="p-3 text-right">
        {referrals}
      </td>
    </tr>
  );
};

export default RankingRow;