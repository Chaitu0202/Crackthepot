/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { DevoteeProfile, PotId, POT_TIERS, InstantReward, ClaimedPotInstance } from './types';
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
import { MyPotsModal } from './components/MyPotsModal';
import { ThankYouPage } from './components/ThankYouPage';
import { Sparkles } from 'lucide-react';
import { RangoliDivider } from './components/SvgMotifs';

export default function App() {
  const [selectedPotId, setSelectedPotId] = useState<PotId>('uyyala');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'thankyou'>(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') || params.get('view');
    return pageParam === 'thankyou' ? 'thankyou' : 'dashboard';
  });
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState<boolean>(false);
  const [isMyPotsOpen, setIsMyPotsOpen] = useState<boolean>(false);

  // Devotee profile state with local persistence
  const [devoteeProfile, setDevoteeProfile] = useState<DevoteeProfile | null>(() => {
    try {
      const saved = localStorage.getItem('krishna_pot_devotee');
      return saved ? JSON.parse(saved) : null;
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
      // If devoteeProfile already exists, create default claimed pot
      const devoteeSaved = localStorage.getItem('krishna_pot_devotee');
      if (devoteeSaved) {
        const parsedDev = JSON.parse(devoteeSaved);
        const defaultPot: ClaimedPotInstance = {
          id: `pot-${Date.now()}`,
          potId: parsedDev.selectedPot || 'uyyala',
          devoteeName: parsedDev.name,
          phone: parsedDev.phone,
          city: parsedDev.city,
          tickets: parsedDev.tickets || ['GPD-2026-883921', 'GPD-2026-104928'],
          claimedAt: parsedDev.registeredAt || new Date().toISOString(),
          sharesCount: 0,
          isCracked: false,
          wonReward: parsedDev.claimedReward,
        };
        return [defaultPot];
      }
      return [];
    } catch {
      return [];
    }
  });

  const [userTickets, setUserTickets] = useState<string[]>(() => {
    if (devoteeProfile?.tickets?.length) {
      return devoteeProfile.tickets;
    }
    return ['GPD-2026-883921', 'GPD-2026-104928'];
  });

  const [wonPrizes, setWonPrizes] = useState<InstantReward[]>([]);

  const crackArenaRef = useRef<HTMLDivElement>(null);
  const potSelectionRef = useRef<HTMLDivElement>(null);

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
        // Retrieve pending details if available
        const pendingRaw = localStorage.getItem('krishna_pending_payment');
        let pending = null;
        if (pendingRaw) {
          try {
            pending = JSON.parse(pendingRaw);
          } catch {
            // ignore
          }
        }

        const ticketPrefix = 'GPD-2026-';
        const newTicket = `${ticketPrefix}${Math.floor(100000 + Math.random() * 900000)}`;
        const txnId = `SME-VALDFFL-${Math.floor(100000 + Math.random() * 900000)}`;

        const profileName = pending?.name || devoteeProfile?.name || 'Blessed Devotee';
        const profilePhone = pending?.phone || devoteeProfile?.phone || '9876543210';
        const profileCity = pending?.city || devoteeProfile?.city || 'Hyderabad';

        const updatedProfile: DevoteeProfile = {
          name: profileName,
          phone: profilePhone,
          city: profileCity,
          selectedPot: 'venna',
          referralCode: devoteeProfile?.referralCode || `KRISHNA-${profileName.slice(0, 4).toUpperCase()}-772`,
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
          devoteeName: profileName,
          phone: profilePhone,
          city: profileCity,
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
          localStorage.removeItem('krishna_pending_payment');
        } catch {
          // ignore
        }

        setCurrentView('thankyou');
      }
    } catch {
      // ignore
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenClaimModal = (potId?: PotId) => {
    if (potId) {
      setSelectedPotId(potId);
    }
    setIsClaimModalOpen(true);
  };

  const handleProfileSubmitted = (profile: DevoteeProfile, newPotInstance: ClaimedPotInstance) => {
    setDevoteeProfile(profile);
    setSelectedPotId(profile.selectedPot);
    setUserTickets((prev) => Array.from(new Set([...prev, ...profile.tickets])));

    setClaimedPots((prev) => {
      const filtered = prev.filter((p) => p.potId !== newPotInstance.potId);
      const updated = [newPotInstance, ...filtered];
      try {
        localStorage.setItem('krishna_claimed_pots', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    try {
      localStorage.setItem('krishna_pot_devotee', JSON.stringify(profile));
    } catch {
      // ignore
    }

    setIsClaimModalOpen(false);
    setCurrentView('thankyou');
  };

  const handleStartCrack = (potId: PotId) => {
    setSelectedPotId(potId);
    if (!devoteeProfile) {
      handleOpenClaimModal(potId);
    } else {
      scrollToSection('crack-interactive-arena');
    }
  };

  const handleRewardWon = (reward: InstantReward, tickets: string[]) => {
    setWonPrizes((prev) => [reward, ...prev]);
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
      scrollToSection('crack-interactive-arena');
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
            setTimeout(() => scrollToSection('pots-selection'), 100);
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
              setTimeout(() => {
                scrollToSection('crack-interactive-arena');
              }, 150);
            }}
            onOpenMyPots={() => setIsMyPotsOpen(true)}
            soundEnabled={soundEnabled}
          />
          <Footer onOpenTerms={() => setIsTermsOpen(true)} />
        </div>
      ) : (
        <>
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
                Hover &amp; tilt to inspect in real 3D. Pick between the Casual Venna Kunda or the Royal Uyyala Kunda.
              </p>
            </div>

            {/* Two 3D Interactive Pot Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto items-stretch">
              <PotCard3D
                pot={POT_TIERS.venna}
                isSelected={selectedPotId === 'venna'}
                onSelect={(id) => setSelectedPotId(id)}
                onStartCrack={handleStartCrack}
              />
              <PotCard3D
                pot={POT_TIERS.uyyala}
                isSelected={selectedPotId === 'uyyala'}
                onSelect={(id) => setSelectedPotId(id)}
                onStartCrack={handleStartCrack}
              />
            </div>

            <div className="mt-12 max-w-sm mx-auto">
              <RangoliDivider />
            </div>
          </section>

          {/* 3. THE CRACK MECHANIC (Interactive Clean Arena with Share Options) */}
          <section className="py-12 px-4 sm:px-6 lg:px-8 w-full" ref={crackArenaRef}>
            <CrackGameEngine
              activePotId={selectedPotId}
              onSelectPot={(id) => setSelectedPotId(id)}
              devoteeProfile={devoteeProfile}
              claimedPots={claimedPots}
              onRequestClaim={(potId) => handleOpenClaimModal(potId || selectedPotId)}
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

          {/* 4. REFERRAL BOOST & STRENGTH METER */}
          <ReferralBoostSection
            devoteeProfile={devoteeProfile}
            userTickets={userTickets}
            onAddBonusTicket={handleAddBonusTicket}
            soundEnabled={soundEnabled}
          />

          {/* 5. PRIZE TIERS & REWARD ODDS MATRIX */}
          <PrizeTiersMatrix
            onSelectTier={(potId) => {
              setSelectedPotId(potId);
              if (!devoteeProfile) {
                handleOpenClaimModal(potId);
              } else {
                scrollToSection('crack-interactive-arena');
              }
            }}
          />

          {/* 6. GRAND PRIZE COUNTDOWN TO 10TH SEPTEMBER */}
          <GrandPrizeCountdown />

          {/* 7. FOOTER */}
          <Footer onOpenTerms={() => setIsTermsOpen(true)} />
        </>
      )}

      {/* TERMS & CONDITIONS MODAL */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* DEVOTEE CLAIM POT MODAL (Renders both variants in rich detail) */}
      <ClaimPotModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        selectedPot={selectedPotId}
        onSelectPotChange={(id) => setSelectedPotId(id)}
        onProfileCreated={handleProfileSubmitted}
        soundEnabled={soundEnabled}
      />

      {/* MY POTS MODAL (Browser-persisted pots management) */}
      <MyPotsModal
        isOpen={isMyPotsOpen}
        onClose={() => setIsMyPotsOpen(false)}
        claimedPots={claimedPots}
        activePotId={selectedPotId}
        onSelectAndCrackPot={handleSelectAndCrackPot}
        onClaimNewPot={() => handleOpenClaimModal()}
      />
    </div>
  );
}
