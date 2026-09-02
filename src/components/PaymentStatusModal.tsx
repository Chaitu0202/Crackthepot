import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PotId, DAKSHINA_PAYMENT_LINKS } from '../types';
import { NemaliIcon, PeacockFeatherIcon } from './SvgMotifs';
import { playTempleBell, playCoinChime, playCelebrationFanfare } from '../utils/audio';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Unlock,
  ExternalLink,
  ArrowRight,
  X
} from 'lucide-react';

export type PaymentVerificationState = 'prompt' | 'verifying' | 'success' | 'failed';

interface PaymentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: PaymentVerificationState;
  potType: PotId;
  onConfirmSuccess: (potType: PotId) => void;
  onRetryPayment: (potType: PotId) => void;
  soundEnabled: boolean;
}

export const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({
  isOpen,
  onClose,
  status: initialStatus,
  potType,
  onConfirmSuccess,
  onRetryPayment,
  soundEnabled,
}) => {
  const [currentStatus, setCurrentStatus] = useState<PaymentVerificationState>(initialStatus);
  const isUyyala = potType === 'uyyala';
  const amount = isUyyala ? 9 : 5;
  const potName = isUyyala ? 'Uyyala Kunda (Royal Matka)' : 'Venna Kunda (Casual Matka)';
  const smepayUrl = isUyyala ? DAKSHINA_PAYMENT_LINKS.uyyala : DAKSHINA_PAYMENT_LINKS.venna;

  // Sync state if initialStatus changes
  React.useEffect(() => {
    setCurrentStatus(initialStatus);
  }, [initialStatus]);

  if (!isOpen) return null;

  const handleTriggerSuccess = () => {
    setCurrentStatus('verifying');
    if (soundEnabled) playTempleBell();

    setTimeout(() => {
      setCurrentStatus('success');
      if (soundEnabled) {
        playCoinChime();
        setTimeout(() => playCelebrationFanfare(), 250);
      }

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#E8B923', '#1B7A6E', '#C6296F', '#FFFDF7', '#FFE27A'],
      });

      setTimeout(() => {
        onConfirmSuccess(potType);
        onClose();
      }, 1400);
    }, 600);
  };

  const handleTriggerFailed = () => {
    setCurrentStatus('failed');
  };

  return (
    <div
      id="payment-status-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#040816]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="payment-status-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#14224A] via-[#0E1738] to-[#070D22] border-2 border-[#E8B923] shadow-[0_0_60px_rgba(232,185,35,0.35)] relative p-5 sm:p-7 overflow-hidden animate-in zoom-in-95 duration-300 my-auto text-[#F6EEDD]"
      >
        {/* Subtle Background Motif */}
        <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
          <NemaliIcon className="w-60 h-60" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#080E24] border border-[#E8B923]/30 text-[#F6EEDD]/70 hover:text-[#E8B923] hover:bg-[#14224A] transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STATE 1: SUCCESS CONFIRMATION */}
        {currentStatus === 'success' && (
          <div className="text-center py-2 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                ✓ Payment Verified &amp; Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white mt-2">
                ₹{amount} Offering Received!
              </h2>
              <p className="text-sm text-[#FFE27A] font-medium mt-1">
                Your sacred {potName} is unlocked and ready for strikes!
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080E24] border border-emerald-500/30 text-xs text-left space-y-1.5 text-[#F6EEDD]/85">
              <div className="flex items-center justify-between text-emerald-300 font-bold">
                <span>Pot Status:</span>
                <span>Active &bull; Crack Arena Ready</span>
              </div>
              <div className="flex items-center justify-between text-[#E8B923]">
                <span>Lucky Draw Entries:</span>
                <span>{isUyyala ? '+3 Grand Prize Tickets' : '+1 Grand Prize Ticket'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onConfirmSuccess(potType);
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-[#1B7A6E] to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer active:scale-98 transition-all"
            >
              <Unlock className="w-5 h-5 text-emerald-100" />
              <span>Go to Crack Arena &amp; Start Striking 🏺</span>
            </button>
          </div>
        )}

        {/* STATE 2: VERIFYING IN PROGRESS */}
        {currentStatus === 'verifying' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#E8B923]/20 border-2 border-[#E8B923] text-[#E8B923] flex items-center justify-center mx-auto animate-spin">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F6EEDD]">
              Verifying ₹{amount} Dakshina...
            </h2>
            <p className="text-xs text-[#E8B923]">
              Confirming transaction with SMEPay and preparing your sacred kunda.
            </p>
          </div>
        )}

        {/* STATE 3: PAYMENT FAILED / INCOMPLETE */}
        {currentStatus === 'failed' && (
          <div className="text-center py-2 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 text-rose-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(244,63,94,0.35)]">
              <XCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-bold uppercase tracking-wider">
                Payment Failed / Incomplete
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white mt-2">
                Offering Not Completed
              </h2>
              <p className="text-xs sm:text-sm text-rose-200/90 font-medium mt-1">
                No funds were received or transaction was cancelled on SMEPay. Please complete the ₹{amount} offering to unlock your {potName}.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080E24] border border-rose-500/30 text-xs text-left space-y-1 text-[#F6EEDD]/80">
              <div className="flex items-center gap-2 text-rose-300 font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Reason: Transaction not confirmed or cancelled.</span>
              </div>
              <p className="text-[11px] text-[#F6EEDD]/60 pl-6">
                If money was debited from your bank, you can retry or verify using your UTR.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => onRetryPayment(potType)}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(232,185,35,0.4)] cursor-pointer hover:brightness-105 active:scale-98 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry ₹{amount} Payment on SMEPay</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={handleTriggerSuccess}
                className="w-full py-2.5 px-4 rounded-xl bg-[#14224A] hover:bg-[#1B7A6E]/40 border border-[#E8B923]/30 text-xs font-semibold text-[#E8B923] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Amount was deducted? Verify &amp; Unlock Now</span>
              </button>
            </div>
          </div>
        )}

        {/* STATE 4: PROMPT CONFIRMATION AFTER RETURNING */}
        {currentStatus === 'prompt' && (
          <div className="text-center py-2 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8B923]/15 border border-[#E8B923]/40 text-[#E8B923] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SMEPay Payment Confirmation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#F6EEDD] tracking-tight">
              Confirm Your ₹{amount} Offering
            </h2>
            <p className="text-xs sm:text-sm text-[#F6EEDD]/80">
              Did you complete your ₹{amount} payment for{' '}
              <strong className="text-[#FFE27A]">{potName}</strong> on SMEPay?
            </p>

            <div className="space-y-2.5 pt-2">
              {/* YES -> CONFIRM SUCCESS */}
              <button
                id="btn-confirm-payment-success"
                onClick={handleTriggerSuccess}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-[#1B7A6E] to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer active:scale-98 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-100" />
                <span>Yes, Payment Successful — Unlock My Pot! 🏺</span>
              </button>

              {/* NO -> PAYMENT FAILED */}
              <button
                id="btn-confirm-payment-failed"
                onClick={handleTriggerFailed}
                className="w-full py-3 px-5 rounded-2xl bg-[#080E24] hover:bg-[#14224A] border border-rose-500/40 text-rose-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Payment Incomplete or Failed</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#F6EEDD]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Bank Payment Link: <span className="font-mono text-[#E8B923] truncate max-w-[200px]">{smepayUrl}</span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
