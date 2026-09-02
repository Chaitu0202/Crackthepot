/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { PotConfig, PrizeResult, DevoteeProfile, PotId } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PotCard3D } from './components/PotCard3D';
import { CrackGameEngine } from './components/CrackGameEngine';
import { ReferralBoostSection } from './components/ReferralBoostSection';
import { PrizeTiersMatrix } from './components/PrizeTiersMatrix';
import { GrandPrizeCountdown } from './components/GrandPrizeCountdown';
import { PotCrackersLiveTicker } from './components/PotCrackersLiveTicker';
import { Footer } from './components/Footer';
import { TermsModal } from './components/TermsModal';
import { ClaimPotModal } from './components/ClaimPotModal';
import { SacredDakshinaModal } from './components/SacredDakshinaModal';
import { PaymentStatusModal, PaymentVerificationState } from './components/PaymentStatusModal';
import { DAKSHINA_PAYMENT_LINKS } from './types';
import { Sparkles, Trophy, Gift, ArrowDown } from 'lucide-react';
import { RangoliDivider, DiyaLamp } from './components/SvgMotifs';

const POTS_DATA: PotConfig[] = [
  {
    id: 'venna',
    name: 'Venna Kunda',
    teluguName: 'వెన్న కుండ',
    tierName: 'Casual Matka',
    price: 5,
    rewardHint: 'Quick wins & coupons',
    accentColor: '#E8B923',
    secondaryColor: '#B8860B',
    description: 'Traditional earthen pot filled with freshly churned butter and instant festive vouchers.',
    features: [
      '5% – 15% instant store discount',
      'Free shipping token + sweets sample',
      '1 Grand Prize Draw Entry (#GPD-2026)',
      '1-in-50 Instant ₹50 cashback drop',
    ],
    grandDrawMultiplier: 1,
  },
  {
    id: 'uyyala',
    name: 'Uyyala Kunda',
    teluguName: 'ఉయ్యాల కుండ',
    tierName: 'Premium Royal Matka',
    price: 9,
    rewardHint: 'Bigger rewards, rare grand prizes',
    accentColor: '#C6296F',
    secondaryColor: '#1B7A6E',
    description: 'Suspended ornate royal pot adorned with sacred peacock feathers and maximum prize multipliers.',
    features: [
      '25% – 50% luxury festive gift hamper coupon',
      '₹150 – ₹250 instant wallet cashback',
      '3x Grand Prize Draw Entries (Tripled Odds!)',
      '1-in-100 Rare Silver Flute Kept Gift Pass',
    ],
    grandDrawMultiplier: 3,
    popular: true,
  },
];

