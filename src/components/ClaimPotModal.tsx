import React, { useState } from 'react';
import { PotId, DevoteeProfile, POT_TIERS } from '../types';
import { NemaliIcon, PeacockFeatherIcon, DiyaLamp, FluteMotif } from './SvgMotifs';
import { playTempleBell, playCoinChime, playCelebrationFanfare } from '../utils/audio';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  User,
  Phone,
  MapPin,
  ArrowRight,
  Gift,
  Flame,
  Ticket
} from 'lucide-react';

interface ClaimPotModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPot: PotId;
  onSelectPotChange: (potId: PotId) => void;
  onProfileCreated: (profile: DevoteeProfile) => void;
  soundEnabled: boolean;
}

export const ClaimPotModal: React.FC<ClaimPotModalProps> = ({
  isOpen,
  onClose,
  selectedPot,
  onSelectPotChange,
  onProfileCreated,
  soundEnabled,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentTier = POT_TIERS[selectedPot];
  const isUyyala = selectedPot === 'uyyala';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name / భక్తుడి పేరును నమోదు చేయండి');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number for prize & draw alerts');
      return;
    }

    setIsSubmitting(true);
    setError('');

    if (soundEnabled) {
      playTempleBell();
    }

    // Generate 3 unique lucky draw tickets
    const ticketPrefix = 'GPD-2026-';
    const initialTickets = [
      `${ticketPrefix}${Math.floor(100000 + Math.random() * 900000)}`,
      ...(isUyyala
        ? [
            `${ticketPrefix}${Math.floor(100000 + Math.random() * 900000)}`,
            `${ticketPrefix}${Math.floor(100000 + Math.random() * 900000)}`,
          ]
        : []),
    ];

    const cleanName = name.trim().split(' ')[0].toUpperCase();
    const refCode = `KRISHNA-${cleanName.slice(0, 4)}-${Math.floor(100 + Math.random() * 900)}`;

    const newProfile: DevoteeProfile = {
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim() || 'Hyderabad',
      selectedPot,
      referralCode: refCode,
      referralCount: 0,
      tickets: initialTickets,
      registeredAt: new Date().toISOString(),
    };

    setTimeout(() => {
      if (soundEnabled) {
        playCoinChime();
        setTimeout(() => playCelebrationFanfare(), 250);
      }
      setIsSubmitting(false);
      onProfileCreated(newProfile);
    }, 450);
  };

  return (
    <div
      id="claim-pot-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#040816]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="claim-pot-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#14224A] via-[#0E1738] to-[#070D22] border-2 border-[#E8B923] shadow-[0_0_60px_rgba(232,185,35,0.4)] relative p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-300 my-auto text-[#F6EEDD]"
      >
        {/* Subtle Background Motif */}
        <div className="absolute -top-12 -right-12 opacity-10 pointer-events-none">
          <NemaliIcon className="w-64 h-64" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#080E24] border border-[#E8B923]/30 text-[#F6EEDD]/70 hover:text-[#E8B923] hover:bg-[#14224A] transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center relative z-10 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B923]/15 border border-[#E8B923]/40 text-[#E8B923] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Devotee Registration &bull; 100% Free Auspicious Offering</span>
            <DiyaLamp className="w-3.5 h-3.5 text-[#E8B923]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight">
            Claim Your Auspicious Pot
          </h2>
          <p className="font-telugu text-sm text-[#E8B923] font-semibold mt-0.5">
            మీ పవిత్రమైన కుండను ఎంచుకుని భక్తుల విభాగంలో చేరండి
          </p>
        </div>

        {/* Pot Tier Selector Switch */}
        <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
          {/* Venna Kunda Option */}
          <button
            type="button"
            onClick={() => onSelectPotChange('venna')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
              selectedPot === 'venna'
                ? 'bg-[#14224A] border-2 border-[#E8B923] shadow-[0_0_20px_rgba(232,185,35,0.3)]'
                : 'bg-[#080E24]/80 border-[#E8B923]/20 hover:border-[#E8B923]/50 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#E8B923] uppercase">Casual Pot</span>
              {selectedPot === 'venna' && (
                <CheckCircle2 className="w-4 h-4 text-[#E8B923]" />
              )}
            </div>
            <h4 className="text-base font-serif font-bold text-white">Venna Kunda</h4>
            <p className="text-[11px] text-[#F6EEDD]/70 mt-0.5">వెన్న కుండ &bull; 1x Draw Ticket</p>
          </button>

          {/* Uyyala Kunda Option */}
          <button
            type="button"
            onClick={() => onSelectPotChange('uyyala')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
              selectedPot === 'uyyala'
                ? 'bg-gradient-to-b from-[#1E1738] to-[#14224A] border-2 border-[#C6296F] shadow-[0_0_25px_rgba(198,41,111,0.4)]'
                : 'bg-[#080E24]/80 border-[#E8B923]/20 hover:border-[#C6296F]/50 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#C6296F] uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Royal Matka
              </span>
              {selectedPot === 'uyyala' && (
                <CheckCircle2 className="w-4 h-4 text-[#C6296F]" />
              )}
            </div>
            <h4 className="text-base font-serif font-bold text-white">Uyyala Kunda</h4>
            <p className="text-[11px] text-[#FFE27A] mt-0.5">ఉయ్యాల కుండ &bull; 3x Draw Tickets</p>
          </button>
        </div>

        {/* Devotee Details Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#E8B923] uppercase tracking-wider mb-1">
              Devotee Full Name / భక్తుడి పేరు *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8B923]/60" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sai Krishna Varma"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#080E24] border border-[#E8B923]/30 text-sm text-white placeholder-[#F6EEDD]/30 focus:outline-none focus:border-[#E8B923] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#E8B923] uppercase tracking-wider mb-1">
                WhatsApp / Mobile No. *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8B923]/60" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  maxLength={10}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#080E24] border border-[#E8B923]/30 text-sm text-white placeholder-[#F6EEDD]/30 focus:outline-none focus:border-[#E8B923] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#E8B923] uppercase tracking-wider mb-1">
                City / పట్టణం
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8B923]/60" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Hyderabad / Vijayawada"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#080E24] border border-[#E8B923]/30 text-sm text-white placeholder-[#F6EEDD]/30 focus:outline-none focus:border-[#E8B923] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Perks Highlight Box */}
          <div className="p-3.5 rounded-2xl bg-[#080E24]/90 border border-[#E8B923]/25 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-[#FFE27A] font-bold">
              <span>Selected Pot: {currentTier.name}</span>
              <span>{isUyyala ? '3x Tickets' : '1x Ticket'} Included</span>
            </div>
            <p className="text-[11px] text-[#F6EEDD]/70">
              ✓ Free instant crack access &bull; Guaranteed festive discount voucher &bull; Entry into 180 Cash Winners Grand Draw on 10th September!
            </p>
          </div>

          {/* Submit Button */}
          <button
            id="btn-confirm-claim-pot"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(232,185,35,0.4)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Blessing &amp; Claiming Pot...</span>
              </>
            ) : (
              <>
                <span>Claim {selectedPot === 'uyyala' ? 'Uyyala Kunda' : 'Venna Kunda'} &bull; Start Cracking 🏺</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-[11px] text-[#F6EEDD]/50 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Free Festival Campaign &bull; Sri Krishna Janmashtami 2026</span>
        </div>
      </div>
    </div>
  );
};
