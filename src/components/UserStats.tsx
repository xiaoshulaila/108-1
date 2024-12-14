import React from 'react';

interface UserStatsProps {
  userNumber: string;
  exitNumber: string;
  weeklyReferrals: number;
  totalReferrals: number;
}

const UserStats: React.FC<UserStatsProps> = ({
  userNumber,
  exitNumber,
  weeklyReferrals,
  totalReferrals,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      <div className="space-y-1">
        <div className="text-binance-text">累计用户</div>
        <div className="text-xl font-semibold">{userNumber}</div>
      </div>
      <div className="space-y-1">
        <div className="text-binance-text">出局编号</div>
        <div className="text-xl font-semibold">{exitNumber}</div>
      </div>
      <div className="space-y-1">
        <div className="text-binance-text">本周推广</div>
        <div className="text-xl font-semibold">{weeklyReferrals}</div>
      </div>
      <div className="space-y-1">
        <div className="text-binance-text">累计推广</div>
        <div className="text-xl font-semibold">{totalReferrals}</div>
      </div>
    </div>
  );
};

export default UserStats;