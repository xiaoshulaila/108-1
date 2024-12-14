import React from 'react';
import type { UserInfoProps } from './types';
import { BackgroundPattern } from '../../ui/BackgroundPattern';

export const UserInfoSkeleton: React.FC<UserInfoProps> = ({ className = '' }) => (
  <BackgroundPattern className={`bg-binance-gray rounded-lg p-6 space-y-4 ${className}`}>
    <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-6 bg-binance-border rounded" />
      ))}
    </div>
  </BackgroundPattern>
);