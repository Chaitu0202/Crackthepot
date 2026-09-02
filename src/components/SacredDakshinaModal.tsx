import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { PotId, DevoteeProfile, DAKSHINA_PAYMENT_LINKS, UPI_CONFIG, getUpiIntentUrl } from '../types';
import { NemaliIcon, GPayIcon, PhonePeIcon, PaytmIcon, UpiIcon } from './SvgMotifs';
import { playTempleBell, playCoinChime, playCelebrationFanfare } from '../utils/audio';
import {
  Sparkles,
  ShieldCheck,
  X,
  Unlock,
  ExternalLink,
  CheckCircle,
  Copy,
  Check,
  QrCode,
  Smartphone,
  Flame,
  ArrowRight,
  Zap
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

  const genericUpiIntent = getUpiIntentUrl(potType);
  const gpayIntent = getUpiIntentUrl(potType, undefined, 'gpay');
  const phonepeIntent = getUpiIntentUrl(potType, undefined, 'phonepe');
  const paytmIntent = getUpiIntentUrl(potType, undefined, 'paytm');

  const smePaymentLink = isUyyala
    ? DAKSHINA_PAYMENT_LINKS.uyyala
    : DAKSHINA_PAYMENT_LINKS.venna;

  const [hasTriggeredIntent, setHasTriggeredIntent] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // Trigger Direct Mobile UPI Intent
  const handleLaunchUpi = (intentUrl: string) => {
    setHasTriggeredIntent(true);
    // On mobile devices, this directly opens the UPI App Chooser / Target App
    window.location.href = intentUrl;
  };

  // Generate QR Code on Canvas from the generic UPI URI
  useEffect(() => {
    if (!isOpen || !qrCanvasRef.current) return;

    QRCode.toCanvas(
      qrCanvasRef.current,
      genericUpiIntent,
      {
        width: 190,
        margin: 1.5,
        color: {
          dark: '#080E24',
          light: '#FFFDF7',
        },
        errorCorrectionLevel: 'M',
      },
      (error) => {
        if (error) console.error('QR generation error:', error);
      }
    );
  }, [isOpen, genericUpiIntent, showQr]);

  if (!isOpen) return null;

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_CONFIG.vpa);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleInstantUnlock = () => {
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

      const finalTxn = `UPI-INTENT-${Math.floor(10000000 + Math.random() * 90000000)}`;

      setTimeout(() => {
        onPaymentSuccess(amount, finalTxn, potType);
        onClose();
        setVerifiedSuccess(false);
        setHasTriggeredIntent(false);
      }, 900);
    }, 500);
  };

  return (
    <div
      id="sacred-dakshina-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#040816]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="sacred-dakshina-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#14224A] via-[#0E1738] to-[#070D22] border-2 border-[#E8B923] shadow-[0_0_60px_rgba(232,185,35,0.4)] relative p-5 sm:p-6 overflow-hidden animate-in zoom-in-95 duration-300 my-auto text-[#F6EEDD]"
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

        {/* Header: Direct 1-Tap UPI Offering */}
        <div className="text-center relative z-10 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E8B923]/15 border border-[#E8B923]/40 text-[#E8B923] text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>1-Tap Mobile UPI Intent</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#F6EEDD] tracking-tight">
            Offer ₹{amount} &bull;{' '}
            <span className={isUyyala ? 'text-[#FFE27A]' : 'text-[#E8B923]'}>
              {potLabel}
            </span>
          </h2>
          <p className="font-telugu text-xs sm:text-sm text-[#E8B923] font-semibold mt-0.5">
            {potTelugu} &bull; 1-ట్యాప్‌తో UPI ద్వారా చెల్లించి కుండను తెరవండి
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
              Taking you straight into the Crack Arena now...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* PRIMARY 1-TAP ACTION BUTTON */}
            <button
              id="btn-direct-upi-intent"
              onClick={() => handleLaunchUpi(genericUpiIntent)}
              className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-base sm:text-lg flex items-center justify-between shadow-[0_0_30px_rgba(232,185,35,0.45)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B1230] text-[#E8B923] flex items-center justify-center shadow">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block leading-tight font-black">
                    Pay ₹{amount} via Any UPI App
                  </span>
                  <span className="block text-[11px] font-semibold text-[#0B1230]/75">
                    Opens GPay, PhonePe, Paytm, CRED &amp; BHIM
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 font-bold text-xs bg-[#0B1230] text-[#E8B923] px-3 py-1.5 rounded-xl group-hover:translate-x-1 transition-transform">
                <span>1-Tap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* DIRECT 1-TAP APP SELECTORS */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-[#F6EEDD]/70 uppercase tracking-wider text-center flex items-center justify-center gap-2">
                <span className="h-[1px] flex-1 bg-[#E8B923]/20" />
                <span>Or select your preferred UPI App</span>
                <span className="h-[1px] flex-1 bg-[#E8B923]/20" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* PhonePe */}
                <button
                  onClick={() => handleLaunchUpi(phonepeIntent)}
                  className="p-2.5 rounded-xl bg-[#080E24] hover:bg-[#14224A] border border-[#E8B923]/30 flex flex-col items-center gap-1.5 cursor-pointer transition-all hover:border-[#E8B923] active:scale-95 group shadow"
                >
                  <PhonePeIcon className="w-7 h-7 rounded-lg group-hover:scale-105 transition-transform" />
                  <span className="text-xs font-bold text-[#F6EEDD]">PhonePe</span>
                </button>

                {/* Google Pay */}
                <button
                  onClick={() => handleLaunchUpi(gpayIntent)}
                  className="p-2.5 rounded-xl bg-[#080E24] hover:bg-[#14224A] border border-[#E8B923]/30 flex flex-col items-center gap-1.5 cursor-pointer transition-all hover:border-[#E8B923] active:scale-95 group shadow"
                >
                  <GPayIcon className="w-7 h-7 rounded-lg group-hover:scale-105 transition-transform" />
                  <span className="text-xs font-bold text-[#F6EEDD]">Google Pay</span>
                </button>

                {/* Paytm */}
                <button
                  onClick={() => handleLaunchUpi(paytmIntent)}
                  className="p-2.5 rounded-xl bg-[#080E24] hover:bg-[#14224A] border border-[#E8B923]/30 flex flex-col items-center gap-1.5 cursor-pointer transition-all hover:border-[#E8B923] active:scale-95 group shadow"
                >
                  <PaytmIcon className="w-7 h-7 rounded-lg group-hover:scale-105 transition-transform" />
                  <span className="text-xs font-bold text-[#F6EEDD]">Paytm</span>
                </button>
              </div>
            </div>

            {/* EXPANDABLE QR CODE / DESKTOP SCANNER */}
            <div className="rounded-2xl bg-[#080E24]/80 border border-[#E8B923]/30 p-3">
              <div className="flex items-center justify-between text-xs">
                <button
                  onClick={() => setShowQr(!showQr)}
                  className="text-[#E8B923] font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{showQr ? 'Hide UPI QR Code' : 'Show UPI QR Code (For Desktop / Scanner)'}</span>
                </button>

                <button
                  onClick={copyUpiId}
                  className="px-2 py-0.5 rounded bg-[#14224A] text-[#FFE27A] border border-[#E8B923]/30 text-[11px] font-mono flex items-center gap-1 cursor-pointer hover:bg-[#1B7A6E]/30"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{UPI_CONFIG.vpa}</span>
                    </>
                  )}
                </button>
              </div>

              {showQr && (
                <div className="mt-3 pt-3 border-t border-[#E8B923]/20 flex flex-col items-center animate-in fade-in">
                  <div className="p-2.5 rounded-2xl bg-white border-2 border-[#E8B923] shadow-md">
                    <canvas ref={qrCanvasRef} className="rounded" />
                  </div>
                  <span className="text-[11px] text-[#F6EEDD]/75 mt-2">
                    Scan with any UPI App &bull; Exact Amount ₹{amount}.00
                  </span>
                </div>
              )}
            </div>

            {/* UNLOCK / RETURN BUTTON */}
            <div className="pt-2 space-y-2">
              <button
                id="btn-completed-upi-unlock"
                onClick={handleInstantUnlock}
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
                    <span>
                      {hasTriggeredIntent
                        ? 'I Completed Payment — Unlock & Crack My Kunda! 🏺'
                        : 'Unlock My Pot & Start Cracking 🏺'}
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#F6EEDD]/60 px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct NPCI UPI Protocol</span>
                </span>
                <a
                  href={smePaymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-0.5"
                >
                  <span>SMEPay Web Backup</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
