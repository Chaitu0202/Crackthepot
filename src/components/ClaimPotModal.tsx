import React, { useState } from 'react';
import { DevoteeProfile, PotId } from '../types';
import { NemaliIcon, PeacockFeatherIcon } from './SvgMotifs';
import { Sparkles, User, CheckCircle, Flame, X, ShieldCheck } from 'lucide-react';
import { playTempleBell } from '../utils/audio';

interface ClaimPotModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPotId: PotId;
  onSubmitProfile: (profile: DevoteeProfile) => void;
  soundEnabled: boolean;
}

export const ClaimPotModal: React.FC<ClaimPotModalProps> = ({
  isOpen,
  onClose,
  selectedPotId,
  onSubmitProfile,
  soundEnabled,
}) => {
  const [name, setName] = useState('');
  const [potType, setPotType] = useState<PotId>(selectedPotId || 'uyyala');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync pot type if prop changes
  React.useEffect(() => {
    if (selectedPotId) {
      setPotType(selectedPotId);
    }
  }, [selectedPotId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your devotee name (భక్తుడి పేరు నమోదు చేయండి)');
      return;
    }

    setError('');
    setIsSubmitting(true);

    if (soundEnabled) {
      playTempleBell();
    }

    const formattedProfile: DevoteeProfile = {
      name: name.trim(),
      potType,
      registeredAt: new Date().toISOString(),
      customPotName: `${name.trim()}'s ${potType === 'uyyala' ? 'Uyyala Kunda' : 'Venna Kunda'}`,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitProfile(formattedProfile);
      onClose();
    }, 350);
  };

  const isUyyala = potType === 'uyyala';

  return (
    <div
      id="claim-pot-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#060B1E]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="claim-pot-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#14224A] via-[#0E1738] to-[#080E24] border-2 border-[#E8B923]/60 shadow-[0_0_50px_rgba(232,185,35,0.3)] relative p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-300 my-auto"
      >
        {/* Background Ambient Motif */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 opacity-15 pointer-events-none">
          <NemaliIcon className="w-56 h-56" />
        </div>

        {/* Close Button */}
        <button
          id="btn-close-claim-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#0B1230] border border-[#E8B923]/30 text-[#F6EEDD]/70 hover:text-[#E8B923] hover:bg-[#14224A] transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Nemali Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1B7A6E]/40 via-[#E8B923]/20 to-[#C6296F]/30 border border-[#E8B923]/50 flex items-center justify-center shadow-lg">
              <NemaliIcon className="w-12 h-12 filter drop-shadow-[0_0_8px_rgba(232,185,35,0.6)]" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#E8B923] text-[#0B1230]">
              <Sparkles className="w-3 h-3 stroke-[3]" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6EEDD] tracking-tight">
            Claim Your Auspicious Pot
          </h2>
          <p className="font-telugu text-base text-[#E8B923] font-medium mt-0.5">
            మీ పేరు నమోదు చేసి కుండను పగలగొట్టండి
          </p>
          <p className="text-xs sm:text-sm text-[#F6EEDD]/80 mt-1 max-w-xs">
            Enter your devotee name to personalize your earthen matka and start cracking!
          </p>
        </div>

        {/* Form - Only Name requested */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>{error}</span>
            </div>
          )}

          {/* Devotee Full Name Input */}
          <div>
            <label className="block text-xs font-semibold text-[#E8B923] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#E8B923]" />
              <span>Devotee Name (భక్తుడి పేరు) *</span>
            </label>
            <div className="relative">
              <input
                id="input-devotee-name"
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name (e.g. Sai Krishna)"
                className="w-full px-4 py-3.5 rounded-xl bg-[#080E24] border border-[#E8B923]/40 text-[#F6EEDD] placeholder-[#F6EEDD]/40 text-base focus:outline-none focus:border-[#E8B923] focus:ring-2 focus:ring-[#E8B923]/50 transition-all font-medium"
              />
            </div>
          </div>

          {/* Select Pot Tier (Venna vs Uyyala) */}
          <div className="pt-1">
            <label className="block text-xs font-semibold text-[#E8B923] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#E8B923]" />
              <span>Choose Your Matka Tier</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* Venna Kunda Option */}
              <div
                onClick={() => setPotType('venna')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                  potType === 'venna'
                    ? 'border-[#E8B923] bg-[#080E24] ring-2 ring-[#E8B923]/50'
                    : 'border-[#E8B923]/20 bg-[#0B1230]/70 hover:border-[#E8B923]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F6EEDD]">Venna Kunda</span>
                    <span className="text-xs font-mono font-bold text-[#E8B923]">₹5</span>
                  </div>
                  <p className="font-telugu text-[11px] text-[#E8B923]/80 mt-0.5">వెన్న కుండ</p>
                  <p className="text-[11px] text-[#F6EEDD]/70 mt-1">1x Draw Entry</p>
                </div>
                <div className="mt-2 text-right">
                  {potType === 'venna' && <CheckCircle className="w-4 h-4 text-[#E8B923] inline" />}
                </div>
              </div>

              {/* Uyyala Kunda Option */}
              <div
                onClick={() => setPotType('uyyala')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                  potType === 'uyyala'
                    ? 'border-[#C6296F] bg-[#080E24] ring-2 ring-[#C6296F]/50 shadow-[0_0_15px_rgba(198,41,111,0.25)]'
                    : 'border-[#E8B923]/20 bg-[#0B1230]/70 hover:border-[#C6296F]/40'
                }`}
              >
                <div className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#C6296F] to-[#E8B923] text-[9px] font-black text-white uppercase shadow">
                  3x Entries
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F6EEDD]">Uyyala Kunda</span>
                    <span className="text-xs font-mono font-bold text-[#E8B923]">₹9</span>
                  </div>
                  <p className="font-telugu text-[11px] text-[#E8B923]/80 mt-0.5">ఉయ్యాల కుండ</p>
                  <p className="text-[11px] text-[#F6EEDD]/70 mt-1">3x Draw Entries</p>
                </div>
                <div className="mt-2 text-right">
                  {potType === 'uyyala' && <CheckCircle className="w-4 h-4 text-[#C6296F] inline" />}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              id="btn-submit-devotee-pot"
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 text-[#0B1230] transition-all shadow-xl cursor-pointer ${
                isUyyala
                  ? 'bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] hover:brightness-105 active:scale-[0.98]'
                  : 'bg-gradient-to-r from-[#E8B923] to-[#B8860B] hover:brightness-105 active:scale-[0.98]'
              }`}
            >
              <PeacockFeatherIcon className="w-5 h-6" />
              <span>
                {isSubmitting
                  ? 'Securing Reservation...'
                  : `Proceed to Offer ₹${isUyyala ? 9 : 5} & Crack Pot`}
              </span>
            </button>
          </div>

          {/* Trust footnote */}
          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#F6EEDD]/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Access &bull; 100% Guaranteed Blessed Prize</span>
          </div>
        </form>
      </div>
    </div>
  );
};
