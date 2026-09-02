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
  city?: string;
  phone?: string;
  potType: PotId;
  registeredAt?: string;
  customPotName?: string;
  isPaid?: boolean;
  paidAmount?: number;
  paymentTxnId?: string;
  paymentMethod?: string;
  paidAt?: string;
}

export const DAKSHINA_PAYMENT_LINKS = {
  venna: 'https://page.smepay.in/@crackthepot/transaction/zrx5na4', // ₹5
  uyyala: 'https://page.smepay.in/@crackthepot/transaction/qheeu6a', // ₹9
} as const;

export const UPI_CONFIG = {
  vpa: 'crackthepot@sbi',
  merchantName: 'Crack The Pot Utlotsavam',
  notes: {
    venna: 'Venna Kunda Sacred Dakshina',
    uyyala: 'Uyyala Kunda Royal Dakshina',
  },
} as const;

export function getUpiIntentUrl(potId: PotId, customVpa?: string, specificApp?: 'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'generic') {
  const isUyyala = potId === 'uyyala';
  const amount = isUyyala ? 9 : 5;
  const vpa = customVpa || UPI_CONFIG.vpa;
  const name = encodeURIComponent(UPI_CONFIG.merchantName);
  const note = encodeURIComponent(isUyyala ? UPI_CONFIG.notes.uyyala : UPI_CONFIG.notes.venna);
  
  const upiQuery = `pa=${vpa}&pn=${name}&am=${amount}&cu=INR&tn=${note}&mode=02&purpose=00`;

  if (specificApp === 'gpay') {
    return `tez://upi/pay?${upiQuery}`;
  }
  if (specificApp === 'phonepe') {
    return `phonepe://pay?${upiQuery}`;
  }
  if (specificApp === 'paytm') {
    return `paytmmp://pay?${upiQuery}`;
  }
  return `upi://pay?${upiQuery}`;
}

export interface DakshinaConfig {
  merchantUpi: string;
  merchantName: string;
  vaultAlias: string;
  encryptedSealId: string;
}


