import { RewardType } from '../../../types/rewards';

export interface RewardHistoryProps {
  className?: string;
}

export interface RewardTabProps {
  activeTab: RewardType;
  onTabChange: (tab: RewardType) => void;
}

export interface RewardTableProps {
  records: Array<{
    recipient: string;
    amount: string;
  }>;
  emptyMessage: string;
}