import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PotConfig, PrizeResult, DevoteeProfile } from '../types';
import { playPotTap, playPotShatter, playCelebrationFanfare } from '../utils/audio';
import { Sparkles, Copy, Check, RotateCcw, Volume2, VolumeX, Gift, Trophy, Flame, Lock, Unlock, UserCheck, Edit3, ChevronRight } from 'lucide-react';
import { PeacockFeatherIcon, FluteMotif, NemaliIcon, WhatsAppIcon, InstagramIcon } from './SvgMotifs';

interface CrackGameEngineProps {
  pots: PotConfig[];
  activePotId: PotConfig['id'];
  onSelectPot: (potId: PotConfig['id']) => void;
  onWinPrize: (prize: PrizeResult) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  devoteeProfile: DevoteeProfile | null;
  onRequestClaim: (potId?: PotConfig['id']) => void;
}

// Exact percentage calculation based on user requirements:
// 1. First 3 taps = 10%
// 2. 30 shares = 20%
// 3. 100 shares = 50%
// 4. 500 shares = 80%
// 5. 1000 shares = 99%
// 6. > 1000 shares = 100% (keep on sharing)
export function getPotProgressState(taps: number, shares: number) {
  if (taps === 0) {
    return {
      percent: 0,
      milestoneTitle: '0% Start',
      hint: 'Tap the sacred pot to begin (3 taps = 10%)',
      isFortified: false,
      isShatterReady: false,
    };
  }

  if (taps === 1) {
    return {
      percent: 3,
      milestoneTitle: '3% (Tap 1 of 3)',
      hint: 'Hairline crack forming! 2 more taps for 10%',
      isFortified: false,
      isShatterReady: false,
    };
  }

  if (taps === 2) {
    return {
      percent: 7,
      milestoneTitle: '7% (Tap 2 of 3)',
      hint: 'Surface fissures spreading! 1 more tap for 10%',
      isFortified: false,
      isShatterReady: false,
    };
  }

  // taps >= 3
  if (shares === 0) {
    return {
      percent: 10,
      milestoneTitle: '10% (3 Taps Reached)',
      hint: 'Terracotta clay is fortified! Share on WhatsApp & Instagram to soften the clay',
      isFortified: true,
      isShatterReady: false,
    };
  }

  if (shares < 30) {
    const p = Math.min(19, Math.round(10 + (shares / 30) * 10));
    return {
      percent: p,
      milestoneTitle: `${p}% (${shares}/30 Shares)`,
      hint: `Reach 30 shares on WhatsApp/Instagram for 20% power! (${30 - shares} shares left)`,
      isFortified: true,
      isShatterReady: false,
    };
  }

  if (shares < 100) {
    const p = Math.min(49, Math.round(20 + ((shares - 30) / 70) * 30));
    return {
      percent: p,
      milestoneTitle: `${p}% (${shares}/100 Shares)`,
      hint: `Reach 100 shares for 50% power! Clay is visibly softening (${100 - shares} shares left)`,
      isFortified: true,
      isShatterReady: false,
    };
  }

  if (shares < 500) {
    const p = Math.min(79, Math.round(50 + ((shares - 100) / 400) * 30));
    return {
      percent: p,
      milestoneTitle: `${p}% (${shares}/500 Shares)`,
      hint: `Reach 500 shares for 80% power! Deep fissures opening (${500 - shares} shares left)`,
      isFortified: true,
      isShatterReady: false,
    };
  }

  if (shares < 1000) {
    const p = Math.min(99, Math.round(80 + ((shares - 500) / 500) * 19));
    return {
      percent: p,
      milestoneTitle: `${p}% (${shares}/1000 Shares)`,
      hint: `Reach 1,000 shares for 99% power! Almost ready to shatter (${1000 - shares} shares left)`,
      isFortified: true,
      isShatterReady: false,
    };
  }

  // shares >= 1000
  return {
    percent: 100,
    milestoneTitle: `100% (${shares} Shares) — UNLOCKED!`,
    hint: `✨ 100% Power unlocked! Tap the pot to shatter & claim your prize! Keep on sharing for extra lucky draw tickets!`,
    isFortified: false,
    isShatterReady: true,
  };
}

