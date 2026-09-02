import React from 'react';
import { Volume2, VolumeX, Ticket, Sparkles, Layers } from 'lucide-react';
import { PeacockFeatherIcon, FluteMotif, NemaliIcon } from './SvgMotifs';

interface NavbarProps {
  ticketCount: number;
  claimedPotsCount: number;
  onOpenMyPots: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenRules: () => void;
  currentView?: 'dashboard' | 'thankyou';
  onNavigateView?: (view: 'dashboard' | 'thankyou') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  ticketCount,
  claimedPotsCount,
  onOpenMyPots,
  soundEnabled,
  onToggleSound,
  onOpenRules,
  currentView = 'dashboard',
  onNavigateView,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0B1230]/90 border-b border-[#E8B923]/25 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between transition-all">
      {/* Brand Mark */}
      <button
        onClick={() => (onNavigateView ? onNavigateView('dashboard') : undefined)}
        className="flex items-center gap-3 group text-left cursor-pointer bg-transparent border-0"
      >
        <div className="relative flex items-center justify-center">
          <PeacockFeatherIcon className="w-8 h-10 filter drop-shadow-[0_0_8px_rgba(232,185,35,0.4)] group-hover:scale-105 transition-transform" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-lg sm:text-xl text-[#F6EEDD] tracking-wide">
              Crack Your Pot
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8B923]/20 text-[#E8B923] border border-[#E8B923]/40 font-semibold uppercase">
              2026
            </span>
          </div>
          <span className="font-telugu text-xs text-[#E8B923]/90 font-medium -mt-0.5">
            కుండ పగలగొట్టు &bull; Janmashtami
          </span>
        </div>
      </button>

      {/* Center Nav Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#F6EEDD]/80">
        <button
          onClick={() => onNavigateView && onNavigateView('dashboard')}
          className={`hover:text-[#E8B923] transition-colors cursor-pointer ${
            currentView === 'dashboard' ? 'text-[#E8B923] font-bold' : ''
          }`}
        >
          Dashboard
        </button>
        {currentView === 'dashboard' ? (
          <>
            <a href="#pots-selection" className="hover:text-[#E8B923] transition-colors">
              Pick Pot
            </a>
            <a href="#crack-interactive-arena" className="hover:text-[#E8B923] transition-colors">
              Crack Arena
            </a>
            <a href="#prize-tiers-section" className="hover:text-[#E8B923] transition-colors">
              Prize Tiers
            </a>
            <a href="#countdown-section" className="hover:text-[#E8B923] transition-colors text-[#E8B923]">
              180 Winners Draw
            </a>
          </>
        ) : (
          <button
            onClick={() => onNavigateView && onNavigateView('thankyou')}
            className="text-[#E8B923] font-bold cursor-pointer"
          >
            Thank You Page
          </button>
        )}
      </nav>

      {/* Right Actions: My Pots, Sound, Tickets, & Terms */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* MY POTS NAV BUTTON (Browser Persisted) */}
        <button
          id="nav-my-pots-btn"
          onClick={onOpenMyPots}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#1B7A6E]/40 to-[#14224A] hover:brightness-110 border border-[#E8B923]/40 text-xs sm:text-sm text-[#F6EEDD] font-bold cursor-pointer transition-all shadow"
        >
          <NemaliIcon className="w-4 h-4 text-[#E8B923]" />
          <span>My Pots</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#E8B923] text-[#0B1230] font-mono text-[10px] font-black">
            {claimedPotsCount}
          </span>
        </button>

        {/* Ticket Wallet Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14224A] border border-[#E8B923]/30 text-xs sm:text-sm text-[#F6EEDD]">
          <Ticket className="w-4 h-4 text-[#E8B923]" />
          <span className="hidden sm:inline text-[#F6EEDD]/75">Tickets:</span>
          <span className="font-bold font-mono text-[#E8B923]">{ticketCount}</span>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Festive Audio' : 'Enable Festive Audio'}
          className="p-2 rounded-xl bg-[#14224A] border border-[#E8B923]/30 text-[#E8B923] hover:bg-[#1B7A6E]/30 transition-colors cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
        </button>

        {/* Rules Button */}
        <button
          onClick={onOpenRules}
          className="hidden lg:block text-xs font-semibold text-[#F6EEDD]/75 hover:text-[#E8B923] underline underline-offset-4 cursor-pointer"
        >
          Rules (T&C)
        </button>
      </div>
    </header>
  );
};
