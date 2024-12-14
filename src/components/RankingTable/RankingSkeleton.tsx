import React from 'react';

const RankingSkeleton: React.FC = () => (
  <div className="bg-binance-gray rounded-lg p-6">
    <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-12 bg-binance-border rounded" />
      ))}
    </div>
  </div>
);

export default RankingSkeleton;