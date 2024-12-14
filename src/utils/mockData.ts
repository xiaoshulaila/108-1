import { RankingData } from '../types/rankings';

export const generateRandomAddress = () => {
  return `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 10)}`;
};

export const generateMockRankings = (count: number = 10): RankingData[] => {
  return Array.from({ length: count }, (_, i) => ({
    rank: i + 1,
    address: generateRandomAddress(),
    reward: (Math.random() * 10).toFixed(2),
    referrals: Math.floor(Math.random() * 100)
  }));
};