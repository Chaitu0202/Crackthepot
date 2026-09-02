import React from 'react';
import { TempleArchFrame, PeacockFeatherIcon, FluteMotif, DiyaLamp, NemaliIcon, RadhaKrishnaDivineMotif } from './SvgMotifs';
import { Sparkles, ArrowRight, ShieldCheck, Gift, CreditCard } from 'lucide-react';
import { PotId, POT_TIERS } from '../types';

interface HeroSectionProps {
  onSelectPot: (potId: PotId) => void;
  onPayVennaKunda: () => void;
  selectedPotId: PotId;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectPot,
  onPayVennaKunda,
  selectedPotId,
}) => {
  return (
    <section
      id="hero-section"
      className="relative flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Vrindavan Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060B1E] via-[#0E1838] to-[#080E24] pointer-events-none" />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-[#1B7A6E]/15 via-[#E8B923]/10 to-[#C6296F]/15 blur-3xl rounded-full pointer-events-none" />

      {/* Flanking Festive Diyas on Desktop */}
      <div className="hidden lg:block absolute left-8 top-1/3 -translate-y-1/2 opacity-75 pointer-events-none">
        <DiyaLamp label="Midnight Joy" className="w-10 h-10" />
      </div>
      <div className="hidden lg:block absolute right-8 top-1/3 -translate-y-1/2 opacity-75 pointer-events-none">
        <DiyaLamp label="Grand Draw" className="w-10 h-10" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Divine Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14224A]/90 border border-[#E8B923]/40 text-[#E8B923] text-xs sm:text-sm font-semibold tracking-wide mb-3 shadow-lg">
          <NemaliIcon className="w-4 h-4 text-[#E8B923]" />
          <span>శ్రీకృష్ణ జన్మాష్టమి ఉట్లోత్సవం 2026 &bull; Utlotsavam</span>
          <Sparkles className="w-3.5 h-3.5 text-[#E8B923]" />
        </div>

        {/* Radha Krishna Divine Motif */}
        <div className="w-full max-w-md mx-auto -mb-4 opacity-90">
          <RadhaKrishnaDivineMotif className="w-full h-auto drop-shadow-[0_0_20px_rgba(232,185,35,0.25)]" />
        </div>

        {/* Clean Center Header Frame */}
        <div className="relative w-full max-w-3xl mx-auto py-2">
          <TempleArchFrame className="w-full py-6 sm:py-8 px-4 sm:px-8 rounded-3xl bg-[#0E1838]/85 backdrop-blur-md border border-[#E8B923]/35 shadow-[0_0_40px_rgba(232,185,35,0.2)]">
            {/* Peacock Feather + Flute Motif */}
            <div className="flex flex-col items-center justify-center gap-1 mb-2">
              <PeacockFeatherIcon className="w-10 h-14 sm:w-12 sm:h-16 filter drop-shadow-[0_0_10px_rgba(232,185,35,0.6)]" />
              <div className="w-36 sm:w-44">
                <FluteMotif className="w-full h-auto" />
              </div>
            </div>

            {/* Main Headline: Clean & Direct without long stories */}
            <div className="space-y-1">
              <h1 className="font-telugu text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8B923] tracking-tight leading-tight drop-shadow-md">
                కుండ పగలగొట్టు
              </h1>
              <div className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
                Crack Your Pot &bull; Win Big
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-[#F6EEDD]/80 max-w-lg mx-auto">
              Choose your sacred earthen pot below, tap &amp; share to soften the clay, and win instant festive hampers + entry into the 180 Cash Draw!
            </p>

            {/* DIRECT POT OPTIONS (Venna Kunda ₹5 & Uyyala Kunda Free) - NO DETAILS ASKED */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
              {/* Option 1: Venna Kunda (₹5) */}
              <div
                id="hero-venna-kunda-card"
                onClick={() => onSelectPot('venna')}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  selectedPotId === 'venna'
                    ? 'bg-gradient-to-b from-[#14224A] to-[#0A122C] border-2 border-[#E8B923] shadow-[0_0_25px_rgba(232,185,35,0.35)]'
                    : 'bg-[#080E24]/80 border-[#E8B923]/30 hover:border-[#E8B923]/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#E8B923]/25 text-[#FFE27A] border border-[#E8B923]/40 uppercase tracking-wider">
                      ₹5 Offering &bull; 1x Ticket
                    </span>
                    <span className="text-[#E8B923] font-bold text-sm">₹5</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                    Venna Kunda (వెన్న కుండ)
                  </h3>
                  <p className="text-xs text-[#E8B923] font-telugu font-semibold">
                    శ్రీకృష్ణుడి వెన్న కుండ
                  </p>
                  <p className="text-xs text-[#F6EEDD]/75 mt-1.5 leading-relaxed">
                    Fresh festive Makhan, sweet discount voucher &amp; 1x Grand Cash Draw entry.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8B923]/20">
                  <button
                    id="btn-hero-pay-venna-kunda"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPayVennaKunda();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-95 transition-all shadow cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ₹5 &amp; Crack Venna Kunda</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Option 2: Uyyala Kunda (Free) */}
              <div
                id="hero-uyyala-kunda-card"
                onClick={() => onSelectPot('uyyala')}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  selectedPotId === 'uyyala'
                    ? 'bg-gradient-to-b from-[#221238] via-[#1A143A] to-[#0A122C] border-2 border-[#C6296F] shadow-[0_0_30px_rgba(198,41,111,0.4)]'
                    : 'bg-[#080E24]/80 border-[#E8B923]/30 hover:border-[#C6296F]/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#C6296F] to-[#E8B923] text-white uppercase tracking-wider">
                      Free &bull; 3x Tickets
                    </span>
                    <span className="text-emerald-400 font-bold text-xs uppercase">Free</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                    Uyyala Kunda (ఉయ్యాల కుండ)
                  </h3>
                  <p className="text-xs text-[#FFE27A] font-telugu font-semibold">
                    ఉయ్యాల కుండ &bull; గరిష్ట రివార్డులు
                  </p>
                  <p className="text-xs text-[#F6EEDD]/75 mt-1.5 leading-relaxed">
                    Swinging silk matka with royal sweets, hampers &amp; 3x Grand Cash Draw tickets.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#C6296F]/30">
                  <button
                    id="btn-hero-crack-uyyala-kunda"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPot('uyyala');
                      const el = document.getElementById('crack-interactive-arena');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C6296F] via-[#E8B923] to-[#C6296F] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-95 transition-all shadow cursor-pointer"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Crack Uyyala Kunda (Free)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="mt-5 pt-3 border-t border-[#E8B923]/20 flex items-center justify-center gap-4 sm:gap-6 text-[11px] text-[#F6EEDD]/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>No registration forms needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#E8B923]">✦</span>
                <span>Instant Festive Hamper Wins</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#E8B923]">✦</span>
                <span>180 Grand Cash Winners</span>
              </div>
            </div>
          </TempleArchFrame>
        </div>
      </div>
    </section>
  );
};
