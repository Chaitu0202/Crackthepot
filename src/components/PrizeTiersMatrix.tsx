import React from 'react';
import { Gift, Sparkles, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { PeacockFeatherIcon, NemaliIcon } from './SvgMotifs';

interface PrizeTiersMatrixProps {
  onSelectTier: (potId: 'venna' | 'uyyala') => void;
}

export const PrizeTiersMatrix: React.FC<PrizeTiersMatrixProps> = ({ onSelectTier }) => {
  return (
    <section
      id="prize-tiers-section"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#F6EEDD]"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-wider mb-3">
          <Gift className="w-3.5 h-3.5" />
          <span>Auspicious Janmashtami Pot Tiers</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F6EEDD]">
          Prize Tiers &amp; Festive Rewards
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#F6EEDD]/80 max-w-xl mx-auto">
          Every pot broken guarantees an instant reward plus verified entries into the Grand Prize Cash Draw (180 Winners share ₹1,000, ₹500, ₹200, &amp; ₹100 cash tiers) on 10th September!
        </p>
      </div>

      {/* Two-Column Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Tier 1: Venna Kunda (Casual / ₹5 Offering) */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#14224A]/70 border border-[#E8B923]/30 backdrop-blur-sm flex flex-col justify-between shadow-xl relative group hover:border-[#E8B923]/60 transition-all">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-[#E8B923] uppercase tracking-wider">
                Festive Offering Pot
              </span>
              <span className="px-3 py-1 rounded-full bg-[#E8B923]/25 text-[#FFE27A] border border-[#E8B923]/50 text-xs font-black">
                ₹5 OFFERING
              </span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#F6EEDD]">
              Venna Kunda (వెన్న కుండ)
            </h3>
            <p className="text-xs sm:text-sm text-[#F6EEDD]/75 mt-1">
              Perfect for casual lucky dips, sweet hampers &amp; ₹5 offering draw entry.
            </p>

            {/* Rewards Breakdown */}
            <div className="mt-6 space-y-3.5">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1230]/60 border border-[#E8B923]/15">
                <CheckCircle2 className="w-5 h-5 text-[#E8B923] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-[#F6EEDD] block">5% – 15% Flat Discount</span>
                  <span className="text-xs text-[#F6EEDD]/70">Valid across festive grocery, traditional sweets &amp; clothes.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1230]/60 border border-[#E8B923]/15">
                <CheckCircle2 className="w-5 h-5 text-[#E8B923] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-[#F6EEDD] block">Free Shipping &amp; Sweets Sample</span>
                  <span className="text-xs text-[#F6EEDD]/70">Zero delivery fee coupon + trial pack of A2 cow ghee sweets.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1230]/60 border border-[#E8B923]/15">
                <CheckCircle2 className="w-5 h-5 text-[#E8B923] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-[#F6EEDD] block">1 Grand Prize Draw Entry</span>
                  <span className="text-xs text-[#F6EEDD]/70">Entry for ₹1,000, ₹500, ₹200 &amp; ₹100 cash draw tiers (180 winners).</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1230]/60 border border-[#E8B923]/15">
                <CheckCircle2 className="w-5 h-5 text-[#E8B923] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-[#F6EEDD] block">Instant ₹50 Cashback Coupons</span>
                  <span className="text-xs text-[#F6EEDD]/70">Random drop rate on first pot broken.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              id="btn-select-venna-tier"
              onClick={() => onSelectTier('venna')}
              className="w-full py-3.5 px-6 rounded-xl bg-[#E8B923] text-[#0B1230] font-bold text-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow flex items-center justify-center gap-2"
            >
              <span>Pay ₹5 &amp; Select Venna Kunda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tier 2: Uyyala Kunda (Royal / Free) */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#1A1A3A]/90 via-[#14224A]/95 to-[#0B1230]/90 border-2 border-[#C6296F] backdrop-blur-sm flex flex-col justify-between shadow-[0_0_35px_rgba(198,41,111,0.25)] relative group hover:shadow-[0_0_45px_rgba(198,41,111,0.4)] transition-all">
          {/* Top Pill */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-[#C6296F] via-[#E8B923] to-[#C6296F] text-[#0B1230] text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow">
            <Sparkles className="w-3 h-3 text-[#0B1230]" />
            <span>Royal Tier &bull; 3x Draw Entries</span>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-[#C6296F] uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                Royal Festive Pot
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
                FREE CLAIM
              </span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#F6EEDD] flex items-center justify-between">
              <span>Uyyala Kunda (ఉయ్యాల కుండ)</span>
              <PeacockFeatherIcon className="w-7 h-9" />
            </h3>
            <p className="text-xs sm:text-sm text-[#F6EEDD]/80 mt-1">
              Maximum reward multipliers, luxury gift boxes, and 3x grand tickets.
            </p>

            {/* Rewards Breakdown */}
            <div className="mt-6 space-y-3.5">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1230]/70 border border-[#C6296F]/30">
                <CheckCircle2 className="w-5 h-5 text-[#C6296F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-[#F6EEDD] block">25% – 50% Luxury Hamper Off</span>
                  <span className="text-xs text-[#F6EEDD]/70">Premium organic sweets, brass lamps, and pooja silver gifts.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1230]/70 border border-[#C6296F]/30">
                <CheckCircle2 className="w-5 h-5 text-[#C6296F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-[#F6EEDD] block">₹150 – ₹250 Instant Cashback</span>
                  <span className="text-xs text-[#F6EEDD]/70">Direct festive credits + souvenir Krishna flute keepsake.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1230]/70 border border-[#C6296F]/30">
                <CheckCircle2 className="w-5 h-5 text-[#C6296F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-[#C6296F] font-bold block">3x Grand Prize Draw Entries</span>
                  <span className="text-xs text-[#F6EEDD]/70">Triples your odds in the ₹1,000, ₹500, ₹200 &amp; ₹100 draw!</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0B1230]/70 border border-[#C6296F]/30">
                <CheckCircle2 className="w-5 h-5 text-[#C6296F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-semibold text-[#F6EEDD] block">1-in-100 Rare Mega Gift Pass</span>
                  <span className="text-xs text-[#F6EEDD]/70">Bonus opportunity for silver idol &amp; festive hampers.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              id="btn-select-uyyala-tier"
              onClick={() => onSelectTier('uyyala')}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C6296F] via-[#E8B923] to-[#C6296F] text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <span>Select Uyyala Kunda (Free)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
