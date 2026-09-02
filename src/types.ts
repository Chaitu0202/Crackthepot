export type PotId = 'venna' | 'uyyala';

export interface PotTier {
  id: PotId;
  name: string;
  nameTelugu: string;
  badge: string;
  description: string;
  descriptionTelugu: string;
  drawEntries: number;
  perks: string[];
  color: string;
  accentColor: string;
  isPopular?: boolean;
}

export interface DevoteeProfile {
  name: string;
  phone: string;
  city: string;
  selectedPot: PotId;
  referralCode: string;
  referralCount: number;
  claimedReward?: InstantReward;
  tickets: string[];
  registeredAt: string;
}

export interface InstantReward {
  id: string;
  code: string;
  title: string;
  titleTelugu: string;
  category: 'discount' | 'cashback' | 'hamper' | 'sweets';
  value: string;
  brand: string;
  expiryDays: number;
  description: string;
}

export interface PotCrackerWinner {
  id: string;
  name: string;
  city: string;
  potType: PotId;
  prizeTitle: string;
  prizeTier: '₹1,000 Grand' | '₹500 Tier' | '₹200 Tier' | '₹100 Tier';
  ticketId: string;
  timeAgo: string;
  avatarBg: string;
}

export interface ReferralMilestone {
  friendsNeeded: number;
  rewardTitle: string;
  rewardTelugu: string;
  bonusTickets: number;
  unlocked: boolean;
}

export const POT_TIERS: Record<PotId, PotTier> = {
  venna: {
    id: 'venna',
    name: 'Venna Kunda (వెన్న కుండ)',
    nameTelugu: 'వెన్న కుండ',
    badge: 'Auspicious Casual Pot',
    description: 'Crisp terracotta filled with fresh festive Makhan, butter cookies & lucky draw entry.',
    descriptionTelugu: 'శ్రీకృష్ణుడి వెన్న కుండ &bull; తక్షణ గిఫ్ట్ వోచర్లు & లక్కీ డ్రా ఎంట్రీ',
    drawEntries: 1,
    perks: [
      '5% – 15% Festive Sweet & Grocery Discount',
      'Free Shipping Coupon + A2 Cow Ghee Sweets Trial',
      '1x Grand Prize Cash Draw Ticket (180 Total Winners)',
      'Instant ₹50 Shopping Cashback Voucher Drop Rate',
    ],
    color: '#E8B923',
    accentColor: '#1B7A6E',
  },
  uyyala: {
    id: 'uyyala',
    name: 'Uyyala Kunda (ఉయ్యాల కుండ)',
    nameTelugu: 'ఉయ్యాల కుండ',
    badge: 'Royal Devotee Pot • High Odds',
    description: 'Swinging silk-rope matka packed with royal sweets, silver keepsakes & 3x grand tickets.',
    descriptionTelugu: 'ఉయ్యాల కుండ &bull; 3 రెట్లు లక్కీ డ్రా ఎంట్రీలు & గరిష్ట రివార్డులు',
    drawEntries: 3,
    perks: [
      '25% – 50% Off Luxury Janmashtami Pooja Hamper',
      '₹150 – ₹250 Direct Wallet / Cashback Voucher',
      '3x Grand Prize Draw Entries (Tripled Winner Probability)',
      '1-in-100 Rare Pure Silver Idol / Gold Coin Drop Pass',
    ],
    color: '#C6296F',
    accentColor: '#E8B923',
    isPopular: true,
  },
};

export const SAMPLE_REWARDS: Record<PotId, InstantReward[]> = {
  venna: [
    {
      id: 'rw-v-1',
      code: 'KRISHNA15',
      title: '15% Off Organic Festive Sweets',
      titleTelugu: '15% తీపి వంటకాల డిస్కౌంట్',
      category: 'discount',
      value: '15% OFF',
      brand: 'Pulla Reddy Sweets',
      expiryDays: 30,
      description: 'Applicable on all traditional Kaju Katli, Mysore Pak, and Dry Fruit Laddu boxes.',
    },
    {
      id: 'rw-v-2',
      code: 'GHEEPACK',
      title: 'Free 200g A2 Bilona Cow Ghee',
      titleTelugu: 'ఉచిత దేశీ ఆవు నెయ్యి ప్యాక్',
      category: 'sweets',
      value: 'FREE GIFT',
      brand: 'Sri Krishna Dairy',
      expiryDays: 30,
      description: 'Zero shipping fee with free 200g authentic Bilona Ghee on minimum cart ₹299.',
    },
    {
      id: 'rw-v-3',
      code: 'CASH50',
      title: '₹50 Instant Festive Wallet Cash',
      titleTelugu: '₹50 తక్షణ క్యాష్‌బ్యాక్',
      category: 'cashback',
      value: '₹50 CASH',
      brand: 'Festive Partner Stores',
      expiryDays: 45,
      description: 'Direct cashback credit on your next pooja decoration or grocery order.',
    },
  ],
  uyyala: [
    {
      id: 'rw-u-1',
      code: 'ROYAL50',
      title: '50% Off Royal Janmashtami Gift Hamper',
      titleTelugu: '50% రాయల్ గిఫ్ట్ హ్యాంపర్ డిస్కౌంట్',
      category: 'hamper',
      value: '50% OFF',
      brand: 'Vrindavan Heritage Treasures',
      expiryDays: 30,
      description: 'Luxury handcrafted brass peacock diya, dry fruit assortment, and silver plated flute coin.',
    },
    {
      id: 'rw-u-2',
      code: 'CASH250',
      title: '₹250 Direct Shopping Cashback',
      titleTelugu: '₹250 తక్షణ క్యాష్‌బ్యాక్ క్రెడిట్',
      category: 'cashback',
      value: '₹250 CASH',
      brand: 'Janmashtami Mega Mart',
      expiryDays: 60,
      description: 'Flat ₹250 deduction on ethnic wear, pooja idols, and festive sweets orders.',
    },
    {
      id: 'rw-u-3',
      code: 'SILVERGIFT',
      title: 'Free Handcrafted Pure Silver Idol',
      titleTelugu: 'ఉచిత వెండి శ్రీకృష్ణ విగ్రహం',
      category: 'hamper',
      value: 'SILVER GIFT',
      brand: 'Balaji Devotional Silvers',
      expiryDays: 30,
      description: 'Special 10g consecrated silver Krishna idol delivered to your doorstep.',
    },
  ],
};
