import { Language } from '../contexts/LanguageContext';

export interface FAQItem {
  key: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  isLong?: boolean;
}

export const faqData: FAQItem[] = [
  {
    key: 'whatIsDream',
    title: {
      zh: '什么是Dream108？',
      en: 'What is Dream108?'
    },
    content: {
      zh: 'Dream108是一个基于区块链技术的去中心化游戏平台，结合了FOMO3D游戏机制和推广奖励系统。',
      en: 'Dream108 is a decentralized gaming platform based on blockchain technology, combining FOMO3D game mechanics with a promotional reward system.'
    }
  },
  {
    key: 'howToPlay',
    title: {
      zh: '如何参与游戏？',
      en: 'How to Play?'
    },
    content: {
      zh: '首先需要连接钱包，然后点击"立即加入"按钮购买密钥即可参与。每次购买都会延长倒计时，最后一个购买者将获得大奖。',
      en: 'First, connect your wallet, then click the "Join Now" button to purchase keys. Each purchase extends the countdown, and the last buyer wins the grand prize.'
    }
  },
  {
    key: 'whatIsPartner',
    title: {
      zh: '什么是合伙人？',
      en: 'What is a Partner?'
    },
    content: {
      zh: '合伙人是平台的高级会员身份，可以获得更高的推广奖励比例和专属特权。可以通过升级获得合伙人身份。',
      en: 'Partners are premium members who receive higher promotional rewards and exclusive privileges. Partner status can be obtained through an upgrade.'
    }
  },
  {
    key: 'howRewardsWork',
    title: {
      zh: '奖励机制是什么？',
      en: 'How do Rewards Work?'
    },
    content: {
      zh: '平台的奖励包括：FOMO奖池奖励、推广奖励、幸运奖池奖励等多种形式，具体分配比例请查看游戏规则。',
      en: 'Platform rewards include: FOMO pool rewards, promotional rewards, lucky pool rewards, and more. Check the game rules for specific distribution ratios.'
    }
  },
  {
    key: 'gameRules',
    title: {
      zh: '游戏规则详解',
      en: 'Game Rules Explained'
    },
    content: {
      zh: `Dream108采用创新的FOMO（Fear of Missing Out）机制，结合了多重奖励系统：

1. 倒计时机制：
   - 每次有用户购买密钥时，倒计时会增加
   - 倒计时结束时，最后购买者获得奖池奖励

2. 多重奖池设置：
   - FOMO主奖池：由密钥购买产生
   - 幸运奖池：随机派发给参与者
   - 推广奖池：奖励积极推广的用户

3. 合伙人制度：
   - 特殊权益和更高收益
   - 专属推广奖励比例
   - VIP特权服务`,
      en: `Dream108 uses an innovative FOMO (Fear of Missing Out) mechanism combined with multiple reward systems:

1. Countdown Mechanism:
   - Each key purchase extends the countdown
   - Last buyer when countdown ends wins the pool

2. Multiple Prize Pools:
   - FOMO Main Pool: Generated from key purchases
   - Lucky Pool: Random distribution to participants
   - Promotion Pool: Rewards for active promoters

3. Partner System:
   - Special rights and higher earnings
   - Exclusive promotion reward rates
   - VIP privileges`
    },
    isLong: true
  },
  {
    key: 'security',
    title: {
      zh: '安全保障',
      en: 'Security Measures'
    },
    content: {
      zh: `Dream108平台采用多重安全保障机制：

1. 智能合约安全：
   - 经过专业审计机构审计
   - 代码开源透明
   - 自动化执行，不可篡改

2. 资产安全：
   - 去中心化钱包接入
   - 多重签名机制
   - 冷热钱包分离

3. 交易安全：
   - 区块链上实时确认
   - 交易全程可追溯
   - 防重放攻击保护`,
      en: `Dream108 platform implements multiple security measures:

1. Smart Contract Security:
   - Audited by professional firms
   - Open-source code
   - Automated execution, tamper-proof

2. Asset Security:
   - Decentralized wallet integration
   - Multi-signature mechanism
   - Hot/cold wallet separation

3. Transaction Security:
   - Real-time blockchain confirmation
   - Full transaction traceability
   - Replay attack protection`
    },
    isLong: true
  }
];