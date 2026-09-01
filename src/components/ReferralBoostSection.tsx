import React, { useState } from 'react';
import { Share2, Users, Copy, Check, Sparkles, UserPlus, Flame, Gift } from 'lucide-react';
import { ReferralFriend } from '../types';
import { RangoliDivider, WhatsAppIcon, InstagramIcon } from './SvgMotifs';

interface ReferralBoostProps {
  userTickets: string[];
  onAddBonusTicket: (newTicket: string) => void;
}

export const ReferralBoostSection: React.FC<ReferralBoostProps> = ({
  userTickets,
  onAddBonusTicket,
}) => {
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(50); // Initial 50%
  const [friends, setFriends] = useState<ReferralFriend[]>([
    { id: '1', name: 'Ravi Teja', avatarColor: '#1B7A6E', boostAdded: 20, timeAgo: '2m ago' },
    { id: '2', name: 'Ananya S.', avatarColor: '#C6296F', boostAdded: 20, timeAgo: '12m ago' },
  ]);

  const referralCode = 'KRISHNA-LUCKY-7729';
  const referralUrl = `${window.location.origin}/#crack-interactive-arena?ref=${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const simulateFriendBoost = () => {
    const friendNames = [
      'Sai Kumar',
      'Pooja Rao',
      'Harsha Vardhan',
      'Divya Reddy',
      'Gopal Krishna',
      'Kavitha M.',
    ];
    const randomName = friendNames[Math.floor(Math.random() * friendNames.length)];
    const avatarColors = ['#1B7A6E', '#C6296F', '#E8B923', '#8F3B1E'];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newStrength = Math.min(strength + 20, 100);
    setStrength(newStrength);

    const newFriend: ReferralFriend = {
      id: Date.now().toString(),
      name: randomName,
      avatarColor: randomColor,
      boostAdded: 20,
      timeAgo: 'Just now',
    };
    setFriends([newFriend, ...friends]);

    // Mint an extra Grand Draw Ticket!
    const bonusTicket = `GPD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    onAddBonusTicket(bonusTicket);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `🦚 Help me crack the Krishna Janmashtami Pot to win the ₹1,000 Grand Cash Prize! Tap here to crack yours & enter the 180 Pot Crackers Draw: ${referralUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareOnInstagram = () => {
    const text = `🦚 Help me crack the Krishna Janmashtami Pot to win the ₹1,000 Grand Cash Prize! Tap here to crack yours & enter the 180 Pot Crackers Draw: ${referralUrl}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    window.open('https://www.instagram.com/', '_blank');
  };

  return (
    <section
      id="referral-boost-section"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B7A6E]/20 border border-[#1B7A6E]/50 text-[#E8B923] text-xs font-semibold uppercase tracking-wider mb-3">
          <Users className="w-3.5 h-3.5 text-[#1B7A6E]" />
          <span>WhatsApp & Instagram Synergy</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F6EEDD]">
          Social Boost &bull; <span className="text-[#E8B923]">Strength Meter</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#F6EEDD]/80 max-w-xl mx-auto">
          Share your pot link to soften the sacred clay and gather devotee strike power. Every friend who joins grants you{' '}
          <span className="text-[#E8B923] font-semibold">+1 Devotee Strike Boost</span> and{' '}
          <span className="text-[#C6296F] font-semibold">+1 Free Grand Prize Draw Entry</span>!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Col: Strength Meter & Live Ticker */}
        <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-[#14224A]/80 border border-[#E8B923]/30 backdrop-blur-sm flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#E8B923]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F6EEDD]">
                  Pot Crack Strength Meter
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#E8B923]/20 border border-[#E8B923]/40 text-[#E8B923] font-bold text-sm">
                Devotee Energy Meter
              </span>
            </div>

            {/* Visual Strength Meter Bar */}
            <div className="relative w-full h-7 bg-[#0B1230] rounded-full border border-[#E8B923]/40 p-1 overflow-hidden my-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1B7A6E] via-[#E8B923] to-[#C6296F] transition-all duration-500 relative flex items-center justify-end pr-2"
                style={{ width: `${strength}%` }}
              >
                {strength >= 20 && (
                  <span className="text-[10px] text-[#0B1230] font-black uppercase tracking-tighter">
                    🔥 STRIKE ENERGY
                  </span>
                )}
              </div>
            </div>

            {/* Milestones */}
            <div className="flex justify-between text-xs text-[#F6EEDD]/60 mt-1 px-1">
              <span>Initial Strikes</span>
              <span>Devotee Circle</span>
              <span className="text-[#E8B923] font-semibold">Mega Shatter 💥</span>
            </div>

            {/* Friends who helped live feed */}
            <div className="mt-6 pt-5 border-t border-[#E8B923]/20">
              <h4 className="text-xs font-semibold text-[#E8B923] uppercase tracking-wider mb-3">
                Recent Boosts from Friends ({friends.length})
              </h4>
              <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B1230]/60 border border-[#E8B923]/15 text-xs text-[#F6EEDD]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0"
                        style={{ backgroundColor: friend.avatarColor }}
                      >
                        {friend.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold block">{friend.name}</span>
                        <span className="text-[10px] text-[#F6EEDD]/60">{friend.timeAgo}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#E8B923] font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>+{friend.boostAdded} Strike Boost (+1 Entry)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Simulation Button for Testing the mechanic */}
          <div className="mt-6 pt-4 border-t border-[#E8B923]/20">
            <button
              id="btn-simulate-referral"
              onClick={simulateFriendBoost}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1B7A6E] hover:bg-[#1B7A6E]/80 text-[#F6EEDD] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
            >
              <UserPlus className="w-4 h-4" />
              <span>Simulate Friend Tap (+20% Boost & +1 Draw Ticket)</span>
            </button>
          </div>
        </div>

        {/* Right Col: Unique Referral Link & Sharing Box */}
        <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#1A1A3A]/90 to-[#0B1230]/90 border border-[#C6296F]/40 backdrop-blur-sm flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-5 h-5 text-[#C6296F]" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F6EEDD]">
                Your Unique Invite Link
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#F6EEDD]/75 mb-4">
              Share on WhatsApp and Instagram stories. When friends open it, your pot gains crack power instantly!
            </p>

            {/* Link Box */}
            <div className="p-3 rounded-xl bg-[#0B1230] border border-[#E8B923]/30 flex items-center justify-between gap-2 mb-4">
              <input
                type="text"
                readOnly
                value={referralUrl}
                className="bg-transparent text-xs text-[#E8B923] font-mono w-full outline-none select-all"
              />
              <button
                id="btn-copy-ref-link"
                onClick={copyLink}
                className="px-3 py-1.5 rounded-lg bg-[#E8B923] text-[#0B1230] font-bold text-xs shrink-0 flex items-center gap-1 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-900" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Quick Share Triggers: WhatsApp & Instagram */}
            <div className="space-y-2.5">
              <button
                id="btn-share-whatsapp"
                onClick={shareOnWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-[#0B1230] font-bold text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#0B1230]" />
                <span>Share via WhatsApp</span>
              </button>

              <button
                id="btn-share-instagram"
                onClick={shareOnInstagram}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                <span>Share via Instagram (Copy & Open)</span>
              </button>

              <button
                onClick={copyLink}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0B1230] border border-[#E8B923]/30 text-[#F6EEDD] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#14224A] transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-[#E8B923]" />
                <span>Copy Referral Code ({referralCode})</span>
              </button>
            </div>
          </div>

          {/* Grand Draw Entries Counter box */}
          <div className="mt-6 p-4 rounded-xl bg-[#0B1230]/80 border border-[#E8B923]/25">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#E8B923]" />
                <span className="text-xs font-semibold text-[#F6EEDD]">Your Grand Draw Tickets:</span>
              </div>
              <span className="text-base font-extrabold text-[#E8B923] font-mono">
                {userTickets.length} Entries
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-xs mx-auto">
        <RangoliDivider />
      </div>
    </section>
  );
};
