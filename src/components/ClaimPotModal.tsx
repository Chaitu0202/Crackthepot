import React, { useState } from 'react';
import { PotId, DevoteeProfile, POT_TIERS, ClaimedPotInstance } from '../types';
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
  Ticket,
  Check
} from 'lucide-react';

interface ClaimPotModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPot: PotId;
  onSelectPotChange: (potId: PotId) => void;
  onProfileCreated: (profile: DevoteeProfile, newPotInstance: ClaimedPotInstance) => void;
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

    // Generate unique lucky draw tickets
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

    const newPotInstance: ClaimedPotInstance = {
      id: `pot-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      potId: selectedPot,
      devoteeName: name.trim(),
      phone: phone.trim(),
      city: city.trim() || 'Hyderabad',
      tickets: initialTickets,
      claimedAt: new Date().toISOString(),
      sharesCount: 0,
      isCracked: false,
    };

    setTimeout(() => {
      if (soundEnabled) {
        playCoinChime();
        setTimeout(() => playCelebrationFanfare(), 250);
      }
      setIsSubmitting(false);
      onProfileCreated(newProfile, newPotInstance);
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
        className="w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#14224A] via-[#0E1738] to-[#070D22] border-2 border-[#E8B923] shadow-[0_0_60px_rgba(232,185,35,0.4)] relative p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-300 my-auto text-[#F6EEDD] max-h-[92vh] flex flex-col"
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
        <div className="text-center relative z-10 mb-5 shrink-0">
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

        <div className="overflow-y-auto pr-1 space-y-5 custom-scrollbar flex-1 relative z-10">
          {/* BOTH KUNDA VARIANTS DETAILS (Rich Side-by-Side Comparison) */}
          <div>
            <label className="block text-xs font-bold text-[#E8B923] uppercase tracking-wider mb-2">
              Select Your Auspicious Variant / కుండ రకాన్ని ఎంచుకోండి:
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Variant 1: Venna Kunda */}
              <div
                onClick={() => onSelectPotChange('venna')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  selectedPot === 'venna'
                    ? 'bg-gradient-to-b from-[#14224A] to-[#0A122C] border-2 border-[#E8B923] ring-1 ring-[#E8B923] shadow-[0_0_25px_rgba(232,185,35,0.35)]'
                    : 'bg-[#080E24]/80 border-[#E8B923]/25 hover:border-[#E8B923]/60 opacity-85'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#E8B923]/20 text-[#E8B923] border border-[#E8B923]/40 uppercase tracking-wide">
                      Casual Pot &bull; 1x Ticket
                    </span>
                    {selectedPot === 'venna' && (
                      <CheckCircle2 className="w-4 h-4 text-[#E8B923]" />
                    )}
                  </div>

                  <h4 className="text-lg font-serif font-bold text-white">
                    Venna Kunda (వెన్న కుండ)
                  </h4>
                  <p className="text-xs text-[#E8B923] font-medium font-telugu mt-0.5">
                    శ్రీకృష్ణుడి వెన్న కుండ
                  </p>
                  <p className="text-[11px] text-[#F6EEDD]/75 mt-1.5 leading-relaxed">
                    Crisp terracotta filled with fresh festive Makhan, butter cookies &amp; lucky draw entry.
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#E8B923]/20 space-y-1.5">
                    {POT_TIERS.venna.perks.slice(0, 3).map((perk, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#F6EEDD]/80">
                        <Check className="w-3 h-3 text-[#E8B923] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2">
                  <span className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors ${
                    selectedPot === 'venna'
                      ? 'bg-[#E8B923] text-[#0B1230]'
                      : 'bg-[#14224A] text-[#F6EEDD]/80 border border-[#E8B923]/30'
                  }`}>
                    {selectedPot === 'venna' ? '✓ Selected' : 'Choose Venna Kunda'}
                  </span>
                </div>
              </div>

              {/* Variant 2: Uyyala Kunda */}
              <div
                onClick={() => onSelectPotChange('uyyala')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  selectedPot === 'uyyala'
                    ? 'bg-gradient-to-b from-[#221238] via-[#1A143A] to-[#0A122C] border-2 border-[#C6296F] ring-1 ring-[#C6296F] shadow-[0_0_30px_rgba(198,41,111,0.45)]'
                    : 'bg-[#080E24]/80 border-[#E8B923]/25 hover:border-[#C6296F]/60 opacity-85'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-[#C6296F] to-[#E8B923] text-white uppercase tracking-wide flex items-center gap-1 shadow">
                      <Sparkles className="w-2.5 h-2.5 text-white" />
                      Royal Devotee &bull; 3x Tickets
                    </span>
                    {selectedPot === 'uyyala' && (
                      <CheckCircle2 className="w-4 h-4 text-[#C6296F]" />
                    )}
                  </div>

                  <h4 className="text-lg font-serif font-bold text-white">
                    Uyyala Kunda (ఉయ్యాల కుండ)
                  </h4>
                  <p className="text-xs text-[#FFE27A] font-medium font-telugu mt-0.5">
                    ఉయ్యాల కుండ &bull; గరిష్ట రివార్డులు
                  </p>
                  <p className="text-[11px] text-[#F6EEDD]/75 mt-1.5 leading-relaxed">
                    Swinging silk-rope matka packed with royal sweets, silver keepsakes &amp; 3x grand tickets.
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#C6296F]/30 space-y-1.5">
                    {POT_TIERS.uyyala.perks.slice(0, 3).map((perk, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#F6EEDD]/80">
                        <Check className="w-3 h-3 text-[#FFE27A] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-2">
                  <span className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors ${
                    selectedPot === 'uyyala'
                      ? 'bg-gradient-to-r from-[#C6296F] via-[#E8B923] to-[#C6296F] text-white shadow'
                      : 'bg-[#14224A] text-[#F6EEDD]/80 border border-[#E8B923]/30'
                  }`}>
                    {selectedPot === 'uyyala' ? '✓ Selected' : 'Choose Uyyala Kunda'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Devotee Details Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                <span>Selected: {currentTier.name}</span>
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
        </div>

        <div className="mt-3 text-center text-[11px] text-[#F6EEDD]/50 flex items-center justify-center gap-1.5 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Free Festival Campaign &bull; Sri Krishna Janmashtami 2026</span>
        </div>
      </div>
    </div>
  );
};
