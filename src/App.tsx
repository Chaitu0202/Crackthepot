/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { DevoteeProfile, PotId, POT_TIERS, InstantReward, ClaimedPotInstance } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CrackGameEngine } from './components/CrackGameEngine';
import { Footer } from './components/Footer';
import { TermsModal } from './components/TermsModal';
import { MyPotsModal } from './components/MyPotsModal';
import { ThankYouPage } from './components/ThankYouPage';
import { CreditCard, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export default function App() {
  const [selectedPotId, setSelectedPotId] = useState<PotId>('uyyala');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'thankyou'>(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') || params.get('view');
    return pageParam === 'thankyou' ? 'thankyou' : 'dashboard';
  });
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  const [isMyPotsOpen, setIsMyPotsOpen] = useState<boolean>(false);
  const [showPaymentSuccessDialog, setShowPaymentSuccessDialog] = useState<boolean>(false);

  // Devotee profile state with local persistence (default identity without asking for user input)
  const [devoteeProfile, setDevoteeProfile] = useState<DevoteeProfile | null>(() => {
    try {
      const saved = localStorage.getItem('krishna_pot_devotee');
      if (saved) return JSON.parse(saved);
      return {
        name: 'Blessed Devotee',
        phone: '9876543210',
        city: 'Hyderabad',
        selectedPot: 'uyyala',
        referralCode: 'KRISHNA-DEVOTEE-2026',
        referralCount: 0,
        tickets: ['GPD-2026-883921', 'GPD-2026-104928', 'GPD-2026-442109'],
        registeredAt: new Date().toISOString(),
        paymentAmount: 0,
        paymentStatus: 'free',
      };
    } catch {
      return null;
    }
  });

  // Claimed Pots collection persisted in this browser
  const [claimedPots, setClaimedPots] = useState<ClaimedPotInstance[]>(() => {
    try {
      const saved = localStorage.getItem('krishna_claimed_pots');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const initialPot: ClaimedPotInstance = {
        id: `pot-${Date.now()}`,
        potId: 'uyyala',
        devoteeName: 'Blessed Devotee',
        phone: '9876543210',
        city: 'Hyderabad',
        tickets: ['GPD-2026-883921', 'GPD-2026-104928', 'GPD-2026-442109'],
        claimedAt: new Date().toISOString(),
        sharesCount: 0,
        isCracked: false,
        paymentAmount: 0,
      };
      return [initialPot];
    } catch {
      return [];
    }
  });

  const [userTickets, setUserTickets] = useState<string[]>(() => {
    if (devoteeProfile?.tickets?.length) {
      return devoteeProfile.tickets;
    }
    return ['GPD-2026-883921', 'GPD-2026-104928', 'GPD-2026-442109'];
  });

  const crackArenaRef = useRef<HTMLDivElement>(null);

  // Detect payment return from SMEpay URL parameters or query strings
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const isThankYouPage =
        params.get('page') === 'thankyou' ||
        params.get('view') === 'thankyou' ||
        params.get('status') === 'success' ||
        params.get('transaction') === 'success' ||
        params.get('payment') === 'success' ||
        params.get('paid') === 'true' ||
        params.has('txnid');

      if (isThankYouPage) {
        confirmVennaPaymentSuccess();
      }
    } catch {
      // ignore
    }
  }, []);

  const scrollToArena = () => {
    const el = document.getElementById('crack-interactive-arena');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Venna Kunda (₹5) payment handler - NO details asked
  const handlePayVennaKunda = () => {
    setSelectedPotId('venna');
    const paymentUrl = POT_TIERS.venna.paymentUrl || 'https://page.smepay.in/@crackthepot/transaction/valdffl';

    // Open SMEpay in new tab
    window.open(paymentUrl, '_blank', 'noopener,noreferrer');
    setShowPaymentSuccessDialog(true);
  };

  // Confirm Venna payment completion and render Thank You page
  const confirmVennaPaymentSuccess = () => {
    const ticketPrefix = 'GPD-2026-';
    const newTicket = `${ticketPrefix}${Math.floor(100000 + Math.random() * 900000)}`;
    const txnId = `SME-VALDFFL-${Math.floor(100000 + Math.random() * 900000)}`;

    const updatedProfile: DevoteeProfile = {
      name: devoteeProfile?.name || 'Blessed Devotee',
      phone: devoteeProfile?.phone || '9876543210',
      city: devoteeProfile?.city || 'Hyderabad',
      selectedPot: 'venna',
      referralCode: 'KRISHNA-VENNA-2026',
      referralCount: devoteeProfile?.referralCount || 0,
      tickets: Array.from(new Set([...(devoteeProfile?.tickets || []), newTicket])),
      registeredAt: new Date().toISOString(),
      paymentAmount: 5,
      paymentStatus: 'completed',
      transactionId: txnId,
    };

    const newPotInst: ClaimedPotInstance = {
      id: `pot-${Date.now()}`,
      potId: 'venna',
      devoteeName: updatedProfile.name,
      phone: updatedProfile.phone,
      city: updatedProfile.city,
      tickets: [newTicket],
      claimedAt: new Date().toISOString(),
      sharesCount: 0,
      isCracked: false,
      paymentAmount: 5,
      transactionId: txnId,
    };

    setDevoteeProfile(updatedProfile);
    setSelectedPotId('venna');
    setUserTickets((prev) => Array.from(new Set([...prev, newTicket])));
    setClaimedPots((prev) => {
      const filtered = prev.filter((p) => p.potId !== 'venna');
      const updated = [newPotInst, ...filtered];
      try {
        localStorage.setItem('krishna_claimed_pots', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    try {
      localStorage.setItem('krishna_pot_devotee', JSON.stringify(updatedProfile));
    } catch {
      // ignore
    }

    setShowPaymentSuccessDialog(false);
    setCurrentView('thankyou');
  };

  // Uyyala Kunda (Free) selection handler - NO details asked
  const handleSelectUyyalaKunda = () => {
    setSelectedPotId('uyyala');
    scrollToArena();
  };

  const handleRewardWon = (reward: InstantReward, tickets: string[]) => {
    setUserTickets((prev) => Array.from(new Set([...prev, ...tickets])));

    if (devoteeProfile) {
      const updatedProfile: DevoteeProfile = {
        ...devoteeProfile,
        claimedReward: reward,
        tickets: Array.from(new Set([...(devoteeProfile.tickets || []), ...tickets])),
      };
      setDevoteeProfile(updatedProfile);
      try {
        localStorage.setItem('krishna_pot_devotee', JSON.stringify(updatedProfile));
      } catch {
        // ignore
      }
    }

    setClaimedPots((prev) => {
      const updated = prev.map((p) => {
        if (p.potId === selectedPotId) {
          return {
            ...p,
            isCracked: true,
            wonReward: reward,
            tickets: Array.from(new Set([...(p.tickets || []), ...tickets])),
          };
        }
        return p;
      });
      try {
        localStorage.setItem('krishna_claimed_pots', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleAddBonusTicket = (ticket: string) => {
    setUserTickets((prev) => Array.from(new Set([ticket, ...prev])));
    if (devoteeProfile) {
      const updated: DevoteeProfile = {
        ...devoteeProfile,
        tickets: Array.from(new Set([...(devoteeProfile.tickets || []), ticket])),
        referralCount: (devoteeProfile.referralCount || 0) + 1,
      };
      setDevoteeProfile(updated);
      try {
        localStorage.setItem('krishna_pot_devotee', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  const handleSelectAndCrackPot = (potInst: ClaimedPotInstance) => {
    setSelectedPotId(potInst.potId);
    if (currentView === 'thankyou') {
      setCurrentView('dashboard');
    }
    setTimeout(() => {
      scrollToArena();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#080E24] text-[#F6EEDD] flex flex-col relative selection:bg-[#E8B923]/30 selection:text-[#E8B923]">
      {/* Top Navbar */}
      <Navbar
        ticketCount={userTickets.length}
        claimedPotsCount={claimedPots.length}
        onOpenMyPots={() => setIsMyPotsOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenRules={() => setIsTermsOpen(true)}
        currentView={currentView}
        onNavigateView={(view) => {
          setCurrentView(view);
          if (view === 'dashboard') {
            setTimeout(scrollToArena, 100);
          }
        }}
      />

      {currentView === 'thankyou' ? (
        <div className="pt-20 flex-1 flex flex-col">
          <ThankYouPage
            potId={selectedPotId}
            devoteeProfile={devoteeProfile}
            userTickets={userTickets}
            claimedPots={claimedPots}
            onGoToDashboard={() => {
              setCurrentView('dashboard');
              setTimeout(scrollToArena, 150);
            }}
            onOpenMyPots={() => setIsMyPotsOpen(true)}
            soundEnabled={soundEnabled}
          />
          <Footer onOpenTerms={() => setIsTermsOpen(true)} />
        </div>
      ) : (
        <>
          {/* 1. CLEAN HERO SECTION WITH "కుండ పగలగొట్టు" AND DIRECT VENNA & UYYALA POTS */}
          <HeroSection
            onSelectPot={(id) => {
              setSelectedPotId(id);
              if (id === 'uyyala') {
                handleSelectUyyalaKunda();
              } else {
                handlePayVennaKunda();
              }
            }}
            onPayVennaKunda={handlePayVennaKunda}
            selectedPotId={selectedPotId}
          />

          {/* 2. DIRECT INTERACTIVE CRACK ARENA - TAP & SHARE TO CRACK */}
          <section className="py-8 px-4 sm:px-6 lg:px-8 w-full" ref={crackArenaRef}>
            <CrackGameEngine
              activePotId={selectedPotId}
              onSelectPot={(id) => setSelectedPotId(id)}
              devoteeProfile={devoteeProfile}
              claimedPots={claimedPots}
              onRequestClaim={(potId) => {
                if (potId === 'venna') {
                  handlePayVennaKunda();
                } else {
                  handleSelectUyyalaKunda();
                }
              }}
              onRewardWon={handleRewardWon}
              onReferralBoost={() => {
                const bonus = `GPD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
                handleAddBonusTicket(bonus);
              }}
              onOpenMyPots={() => setIsMyPotsOpen(true)}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled(!soundEnabled)}
            />
          </section>

          {/* 3. FOOTER */}
          <Footer onOpenTerms={() => setIsTermsOpen(true)} />
        </>
      )}

      {/* QUICK PAYMENT CONFIRMATION DIALOG (When SMEpay is opened) - ZERO FORM FIELDS */}
      {showPaymentSuccessDialog && (
        <div
          id="payment-success-modal-backdrop"
          className="fixed inset-0 z-50 bg-[#040816]/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            id="payment-success-modal-container"
            className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#14224A] via-[#0E1738] to-[#070D22] border-2 border-[#E8B923] p-6 sm:p-7 text-center space-y-4 shadow-[0_0_50px_rgba(232,185,35,0.4)] animate-in zoom-in-95"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#E8B923]/20 border border-[#E8B923] text-[#E8B923] flex items-center justify-center mx-auto">
              <CreditCard className="w-7 h-7 animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-serif font-bold text-white">
                ₹5 SMEpay Gateway Opened
              </h3>
              <p className="text-xs text-[#F6EEDD]/80">
                We opened the official SMEpay gateway in a new tab. After making your ₹5 offering, click below to see your <strong>Thank You</strong> page &amp; lucky draw tickets!
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#080E24] border border-[#E8B923]/30 text-xs text-left space-y-1">
              <div className="flex justify-between text-[#F6EEDD]/70">
                <span>Selected Offering:</span>
                <span className="font-bold text-[#FFE27A]">Venna Kunda (వెన్న కుండ)</span>
              </div>
              <div className="flex justify-between text-[#F6EEDD]/70">
                <span>Offering Amount:</span>
                <span className="font-bold text-[#E8B923]">₹5.00</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                id="btn-confirm-payment-done"
                onClick={confirmVennaPaymentSuccess}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-[#E8B923] to-emerald-500 text-[#0B1230] font-black text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#0B1230]" />
                <span>I Have Paid ₹5 &bull; View Thank You Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-xs text-[#F6EEDD]/60 pt-1">
                <a
                  href={POT_TIERS.venna.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E8B923] hover:underline flex items-center gap-1 font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Reopen Gateway</span>
                </a>
                <span>&bull;</span>
                <button
                  onClick={() => setShowPaymentSuccessDialog(false)}
                  className="hover:text-white underline cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TERMS & CONDITIONS MODAL */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* MY POTS MODAL (Browser-persisted pots management) */}
      <MyPotsModal
        isOpen={isMyPotsOpen}
        onClose={() => setIsMyPotsOpen(false)}
        claimedPots={claimedPots}
        activePotId={selectedPotId}
        onSelectAndCrackPot={handleSelectAndCrackPot}
        onClaimNewPot={() => handleSelectUyyalaKunda()}
      />
    </div>
  );
}
