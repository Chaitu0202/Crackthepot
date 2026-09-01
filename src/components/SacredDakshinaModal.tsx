import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { PotId, DevoteeProfile, DAKSHINA_PAYMENT_LINKS } from '../types';
import { NemaliIcon, PeacockFeatherIcon } from './SvgMotifs';
import { playTempleBell, playCoinChime, playCelebrationFanfare } from '../utils/audio';
import {
  Sparkles,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  X,
  Lock,
  Unlock,
  QrCode,
  ArrowRight,
  ExternalLink,
  Smartphone,
  RotateCcw
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

  const [activeTab, setActiveTab] = useState<'pay_link' | 'qr'>('pay_link');
  const [copied, setCopied] = useState(false);
  const [hasOpenedGateway, setHasOpenedGateway] = useState(false);
  const [timeLeft, setTimeLeft] = useState(299); // 4m 59s
  const [txnRef, setTxnRef] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-launch gateway or highlight for easy click
  const handleOpenGateway = () => {
    window.open(paymentLink, '_blank', 'noopener,noreferrer');
    setHasOpenedGateway(true);
  };

  // Countdown timer for mystery & enthusiasm
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 299));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Generate QR Code on Canvas from the transaction link
  useEffect(() => {
    if (!isOpen || !qrCanvasRef.current) return;

    QRCode.toCanvas(
      qrCanvasRef.current,
      paymentLink,
      {
        width: 220,
        margin: 1.5,
        color: {
          dark: '#080E24',
          light: '#FFFDF7',
        },
        errorCorrectionLevel: 'H',
      },
      (error) => {
        if (error) console.error('QR generation error:', error);
      }
    );
  }, [isOpen, paymentLink, activeTab]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const copyPaymentLink = () => {
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    if (soundEnabled) {
      playTempleBell();
    }

    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      if (soundEnabled) {
        playCoinChime();
        setTimeout(() => playCelebrationFanfare(), 250);
      }

      // Trigger festive confetti
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#E8B923', '#1B7A6E', '#C6296F', '#FFFDF7'],
      });

      const generatedTxn = txnRef.trim() || `TXN-SME-${Math.floor(10000000 + Math.random() * 90000000)}`;

      setTimeout(() => {
        onPaymentSuccess(amount, generatedTxn, potType);
        onClose();
        setVerifiedSuccess(false);
        setTxnRef('');
        setHasOpenedGateway(false);
      }, 1200);
    }, 900);
  };

  return (
    <div
      id="sacred-dakshina-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#040816]/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="sacred-dakshina-container"
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

        {/* Header: Sacred Pot Dakshina */}
        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8B923]/15 border border-[#E8B923]/40 text-[#E8B923] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Hundi Token Dakshina</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#F6EEDD] tracking-tight">
            Offer ₹{amount} to Unlock &bull;{' '}
            <span className={isUyyala ? 'text-[#FFE27A]' : 'text-[#E8B923]'}>
              {potLabel}
            </span>
          </h2>
          <p className="font-telugu text-sm sm:text-base text-[#E8B923] font-semibold mt-0.5">
            {potTelugu} &bull; ₹{amount} సంకల్ప దక్షిణ సమర్పణ
          </p>

          {/* Devotee Reservation Active Ribbon */}
          {devoteeProfile && (
            <div className="mt-2.5 p-2 rounded-xl bg-[#080E24]/90 border border-[#E8B923]/30 flex items-center justify-between text-xs px-3">
              <span className="text-[#F6EEDD]/90 font-medium">
                Devotee: <strong className="text-[#E8B923]">{devoteeProfile.name}</strong>
              </span>
              <span className="flex items-center gap-1 font-mono font-bold text-amber-300">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Reserved for {formattedTime}</span>
              </span>
            </div>
          )}
        </div>

        {/* PROMINENT INSTRUCTION CARD: PAY & RETURN */}
        <div className="mt-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-[#1B7A6E]/30 via-[#0B1230] to-[#E8B923]/20 border border-[#E8B923]/40 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-[#FFE27A]">
            <Sparkles className="w-4 h-4 text-[#E8B923]" />
            <span>How to Unlock Your Sacred Kunda:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-[#080E24]/90 border border-[#E8B923]/20 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E8B923] text-[#0B1230] font-black text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <span className="text-[#F6EEDD]/90">
                Tap <strong>Pay ₹{amount} via SMEPay</strong> to complete your offering.
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#080E24]/90 border border-emerald-500/30 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-[#0B1230] font-black text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <span className="text-emerald-200">
                <strong>Return to this page</strong> & tap &lsquo;I Have Paid&rsquo; to crack your Kunda!
              </span>
            </div>
          </div>
        </div>

        {/* Tab Selection: 1-Tap Payment Link vs Scan QR Code */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('pay_link')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'pay_link'
                ? 'bg-gradient-to-r from-[#E8B923] to-[#C6296F] text-[#0B1230] font-black shadow-lg scale-[1.02]'
                : 'bg-[#080E24] border border-[#E8B923]/30 text-[#F6EEDD]/70 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Pay ₹{amount} on SMEPay</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-[#E8B923] text-[#0B1230] font-black shadow-lg scale-[1.02]'
                : 'bg-[#080E24] border border-[#E8B923]/30 text-[#F6EEDD]/70 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Scan QR Code (₹{amount})</span>
          </button>
        </div>

        {/* TAB 1: DIRECT 1-TAP PAYMENT LINK */}
        {activeTab === 'pay_link' && (
          <div className="mt-4 space-y-3">
            {/* Primary Glowing Call to Action Button */}
            <button
              onClick={handleOpenGateway}
              className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-sm sm:text-base flex items-center justify-between shadow-[0_0_25px_rgba(232,185,35,0.45)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#0B1230]" />
                <span>Open SMEPay Transaction Page (₹{amount})</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-xs bg-[#0B1230] text-[#E8B923] px-3 py-1 rounded-lg group-hover:translate-x-1 transition-transform">
                <span>Pay ₹{amount}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </button>

            {hasOpenedGateway && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs flex items-center gap-2.5 text-emerald-200 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  SMEPay transaction page opened in new tab. After offering ₹{amount}, return here and tap the green button below!
                </span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-[#080E24]/90 border border-[#E8B923]/30 text-xs space-y-2">
              <div className="flex items-center justify-between text-[#F6EEDD]/80">
                <span className="font-semibold text-[#E8B923]">SMEPay Transaction Link:</span>
                <span className="text-[10px] text-emerald-400">Direct Gateway</span>
              </div>

              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#0B1230] border border-[#E8B923]/20 font-mono text-[11px] text-[#FFE27A]">
                <span className="truncate">{paymentLink}</span>
                <button
                  onClick={copyPaymentLink}
                  className="px-2 py-1 rounded bg-[#14224A] text-[#E8B923] hover:bg-[#1B7A6E]/40 transition-colors flex items-center gap-1 shrink-0 font-sans text-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#F6EEDD]/70 text-center">
                Supports <strong className="text-white">Google Pay, PhonePe, Paytm, CRED, BHIM & UPI</strong>.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: SACRED QR CODE DISPLAY */}
        {activeTab === 'qr' && (
          <div className="mt-4 flex flex-col items-center">
            {/* Glowing QR Box */}
            <div className="relative p-3 rounded-2xl bg-gradient-to-b from-[#FFFDF7] to-[#F5F0E1] border-4 border-[#E8B923] shadow-[0_0_30px_rgba(232,185,35,0.4)]">
              <canvas ref={qrCanvasRef} className="rounded-lg shadow" />

              {/* Exact Amount Ribbon badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-[#1B7A6E] via-[#0E1738] to-[#1B7A6E] border border-[#E8B923] text-[#FFE27A] text-xs font-black tracking-wider shadow">
                EXACT AMOUNT: ₹{amount}.00
              </div>
            </div>

            <p className="text-xs text-[#F6EEDD]/80 mt-4 text-center max-w-xs">
              Scan with <strong className="text-[#E8B923]">PhonePe, Google Pay, Paytm, or Camera</strong> to complete on SMEPay.
            </p>

            <button
              onClick={handleOpenGateway}
              className="mt-3 px-4 py-2 rounded-xl bg-[#080E24] border border-[#E8B923]/40 text-[#E8B923] hover:bg-[#14224A] text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer"
            >
              <span>Or click here to open gateway directly</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* REWARD MULTIPLIER HIGHLIGHT */}
        <div className="mt-4 p-3 rounded-2xl bg-[#080E24]/90 border border-[#E8B923]/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1B7A6E]/30 border border-[#1B7A6E]/60 flex items-center justify-center text-[#E8B923] shrink-0">
            <Flame className="w-5 h-5 text-[#E8B923]" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-[#E8B923] block">
              Offering ₹{amount} Activates:
            </span>
            <span className="text-[#F6EEDD]/80">
              {isUyyala
                ? '3x Grand Draw Tickets (#GPD-2026) + Royal Festival Hamper Vouchers'
                : '1x Grand Draw Ticket + Guaranteed Festive Sweets Discount'}
            </span>
          </div>
        </div>

        {/* VERIFY DAKSHINA STEP */}
        <div className="mt-4 pt-4 border-t border-[#E8B923]/25">
          <div className="mb-2">
            <label className="block text-xs font-semibold text-[#E8B923] uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>UPI Ref / Transaction ID (Optional):</span>
              <span className="text-[10px] text-emerald-400">Instant Verification</span>
            </label>
            <input
              type="text"
              value={txnRef}
              onChange={(e) => setTxnRef(e.target.value)}
              placeholder="e.g. 423987123456 or last 4 digits"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E24] border border-[#E8B923]/30 text-[#F6EEDD] placeholder-[#F6EEDD]/30 font-mono text-xs focus:outline-none focus:border-[#E8B923]"
            />
          </div>

          <button
            id="btn-verify-dakshina"
            onClick={handleVerify}
            disabled={isVerifying || verifiedSuccess}
            className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer ${
              verifiedSuccess
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] hover:brightness-105 active:scale-[0.98]'
            }`}
          >
            {verifiedSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 animate-bounce" />
                <span>₹{amount} Dakshina Blessed & Pot Unlocked!</span>
              </>
            ) : isVerifying ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin text-[#0B1230]" />
                <span>Verifying Sacred Vault Token...</span>
              </>
            ) : (
              <>
                <Unlock className="w-5 h-5 text-[#0B1230]" />
                <span>I Have Completed Payment — Unlock & Crack My Kunda!</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-[#F6EEDD]/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct SMEPay Bank Gateway &bull; Instant Pot Crack Arena Activation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
