import React, { useState, useEffect } from 'react';
import { PotCrackerWinner } from '../types';
import { Trophy, Sparkles, Flame, Users, Search, ChevronRight, CheckCircle2, Award, Zap } from 'lucide-react';
import { PeacockFeatherIcon } from './SvgMotifs';

const INITIAL_CRACKERS: PotCrackerWinner[] = [
  {
    id: 'c-1',
    name: 'Sai Krishna Varma',
    city: 'Hyderabad',
    potType: 'uyyala',
    prizeTitle: '₹1,000 Grand Prize Draw Winner',
    prizeTier: '₹1,000 Grand',
    ticketId: 'GPD-2026-904128',
    timeAgo: 'Just now',
    avatarBg: '#E8B923',
  },
  {
    id: 'c-2',
    name: 'Ananya Reddy',
    city: 'Vijayawada',
    potType: 'uyyala',
    prizeTitle: '₹1,000 Grand Prize Draw Winner',
    prizeTier: '₹1,000 Grand',
    ticketId: 'GPD-2026-782194',
    timeAgo: '1m ago',
    avatarBg: '#C6296F',
  },
  {
    id: 'c-3',
    name: 'Ravi Teja',
    city: 'Visakhapatnam',
    potType: 'uyyala',
    prizeTitle: '₹500 Cash Prize Winner',
    prizeTier: '₹500 Tier',
    ticketId: 'GPD-2026-349012',
    timeAgo: '3m ago',
    avatarBg: '#1B7A6E',
  },
  {
    id: 'c-4',
    name: 'Pooja Rao',
    city: 'Tirupati',
    potType: 'uyyala',
    prizeTitle: '₹1,000 Grand Prize Draw Winner',
    prizeTier: '₹1,000 Grand',
    ticketId: 'GPD-2026-881240',
    timeAgo: '4m ago',
    avatarBg: '#B8860B',
  },
  {
    id: 'c-5',
    name: 'Gopal Krishna V.',
    city: 'Bengaluru',
    potType: 'venna',
    prizeTitle: '₹500 Cash Prize Winner',
    prizeTier: '₹500 Tier',
    ticketId: 'GPD-2026-554109',
    timeAgo: '6m ago',
    avatarBg: '#C6296F',
  },
  {
    id: 'c-6',
    name: 'Divya Sharma',
    city: 'Guntur',
    potType: 'venna',
    prizeTitle: '₹200 Cash Prize Winner',
    prizeTier: '₹200 Tier',
    ticketId: 'GPD-2026-621804',
    timeAgo: '8m ago',
    avatarBg: '#1B7A6E',
  },
  {
    id: 'c-7',
    name: 'Kavitha M.',
    city: 'Warangal',
    potType: 'uyyala',
    prizeTitle: '₹500 Cash Prize Winner',
    prizeTier: '₹500 Tier',
    ticketId: 'GPD-2026-193481',
    timeAgo: '10m ago',
    avatarBg: '#E8B923',
  },
  {
    id: 'c-8',
    name: 'Harsha Vardhan',
    city: 'Chennai',
    potType: 'venna',
    prizeTitle: '₹200 Cash Prize Winner',
    prizeTier: '₹200 Tier',
    ticketId: 'GPD-2026-440219',
    timeAgo: '12m ago',
    avatarBg: '#8F3B1E',
  },
  {
    id: 'c-9',
    name: 'Deepika Murthy',
    city: 'Kurnool',
    potType: 'uyyala',
    prizeTitle: '₹1,000 Grand Prize Draw Winner',
    prizeTier: '₹1,000 Grand',
    ticketId: 'GPD-2026-773192',
    timeAgo: '15m ago',
    avatarBg: '#1B7A6E',
  },
  {
    id: 'c-10',
    name: 'Manoj Kumar',
    city: 'Nellore',
    potType: 'venna',
    prizeTitle: '₹100 Cash Prize Winner',
    prizeTier: '₹100 Tier',
    ticketId: 'GPD-2026-118493',
    timeAgo: '18m ago',
    avatarBg: '#C6296F',
  },
  {
    id: 'c-11',
    name: 'Swathi K.',
    city: 'Nizamabad',
    potType: 'uyyala',
    prizeTitle: '₹500 Cash Prize Winner',
    prizeTier: '₹500 Tier',
    ticketId: 'GPD-2026-921473',
    timeAgo: '21m ago',
    avatarBg: '#E8B923',
  },
  {
    id: 'c-12',
    name: 'Raghavendra Rao',
    city: 'Kakinada',
    potType: 'venna',
    prizeTitle: '₹200 Cash Prize Winner',
    prizeTier: '₹200 Tier',
    ticketId: 'GPD-2026-830219',
    timeAgo: '24m ago',
    avatarBg: '#1B7A6E',
  },
  {
    id: 'c-13',
    name: 'Sowmya Lakshmi',
    city: 'Rajahmundry',
    potType: 'venna',
    prizeTitle: '₹100 Cash Prize Winner',
    prizeTier: '₹100 Tier',
    ticketId: 'GPD-2026-302198',
    timeAgo: '27m ago',
    avatarBg: '#B8860B',
  },
  {
    id: 'c-14',
    name: 'Bhanu Prasad',
    city: 'Anantapur',
    potType: 'uyyala',
    prizeTitle: '₹1,000 Grand Prize Draw Winner',
    prizeTier: '₹1,000 Grand',
    ticketId: 'GPD-2026-492103',
    timeAgo: '30m ago',
    avatarBg: '#C6296F',
  },
  {
    id: 'c-15',
    name: 'Naveen Chary',
    city: 'Karimnagar',
    potType: 'venna',
    prizeTitle: '₹100 Cash Prize Winner',
    prizeTier: '₹100 Tier',
    ticketId: 'GPD-2026-218493',
    timeAgo: '33m ago',
    avatarBg: '#1B7A6E',
  },
  {
    id: 'c-16',
    name: 'Radhika G.',
    city: 'Eluru',
    potType: 'venna',
    prizeTitle: '₹200 Cash Prize Winner',
    prizeTier: '₹200 Tier',
    ticketId: 'GPD-2026-671049',
    timeAgo: '36m ago',
    avatarBg: '#E8B923',
  },
  {
    id: 'c-17',
    name: 'Tarun V.',
    city: 'Kadapa',
    potType: 'uyyala',
    prizeTitle: '₹1,000 Grand Prize Draw Winner',
    prizeTier: '₹1,000 Grand',
    ticketId: 'GPD-2026-802194',
    timeAgo: '39m ago',
    avatarBg: '#8F3B1E',
  },
  {
    id: 'c-18',
    name: 'Manasa B.',
    city: 'Srikakulam',
    potType: 'venna',
    prizeTitle: '₹100 Cash Prize Winner',
    prizeTier: '₹100 Tier',
    ticketId: 'GPD-2026-591024',
    timeAgo: '42m ago',
    avatarBg: '#C6296F',
  },
  {
    id: 'c-19',
    name: 'Aditya Narayana',
    city: 'Vizianagaram',
    potType: 'uyyala',
    prizeTitle: '₹500 Cash Prize Winner',
    prizeTier: '₹500 Tier',
    ticketId: 'GPD-2026-319208',
    timeAgo: '45m ago',
    avatarBg: '#1B7A6E',
  },
  {
    id: 'c-20',
    name: 'Lakshmi Prasanna',
    city: 'Ongole',
    potType: 'uyyala',
    prizeTitle: '₹1,000 Grand Prize Draw Winner',
    prizeTier: '₹1,000 Grand',
    ticketId: 'GPD-2026-749102',
    timeAgo: '48m ago',
    avatarBg: '#E8B923',
  },
];

