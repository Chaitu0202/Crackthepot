export type PotId = 'venna' | 'uyyala';

export interface PotConfig {
  id: PotId;
  name: string;
  teluguName: string;
  tierName: string;
  price: number;
  rewardHint: string;
  accentColor: string;
  secondaryColor: string;
  description: string;
  features: string[];
  grandDrawMultiplier: number;
  popular?: boolean;
}

export interface PrizeResult {
  id: string;
  title: string;
  teluguTitle: string;
  potType: PotId;
  category: 'discount' | 'hamper' | 'cashback' | 'grand_entry';
  discountText: string;
  voucherCode: string;
  description: string;
  grandDrawTickets: number;
  ticketNumbers: string[];
  rarity: 'Common' | 'Rare' | 'Divine Grand';
  claimExpiry: string;
}

export interface ReferralFriend {
  id: string;
  name: string;
  avatarColor: string;
  boostAdded: number;
  timeAgo: string;
}

export interface PotCrackerWinner {
  id: string;
  name: string;
  city: string;
  potType: PotId;
  prizeTitle: string;
  prizeTier: '₹1,000 Grand' | '₹500 Tier' | '₹200 Tier' | '₹100 Tier' | 'Festive Hamper';
  ticketId: string;
  timeAgo: string;
  avatarBg: string;
}

export interface DevoteeProfile {
  name: string;
  city: string;
  phone: string;
  potType: PotId;
  registeredAt?: string;
  customPotName?: string;
}

