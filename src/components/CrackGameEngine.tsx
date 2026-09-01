import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PotConfig, PrizeResult, DevoteeProfile } from '../types';
import { playPotTap, playPotShatter, playCelebrationFanfare } from '../utils/audio';
import { Sparkles, Copy, Check, RotateCcw, Volume2, VolumeX, Gift, Trophy, Share2, Flame, Users, Lock, Unlock, Send, UserCheck, Edit3 } from 'lucide-react';
import { PeacockFeatherIcon, FluteMotif, NemaliIcon } from './SvgMotifs';

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

// Internal requirement: user has to achieve sufficient sharing synergy to break the pot
const SECRET_REQUIRED_SHARES = 1000;

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
  const [isCracked, setIsCracked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [prize, setPrize] = useState<PrizeResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [tapFeedbackText, setTapFeedbackText] = useState('');
  
  // Secret share tracking (without displaying raw number in UI)
  const [sharesCount, setSharesCount] = useState<number>(0);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [shareFeedback, setShareFeedback] = useState<string>('');

  const activePot = pots.find((p) => p.id === activePotId) || pots[0];
  const isUyyala = activePot.id === 'uyyala';

  const isClaySoftened = sharesCount >= SECRET_REQUIRED_SHARES;
  const sharePowerPercentage = Math.min(Math.round((sharesCount / SECRET_REQUIRED_SHARES) * 100), 100);

  const resetPot = (newPotId?: PotConfig['id']) => {
    if (newPotId) {
      onSelectPot(newPotId);
    }
    setTapCount(0);
    setIsCracked(false);
    setIsShaking(false);
    setPrize(null);
    setCopied(false);
    setTapFeedbackText('');
    setShowShareModal(false);
    setShareFeedback('');
  };

  const triggerConfetti = () => {
    // Multi-stage confetti burst in Gold, Peacock Teal, and Rani Pink
    const colors = ['#E8B923', '#1B7A6E', '#C6296F', '#FFFDF7', '#B8860B'];
    
    // Center cannon burst
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors,
      ticks: 220,
    });

    // Left & Right celebratory side cannons
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors,
      });
    }, 150);
  };

  const executeShareAction = (platform: 'whatsapp' | 'telegram' | 'copy' | 'boost') => {
    const shareUrl = window.location.href;
    const devoteeName = devoteeProfile?.name ? `${devoteeProfile.name}'s` : 'my';
    const shareText = `🦚 Shri Krishna Janmashtami Mahotsav! Help me crack ${devoteeName} auspicious ${
      isUyyala ? 'Uyyala Kunda' : 'Venna Kunda'
    } to win the ₹1,000 Grand Cash Prize & Luxury Sweets Hamper! Tap here to claim & crack yours: ${shareUrl}`;

    let addedPower = 250;

    if (platform === 'whatsapp') {
      addedPower = 350;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
      setShareFeedback('Shared to WhatsApp! Sacred clay softened significantly!');
    } else if (platform === 'telegram') {
      addedPower = 300;
      window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
      setShareFeedback('Shared to Telegram! Clay strength weakened!');
    } else if (platform === 'copy') {
      addedPower = 250;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      setShareFeedback('Invite link copied! Share with groups to unlock full power.');
    } else if (platform === 'boost') {
      addedPower = 400;
      setShareFeedback('Community festive squad invited! Clay armor softening rapidly.');
    }

    const nextShares = sharesCount + addedPower;
    setSharesCount(nextShares);

    if (nextShares >= SECRET_REQUIRED_SHARES) {
      setTapFeedbackText('✨ Sacred clay is now completely weakened! Deliver the final strike to shatter!');
      setTimeout(() => {
        setShowShareModal(false);
      }, 1200);
    }
  };

  const handlePotTap = () => {
    // If devotee has not claimed their pot yet, prompt the form
    if (!devoteeProfile) {
      onRequestClaim(activePot.id);
      return;
    }

    if (isCracked) return;

    // Check if the pot requires sharing before final strikes
    if (tapCount >= 3 && !isClaySoftened) {
      setIsShaking(true);
      playPotTap(3, !soundEnabled);
      setTimeout(() => setIsShaking(false), 300);
      setTapFeedbackText('🛡️ Earthen pot is heavily fortified! Share with friends to weaken the clay & unlock the final shattering blow!');
      setShowShareModal(true);
      return;
    }

    const nextTap = tapCount + 1;
    setTapCount(nextTap);

    // Audio & Vibration
    if (nextTap < 5) {
      playPotTap(nextTap, !soundEnabled);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);

      const feedbacks = [
        '✦ Tap 1/5: Hairline crack formed!',
        '✦ Tap 2/5: Fissures spreading across the terracotta!',
        '✦ Tap 3/5: Makkhan (Butter) dripping out!',
        '✦ Tap 4/5: Divine golden energy surging — Final heavy blow!',
      ];
      setTapFeedbackText(feedbacks[nextTap - 1] || '');
    } else {
      // 5th TAP: SHATTER!
      setIsCracked(true);
      playPotShatter(!soundEnabled);
      setTimeout(() => playCelebrationFanfare(!soundEnabled), 200);
      triggerConfetti();

      // Generate randomized prize based on selected pot tier
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
    }
  };

  const copyVoucher = () => {
    if (!prize) return;
    navigator.clipboard.writeText(prize.voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="crack-interactive-arena"
      className="relative w-full max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 border border-[#E8B923]/30 bg-gradient-to-b from-[#14224A]/95 via-[#0B1230]/95 to-[#14224A]/95 shadow-2xl backdrop-blur-md overflow-hidden"
    >
      {/* Devotee Pot Personalization Banner */}
      {devoteeProfile ? (
        <div className="mb-4 p-3 rounded-2xl bg-[#080E24] border border-[#E8B923]/40 flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1B7A6E] to-[#E8B923] flex items-center justify-center text-[#0B1230] font-bold text-sm shadow">
              <NemaliIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-[#F6EEDD]">
                  {devoteeProfile.name}&rsquo;s Sacred Matka
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B7A6E]/30 text-emerald-300 border border-emerald-500/40 font-semibold">
                  ✓ Claimed
                </span>
              </div>
              <p className="text-[11px] text-[#E8B923]/80">
                Devotee from <span className="font-semibold text-white">{devoteeProfile.city}</span> &bull; Mob: {devoteeProfile.phone.slice(0, 4)}XXXX{devoteeProfile.phone.slice(-2)}
              </p>
            </div>
          </div>

          <button
            onClick={() => onRequestClaim(activePot.id)}
            className="px-2.5 py-1 rounded-lg bg-[#14224A] border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold flex items-center gap-1 hover:bg-[#1B7A6E]/30 transition-all cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span className="hidden sm:inline">Edit Details</span>
          </button>
        </div>
      ) : (
        <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#C6296F]/20 via-[#0B1230] to-[#E8B923]/20 border border-[#E8B923]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <NemaliIcon className="w-8 h-8 shrink-0 text-[#E8B923]" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-[#F6EEDD] block">
                Personalize & Submit Your Own Sacred Pot
              </span>
              <span className="text-[11px] text-[#E8B923]/80">
                Enter your Name, City & Phone to engrave your pot and claim verified cash draw entries!
              </span>
            </div>
          </div>

          <button
            id="btn-claim-pot-banner"
            onClick={() => onRequestClaim(activePot.id)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E8B923] to-[#C6296F] text-[#0B1230] font-bold text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Submit Devotee Pot</span>
          </button>
        </div>
      )}

      {/* Top Header / Pot Switcher Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#E8B923]/20">
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
            <p className="text-xs sm:text-sm text-[#F6EEDD]/70">
              Share to soften the sacred clay, then tap to shatter & reveal divine rewards
            </p>
          </div>
        </div>

        {/* Controls: Pot Selector & Sound Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
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
            title={soundEnabled ? 'Mute Dhol & Bell Sounds' : 'Unmute Sound Effects'}
            className="p-2 rounded-xl bg-[#0B1230] border border-[#E8B923]/30 text-[#E8B923] hover:bg-[#14224A] transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Sharing Power / Clay Weakening Status Banner */}
      <div className="mt-6 p-4 rounded-2xl bg-[#0B1230]/80 border border-[#E8B923]/25 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className={`p-2.5 rounded-xl border ${
            isClaySoftened 
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400' 
              : 'bg-[#14224A] border-[#E8B923]/40 text-[#E8B923]'
          }`}>
            {isClaySoftened ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-[#F6EEDD]">
                Sacred Clay Softening & Share Power
              </span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                isClaySoftened
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-[#E8B923]/20 text-[#E8B923] border border-[#E8B923]/40'
              }`}>
                {isClaySoftened ? '✓ READY TO SHATTER' : `${sharePowerPercentage}% WEAKENED`}
              </span>
            </div>
            <p className="text-[11px] text-[#F6EEDD]/70 mt-0.5">
              {isClaySoftened
                ? 'The clay armor is broken! Deliver the final strike to reveal your prize.'
                : 'Share with friends & groups on WhatsApp/Telegram to weaken the earthen clay.'}
            </p>
          </div>
        </div>

        {/* Quick Share Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          <button
            onClick={() => executeShareAction('whatsapp')}
            className="px-3 py-1.5 rounded-xl bg-emerald-600/90 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-500 active:scale-95 transition-all shadow cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => executeShareAction('telegram')}
            className="px-3 py-1.5 rounded-xl bg-[#2AABEE]/90 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-[#2AABEE] active:scale-95 transition-all shadow cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Telegram</span>
          </button>

          <button
            onClick={() => executeShareAction('boost')}
            className="px-3 py-1.5 rounded-xl bg-[#E8B923] text-[#0B1230] font-bold text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Boost Power</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative py-8 sm:py-10 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[420px]">
        {/* Progress Bar & Status */}
        <div className="w-full max-w-md mb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5 font-medium">
            <span className="text-[#E8B923] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Strike Force: {Math.min(tapCount * 20, 100)}%
            </span>
            <span className="text-[#F6EEDD]/80">
              {isCracked ? 'Shattered!' : `${5 - tapCount} taps remaining`}
            </span>
          </div>

          <div className="w-full h-3 bg-[#0B1230] rounded-full border border-[#E8B923]/30 p-0.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isUyyala
                  ? 'bg-gradient-to-r from-[#1B7A6E] via-[#C6296F] to-[#E8B923]'
                  : 'bg-gradient-to-r from-[#B8860B] to-[#E8B923]'
              }`}
              style={{ width: `${Math.min(tapCount * 20, 100)}%` }}
            />
          </div>
        </div>

        {/* The 3D Pot Cracking Canvas */}
        {!isCracked ? (
          <div className="relative flex flex-col items-center">
            {/* Devotee Name Plate on Pot */}
            {devoteeProfile && (
              <div className="mb-3 px-4 py-1 rounded-full bg-[#080E24] border border-[#E8B923]/50 text-[#E8B923] text-xs font-bold tracking-wider shadow-md flex items-center gap-1.5 animate-pulse">
                <span>🦚</span>
                <span>{devoteeProfile.name} ({devoteeProfile.city})</span>
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
                  isClaySoftened
                    ? 'bg-[#E8B923]/50 opacity-100 animate-pulse'
                    : tapCount >= 2
                    ? 'bg-[#E8B923]/30 opacity-75'
                    : 'bg-[#E8B923]/20 opacity-60 group-hover:opacity-90'
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

                  {/* Belly Ornamentation */}
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

                  {/* ================= STAGE 1 CRACK: Hairline ================= */}
                  {tapCount >= 1 && (
                    <g stroke="#FFFDF7" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
                      <path d="M 90,85 L 96,105 L 92,120 L 102,138" />
                    </g>
                  )}

                  {/* ================= STAGE 2 CRACK: Branch Fissures ================= */}
                  {tapCount >= 2 && (
                    <g stroke="#FFE899" strokeWidth="1.8" strokeLinecap="round" opacity="0.95">
                      <path d="M 96,105 L 120,118 L 132,135 L 140,150" />
                      <path d="M 92,120 L 74,136 L 62,148" />
                      <path d="M 102,138 L 108,162 L 98,180" />
                    </g>
                  )}

                  {/* ================= STAGE 3 CRACK: Wide Gaps + Curd Drips ================= */}
                  {tapCount >= 3 && (
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

                  {/* ================= STAGE 4 CRACK: Divine Glow Tension ================= */}
                  {tapCount >= 4 && (
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

              {/* Tap Hand Indicator overlay when starting */}
              {tapCount === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-[#0B1230]/90 border border-[#E8B923] text-[#E8B923] font-semibold text-xs sm:text-sm tracking-wide shadow-xl animate-bounce flex items-center gap-1.5">
                    <span>👆 Tap to Break</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tap Feedback text */}
            <p className="mt-4 text-xs sm:text-sm text-[#E8B923] font-medium tracking-wide min-h-[20px] text-center max-w-md">
              {tapFeedbackText || (isClaySoftened ? '🌟 Sacred clay softened! Tap to shatter the matka!' : 'Tap the auspicious pot & share to weaken the clay')}
            </p>
          </div>
        ) : (
          /* ================= STAGE 5: 3D SHATTER + PRIZE REVEAL ================= */
          <div className="w-full flex flex-col items-center justify-center">
            {/* 3D Scattered Flying Shards Animation */}
            <div className="relative w-48 h-32 mb-4 preserve-3d">
              {/* Shard 1 (Top Left) */}
              <div
                className="absolute w-14 h-14 bg-gradient-to-br from-[#C85A32] to-[#4A180A] border border-[#E8B923]/60 rounded-tl-3xl shadow-lg transition-all duration-700"
                style={{
                  transform: 'translate3d(-60px, -40px, 60px) rotateZ(-35deg) rotateX(45deg)',
                  opacity: 0.85,
                }}
              />
              {/* Shard 2 (Top Right) */}
              <div
                className="absolute right-2 w-16 h-12 bg-gradient-to-bl from-[#8F3B1E] to-[#381308] border border-[#C6296F]/70 rounded-tr-3xl shadow-lg transition-all duration-700"
                style={{
                  transform: 'translate3d(65px, -35px, 80px) rotateZ(40deg) rotateY(35deg)',
                  opacity: 0.85,
                }}
              />
              {/* Shard 3 (Bottom) */}
              <div
                className="absolute bottom-0 left-12 w-20 h-10 bg-gradient-to-t from-[#4A180A] to-[#C85A32] border border-[#E8B923]/60 rounded-b-2xl shadow-lg transition-all duration-700"
                style={{
                  transform: 'translate3d(10px, 45px, 40px) rotateZ(15deg) rotateX(-30deg)',
                  opacity: 0.75,
                }}
              />
              {/* Center Butter Splash with Peacock motif */}
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
                {/* Gold Top Banner with Devotee Tag */}
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

                {/* Prize Title & Telugu subtitle */}
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

                {/* Voucher Code Box with 1-Click Copy */}
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

                {/* Grand Prize Lucky Draw Entries Generated */}
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

                {/* Reset & Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id="btn-crack-another"
                    onClick={() => resetPot()}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#E8B923] text-[#0B1230] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Crack Another Pot</span>
                  </button>

                  <a
                    href="#referral-boost-section"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#14224A] text-[#F6EEDD] border border-[#E8B923]/40 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1B7A6E]/30 transition-all cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-[#E8B923]" />
                    <span>Boost Draw Odds</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Share Requirement Modal / Drawer when Fortified Pot Resists Shatter */}
      {showShareModal && (
        <div
          id="pot-fortified-modal"
          className="fixed inset-0 z-50 bg-[#0B1230]/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#14224A] via-[#0B1230] to-[#14224A] border-2 border-[#E8B923] shadow-2xl relative text-center animate-in zoom-in-95 duration-300"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E8B923]/15 border border-[#E8B923]/40 flex items-center justify-center text-[#E8B923] mb-4">
              <Share2 className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#F6EEDD]">
              Sacred Fortified Clay!
            </h3>
            <p className="text-xs sm:text-sm text-[#F6EEDD]/80 mt-2 leading-relaxed">
              This auspicious pot is sanctified and fortified. Share with your friends & family on social media to soften the sacred clay and unlock the final shattering strike!
            </p>

            {/* Current Strength Power Bar */}
            <div className="my-5 p-3 rounded-xl bg-[#0B1230] border border-[#E8B923]/25">
              <div className="flex justify-between text-xs text-[#E8B923] font-semibold mb-1">
                <span>Clay Softening Progress</span>
                <span>{sharePowerPercentage}% Ready</span>
              </div>
              <div className="w-full h-2.5 bg-[#14224A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#1B7A6E] via-[#E8B923] to-[#C6296F] transition-all duration-300"
                  style={{ width: `${sharePowerPercentage}%` }}
                />
              </div>
            </div>

            {shareFeedback && (
              <p className="text-xs text-emerald-400 font-medium mb-4 animate-pulse">
                {shareFeedback}
              </p>
            )}

            {/* 1-Click Share Actions */}
            <div className="space-y-2.5">
              <button
                onClick={() => executeShareAction('whatsapp')}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow cursor-pointer transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>Share on WhatsApp (+Huge Power)</span>
              </button>

              <button
                onClick={() => executeShareAction('telegram')}
                className="w-full py-3 px-4 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold text-sm flex items-center justify-center gap-2 shadow cursor-pointer transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Share on Telegram</span>
              </button>

              <button
                onClick={() => executeShareAction('copy')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0B1230] border border-[#E8B923]/40 text-[#E8B923] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#14224A] cursor-pointer transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
              </button>

              <button
                onClick={() => executeShareAction('boost')}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E8B923] to-[#C6296F] text-[#0B1230] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer shadow transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fast Squad Boost (Auto-Softens Clay)</span>
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 text-xs text-[#F6EEDD]/60 hover:text-white transition-colors cursor-pointer"
            >
              Continue Tapping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