interface PotCrackersLiveTickerProps {
  onPickPotClick?: () => void;
}

export const PotCrackersLiveTicker: React.FC<PotCrackersLiveTickerProps> = ({ onPickPotClick }) => {
  const [crackers, setCrackers] = useState<PotCrackerWinner[]>(INITIAL_CRACKERS);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [liveCount, setLiveCount] = useState<number>(1842);

  // Periodically add subtle live dynamic cracker entries
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => prev + 1);
      const sampleNames = [
        'Karthik Reddy', 'Sushma V.', 'Madhav Krishna', 'Geetha Rani',
        'Praneeth Kumar', 'Bhavani Shankar', 'Tejaswini M.', 'Chaitanya R.'
      ];
      const sampleCities = [
        'Hyderabad', 'Vijayawada', 'Bengaluru', 'Tirupati', 'Visakhapatnam', 'Warangal', 'Guntur'
      ];
      const tiers: ('₹1,000 Grand' | '₹500 Tier' | '₹200 Tier' | '₹100 Tier')[] = [
        '₹1,000 Grand', '₹500 Tier', '₹200 Tier', '₹100 Tier'
      ];
      const randomTier = tiers[Math.floor(Math.random() * tiers.length)];
      const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
      const randomCity = sampleCities[Math.floor(Math.random() * sampleCities.length)];
      const colors = ['#E8B923', '#C6296F', '#1B7A6E', '#B8860B', '#8F3B1E'];

      const newEntry: PotCrackerWinner = {
        id: `c-live-${Date.now()}`,
        name: randomName,
        city: randomCity,
        potType: randomTier === '₹1,000 Grand' || randomTier === '₹500 Tier' ? 'uyyala' : 'venna',
        prizeTitle: randomTier === '₹1,000 Grand' ? '₹1,000 Grand Draw Winner (10 Pots)' : `${randomTier} Winner`,
        prizeTier: randomTier,
        ticketId: `GPD-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        timeAgo: 'Just now',
        avatarBg: colors[Math.floor(Math.random() * colors.length)],
      };

      setCrackers((prev) => [newEntry, ...prev.slice(0, 40)]);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  const filteredCrackers = crackers.filter((c) => {
    const matchesQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ticketId.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;
    if (selectedFilter === 'all') return true;
    if (selectedFilter === '1000') return c.prizeTier === '₹1,000 Grand';
    if (selectedFilter === '500') return c.prizeTier === '₹500 Tier';
    if (selectedFilter === '200') return c.prizeTier === '₹200 Tier';
    if (selectedFilter === '100') return c.prizeTier === '₹100 Tier';
    return true;
  });

  return (
    <section id="pot-crackers-hall-of-fame" className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Top Banner Ribbon */}
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#14224A]/95 via-[#0B1230] to-[#14224A]/95 border border-[#E8B923]/30 shadow-xl overflow-hidden relative">
        
        {/* Glow Accents */}
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-[#E8B923]/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-[#C6296F]/10 blur-2xl pointer-events-none" />

        {/* Header with Live Pulse */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E8B923]/20 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE POT CRACKERS</span>
            </div>

            <div className="text-xs sm:text-sm text-[#F6EEDD]/90 flex items-center gap-2">
              <span className="font-bold text-[#E8B923] font-mono">{liveCount.toLocaleString()}+</span>
              <span>Pots Cracked by Devotees</span>
            </div>
          </div>

          {/* Quick Drawer / Full List Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#F6EEDD]/60 hidden md:inline">
              180 Grand Draw Winners (₹1,000 x 10, ₹500 x 20, ₹200 x 50, ₹100 x 100)
            </span>
            <button
              id="btn-view-all-crackers"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="px-3 py-1.5 rounded-lg bg-[#E8B923]/15 border border-[#E8B923]/40 text-[#E8B923] text-xs font-semibold hover:bg-[#E8B923]/25 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>{isDrawerOpen ? 'Close Hall of Fame' : 'View Full List'}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isDrawerOpen ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Continuous Animated Horizontal Marquee / Scrollable Names Stream */}
        <div className="relative overflow-hidden py-3 group">
          {/* Edge Fade Masks */}
          <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[#0B1230] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#0B1230] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Ticker Track */}
          <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
            {crackers.slice(0, 15).map((cracker) => (
              <div
                key={cracker.id}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#0B1230]/90 border border-[#E8B923]/30 shadow-md shrink-0 hover:border-[#E8B923] transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-inner"
                  style={{ backgroundColor: cracker.avatarBg }}
                >
                  {cracker.name.charAt(0)}
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs sm:text-sm text-[#F6EEDD]">
                      {cracker.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#14224A] text-[#F6EEDD]/70 border border-[#E8B923]/20">
                      {cracker.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span
                      className={`font-semibold ${
                        cracker.prizeTier === '₹1,000 Grand'
                          ? 'text-[#E8B923]'
                          : cracker.prizeTier === '₹500 Tier'
                          ? 'text-[#C6296F]'
                          : 'text-[#1B7A6E]'
                      }`}
                    >
                      {cracker.prizeTitle}
                    </span>
                    <span className="text-[#F6EEDD]/50 font-mono">#{cracker.ticketId.slice(-6)}</span>
                  </div>
                </div>

                <span className="text-[10px] text-[#E8B923]/70 font-mono ml-1">
                  {cracker.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded Interactive Hall of Fame Drawer */}
        {isDrawerOpen && (
          <div className="mt-4 pt-4 border-t border-[#E8B923]/20 animate-in fade-in duration-300">
            {/* Filter Tabs & Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Crackers' },
                  { id: '1000', label: '₹1,000 Grand (10)' },
                  { id: '500', label: '₹500 Tier (20)' },
                  { id: '200', label: '₹200 Tier (50)' },
                  { id: '100', label: '₹100 Tier (100)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedFilter === tab.id
                        ? 'bg-[#E8B923] text-[#0B1230] shadow'
                        : 'bg-[#0B1230] text-[#F6EEDD]/80 border border-[#E8B923]/20 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative max-w-xs w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#F6EEDD]/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, city, ticket ID..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#0B1230] border border-[#E8B923]/30 text-xs text-[#F6EEDD] placeholder-[#F6EEDD]/40 focus:outline-none focus:border-[#E8B923]"
                />
              </div>
            </div>

            {/* Scrollable Grid of Lucky Pot Crackers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-72 overflow-y-auto pr-1">
              {filteredCrackers.map((cracker) => (
                <div
                  key={cracker.id}
                  className="p-3 rounded-xl bg-[#0B1230]/80 border border-[#E8B923]/20 flex flex-col justify-between hover:border-[#E8B923]/60 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-inner"
                        style={{ backgroundColor: cracker.avatarBg }}
                      >
                        {cracker.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#F6EEDD] leading-tight">
                          {cracker.name}
                        </div>
                        <div className="text-[10px] text-[#F6EEDD]/60">{cracker.city}</div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        cracker.prizeTier === '₹1,000 Grand'
                          ? 'bg-[#E8B923]/20 text-[#E8B923] border border-[#E8B923]/40'
                          : cracker.prizeTier === '₹500 Tier'
                          ? 'bg-[#C6296F]/20 text-[#C6296F] border border-[#C6296F]/40'
                          : 'bg-[#1B7A6E]/20 text-[#1B7A6E] border border-[#1B7A6E]/40'
                      }`}
                    >
                      {cracker.prizeTier}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#E8B923]/10 flex items-center justify-between text-[10px] text-[#F6EEDD]/70">
                    <span className="font-mono text-[#E8B923]">{cracker.ticketId}</span>
                    <span>{cracker.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredCrackers.length === 0 && (
              <div className="text-center py-6 text-xs text-[#F6EEDD]/60">
                No pot crackers found matching "{searchQuery}".
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
