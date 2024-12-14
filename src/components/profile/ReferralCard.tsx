import React from 'react';
import { BackgroundPattern } from '../ui/BackgroundPattern';
import ReferralLink from '../ReferralLink';

export const ReferralCard: React.FC = () => {
  return (
    <BackgroundPattern className="bg-binance-gray rounded-lg p-6">
      <ReferralLink />
    </BackgroundPattern>
  );
};