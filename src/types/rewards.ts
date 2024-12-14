export type RewardType = 'promotionRewards' | 'luckyRewards' | 'fomoRewards';

export interface RewardRecord {
  recipient: string;
  amount: string;
}

export interface RewardData {
  records: RewardRecord[];
  isLoading: boolean;
  emptyMessage: string;
}