export default function App() {
  const [selectedPotId, setSelectedPotId] = useState<PotConfig['id']>('uyyala');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState<boolean>(false);
  const [isDakshinaModalOpen, setIsDakshinaModalOpen] = useState<boolean>(false);
  const [isPaymentStatusOpen, setIsPaymentStatusOpen] = useState<boolean>(false);
  const [paymentVerificationState, setPaymentVerificationState] = useState<PaymentVerificationState>('prompt');
  
  // Devotee profile state with local persistence
  const [devoteeProfile, setDevoteeProfile] = useState<DevoteeProfile | null>(() => {
    try {
      const saved = localStorage.getItem('krishna_pot_devotee');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [userTickets, setUserTickets] = useState<string[]>([
    'GPD-2026-883921',
    'GPD-2026-104928',
  ]);
  const [wonPrizes, setWonPrizes] = useState<PrizeResult[]>([]);

  const crackArenaRef = useRef<HTMLDivElement>(null);
  const potSelectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Direct Redirect to SMEPay transaction page
  const handleDirectSmePayRedirect = (potId: PotId) => {
    const isUyyala = potId === 'uyyala';
    const targetUrl = isUyyala ? DAKSHINA_PAYMENT_LINKS.uyyala : DAKSHINA_PAYMENT_LINKS.venna;
    setSelectedPotId(potId);

    try {
      localStorage.setItem(
        'smepay_pending_txn',
        JSON.stringify({
          potId,
          amount: isUyyala ? 9 : 5,
          initiatedAt: Date.now(),
          targetUrl,
        })
      );
    } catch {
      // ignore
    }

    // Directly navigate to SMEPay transaction gateway
    window.location.href = targetUrl;
  };

  // Check URL parameters and pending payment on page load/return
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const statusParam = (
      urlParams.get('status') ||
      urlParams.get('payment_status') ||
      urlParams.get('txn_status') ||
      urlParams.get('smepay')
    )?.toLowerCase();

    // 1. Direct URL outcome detection
    if (statusParam === 'success' || statusParam === 'completed') {
      const potType = (urlParams.get('pot') as PotId) || selectedPotId || 'uyyala';
      const amount = potType === 'uyyala' ? 9 : 5;
      const txn = urlParams.get('txnId') || `SME-TXN-${Date.now()}`;
      handlePaymentSuccess(amount, txn, potType);
      setPaymentVerificationState('success');
      setIsPaymentStatusOpen(true);
      try {
        localStorage.removeItem('smepay_pending_txn');
      } catch {
        // ignore
      }
      return;
    }

    if (statusParam === 'failed' || statusParam === 'failure' || statusParam === 'cancel') {
      setPaymentVerificationState('failed');
      setIsPaymentStatusOpen(true);
      return;
    }

    // 2. Pending payment return detection
    try {
      const pendingRaw = localStorage.getItem('smepay_pending_txn');
      if (pendingRaw) {
        const pending = JSON.parse(pendingRaw);
        // Only trigger if initiated in the last 2 hours and not yet marked paid
        const isRecent = Date.now() - (pending.initiatedAt || 0) < 2 * 60 * 60 * 1000;
        if (isRecent && (!devoteeProfile || !devoteeProfile.isPaid || devoteeProfile.potType !== pending.potId)) {
          setSelectedPotId(pending.potId || 'uyyala');
          setPaymentVerificationState('prompt');
          setIsPaymentStatusOpen(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleOpenDakshinaModal = (potId?: PotId) => {
    handleDirectSmePayRedirect(potId || selectedPotId);
  };

  const handleOpenClaimModal = (potId?: PotId) => {
    handleDirectSmePayRedirect(potId || selectedPotId);
  };

  const handleProfileSubmitted = (profile: DevoteeProfile) => {
    setDevoteeProfile(profile);
    setSelectedPotId(profile.potType);
    try {
      localStorage.setItem('krishna_pot_devotee', JSON.stringify(profile));
    } catch {
      // ignore
    }
    handleDirectSmePayRedirect(profile.potType);
  };

  const handlePaymentSuccess = (amount: number, txnId: string, potType: PotId) => {
    const updatedProfile: DevoteeProfile = {
      ...(devoteeProfile || {
        name: 'Blessed Devotee',
        potType,
        registeredAt: new Date().toISOString(),
      }),
      isPaid: true,
      paidAmount: amount,
      paymentTxnId: txnId,
      paidAt: new Date().toISOString(),
      potType,
      customPotName: `${potType === 'uyyala' ? 'Uyyala Kunda' : 'Venna Kunda'} (Blessed)`,
    };

    setDevoteeProfile(updatedProfile);
    try {
      localStorage.setItem('krishna_pot_devotee', JSON.stringify(updatedProfile));
      localStorage.removeItem('smepay_pending_txn');
    } catch {
      // ignore
    }

    // Add instant bonus draw tickets for the sacred offering (3x for Uyyala, 1x for Venna)
    const bonusTickets = potType === 'uyyala'
      ? [
          `GPD-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          `GPD-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          `GPD-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        ]
      : [`GPD-2026-${Math.floor(100000 + Math.random() * 900000)}`];

    setUserTickets((prev) => [...prev, ...bonusTickets]);

    // Smooth scroll to the interactive arena
    setTimeout(() => {
      scrollToSection('crack-interactive-arena');
    }, 200);
  };

  const handleStartCrack = (potId: PotConfig['id']) => {
    setSelectedPotId(potId);
    if (!devoteeProfile || !devoteeProfile.isPaid || devoteeProfile.potType !== potId) {
      handleDirectSmePayRedirect(potId);
    } else {
      scrollToSection('crack-interactive-arena');
    }
  };

  const handlePrizeWon = (prize: PrizeResult) => {
    setWonPrizes((prev) => [prize, ...prev]);
    setUserTickets((prev) => [...prev, ...prize.ticketNumbers]);
  };

  const handleAddBonusTicket = (ticket: string) => {
    setUserTickets((prev) => [ticket, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#080E24] text-[#F6EEDD] flex flex-col relative selection:bg-[#E8B923]/30 selection:text-[#E8B923]">
      {/* Top Navbar */}
      <Navbar
        ticketCount={userTickets.length}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenRules={() => setIsTermsOpen(true)}
      />

      {/* 1. HERO SECTION */}
      <HeroSection
        onPickPotClick={() => scrollToSection('pots-selection')}
        onRequestClaim={() => handleOpenClaimModal(selectedPotId)}
        devoteeProfile={devoteeProfile}
      />

      {/* LIVE SCROLLABLE POT CRACKERS STREAM / HALL OF FAME */}
      <PotCrackersLiveTicker
        onPickPotClick={() => scrollToSection('pots-selection')}
      />

      {/* 2. POT SELECTION SECTION (Core Interactive 3D Moment) */}
      <section
        id="pots-selection"
        ref={potSelectionRef}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8B923]/15 border border-[#E8B923]/30 text-[#E8B923] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Matka Selection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F6EEDD] tracking-tight">
            Choose Your Auspicious Pot
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#F6EEDD]/80 max-w-xl mx-auto">
            Hover & tilt to inspect in real 3D. Pick between the Casual Venna Kunda or the High-Reward Uyyala Kunda.
          </p>
        </div>

        {/* Two 3D Interactive Pot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto items-stretch">
          {POTS_DATA.map((pot) => (
            <PotCard3D
              key={pot.id}
              pot={pot}
              isSelected={selectedPotId === pot.id}
              onSelect={(id) => setSelectedPotId(id)}
              onStartCrack={handleStartCrack}
            />
          ))}
        </div>

        <div className="mt-12 max-w-sm mx-auto">
          <RangoliDivider />
        </div>
      </section>

      {/* 3. THE CRACK MECHANIC (Interactive 5-Tap Arena with Devotee Claim) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 w-full" ref={crackArenaRef}>
        <CrackGameEngine
          pots={POTS_DATA}
          activePotId={selectedPotId}
          onSelectPot={(id) => setSelectedPotId(id)}
          onWinPrize={handlePrizeWon}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          devoteeProfile={devoteeProfile}
          onRequestClaim={(potId) => handleOpenClaimModal(potId || selectedPotId)}
          onRequestDakshina={(potId) => handleOpenDakshinaModal(potId || selectedPotId)}
        />
      </section>

      {/* 4. REFERRAL BOOST & STRENGTH METER */}
      <ReferralBoostSection
        userTickets={userTickets}
        onAddBonusTicket={handleAddBonusTicket}
      />

      {/* 5. PRIZE TIERS & REWARD ODDS MATRIX */}
      <PrizeTiersMatrix
        onSelectTier={(potId) => {
          setSelectedPotId(potId);
          if (!devoteeProfile) {
            handleOpenClaimModal(potId);
          } else if (!devoteeProfile.isPaid || devoteeProfile.potType !== potId) {
            handleOpenDakshinaModal(potId);
          } else {
            scrollToSection('crack-interactive-arena');
          }
        }}
      />

      {/* 6. GRAND PRIZE COUNTDOWN TO 10TH SEPTEMBER */}
      <GrandPrizeCountdown />

      {/* 7. FOOTER */}
      <Footer onOpenTerms={() => setIsTermsOpen(true)} />

      {/* TERMS & CONDITIONS MODAL */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* DEVOTEE CLAIM POT MODAL */}
      <ClaimPotModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        selectedPotId={selectedPotId}
        onSubmitProfile={handleProfileSubmitted}
        soundEnabled={soundEnabled}
      />

      {/* SACRED DAKSHINA & MYSTERY QR PAYMENT MODAL (₹5 / ₹9) */}
      <SacredDakshinaModal
        isOpen={isDakshinaModalOpen}
        onClose={() => setIsDakshinaModalOpen(false)}
        potType={selectedPotId}
        devoteeProfile={devoteeProfile}
        onPaymentSuccess={handlePaymentSuccess}
        soundEnabled={soundEnabled}
      />

      {/* SMEPAY PAYMENT STATUS & VERIFICATION MODAL (SUCCESS / FAILED / PROMPT) */}
      <PaymentStatusModal
        isOpen={isPaymentStatusOpen}
        onClose={() => setIsPaymentStatusOpen(false)}
        status={paymentVerificationState}
        potType={selectedPotId}
        onConfirmSuccess={(potType) => {
          const amount = potType === 'uyyala' ? 9 : 5;
          handlePaymentSuccess(amount, `SME-${Date.now()}`, potType);
        }}
        onRetryPayment={(potType) => {
          setIsPaymentStatusOpen(false);
          handleDirectSmePayRedirect(potType);
        }}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
