import React from 'react';
import { PeacockFeatherIcon, FluteMotif, DiyaLamp, RangoliDivider } from './SvgMotifs';
import { ShieldCheck, Heart, Share2, Sparkles, Scale } from 'lucide-react';

interface FooterProps {
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms }) => {
  return (
    <footer className="relative bg-[#060B1E] border-t border-[#E8B923]/25 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#F6EEDD] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,34,74,0.6),rgba(6,11,30,0.9))] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E8B923]/20">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <PeacockFeatherIcon className="w-9 h-12" />
              <div>
                <span className="font-display font-bold text-2xl text-[#F6EEDD] tracking-wide block">
                  Crack Your Pot
                </span>
                <span className="font-telugu text-sm text-[#E8B923] font-medium">
                  కుండ పగలగొట్టు &bull; Sri Krishna Janmashtami
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F6EEDD]/75 leading-relaxed max-w-sm">
              Celebrating Krishna’s childhood Dahi Handi tradition with auspicious rewards, guaranteed instant surprises, and the Grand Cash Draw for 180 Lucky Pot Crackers.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-[#E8B923]">
              <Sparkles className="w-4 h-4" />
              <span>Auspicious festival greetings &bull; శుభ జన్మాష్టమి శుభాకాంక్షలు</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-lg font-bold text-[#E8B923]">Campaign Sections</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F6EEDD]/75">
              <li>
                <a href="#hero-section" className="hover:text-[#E8B923] transition-colors">
                  Home & Hero
                </a>
              </li>
              <li>
                <a href="#pots-selection" className="hover:text-[#E8B923] transition-colors">
                  Venna & Uyyala Pots
                </a>
              </li>
              <li>
                <a href="#crack-interactive-arena" className="hover:text-[#E8B923] transition-colors">
                  3D Crack Arena
                </a>
              </li>
              <li>
                <a href="#referral-boost-section" className="hover:text-[#E8B923] transition-colors">
                  Referral Strength Meter
                </a>
              </li>
              <li>
                <a href="#prize-tiers-section" className="hover:text-[#E8B923] transition-colors">
                  Prize Tiers & Odds
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Tax Compliance & Terms */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-lg font-bold text-[#E8B923] flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#E8B923]" />
              <span>Tax & Compliance</span>
            </h4>
            <p className="text-xs text-[#F6EEDD]/70 leading-relaxed">
              Prizes above ₹10,000 are subject to 30% TDS under Section 194B of the Indian Income Tax Act. All virtual pot purchases are strictly for festive lucky draw engagement.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenTerms}
                className="px-4 py-2 rounded-lg bg-[#14224A] border border-[#E8B923]/30 text-xs font-semibold text-[#E8B923] hover:bg-[#1B7A6E]/30 transition-all cursor-pointer"
              >
                Read Official Terms & Conditions
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Devotional note */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F6EEDD]/60">
          <div className="flex items-center gap-1">
            <span>May Lord Krishna bless you with joy, health, and prosperity.</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenTerms} className="hover:text-[#E8B923] underline cursor-pointer">
              Terms of Use
            </button>
            <span>&bull;</span>
            <button onClick={onOpenTerms} className="hover:text-[#E8B923] underline cursor-pointer">
              Privacy Policy
            </button>
            <span>&bull;</span>
            <span>&copy; 2026 Sri Krishna Janmashtami Campaign</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
