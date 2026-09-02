import React from 'react';
import { TempleArchFrame, PeacockFeatherIcon, FluteMotif, DiyaLamp, RangoliDivider, NemaliIcon, RadhaKrishnaDivineMotif } from './SvgMotifs';
import { Sparkles, Gift, ArrowDown, ChevronRight, ShieldCheck, Flame, UserCheck } from 'lucide-react';
import { DevoteeProfile } from '../types';

interface HeroSectionProps {
  onPickPotClick: () => void;
  onRequestClaim: () => void;
  devoteeProfile: DevoteeProfile | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPickPotClick,
  onRequestClaim,
  devoteeProfile,
}) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Deep Indigo Midnight Sky with Soft Golden Vrindavan Light */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060B1E] via-[#0E1838] to-[#080E24] pointer-events-none" />

      {/* Decorative Twinkling Stars & Midnight Constellations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-12 left-10 w-1.5 h-1.5 rounded-full bg-[#E8B923] star-twinkle-1" />
        <div className="absolute top-28 right-16 w-2 h-2 rounded-full bg-[#F6EEDD] star-twinkle-2" />
        <div className="absolute top-48 left-1/4 w-1 h-1 rounded-full bg-[#1B7A6E] star-twinkle-3" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#E8B923] star-twinkle-1" />
        <div className="absolute bottom-32 left-12 w-2 h-2 rounded-full bg-[#C6296F] star-twinkle-2" />
        <div className="absolute bottom-24 right-20 w-1.5 h-1.5 rounded-full bg-[#F6EEDD] star-twinkle-3" />
        
        {/* Soft atmospheric radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#1B7A6E]/20 via-[#E8B923]/15 to-[#C6296F]/15 blur-3xl rounded-full" />
      </div>

      {/* Flanking Festive Diyas on Desktop */}
      <div className="hidden lg:block absolute left-8 top-1/3 -translate-y-1/2">
        <DiyaLamp label="Midnight Joy" className="w-12 h-12" />
      </div>
      <div className="hidden lg:block absolute right-8 top-1/3 -translate-y-1/2">
        <DiyaLamp label="Grand Draw" className="w-12 h-12" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Top Auspicious Badge with Nemali (Peacock) Icon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14224A]/90 border border-[#E8B923]/40 text-[#E8B923] text-xs sm:text-sm font-medium tracking-wide mb-4 shadow-lg backdrop-blur-sm">
          <NemaliIcon className="w-5 h-5 text-[#E8B923]" />
          <span>Shri Krishna Janmashtami Mahotsav &bull; 180 Pot Crackers Draw</span>
          <Sparkles className="w-3.5 h-3.5 text-[#E8B923]" />
        </div>

        {/* Radha Krishna Celestial Backdrop Visual */}
        <div className="w-full max-w-2xl mx-auto -mb-6 sm:-mb-8 opacity-90 transition-transform duration-500 hover:scale-[1.02]">
          <RadhaKrishnaDivineMotif className="w-full h-auto drop-shadow-[0_0_25px_rgba(232,185,35,0.3)]" />
        </div>

        {/* Temple Arch Frame Enclosing Sacred Peacock Feather + Flute Line Art */}
        <div className="relative w-full max-w-2xl mx-auto py-2 px-2 sm:px-4">
          <TempleArchFrame className="w-full py-6 sm:py-8 px-4 sm:px-8 rounded-3xl bg-[#0E1838]/80 backdrop-blur-md border border-[#E8B923]/35 shadow-[0_0_50px_rgba(232,185,35,0.2)]">
            {/* Center Sacred Motifs */}
            <div className="flex flex-col items-center justify-center gap-1.5 mb-2">
              <div className="relative flex items-center justify-center">
                <PeacockFeatherIcon className="w-12 h-16 sm:w-14 sm:h-20 filter drop-shadow-[0_0_12px_rgba(232,185,35,0.6)]" />
              </div>
              <div className="w-44 sm:w-56">
                <FluteMotif className="w-full h-auto filter drop-shadow-md" />
              </div>
            </div>

            {/* Main Headline in Telugu + English */}
            <div className="space-y-1.5 mt-2">
              <h1 className="font-telugu text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8B923] tracking-tight leading-tight drop-shadow-md">
                కుండ పగలగొట్టు
              </h1>
              <div className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6EEDD] tracking-wider leading-tight">
                Crack Your Pot &bull; Win Big
              </div>
            </div>

            {/* Subtext mentioning Grand Prize for 180 Pot Crackers */}
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-[#F6EEDD]/90 max-w-xl mx-auto font-normal leading-relaxed">
              Submit your devotee details, personalize your earthen pot, tap &amp; share to soften the sacred clay, and enter the{' '}
              <span className="text-[#E8B923] font-bold underline decoration-[#E8B923]/60 underline-offset-4">
                Grand Cash Draw
              </span>{' '}
              for <span className="text-[#F6EEDD] font-bold">180 Lucky Pot Crackers</span> (₹1,000 x 10, ₹500 x 20, ₹200 x 50, ₹100 x 100) on <span className="text-[#F6EEDD] font-semibold">10th September</span>!
            </p>

            {/* Devotee Status Pill or Lead Capture Callout */}
            {devoteeProfile ? (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#080E24] border border-emerald-500/50 text-emerald-300 text-xs font-semibold shadow">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Active Devotee: <strong>{devoteeProfile.name}</strong> ({devoteeProfile.customPotName || 'Blessed Kunda'})</span>
              </div>
            ) : (
              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-medium">
                <Flame className="w-3.5 h-3.5 text-[#E8B923]" />
                <span>100% Free Utlotsavam Celebration &bull; Instant Win Guarantee + Grand Cash Draw Entry</span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                id="hero-cta-claim-pot"
                onClick={onRequestClaim}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-base sm:text-lg tracking-wide flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer shadow-[0_0_25px_rgba(232,185,35,0.4)]"
              >
                <NemaliIcon className="w-5 h-5" />
                <span>Crack Your Pot (కుండను పగలగొట్టండి)</span>
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                id="hero-cta-pick-pot"
                onClick={onPickPotClick}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#0B1230]/80 border border-[#E8B923]/40 text-[#F6EEDD] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-[#14224A] transition-all cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#E8B923]" />
                <span>Explore Pot Tiers</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 pt-4 border-t border-[#E8B923]/20 flex items-center justify-center gap-6 text-xs text-[#F6EEDD]/75">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1B7A6E]" />
                <span>100% Instant Win Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#E8B923]">✦</span>
                <span>180 Verified Cash Winners</span>
              </div>
            </div>
          </TempleArchFrame>
        </div>

        {/* Auspicious Rangoli Divider */}
        <div className="w-full max-w-md mt-4">
          <RangoliDivider />
        </div>

        {/* Scroll down hint */}
        <button
          onClick={onPickPotClick}
          className="mt-4 flex flex-col items-center gap-1 text-xs text-[#E8B923]/80 hover:text-[#E8B923] transition-colors cursor-pointer"
        >
          <span>Select your Matka below</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
