import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PotId, DevoteeProfile, DAKSHINA_PAYMENT_LINKS } from '../types';
import { NemaliIcon } from './SvgMotifs';
import { playTempleBell, playCoinChime, playCelebrationFanfare } from '../utils/audio';
import {
  Sparkles,
  ShieldCheck,
  X,
  Unlock,
  ExternalLink,
  CheckCircle,
  Check
} from 'lucide-react';

interface SacredDakshinaModalProps {
  isOpen: boolean;
  onClose: () => void;
  potType: PotId;
  devoteeProfile: DevoteeProfile | null;
  onPaymentSuccess: (amount: number, txnId: string, potType: PotId) => void;
  soundEnabled: boolean;
}

export const SacredDakshinaModal: React.FC<SacredDakshinaModalProps> = ({
  isOpen,
  onClose,
  potType,
  devoteeProfile,
  onPaymentSuccess,
  soundEnabled,
}) => {
  const isUyyala = potType === 'uyyala';
  const amount = isUyyala ? 9 : 5;
  const potLabel = isUyyala ? 'Uyyala Kunda (Royal Matka)' : 'Venna Kunda (Casual Matka)';
  const potTelugu = isUyyala ? 'ఉయ్యాల కుండ' : 'వెన్న కుండ';

  // Direct SMEPay transaction payment URLs
  const paymentLink = isUyyala
    ? DAKSHINA_PAYMENT_LINKS.uyyala
    : DAKSHINA_PAYMENT_LINKS.venna;

  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleOpenExternal = () => {
    window.open(paymentLink, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  const handleGetPot = () => {
    setIsVerifying(true);
    if (soundEnabled) {
      playTempleBell();
    }

    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      if (soundEnabled) {
        playCoinChime();
        setTimeout(() => playCelebrationFanfare(), 200);
      }

      // Festive Confetti blast
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.55 },
        colors: ['#E8B923', '#1B7A6E', '#C6296F', '#FFFDF7', '#FFE27A'],
      });

      const finalTxn = `SME-${Math.floor(10000000 + Math.random() * 90000000)}`;

      setTimeout(() => {
        onPaymentSuccess(amount, finalTxn, potType);
        onClose();
        setVerifiedSuccess(false);
      }, 900);
    }, 500);
  };

  return (
    <div
      id="sacred-dakshina-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#040816]/92 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="sacred-dakshina-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#14224A] via-[#0E1738] to-[#070D22] border-2 border-[#E8B923] shadow-[0_0_60px_rgba(232,185,35,0.4)] relative p-4 sm:p-6 overflow-hidden animate-in zoom-in-95 duration-300 my-auto text-[#F6EEDD]"
      >
        {/* Subtle Background Motif */}
        <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
          <NemaliIcon className="w-60 h-60" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-[#080E24] border border-[#E8B923]/30 text-[#F6EEDD]/70 hover:text-[#E8B923] hover:bg-[#14224A] transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header: Direct Offering */}
        <div className="text-center relative z-10 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E8B923]/15 border border-[#E8B923]/40 text-[#E8B923] text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>₹{amount} Sacred Dakshina</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#F6EEDD] tracking-tight">
            Offer ₹{amount} &bull;{' '}
            <span className={isUyyala ? 'text-[#FFE27A]' : 'text-[#E8B923]'}>
              {potLabel}
            </span>
          </h2>
          <p className="font-telugu text-xs sm:text-sm text-[#E8B923] font-semibold">
            {potTelugu} &bull; చెల్లించి వెంటనే కుండను పొందండి
          </p>
        </div>

        {/* SUCCESS CONFIRMATION OVERLAY */}
        {verifiedSuccess ? (
          <div className="my-6 p-6 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 text-center space-y-3 animate-in zoom-in-95 duration-200 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">
              ₹{amount} Dakshina Blessed! Pot Unlocked!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200">
              Redirecting you to the Crack Arena now...
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Direct Internal Web Preview of SMEPay */}
            <div className="flex items-center justify-between text-xs px-1 text-[#F6EEDD]/80">
              <span className="font-semibold text-[#E8B923]">SMEPay Secure Payment Preview:</span>
              <button
                onClick={handleOpenExternal}
                className="text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <span>Open in full tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden border-2 border-[#E8B923]/40 bg-[#080E24] relative shadow-inner">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#080E24] p-4 text-center z-0">
                  <Sparkles className="w-8 h-8 text-[#E8B923] animate-spin" />
                  <span className="text-xs text-[#E8B923]">Loading SMEPay Payment Gateway...</span>
                  <button
                    onClick={handleOpenExternal}
                    className="px-4 py-2 rounded-xl bg-[#E8B923] text-[#0B1230] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <span>Open SMEPay Direct Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <iframe
                src={paymentLink}
                title="SMEPay Transaction Gateway"
                className="w-full h-full border-0 relative z-10"
                onLoad={() => setIframeLoaded(true)}
                allow="payment"
              />
            </div>

            {/* Direct Redirect / Unlock Button */}
            <div className="pt-2 space-y-2">
              <button
                id="btn-get-pot-redirect"
                onClick={handleGetPot}
                disabled={isVerifying}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-[#1B7A6E] to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer active:scale-[0.98] transition-all"
              >
                {isVerifying ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>Unlocking Your Pot...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5 text-emerald-100" />
                    <span>I Have Paid — Get My Pot & Start Cracking 🏺</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#F6EEDD]/65">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Pot Arena Activation & Grand Draw Entry</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