export const CrackGameEngine: React.FC<CrackGameEngineProps> = ({
  pots,
  activePotId,
  onSelectPot,
  onWinPrize,
  soundEnabled,
  onToggleSound,
  devoteeProfile,
  onRequestClaim,
}) => {
  const [tapCount, setTapCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);
  const [isCracked, setIsCracked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [prize, setPrize] = useState<PrizeResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [tapFeedbackText, setTapFeedbackText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareFeedback, setShareFeedback] = useState('');

  const activePot = pots.find((p) => p.id === activePotId) || pots[0];
  const isUyyala = activePot.id === 'uyyala';

  const progressState = getPotProgressState(tapCount, sharesCount);

  const resetPot = (newPotId?: PotConfig['id']) => {
    if (newPotId) {
      onSelectPot(newPotId);
    }
    setTapCount(0);
    setSharesCount(0);
    setIsCracked(false);
    setIsShaking(false);
    setPrize(null);
    setCopied(false);
    setTapFeedbackText('');
    setShowShareModal(false);
    setShareFeedback('');
  };

  const triggerConfetti = () => {
    const colors = ['#E8B923', '#1B7A6E', '#C6296F', '#FFFDF7', '#B8860B'];
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors,
      ticks: 240,
    });

    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 65,
        origin: { x: 0.1, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 65,
        origin: { x: 0.9, y: 0.7 },
        colors,
      });
    }, 150);
  };

  const handleShareAction = (platform: 'whatsapp' | 'instagram' | 'copy' | 'boost30' | 'boost100' | 'boost500' | 'boost1000' | 'boost25') => {
    const shareUrl = window.location.href;
    const devoteeName = devoteeProfile?.name ? devoteeProfile.name : 'Devotee';
    const potLabel = isUyyala ? 'Uyyala Kunda (₹9 Royal Matka)' : 'Venna Kunda (₹5 Matka)';
    
    const shareText = `🦚 Shri Krishna Janmashtami Mahotsav! Help ${devoteeName} crack their sacred ${potLabel} to win the ₹1,000 Grand Cash Prize and Divine Sweets! Tap here to claim & crack yours: ${shareUrl} #KrishnaJanmashtami #CrackYourPot`;

    let boostAmount = 10;

    if (platform === 'whatsapp') {
      boostAmount = 15;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
      setShareFeedback(`✅ Directing to WhatsApp! +15 Shares added. Clay is softening!`);
    } else if (platform === 'instagram') {
      boostAmount = 20;
      // Copy festive caption for easy sharing on Instagram Story/DM/Bio
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      window.open('https://www.instagram.com/', '_blank');
      setShareFeedback(`✅ Directing to Instagram & festive caption copied to clipboard! +20 Shares added.`);
    } else if (platform === 'copy') {
      boostAmount = 10;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      setShareFeedback('✅ Link copied to clipboard! Share in your chats.');
    } else if (platform === 'boost30') {
      boostAmount = 30;
      setShareFeedback('✅ 30 Shares Group Broadcast logged! 20% Milestone Reached!');
    } else if (platform === 'boost100') {
      boostAmount = 100;
      setShareFeedback('✅ 100 Shares Squad Blast logged! 50% Milestone Reached!');
    } else if (platform === 'boost500') {
      boostAmount = 500;
      setShareFeedback('✅ 500 Shares Devotee Circle reached! 80% Milestone Reached!');
    } else if (platform === 'boost1000') {
      boostAmount = 1000;
      setShareFeedback('✅ 1,000 Shares Maha Sankirtan reached! 99% - 100% Unlocked!');
    } else if (platform === 'boost25') {
      boostAmount = 25;
      setShareFeedback('✅ +25 Extra Shares logged! Keep on sharing for bonus tickets!');
    }

    const nextShares = sharesCount + boostAmount;
    setSharesCount(nextShares);

    if (nextShares >= 1000) {
      setTapFeedbackText('✨ 100% Power Unlocked! Tap the pot to shatter & claim your prize!');
    }
  };

  const handlePotTap = () => {
    // If devotee has not claimed their pot yet, prompt the lead form
    if (!devoteeProfile) {
      onRequestClaim(activePot.id);
      return;
    }

    if (isCracked) return;

    // First 3 taps: user taps pot to reach 10%
    if (tapCount < 3) {
      const nextTap = tapCount + 1;
      setTapCount(nextTap);
      playPotTap(nextTap, !soundEnabled);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);

      if (nextTap === 1) {
        setTapFeedbackText('✦ Tap 1/3 (3%): Hairline crack forming! Tap 2 more times for 10%');
      } else if (nextTap === 2) {
        setTapFeedbackText('✦ Tap 2/3 (7%): Surface fissures spreading! Tap 1 more time for 10%');
      } else if (nextTap === 3) {
        setTapFeedbackText('🛡️ Tap 3/3 (10% Reached): Pot is heavily fortified! Share on WhatsApp & Instagram to soften the clay!');
        setShowShareModal(true);
      }
      return;
    }

    // Taps >= 3: check if shares reached 1000 (100% power)
    if (sharesCount < 1000) {
      setIsShaking(true);
      playPotTap(3, !soundEnabled);
      setTimeout(() => setIsShaking(false), 300);
      setTapFeedbackText(`🛡️ Earthen pot is fortified at ${progressState.percent}%! Share on WhatsApp & Instagram to reach 100%!`);
      setShowShareModal(true);
      return;
    }

    // Ready to SHATTER at 100%!
    setIsCracked(true);
    playPotShatter(!soundEnabled);
    setTimeout(() => playCelebrationFanfare(!soundEnabled), 200);
    triggerConfetti();

    // Generate randomized prize
    const randomTicketNum = `GPD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    let prizeData: PrizeResult;

    if (isUyyala) {
      const uyyalaPrizes: Omit<PrizeResult, 'ticketNumbers' | 'claimExpiry'>[] = [
        {
          id: 'uyy-1',
          title: '50% Off Divine Janmashtami Sweets & Ghee Hamper',
          teluguTitle: '50% తగ్గింపు పవిత్ర ప్రసాదం హాంపర్',
          potType: 'uyyala',
          category: 'hamper',
          discountText: '50% FLAT OFF',
          voucherCode: 'MAKSHI50',
          description: 'Flat 50% discount on festive sweets, pure A2 cow ghee, and temple prasad box.',
          grandDrawTickets: 3,
          rarity: 'Divine Grand',
        },
        {
          id: 'uyy-2',
          title: '₹250 Instant Cashback + Handcrafted Flute Brooch',
          teluguTitle: '₹250 తక్షణ క్యాష్‌బ్యాక్ + వేణువు బ్రోచ్',
          potType: 'uyyala',
          category: 'cashback',
          discountText: '₹250 CASHBACK',
          voucherCode: 'CASH250GOPAL',
          description: 'Direct wallet cashback + commemorative gold-plated bansuri keepsake.',
          grandDrawTickets: 3,
          rarity: 'Rare',
        },
        {
          id: 'uyy-3',
          title: '40% Off Handwoven Silk & Puja Essentials',
          teluguTitle: '40% తగ్గింపు పూజా వస్త్రాలు & సామాగ్రి',
          potType: 'uyyala',
          category: 'discount',
          discountText: '40% OFF',
          voucherCode: 'RADHA40',
          description: 'Valid on festive apparel, traditional brass diyas, and puja sets.',
          grandDrawTickets: 3,
          rarity: 'Divine Grand',
        },
      ];
      const selected = uyyalaPrizes[Math.floor(Math.random() * uyyalaPrizes.length)];
      const extraTickets = [
        randomTicketNum,
        `GPD-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        `GPD-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      ];
      prizeData = {
        ...selected,
        ticketNumbers: extraTickets,
        claimExpiry: '10th September 2026',
      };
    } else {
      const vennaPrizes: Omit<PrizeResult, 'ticketNumbers' | 'claimExpiry'>[] = [
        {
          id: 'ven-1',
          title: '15% Off Festive Grocery & Sweets',
          teluguTitle: '15% పండుగ స్వీట్లు & సామాగ్రి తగ్గింపు',
          potType: 'venna',
          category: 'discount',
          discountText: '15% OFF',
          voucherCode: 'VENNA15',
          description: 'Valid on all festive collections and sweets across verified stores.',
          grandDrawTickets: 1,
          rarity: 'Common',
        },
        {
          id: 'ven-2',
          title: 'Free Shipping + A2 Ghee Trial Sample',
          teluguTitle: 'ఉచిత డెలివరీ + నెయ్యి శాంపిల్',
          potType: 'venna',
          category: 'hamper',
          discountText: 'FREE SHIPPING',
          voucherCode: 'MAKPREP',
          description: 'Zero delivery charges on all orders plus free dry fruit sample pack.',
          grandDrawTickets: 1,
          rarity: 'Rare',
        },
        {
          id: 'ven-3',
          title: '₹50 Instant Cashback Voucher',
          teluguTitle: '₹50 తక్షణ క్యాష్‌బ్యాక్',
          potType: 'venna',
          category: 'cashback',
          discountText: '₹50 CASHBACK',
          voucherCode: 'KRISHNA50',
          description: 'Instant ₹50 coupon code redeemable on checkout.',
          grandDrawTickets: 1,
          rarity: 'Common',
        },
      ];
      const selected = vennaPrizes[Math.floor(Math.random() * vennaPrizes.length)];
      prizeData = {
        ...selected,
        ticketNumbers: [randomTicketNum],
        claimExpiry: '10th September 2026',
      };
    }

    setPrize(prizeData);
    onWinPrize(prizeData);
  };

  const copyVoucher = () => {
    if (prize) {
      navigator.clipboard.writeText(prize.voucherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      id="crack-interactive-arena"
      className="w-full max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#0E1838] via-[#0A122C] to-[#060B1E] border-2 border-[#E8B923]/40 p-4 sm:p-8 relative shadow-[0_0_60px_rgba(232,185,35,0.15)]"
    >
      {/* Devotee Banner */}
      {devoteeProfile ? (
        <div className="mb-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#1B7A6E]/30 via-[#0B1230] to-[#E8B923]/20 border border-[#E8B923]/50 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1B7A6E] to-[#E8B923] p-0.5 flex items-center justify-center text-[#0B1230] shadow">
              <NemaliIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#F6EEDD]">
                  {devoteeProfile.name}&rsquo;s Sacred Matka
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B7A6E]/40 text-emerald-300 border border-emerald-500/50 font-semibold">
                  ✓ Claimed
                </span>
              </div>
              <p className="text-xs text-[#E8B923]">
                {isUyyala ? 'Uyyala Kunda (₹9 &bull; 3x Draw Entries)' : 'Venna Kunda (₹5 &bull; 1x Draw Entry)'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onRequestClaim(activePot.id)}
            className="px-3 py-1.5 rounded-xl bg-[#14224A] border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#1B7A6E]/30 transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Name</span>
          </button>
        </div>
      ) : (
        <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#C6296F]/20 via-[#0B1230] to-[#E8B923]/20 border border-[#E8B923]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <NemaliIcon className="w-8 h-8 shrink-0 text-[#E8B923]" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-[#F6EEDD] block">
                Submit Devotee Name to Claim Pot
              </span>
              <span className="text-[11px] text-[#E8B923]/80">
                Enter your name to personalize your pot & enter the 180 Pot Crackers Draw!
              </span>
            </div>
          </div>

          <button
            id="btn-claim-pot-banner"
            onClick={() => onRequestClaim(activePot.id)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E8B923] to-[#C6296F] text-[#0B1230] font-bold text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enter Name</span>
          </button>
        </div>
      )}

      {/* Top Header & Pot Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-[#E8B923]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/30 flex items-center justify-center text-[#E8B923]">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F6EEDD]">
              Live Crack Arena &bull;{' '}
              <span className="text-[#E8B923]">
                {isUyyala ? 'Uyyala Kunda (₹9)' : 'Venna Kunda (₹5)'}
              </span>
            </h2>
            <p className="text-xs text-[#F6EEDD]/75">
              3 Taps = 10% &bull; Share on WhatsApp & Instagram to reach 100% and shatter!
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5">
          <div className="bg-[#0B1230] p-1 rounded-xl border border-[#E8B923]/30 flex items-center">
            <button
              id="tab-pot-venna"
              onClick={() => resetPot('venna')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activePotId === 'venna'
                  ? 'bg-[#E8B923] text-[#0B1230] shadow'
                  : 'text-[#F6EEDD]/70 hover:text-white'
              }`}
            >
              Venna (₹5)
            </button>
            <button
              id="tab-pot-uyyala"
              onClick={() => resetPot('uyyala')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activePotId === 'uyyala'
                  ? 'bg-gradient-to-r from-[#C6296F] to-[#E8B923] text-white shadow'
                  : 'text-[#F6EEDD]/70 hover:text-white'
              }`}
            >
              Uyyala (₹9)
            </button>
          </div>

          <button
            id="btn-toggle-sound"
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            className="p-2.5 rounded-xl bg-[#0B1230] border border-[#E8B923]/30 text-[#E8B923] hover:bg-[#14224A] transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* MILESTONE REQUIREMENTS TRACKER */}
      <div className="mt-5 p-4 rounded-2xl bg-[#0B1230]/90 border border-[#E8B923]/30 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-[#E8B923] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Clay Softening & Strike Power: {progressState.percent}%
            </span>
            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
              progressState.isShatterReady
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 animate-pulse'
                : progressState.isFortified
                ? 'bg-[#E8B923]/20 text-[#E8B923] border border-[#E8B923]/40'
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
            }`}>
              {progressState.isShatterReady ? '💥 100% SHATTER READY' : progressState.milestoneTitle}
            </span>
          </div>

          <div className="text-xs text-[#F6EEDD]/80 font-medium">
            Total Shares: <strong className="text-[#E8B923]">{sharesCount}</strong> &bull; Taps: <strong className="text-[#E8B923]">{tapCount}</strong>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3.5 bg-[#080E24] rounded-full border border-[#E8B923]/40 p-0.5 overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              progressState.isShatterReady
                ? 'bg-gradient-to-r from-emerald-500 via-[#E8B923] to-[#FFE27A] shadow-[0_0_15px_rgba(232,185,35,0.8)]'
                : 'bg-gradient-to-r from-[#1B7A6E] via-[#C6296F] to-[#E8B923]'
            }`}
            style={{ width: `${Math.max(progressState.percent, 3)}%` }}
          />
        </div>

        {/* Milestone Steps Bar (3 Taps: 10% | 30s: 20% | 100s: 50% | 500s: 80% | 1000s: 99% | 1000+: 100%) */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-1.5 pt-1 text-[11px]">
          <div className={`p-1.5 rounded-lg border text-center ${
            tapCount >= 3 || sharesCount > 0
              ? 'bg-[#1B7A6E]/30 border-[#1B7A6E] text-emerald-300 font-bold'
              : 'bg-[#080E24] border-[#E8B923]/20 text-[#F6EEDD]/60'
          }`}>
            <span className="block">3 Taps</span>
            <strong className="text-xs">10%</strong>
          </div>

          <div className={`p-1.5 rounded-lg border text-center ${
            sharesCount >= 30
              ? 'bg-[#1B7A6E]/30 border-[#1B7A6E] text-emerald-300 font-bold'
              : 'bg-[#080E24] border-[#E8B923]/20 text-[#F6EEDD]/60'
          }`}>
            <span className="block">30 Shares</span>
            <strong className="text-xs">20%</strong>
          </div>

          <div className={`p-1.5 rounded-lg border text-center ${
            sharesCount >= 100
              ? 'bg-[#1B7A6E]/30 border-[#1B7A6E] text-emerald-300 font-bold'
              : 'bg-[#080E24] border-[#E8B923]/20 text-[#F6EEDD]/60'
          }`}>
            <span className="block">100 Shares</span>
            <strong className="text-xs">50%</strong>
          </div>

          <div className={`p-1.5 rounded-lg border text-center ${
            sharesCount >= 500
              ? 'bg-[#1B7A6E]/30 border-[#1B7A6E] text-emerald-300 font-bold'
              : 'bg-[#080E24] border-[#E8B923]/20 text-[#F6EEDD]/60'
          }`}>
            <span className="block">500 Shares</span>
            <strong className="text-xs">80%</strong>
          </div>

          <div className={`p-1.5 rounded-lg border text-center ${
            sharesCount >= 1000
              ? 'bg-[#1B7A6E]/30 border-[#1B7A6E] text-emerald-300 font-bold'
              : 'bg-[#080E24] border-[#E8B923]/20 text-[#F6EEDD]/60'
          }`}>
            <span className="block">1000 Shares</span>
            <strong className="text-xs">99%</strong>
          </div>

          <div className={`p-1.5 rounded-lg border text-center ${
            sharesCount > 1000 || isCracked
              ? 'bg-gradient-to-r from-[#E8B923]/40 to-[#C6296F]/40 border-[#E8B923] text-[#FFE27A] font-extrabold shadow'
              : 'bg-[#080E24] border-[#E8B923]/20 text-[#F6EEDD]/60'
          }`}>
            <span className="block">Keep Sharing</span>
            <strong className="text-xs">100% 💥</strong>
          </div>
        </div>

        {/* Primary WhatsApp & Instagram Direct Share Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-xs text-[#F6EEDD]/80">
            {progressState.hint}
          </p>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* WhatsApp Share Button */}
            <button
              id="btn-arena-share-whatsapp"
              onClick={() => handleShareAction('whatsapp')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0B1230] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-[#25D366]/30 active:scale-95 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#0B1230]" />
              <span>Share on WhatsApp</span>
            </button>

            {/* Instagram Share Button */}
            <button
              id="btn-arena-share-instagram"
              onClick={() => handleShareAction('instagram')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <InstagramIcon className="w-4 h-4 text-white" />
              <span>Share on Instagram</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative py-8 flex flex-col items-center justify-center min-h-[360px]">
        {!isCracked ? (
          <div className="relative flex flex-col items-center">
            {/* Devotee Name Plate on Pot */}
            {devoteeProfile && (
              <div className="mb-3 px-4 py-1.5 rounded-full bg-[#080E24] border border-[#E8B923]/60 text-[#E8B923] text-xs sm:text-sm font-bold tracking-wider shadow-lg flex items-center gap-2">
                <NemaliIcon className="w-4 h-4" />
                <span>{devoteeProfile.name}&rsquo;s Sacred Pot</span>
              </div>
            )}

            {/* Interactive Clickable Pot */}
            <div
              id="interactive-clay-pot"
              onClick={handlePotTap}
              className={`relative cursor-pointer select-none transition-transform active:scale-95 group ${
                isShaking ? 'animate-pot-hit' : ''
              }`}
            >
              {/* Outer Golden Aura Pulsing */}
              <div
                className={`absolute -inset-4 rounded-full blur-xl pointer-events-none transition-opacity duration-300 ${
                  progressState.isShatterReady
                    ? 'bg-[#E8B923]/60 opacity-100 animate-pulse'
                    : progressState.percent >= 50
                    ? 'bg-[#E8B923]/35 opacity-80'
                    : 'bg-[#E8B923]/20 opacity-50 group-hover:opacity-80'
                }`}
              />

              {/* Pot Graphic with layered crack paths & butter drips */}
              <div className="relative w-56 h-60 sm:w-64 sm:h-68 preserve-3d">
                <svg
                  viewBox="0 0 200 220"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
                >
                  <defs>
                    <radialGradient id="arenaPotGrad" cx="35%" cy="35%" r="70%">
                      <stop offset="0%" stopColor={isUyyala ? '#C85A32' : '#D46A42'} />
                      <stop offset="60%" stopColor={isUyyala ? '#782813' : '#8F3B1E'} />
                      <stop offset="100%" stopColor="#381308" />
                    </radialGradient>
                    <linearGradient id="arenaGoldTrim" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#F6EEDD" />
                      <stop offset="50%" stopColor="#E8B923" />
                      <stop offset="100%" stopColor="#B8860B" />
                    </linearGradient>
                  </defs>

                  {/* Hanging Strings for Uyyala Pot */}
                  {isUyyala && (
                    <g opacity="0.9">
                      <path d="M 30,0 L 65,55" stroke="var(--gold)" strokeWidth="2" strokeDasharray="4 2" />
                      <path d="M 170,0 L 135,55" stroke="var(--gold)" strokeWidth="2" strokeDasharray="4 2" />
                      <path d="M 100,0 L 100,50" stroke="var(--gold)" strokeWidth="2" strokeDasharray="4 2" />
                      <circle cx="65" cy="55" r="4.5" fill="var(--gold)" />
                      <circle cx="135" cy="55" r="4.5" fill="var(--gold)" />
                      <circle cx="100" cy="50" r="4.5" fill="var(--rani-pink)" />
                    </g>
                  )}

                  {/* Pot Belly */}
                  <ellipse
                    cx="100"
                    cy="135"
                    rx="68"
                    ry="65"
                    fill="url(#arenaPotGrad)"
                    stroke={isUyyala ? '#C6296F' : '#E8B923'}
                    strokeWidth={isUyyala ? '2.5' : '2'}
                  />

                  {/* Pot Neck */}
                  <path
                    d="M 68,75 C 66,95 72,100 80,105 L 120,105 C 128,100 134,95 132,75 Z"
                    fill="url(#arenaPotGrad)"
                    stroke={isUyyala ? '#C6296F' : '#E8B923'}
                    strokeWidth="1.5"
                  />

                  {/* Pot Rim */}
                  <ellipse
                    cx="100"
                    cy="70"
                    rx="36"
                    ry="12"
                    fill="url(#arenaGoldTrim)"
                    stroke="#4A180A"
                    strokeWidth="1"
                  />

                  {/* Fresh Curd / Makkhan Overflow */}
                  <path
                    d="M 70,70 C 70,58 130,58 130,70 C 130,82 122,86 114,86 C 106,86 106,78 100,78 C 94,78 94,88 84,88 C 76,88 70,82 70,70 Z"
                    fill="#FFFDF7"
                  />

                  {/* Ornamentation */}
                  {isUyyala ? (
                    <g>
                      <path d="M 36,132 Q 100,152 164,132" stroke="var(--gold)" strokeWidth="3" fill="none" />
                      <path d="M 40,140 Q 100,160 160,140" stroke="var(--peacock)" strokeWidth="2" fill="none" />
                      <circle cx="100" cy="148" r="14" fill="#1B7A6E" stroke="var(--gold)" strokeWidth="1.5" />
                      <circle cx="100" cy="148" r="7" fill="var(--rani-pink)" />
                      <circle cx="100" cy="148" r="3" fill="var(--gold)" />
                    </g>
                  ) : (
                    <g>
                      <path d="M 38,134 Q 100,154 162,134" stroke="var(--gold)" strokeWidth="2.5" fill="none" />
                      <circle cx="100" cy="144" r="9" fill="var(--gold)" opacity="0.9" />
                      <circle cx="100" cy="144" r="5" fill="#8F3B1E" />
                    </g>
                  )}

                  {/* Stage 1: Tap 1 - 3% crack */}
                  {(tapCount >= 1 || progressState.percent >= 3) && (
                    <g stroke="#FFFDF7" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
                      <path d="M 90,85 L 96,105 L 92,120 L 102,138" />
                    </g>
                  )}

                  {/* Stage 2: Tap 2 / 20% (30 shares) */}
                  {(tapCount >= 2 || progressState.percent >= 20) && (
                    <g stroke="#FFE899" strokeWidth="1.8" strokeLinecap="round" opacity="0.95">
                      <path d="M 96,105 L 120,118 L 132,135 L 140,150" />
                      <path d="M 92,120 L 74,136 L 62,148" />
                      <path d="M 102,138 L 108,162 L 98,180" />
                    </g>
                  )}

                  {/* Stage 3: 50% (100 shares) Gaps & Butter Drips */}
                  {progressState.percent >= 50 && (
                    <g>
                      <path
                        d="M 90,85 L 96,105 L 120,118 L 132,135 L 140,150 L 136,152 L 118,122 L 95,108 Z"
                        fill="#2A0B04"
                        stroke="#FFFDF7"
                        strokeWidth="1"
                      />
                      <path
                        d="M 92,120 L 74,136 L 62,148 L 60,146 L 72,134 Z"
                        fill="#FFFDF7"
                      />
                      <g className="animate-drip">
                        <circle cx="120" cy="125" r="4.5" fill="#FFFDF7" />
                        <ellipse cx="74" cy="142" rx="3.5" ry="5.5" fill="#FFFDF7" />
                      </g>
                    </g>
                  )}

                  {/* Stage 4: 80% - 99% (500-1000 shares) Divine Golden Tension */}
                  {progressState.percent >= 80 && (
                    <g>
                      <path
                        d="M 60,146 L 140,150 M 90,85 L 108,180 M 70,100 L 130,165"
                        stroke="var(--gold)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        filter="drop-shadow(0 0 8px #E8B923)"
                      />
                      <circle cx="100" cy="135" r="18" fill="var(--gold)" opacity="0.35" className="animate-ping" />
                    </g>
                  )}

                  {/* Pot Base */}
                  <ellipse cx="100" cy="192" rx="34" ry="7" fill="#4A180A" opacity="0.7" />
                </svg>
              </div>

              {/* Tap Hand or Ready Badge overlay */}
              {tapCount === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-[#0B1230]/90 border border-[#E8B923] text-[#E8B923] font-semibold text-xs sm:text-sm tracking-wide shadow-xl animate-bounce flex items-center gap-1.5">
                    <span>👆 Tap to Start (3 Taps for 10%)</span>
                  </div>
                </div>
              )}

              {progressState.isShatterReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(232,185,35,0.9)] animate-pulse flex items-center gap-1.5">
                    <span>💥 100% UNLOCKED &bull; TAP TO SHATTER!</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tap Feedback Text */}
            <p className="mt-4 text-xs sm:text-sm text-[#E8B923] font-medium tracking-wide min-h-[22px] text-center max-w-md">
              {tapFeedbackText || progressState.hint}
            </p>
          </div>
        ) : (
          /* ================= SHATTERED + PRIZE REVEAL ================= */
          <div className="w-full flex flex-col items-center justify-center">
            {/* 3D Scattered Flying Shards */}
            <div className="relative w-48 h-32 mb-4 preserve-3d">
              <div
                className="absolute w-14 h-14 bg-gradient-to-br from-[#C85A32] to-[#4A180A] border border-[#E8B923]/60 rounded-tl-3xl shadow-lg transition-all duration-700"
                style={{
                  transform: 'translate3d(-60px, -40px, 60px) rotateZ(-35deg) rotateX(45deg)',
                  opacity: 0.85,
                }}
              />
              <div
                className="absolute right-2 w-16 h-12 bg-gradient-to-bl from-[#8F3B1E] to-[#381308] border border-[#C6296F]/70 rounded-tr-3xl shadow-lg transition-all duration-700"
                style={{
                  transform: 'translate3d(65px, -35px, 80px) rotateZ(40deg) rotateY(35deg)',
                  opacity: 0.85,
                }}
              />
              <div
                className="absolute bottom-0 left-12 w-20 h-10 bg-gradient-to-t from-[#4A180A] to-[#C85A32] border border-[#E8B923]/60 rounded-b-2xl shadow-lg transition-all duration-700"
                style={{
                  transform: 'translate3d(10px, 45px, 40px) rotateZ(15deg) rotateX(-30deg)',
                  opacity: 0.75,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E8B923]/40 via-[#FFFDF7] to-[#E8B923]/40 blur-sm animate-ping opacity-60" />
                <div className="relative z-10">
                  <NemaliIcon className="w-14 h-16 drop-shadow-[0_0_15px_rgba(232,185,35,0.8)]" />
                </div>
              </div>
            </div>

            {/* PRIZE REVEAL CARD */}
            {prize && (
              <div
                id="prize-reveal-card"
                className="w-full max-w-lg rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#14224A] via-[#101B3D] to-[#0B1230] border-2 border-[#E8B923] shadow-[0_0_50px_rgba(232,185,35,0.35)] relative overflow-hidden transition-all transform animate-in fade-in slide-in-from-bottom-6 duration-500"
              >
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E8B923]/20">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#E8B923]" />
                    <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#E8B923] uppercase">
                      {devoteeProfile?.name ? `${devoteeProfile.name}'s Blessed Reward` : 'Janmashtami Blessed Reward'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8B923]/20 text-[#E8B923] border border-[#E8B923]/40">
                    {prize.rarity}
                  </span>
                </div>

                <div className="my-4 text-center">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6EEDD]">
                    {prize.title}
                  </h3>
                  <p className="font-telugu text-base text-[#E8B923]/90 mt-1 font-medium">
                    {prize.teluguTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#F6EEDD]/75 mt-2">
                    {prize.description}
                  </p>
                </div>

                {/* Voucher Code Box */}
                <div className="my-4 p-4 rounded-xl bg-[#0B1230] border border-[#E8B923]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-[#F6EEDD]/60 uppercase tracking-wider block">
                      Voucher Code (Use at checkout)
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-[#E8B923] tracking-widest">
                      {prize.voucherCode}
                    </span>
                  </div>

                  <button
                    id="btn-copy-voucher"
                    onClick={copyVoucher}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#E8B923] text-[#0B1230] font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-800" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Grand Prize Lucky Draw Entries */}
                <div className="p-3.5 rounded-xl bg-[#1B7A6E]/20 border border-[#1B7A6E]/50 my-4">
                  <div className="flex items-center justify-between text-xs text-[#F6EEDD] mb-1">
                    <span className="font-semibold text-[#E8B923] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Grand Draw Entries: +{prize.grandDrawTickets}
                    </span>
                    <span className="text-[#F6EEDD]/70">180 Cash Winners &bull; 10th Sept</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {prize.ticketNumbers.map((tNum, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-[#0B1230] text-[#E8B923] font-mono text-xs border border-[#E8B923]/30 font-semibold"
                      >
                        #{tNum}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Keep on sharing for bonus & Reset Buttons */}
                <div className="mt-4 p-3 rounded-xl bg-[#080E24] border border-[#E8B923]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-[#E8B923] font-medium">
                    Keep on sharing to multiply your Grand Draw tickets!
                  </span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleShareAction('whatsapp')}
                      className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-[#25D366] text-[#0B1230] font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShareAction('instagram')}
                      className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#833AB4] to-[#FD1D1D] text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                      <span>Instagram</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id="btn-crack-another"
                    onClick={() => resetPot()}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#E8B923] text-[#0B1230] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Crack Another Pot</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SHARE MODAL / BOOST HUB WHEN FORTIFIED AT 10% */}
      {showShareModal && (
        <div
          id="pot-fortified-modal"
          className="fixed inset-0 z-50 bg-[#0B1230]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#14224A] via-[#0B1230] to-[#14224A] border-2 border-[#E8B923] shadow-2xl relative text-center animate-in zoom-in-95 duration-300 my-auto"
          >
            {/* Header Icon */}
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#1B7A6E] to-[#E8B923] flex items-center justify-center text-[#0B1230] mb-3 shadow-lg">
              <NemaliIcon className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#F6EEDD]">
              Sacred Terracotta Fortified!
            </h3>
            <p className="text-xs sm:text-sm text-[#F6EEDD]/80 mt-1 leading-relaxed">
              You reached 3 taps (10%). Now share on WhatsApp and Instagram to soften the sacred clay and unlock 100% shattering power!
            </p>

            {/* Current Power Progress */}
            <div className="my-4 p-4 rounded-2xl bg-[#080E24] border border-[#E8B923]/30">
              <div className="flex justify-between text-xs text-[#E8B923] font-bold mb-1.5">
                <span>Power Progress: {progressState.percent}%</span>
                <span>{sharesCount} Shares Logged</span>
              </div>
              <div className="w-full h-3 bg-[#14224A] rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#1B7A6E] via-[#C6296F] to-[#E8B923] rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(progressState.percent, 10)}%` }}
                />
              </div>

              {/* Milestones Reference */}
              <div className="grid grid-cols-5 gap-1 mt-3 text-[10px] text-[#F6EEDD]/70 text-center">
                <div className={sharesCount >= 30 ? 'text-emerald-400 font-bold' : ''}>
                  30s &rarr; 20%
                </div>
                <div className={sharesCount >= 100 ? 'text-emerald-400 font-bold' : ''}>
                  100s &rarr; 50%
                </div>
                <div className={sharesCount >= 500 ? 'text-emerald-400 font-bold' : ''}>
                  500s &rarr; 80%
                </div>
                <div className={sharesCount >= 1000 ? 'text-emerald-400 font-bold' : ''}>
                  1000s &rarr; 99%
                </div>
                <div className={sharesCount > 1000 ? 'text-[#FFE27A] font-extrabold' : ''}>
                  &gt;1000s &rarr; 100%
                </div>
              </div>
            </div>

            {shareFeedback && (
              <p className="text-xs text-emerald-300 font-medium mb-3 animate-pulse bg-emerald-950/60 p-2 rounded-xl border border-emerald-500/40">
                {shareFeedback}
              </p>
            )}

            {/* Direct App Render / Share Buttons */}
            <div className="space-y-2.5">
              {/* WhatsApp Direct */}
              <button
                id="modal-share-whatsapp"
                onClick={() => handleShareAction('whatsapp')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0B1230] font-bold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-95"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#0B1230]" />
                <span>Share to WhatsApp (+15 Shares & Weakens Clay)</span>
              </button>

              {/* Instagram Direct */}
              <button
                id="modal-share-instagram"
                onClick={() => handleShareAction('instagram')}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-110 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-95"
              >
                <InstagramIcon className="w-5 h-5 text-white" />
                <span>Share to Instagram (+20 Shares & Copies Caption)</span>
              </button>

              {/* Fast Booster Milestones */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleShareAction('boost30')}
                  className="py-2 px-3 rounded-xl bg-[#14224A] hover:bg-[#1B7A6E]/30 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+30 Shares (20%)</span>
                </button>
                <button
                  onClick={() => handleShareAction('boost100')}
                  className="py-2 px-3 rounded-xl bg-[#14224A] hover:bg-[#1B7A6E]/30 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+100 Shares (50%)</span>
                </button>
                <button
                  onClick={() => handleShareAction('boost500')}
                  className="py-2 px-3 rounded-xl bg-[#14224A] hover:bg-[#1B7A6E]/30 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+500 Shares (80%)</span>
                </button>
                <button
                  onClick={() => handleShareAction('boost1000')}
                  className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#E8B923] to-[#FFE27A] text-[#0B1230] text-xs font-black flex items-center justify-center gap-1 cursor-pointer shadow"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>+1000 Mega Unlock!</span>
                </button>
              </div>

              {/* Copy Share Link */}
              <button
                onClick={() => handleShareAction('copy')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#080E24] border border-[#E8B923]/40 text-[#E8B923] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#14224A] cursor-pointer transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Direct Share Link'}</span>
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 text-xs text-[#F6EEDD]/70 hover:text-white transition-colors cursor-pointer"
            >
              Back to Pot Arena
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
