import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PotId, DevoteeProfile, POT_TIERS, SAMPLE_REWARDS, InstantReward } from '../types';
import { playPotTap, playPotShatter, playCelebrationFanfare, playCoinChime, playTempleBell } from '../utils/audio';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  Gift,
  Ticket,
  CheckCircle2,
  Share2,
  Flame
} from 'lucide-react';
import { NemaliIcon, WhatsAppIcon, InstagramIcon } from './SvgMotifs';

interface CrackGameEngineProps {
  activePotId: PotId;
  onSelectPot: (potId: PotId) => void;
  devoteeProfile: DevoteeProfile | null;
  onRequestClaim: (potId?: PotId) => void;
  onRewardWon: (reward: InstantReward, tickets: string[]) => void;
  onReferralBoost: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

/**
 * Backend percentage calculation based on exact share counts:
 * - 0 times = 0%
 * - 10 times (10 members) = 10%
 * - 20 times = 30%
 * - 50 times = 40%
 * - 200 times = 60%
 * - 500 times = 70%
 * - 800 times = 90%
 * - 1000 times = 100%
 */
export function calculatePotCrackPercentage(shares: number): number {
  if (shares <= 0) return 0;
  if (shares <= 10) {
    return Math.round((shares / 10) * 10);
  }
  if (shares <= 20) {
    return Math.round(10 + ((shares - 10) / 10) * 20);
  }
  if (shares <= 50) {
    return Math.round(30 + ((shares - 20) / 30) * 10);
  }
  if (shares <= 200) {
    return Math.round(40 + ((shares - 50) / 150) * 20);
  }
  if (shares <= 500) {
    return Math.round(60 + ((shares - 200) / 300) * 10);
  }
  if (shares <= 800) {
    return Math.round(70 + ((shares - 500) / 300) * 20);
  }
  if (shares <= 1000) {
    return Math.round(90 + ((shares - 800) / 200) * 10);
  }
  return 100;
}

export const CrackGameEngine: React.FC<CrackGameEngineProps> = ({
  activePotId,
  onSelectPot,
  devoteeProfile,
  onRequestClaim,
  onRewardWon,
  onReferralBoost,
  soundEnabled,
  onToggleSound,
}) => {
  const [sharesCount, setSharesCount] = useState(0);
  const [isCracked, setIsCracked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [wonReward, setWonReward] = useState<InstantReward | null>(null);
  const [allocatedTickets, setAllocatedTickets] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState('');

  const currentTier = POT_TIERS[activePotId];
  const isUyyala = activePotId === 'uyyala';
  const percent = calculatePotCrackPercentage(sharesCount);
  const isShatterReady = percent >= 100;

  const resetPot = (newPotId?: PotId) => {
    if (newPotId) {
      onSelectPot(newPotId);
    }
    setSharesCount(0);
    setIsCracked(false);
    setIsShaking(false);
    setWonReward(null);
    setAllocatedTickets([]);
    setCopied(false);
    setShareFeedback('');
  };

  const triggerConfetti = () => {
    const colors = ['#E8B923', '#1B7A6E', '#C6296F', '#FFFDF7', '#FFE27A'];
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors,
      });
    }, 200);
  };

  const performShatter = () => {
    setIsCracked(true);
    playPotShatter(!soundEnabled);
    setTimeout(() => {
      playCelebrationFanfare(!soundEnabled);
      playCoinChime(!soundEnabled);
    }, 200);
    triggerConfetti();

    // Select reward from sample pool
    const rewardsPool = SAMPLE_REWARDS[activePotId];
    const pickedReward = rewardsPool[Math.floor(Math.random() * rewardsPool.length)];

    const ticketPrefix = 'GPD-2026-';
    const newTickets = isUyyala
      ? [
          `${ticketPrefix}${Math.floor(100000 + Math.random() * 900000)}`,
          `${ticketPrefix}${Math.floor(100000 + Math.random() * 900000)}`,
          `${ticketPrefix}${Math.floor(100000 + Math.random() * 900000)}`,
        ]
      : [`${ticketPrefix}${Math.floor(100000 + Math.random() * 900000)}`];

    setWonReward(pickedReward);
    setAllocatedTickets(newTickets);
    onRewardWon(pickedReward, newTickets);
  };

  const handleShareClick = (type: 'whatsapp' | 'instagram' | 'copy' | 'quick', countToAdd = 10) => {
    const baseUrl = window.location.origin;
    const refCode = devoteeProfile?.referralCode || 'KRISHNA-UTLOTSAVAM';
    const shareUrl = `${baseUrl}/?ref=${refCode}`;
    const devoteeName = devoteeProfile?.name || 'Devotee';
    const potLabel = isUyyala ? 'Uyyala Kunda (Royal Matka)' : 'Venna Kunda (Casual Matka)';

    const shareText = `🦚 Shri Krishna Janmashtami Utlotsavam 2026!\nJoin ${devoteeName} in cracking the sacred ${potLabel} to win Instant Sweet Hampers & enter the ₹1,000 Cash Draw (180 Winners)!\n\nClaim your free pot here: ${shareUrl}\n#KrishnaJanmashtami #CrackYourPot #Utlotsavam`;

    if (type === 'whatsapp') {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
      setShareFeedback('Shared on WhatsApp! Pot crack progress increased.');
    } else if (type === 'instagram') {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      window.open('https://www.instagram.com/', '_blank');
      setShareFeedback('Opening Instagram & Caption copied! Pot progress updated.');
    } else if (type === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      setShareFeedback('Referral link copied! Share with your friends.');
    } else if (type === 'quick') {
      setShareFeedback(`Shared with ${countToAdd} devotees! Progress boosted.`);
    }

    const nextCount = sharesCount + countToAdd;
    setSharesCount(nextCount);
    onReferralBoost();

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);

    if (soundEnabled) {
      playPotTap(2, false);
      playTempleBell();
    }

    // Auto-shatter if reaches 100% (1000 shares)
    if (calculatePotCrackPercentage(nextCount) >= 100 && !isCracked) {
      setTimeout(() => {
        performShatter();
      }, 500);
    }
  };

  const handlePotTap = () => {
    if (!devoteeProfile) {
      onRequestClaim(activePotId);
      return;
    }

    if (isCracked) return;

    if (isShatterReady) {
      performShatter();
      return;
    }

    // Gentle shake and sound when tapped before 100%
    setIsShaking(true);
    playPotTap(1, !soundEnabled);
    setTimeout(() => setIsShaking(false), 300);
    setShareFeedback('Share with friends below to soften the pot and reach 100%!');
  };

  const copyVoucher = () => {
    if (wonReward) {
      navigator.clipboard.writeText(wonReward.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      id="crack-interactive-arena"
      className="w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#0E1838] via-[#0A122C] to-[#060B1E] border-2 border-[#E8B923]/40 p-5 sm:p-8 relative shadow-[0_0_60px_rgba(232,185,35,0.15)] text-[#F6EEDD]"
    >
      {/* Devotee / Pot Status Banner */}
      {devoteeProfile ? (
        <div className="mb-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#1B7A6E]/30 via-[#0B1230] to-[#E8B923]/20 border border-[#E8B923]/50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1B7A6E] to-[#E8B923] p-0.5 flex items-center justify-center text-[#0B1230] shadow shrink-0">
              <NemaliIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#F6EEDD]">
                  {devoteeProfile.name}&rsquo;s {isUyyala ? 'Uyyala Kunda' : 'Venna Kunda'}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Devotee</span>
                </span>
              </div>
              <p className="text-xs text-[#E8B923] font-medium">
                {isUyyala
                  ? 'Royal Uyyala Kunda &bull; 3x Grand Draw Tickets (#GPD-2026)'
                  : 'Casual Venna Kunda &bull; 1x Grand Draw Ticket'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-300 font-semibold px-3 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isShatterReady ? 'Ready to Shatter 💥' : 'Ready to Crack'}</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#E8B923]/20 via-[#0B1230] to-[#C6296F]/20 border border-[#E8B923]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <NemaliIcon className="w-8 h-8 shrink-0 text-[#E8B923]" />
            <div>
              <span className="text-xs sm:text-sm font-bold text-[#F6EEDD] block">
                Claim Your Auspicious {isUyyala ? 'Uyyala Kunda' : 'Venna Kunda'} (100% Free)
              </span>
              <span className="text-[11px] text-[#E8B923]/80">
                Guaranteed instant festive discounts + 180 Cash Winners Grand Draw Entry!
              </span>
            </div>
          </div>

          <button
            id="btn-claim-pot-banner"
            onClick={() => onRequestClaim(activePotId)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-xs sm:text-sm flex items-center gap-1.5 hover:brightness-105 active:scale-95 transition-all shadow-lg cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#0B1230]" />
            <span>Claim Pot &amp; Crack 🏺</span>
          </button>
        </div>
      )}

      {/* Top Header & Pot Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#E8B923]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/30 flex items-center justify-center text-[#E8B923] shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F6EEDD]">
              Sacred {currentTier.name}
            </h2>
            <p className="text-xs text-[#F6EEDD]/75 font-telugu">
              {currentTier.nameTelugu} &bull; Share below to crack the pot!
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5">
          <div className="bg-[#0B1230] p-1 rounded-xl border border-[#E8B923]/30 flex items-center">
            <button
              id="tab-pot-venna"
              onClick={() => resetPot('venna')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activePotId === 'venna'
                  ? 'bg-[#E8B923] text-[#0B1230] shadow'
                  : 'text-[#F6EEDD]/70 hover:text-white'
              }`}
            >
              Venna Kunda
            </button>
            <button
              id="tab-pot-uyyala"
              onClick={() => resetPot('uyyala')}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activePotId === 'uyyala'
                  ? 'bg-gradient-to-r from-[#C6296F] to-[#E8B923] text-white shadow'
                  : 'text-[#F6EEDD]/70 hover:text-white'
              }`}
            >
              Uyyala Kunda (Royal)
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

      {/* CLEAN CRACK PROGRESS BAR */}
      <div className="mt-4 p-4 rounded-2xl bg-[#0B1230]/90 border border-[#E8B923]/30 space-y-2.5">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
          <span className="text-[#E8B923] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Pot Crack Progress</span>
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
            isShatterReady
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 animate-pulse'
              : 'bg-[#E8B923]/20 text-[#E8B923] border border-[#E8B923]/40'
          }`}>
            {percent}% {isShatterReady ? '• 💥 READY TO SHATTER' : ''}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3.5 bg-[#080E24] rounded-full border border-[#E8B923]/40 p-0.5 overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isShatterReady
                ? 'bg-gradient-to-r from-emerald-500 via-[#E8B923] to-[#FFE27A] shadow-[0_0_15px_rgba(232,185,35,0.8)]'
                : 'bg-gradient-to-r from-[#1B7A6E] via-[#C6296F] to-[#E8B923]'
            }`}
            style={{ width: `${Math.max(percent, 5)}%` }}
          />
        </div>
      </div>

      {/* Main Interactive Stage: PURE KUNDA POT */}
      <div className="relative py-6 flex flex-col items-center justify-center min-h-[340px]">
        {!isCracked ? (
          <div className="relative flex flex-col items-center">
            {/* Devotee Name Plate on Pot */}
            {devoteeProfile && (
              <div className="mb-3 px-4 py-1 rounded-full bg-[#080E24] border border-[#E8B923]/60 text-[#E8B923] text-xs sm:text-sm font-bold tracking-wider shadow-lg flex items-center gap-2">
                <NemaliIcon className="w-4 h-4" />
                <span>{devoteeProfile.name}&rsquo;s Sacred Kunda</span>
              </div>
            )}

            {/* Interactive Pot */}
            <div
              id="interactive-clay-pot"
              onClick={handlePotTap}
              className={`relative cursor-pointer select-none transition-transform active:scale-95 group ${
                isShaking ? 'animate-pot-hit' : ''
              }`}
            >
              {/* Outer Golden Glow */}
              <div
                className={`absolute -inset-4 rounded-full blur-xl pointer-events-none transition-opacity duration-300 ${
                  isShatterReady
                    ? 'bg-[#E8B923]/60 opacity-100 animate-pulse'
                    : percent >= 40
                    ? 'bg-[#E8B923]/35 opacity-80'
                    : 'bg-[#E8B923]/20 opacity-50 group-hover:opacity-80'
                }`}
              />

              {/* Pot Graphic with layered crack paths */}
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
                      <path d="M 30,0 L 65,55" stroke="#E8B923" strokeWidth="2" strokeDasharray="4 2" />
                      <path d="M 170,0 L 135,55" stroke="#E8B923" strokeWidth="2" strokeDasharray="4 2" />
                      <path d="M 100,0 L 100,50" stroke="#E8B923" strokeWidth="2" strokeDasharray="4 2" />
                      <circle cx="65" cy="55" r="4.5" fill="#E8B923" />
                      <circle cx="135" cy="55" r="4.5" fill="#E8B923" />
                      <circle cx="100" cy="50" r="4.5" fill="#C6296F" />
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
                      <path d="M 36,132 Q 100,152 164,132" stroke="#E8B923" strokeWidth="3" fill="none" />
                      <path d="M 40,140 Q 100,160 160,140" stroke="#1B7A6E" strokeWidth="2" fill="none" />
                      <circle cx="100" cy="148" r="14" fill="#1B7A6E" stroke="#E8B923" strokeWidth="1.5" />
                      <circle cx="100" cy="148" r="7" fill="#C6296F" />
                      <circle cx="100" cy="148" r="3" fill="#E8B923" />
                    </g>
                  ) : (
                    <g>
                      <path d="M 38,134 Q 100,154 162,134" stroke="#E8B923" strokeWidth="2.5" fill="none" />
                      <circle cx="100" cy="144" r="9" fill="#E8B923" opacity="0.9" />
                      <circle cx="100" cy="144" r="5" fill="#8F3B1E" />
                    </g>
                  )}

                  {/* Cracks >= 10% */}
                  {percent >= 10 && (
                    <g stroke="#FFFDF7" strokeWidth="1.4" strokeLinecap="round" opacity="0.9">
                      <path d="M 90,85 L 96,105 L 92,120 L 102,138" />
                    </g>
                  )}

                  {/* Cracks >= 30% */}
                  {percent >= 30 && (
                    <g stroke="#FFE899" strokeWidth="2" strokeLinecap="round" opacity="0.95">
                      <path d="M 96,105 L 120,118 L 132,135 L 140,150" />
                      <path d="M 92,120 L 74,136 L 62,148" />
                      <path d="M 102,138 L 108,162 L 98,180" />
                    </g>
                  )}

                  {/* Cracks >= 60% with Butter drips */}
                  {percent >= 60 && (
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

                  {/* Divine Tension >= 90% */}
                  {percent >= 90 && (
                    <g>
                      <path
                        d="M 60,146 L 140,150 M 90,85 L 108,180 M 70,100 L 130,165"
                        stroke="#E8B923"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        filter="drop-shadow(0 0 8px #E8B923)"
                      />
                      <circle cx="100" cy="135" r="18" fill="#E8B923" opacity="0.35" className="animate-ping" />
                    </g>
                  )}

                  {/* Pot Base */}
                  <ellipse cx="100" cy="192" rx="34" ry="7" fill="#4A180A" opacity="0.7" />
                </svg>
              </div>

              {/* Ready to shatter badge overlay */}
              {isShatterReady && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(232,185,35,0.9)] animate-pulse flex items-center gap-1.5">
                    <span>💥 100% UNLOCKED &bull; TAP TO SHATTER!</span>
                  </div>
                </div>
              )}
            </div>

            {shareFeedback && (
              <p className="mt-3 text-xs sm:text-sm text-emerald-300 font-medium tracking-wide text-center max-w-md animate-fade-in">
                {shareFeedback}
              </p>
            )}
          </div>
        ) : (
          /* ================= SHATTERED + PRIZE REVEAL ================= */
          <div className="w-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
            {/* 3D Scattered Flying Shards */}
            <div className="relative w-48 h-28 mb-3 preserve-3d">
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
            {wonReward && (
              <div
                id="prize-reveal-card"
                className="w-full max-w-lg rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#14224A] via-[#101B3D] to-[#0B1230] border-2 border-[#E8B923] shadow-[0_0_50px_rgba(232,185,35,0.35)] relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#E8B923]/20">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#E8B923]" />
                    <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#E8B923] uppercase">
                      {devoteeProfile?.name ? `${devoteeProfile.name}'s Auspicious Reward` : 'Janmashtami Blessed Reward'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8B923]/20 text-[#E8B923] border border-[#E8B923]/40">
                    {wonReward.value}
                  </span>
                </div>

                <div className="my-4 text-center">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6EEDD]">
                    {wonReward.title}
                  </h3>
                  <p className="font-telugu text-base text-[#E8B923]/90 mt-1 font-medium">
                    {wonReward.titleTelugu}
                  </p>
                  <p className="text-xs sm:text-sm text-[#F6EEDD]/75 mt-2">
                    {wonReward.description}
                  </p>
                </div>

                {/* Voucher Code Box */}
                <div className="my-4 p-4 rounded-xl bg-[#0B1230] border border-[#E8B923]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-[#F6EEDD]/60 uppercase tracking-wider block">
                      Voucher Code (Valid for {wonReward.expiryDays} days)
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-[#E8B923] tracking-widest">
                      {wonReward.code}
                    </span>
                  </div>

                  <button
                    id="btn-copy-voucher"
                    onClick={copyVoucher}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#E8B923] text-[#0B1230] font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-800" />
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
                      <Ticket className="w-3.5 h-3.5 text-[#E8B923]" />
                      Grand Draw Entries: +{allocatedTickets.length}
                    </span>
                    <span className="text-[#F6EEDD]/70">180 Cash Winners &bull; 10th Sept</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {allocatedTickets.map((tNum, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-[#0B1230] text-[#E8B923] font-mono text-xs border border-[#E8B923]/30 font-semibold"
                      >
                        #{tNum}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id="btn-crack-another"
                    onClick={() => resetPot()}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#E8B923] text-[#0B1230] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Crack Another Auspicious Pot</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* BELOW KUNDA POT: CLEAN SHARE ICONS & QUICK BOOST BUTTONS */}
      {!isCracked && (
        <div className="mt-4 pt-4 border-t border-[#E8B923]/25 space-y-3">
          <div className="text-center">
            <span className="text-xs sm:text-sm font-semibold text-[#E8B923] tracking-wide">
              Share to soften the pot and crack open your blessed reward
            </span>
          </div>

          {/* Primary Share Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* WhatsApp Share */}
            <button
              id="btn-share-whatsapp-clean"
              onClick={() => handleShareClick('whatsapp', 10)}
              className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0B1230] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#0B1230]" />
              <span>Share on WhatsApp</span>
            </button>

            {/* Instagram Share */}
            <button
              id="btn-share-instagram-clean"
              onClick={() => handleShareClick('instagram', 10)}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <InstagramIcon className="w-5 h-5 text-white" />
              <span>Share on Instagram</span>
            </button>

            {/* Copy Link */}
            <button
              id="btn-share-copy-clean"
              onClick={() => handleShareClick('copy', 10)}
              className="py-3 px-4 rounded-xl bg-[#080E24] hover:bg-[#14224A] border border-[#E8B923]/40 text-[#E8B923] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
            </button>
          </div>

          {/* Quick Share with Devotee Groups (10, 20, 50, 200, 500, 800, 1000 members) */}
          <div className="pt-2">
            <div className="text-[11px] text-[#F6EEDD]/70 text-center mb-2">
              Quick Share Options:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
              <button
                onClick={() => handleShareClick('quick', 10)}
                className="py-1.5 px-2 rounded-lg bg-[#14224A] hover:bg-[#1B7A6E]/30 border border-[#E8B923]/30 text-[#E8B923] text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>10 Members</span>
              </button>
              <button
                onClick={() => handleShareClick('quick', 20)}
                className="py-1.5 px-2 rounded-lg bg-[#14224A] hover:bg-[#1B7A6E]/30 border border-[#E8B923]/30 text-[#E8B923] text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>20 Members</span>
              </button>
              <button
                onClick={() => handleShareClick('quick', 50)}
                className="py-1.5 px-2 rounded-lg bg-[#14224A] hover:bg-[#1B7A6E]/30 border border-[#E8B923]/30 text-[#E8B923] text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>50 Members</span>
              </button>
              <button
                onClick={() => handleShareClick('quick', 200)}
                className="py-1.5 px-2 rounded-lg bg-[#14224A] hover:bg-[#1B7A6E]/30 border border-[#E8B923]/30 text-[#E8B923] text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>200 Members</span>
              </button>
              <button
                onClick={() => handleShareClick('quick', 500)}
                className="py-1.5 px-2 rounded-lg bg-[#14224A] hover:bg-[#1B7A6E]/30 border border-[#E8B923]/30 text-[#E8B923] text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>500 Members</span>
              </button>
              <button
                onClick={() => handleShareClick('quick', 800)}
                className="py-1.5 px-2 rounded-lg bg-[#14224A] hover:bg-[#1B7A6E]/30 border border-[#E8B923]/30 text-[#E8B923] text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>800 Members</span>
              </button>
              <button
                onClick={() => handleShareClick('quick', 1000)}
                className="py-1.5 px-2 rounded-lg bg-gradient-to-r from-[#E8B923] to-[#FFE27A] text-[#0B1230] text-[11px] font-black flex items-center justify-center gap-1 cursor-pointer shadow transition-all hover:brightness-105"
              >
                <Sparkles className="w-3 h-3" />
                <span>1000 Mega 💥</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
