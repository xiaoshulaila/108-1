import { common } from './base/common';
import { navigation } from './base/navigation';
import { investment } from './base/investment';
import { rewards } from './base/rewards';
import { profile } from './base/profile';
import { rankings } from './base/rankings';

// 合并所有翻译
export const translations = {
  zh: {
    ...common.zh,
    ...navigation.zh,
    ...investment.zh,
    ...rewards.zh,
    ...profile.zh,
    ...rankings.zh
  },
  en: {
    ...common.en,
    ...navigation.en,
    ...investment.en,
    ...rewards.en,
    ...profile.en,
    ...rankings.en
  }
};