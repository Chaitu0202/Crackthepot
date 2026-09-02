import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { DevoteeProfile, PotId } from '../types';
import { NemaliIcon, PeacockFeatherIcon, FluteMotif, DiyaLamp, RangoliDivider } from './SvgMotifs';
import { playCelebrationFanfare, playCoinChime, playTempleBell } from '../utils/audio';
import {
  Sparkles,
  Trophy,
  Gift,
  CheckCircle2,
  ArrowRight,
  Flame,
  ShieldCheck,
  Ticket,
  Zap,
  RotateCcw,
  Share2
} from 'lucide-react';

interface ThankYouPageProps {
  potId?: PotId;
  devoteeProfile: DevoteeProfile | null;
  userTickets: string[];
  onGoToDashboard: () => void;
  soundEnabled: boolean;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  potId = 'uyyala',
  devoteeProfile,
  userTickets,
  onGoToDashboard,
  soundEnabled,
}) => {
  const isUyyala = potId === 'uyyala';
  const potName = isUyyala ? 'Uyyala Kunda' : 'Venna Kunda';
  const potTelugu = isUyyala ? 'ఉయ్యాల కుండ' : 'వెన్న కుండ';
  const potSubtitle = isUyyala
    ? 'Premium Royal Matka &bull; 3x Grand Draw Entries'
    : 'Casual Matka &bull; 1x Grand Draw Entry';

  // Set page title to "Thank You"
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Thank You — Crack Your Pot';
    
    // Play celebratory chime & shower confetti on entrance
    if (soundEnabled) {
      playTempleBell();
      setTimeout(() => playCelebrationFanfare(), 300);
      setTimeout(() => playCoinChime(), 800);
    }

    // Festive Confetti blast
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#E8B923', '#C6296F', '#1B7A6E', '#FFFDF7', '#FFE27A'],
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#E8B923', '#FFE27A', '#1B7A6E'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#C6296F', '#E8B923', '#FFFDF7'],
      });
    }, 400);

    return () => {
      document.title = originalTitle;
      clearTimeout(timer);
    };
  }, [soundEnabled]);

  return (
    <div
      id="thankyou-page-container"
      className="min-h-screen bg-gradient-to-b from-[#080E24] via-[#0B1230] to-[#040816] text-[#F6EEDD] flex flex-col justify-between relative overflow-hidden py-10 px-4 sm:px-6"
    >
      {/* Background Decorative Motifs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#E8B923]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-12 left-4 sm:left-12 opacity-15 pointer-events-none">
        <NemaliIcon className="w-48 h-48" />
      </div>
      <div className="absolute bottom-12 right-4 sm:right-12 opacity-15 pointer-events-none rotate-12">
        <PeacockFeatherIcon className="w-48 h-48" />
      </div>

      <div className="max-w-3xl mx-auto w-full relative z-10 my-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Sacred Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8B923]/15 border border-[#E8B923]/40 text-[#E8B923] text-xs sm:text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(232,185,35,0.2)]">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>Sacred Offering Confirmed &bull; Matka Blessed</span>
          <DiyaLamp className="w-4 h-4 text-[#E8B923]" />
        </div>

        {/* Main Congratulations Header */}
        <div className="space-y-3">
          <h1
            id="thankyou-main-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-white leading-tight"
          >
            Congratulations on getting{' '}
            <span className="bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] bg-clip-text text-transparent underline decoration-[#C6296F]/50 underline-offset-8">
              {potName}
            </span>
            !
          </h1>
          <p className="font-telugu text-lg sm:text-2xl text-[#E8B923] font-bold">
            {potTelugu}ను పొందినందుకు హృదయపూర్వక అభినందనలు!
          </p>
          <p className="text-sm sm:text-base text-[#F6EEDD]/80 max-w-xl mx-auto font-sans">
            Your sacred pot has been blessed and placed in the Utlotsavam arena. You are now fully eligible for instant festive hamper rewards and the 180 Pot Crackers Grand Draw!
          </p>
        </div>

        {/* Flute Motif Divider */}
        <div className="flex justify-center my-2 opacity-80">
          <FluteMotif className="w-48 h-8 text-[#E8B923]" />
        </div>

        {/* Reward Summary Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#14224A] via-[#0E1738] to-[#070D22] border-2 border-[#E8B923]/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(232,185,35,0.25)] relative text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#E8B923]/20">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#C6296F] to-[#E8B923] p-1 flex items-center justify-center text-[#0B1230] shadow-lg shrink-0">
                <NemaliIcon className="w-10 h-10 text-[#0B1230]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {potName}
                  </h3>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active &amp; Ready</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#E8B923] font-medium">
                  {potSubtitle}
                </p>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-[#080E24] border border-[#E8B923]/40 text-center">
              <span className="text-[10px] text-[#F6EEDD]/60 uppercase font-bold tracking-wider block">
                Devotee Status
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#FFE27A]">
                {devoteeProfile?.name || 'Blessed Devotee'} (✓ Verified)
              </span>
            </div>
          </div>

          {/* Key Perks Unlocked */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-6">
            <div className="p-3.5 rounded-2xl bg-[#080E24]/80 border border-[#E8B923]/25 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E8B923]/20 text-[#E8B923] flex items-center justify-center shrink-0">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">3x Lucky Tickets</span>
                <span className="text-[11px] text-[#F6EEDD]/70">Grand Prize Draw</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080E24]/80 border border-[#E8B923]/25 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">100% Win Guarantee</span>
                <span className="text-[11px] text-[#F6EEDD]/70">Instant Hamper Voucher</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080E24]/80 border border-[#E8B923]/25 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Royal Multiplier</span>
                <span className="text-[11px] text-[#F6EEDD]/70">Maximum Reward Tier</span>
              </div>
            </div>
          </div>

          {/* Assigned Lucky Draw Tickets */}
          {userTickets && userTickets.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#080E24] border border-[#E8B923]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#F6EEDD]/75 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Your Grand Draw Lucky Tickets:</span>
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                {userTickets.slice(0, 3).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#14224A] text-[#FFE27A] border border-[#E8B923]/40 font-mono font-bold tracking-wider"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PRIMARY CTA: CRACK THE POT */}
          <div className="pt-6 space-y-3">
            <button
              id="btn-thankyou-crack-the-pot"
              onClick={onGoToDashboard}
              className="w-full py-4 sm:py-5 px-8 rounded-2xl bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(232,185,35,0.5)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer group"
            >
              <Sparkles className="w-6 h-6 text-[#0B1230] group-hover:rotate-12 transition-transform" />
              <span>Go To Pot &bull; Crack To Win 🏺</span>
              <ArrowRight className="w-6 h-6 text-[#0B1230] group-hover:translate-x-1.5 transition-transform" />
            </button>

            <p className="text-center text-xs text-[#F6EEDD]/60 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Arena Routing &bull; Share Below Your Pot to Crack</span>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-[#F6EEDD]/50 space-y-1">
          <p>Sri Krishna Janmashtami &bull; Utlotsavam 2026 Celebration</p>
          <p>Need assistance or have questions? Contact support via WhatsApp or email.</p>
        </div>

      </div>
    </div>
  );
};
