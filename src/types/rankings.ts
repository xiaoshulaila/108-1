export interface RankingItem {
  address: string;
  reward: string;
  referrals: number;
  rank: number;
}

export interface RankingTableProps {
  data?: RankingItem[];
  isLoading?: boolean;
}