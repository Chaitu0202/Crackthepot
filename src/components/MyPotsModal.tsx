import React from 'react';
import { ClaimedPotInstance, POT_TIERS, PotId } from '../types';
import { calculatePotCrackPercentage } from './CrackGameEngine';
import { PeacockFeatherIcon, NemaliIcon, DiyaLamp } from './SvgMotifs';
import {
  X,
  Sparkles,
  Ticket,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Flame,
  PlusCircle,
  Copy,
  Gift
} from 'lucide-react';

interface MyPotsModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimedPots: ClaimedPotInstance[];
  activePotId: PotId;
  onSelectAndCrackPot: (potInstance: ClaimedPotInstance) => void;
  onClaimNewPot: () => void;
}

export const MyPotsModal: React.FC<MyPotsModalProps> = ({
  isOpen,
  onClose,
  claimedPots,
  activePotId,
  onSelectAndCrackPot,
  onClaimNewPot,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="my-pots-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#040816]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="my-pots-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#14224A] via-[#0E1738] to-[#070D22] border-2 border-[#E8B923] shadow-[0_0_60px_rgba(232,185,35,0.4)] relative p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-300 my-auto text-[#F6EEDD] max-h-[90vh] flex flex-col"
      >
        {/* Ornate Motifs */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <PeacockFeatherIcon className="w-48 h-48" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#080E24] border border-[#E8B923]/30 text-[#F6EEDD]/70 hover:text-[#E8B923] hover:bg-[#14224A] transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center relative z-10 mb-6 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B923]/15 border border-[#E8B923]/40 text-[#E8B923] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Saved in this Browser &bull; నా పవిత్రమైన కుండలు</span>
            <DiyaLamp className="w-3.5 h-3.5 text-[#E8B923]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight">
            My Consecrated Pots ({claimedPots.length})
          </h2>
          <p className="text-xs sm:text-sm text-[#E8B923] font-medium mt-0.5">
            Manage your claimed pots, track crack progress &amp; view grand draw tickets
          </p>
        </div>

        {/* Scrollable Pots List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 relative z-10 custom-scrollbar">
          {claimedPots.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-[#080E24]/60 border border-[#E8B923]/20 flex flex-col items-center">
              <NemaliIcon className="w-16 h-16 text-[#E8B923]/60 mb-3" />
              <h3 className="text-lg font-serif font-bold text-[#F6EEDD]">
                No Pots Claimed Yet in this Browser
              </h3>
              <p className="text-xs sm:text-sm text-[#F6EEDD]/70 max-w-sm mt-1 mb-6">
                Choose between Venna Kunda or Royal Uyyala Kunda for 100% free with instant rewards!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onClaimNewPot();
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] font-black text-sm flex items-center gap-2 shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#0B1230]" />
                <span>Claim Your Sacred Pot (Free)</span>
              </button>
            </div>
          ) : (
            claimedPots.map((potInst) => {
              const tier = POT_TIERS[potInst.potId];
              const isUyyala = potInst.potId === 'uyyala';
              const progressPct = calculatePotCrackPercentage(potInst.sharesCount || 0);
              const isCurrent = activePotId === potInst.potId;

              return (
                <div
                  key={potInst.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all relative overflow-hidden ${
                    isCurrent
                      ? isUyyala
                        ? 'bg-gradient-to-r from-[#1B1438] via-[#14224A] to-[#0E1738] border-2 border-[#C6296F] shadow-[0_0_25px_rgba(198,41,111,0.35)]'
                        : 'bg-gradient-to-r from-[#14224A] via-[#101B3D] to-[#0E1738] border-2 border-[#E8B923] shadow-[0_0_25px_rgba(232,185,35,0.3)]'
                      : 'bg-[#080E24]/80 border-[#E8B923]/25 hover:border-[#E8B923]/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E8B923]/20">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0 border ${
                          isUyyala
                            ? 'bg-gradient-to-tr from-[#C6296F]/30 to-[#E8B923]/30 border-[#C6296F]'
                            : 'bg-gradient-to-tr from-[#E8B923]/30 to-[#B8860B]/30 border-[#E8B923]'
                        }`}
                      >
                        <NemaliIcon className="w-full h-full text-[#E8B923]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-serif font-bold text-[#F6EEDD]">
                            {tier.name}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                              Active in Arena
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#E8B923] font-medium">
                          Devotee: <span className="text-white font-bold">{potInst.devoteeName}</span> ({potInst.city})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {potInst.isCracked ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-xs font-bold flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Cracked &bull; Reward Claimed</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-[#E8B923]/20 text-[#E8B923] border border-[#E8B923]/40 text-xs font-bold">
                          {progressPct}% Cracked
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress bar if not cracked */}
                  {!potInst.isCracked && (
                    <div className="my-3 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-[#F6EEDD]/75">
                        <span>Pot Softness Progress</span>
                        <span className="font-bold text-[#E8B923]">{progressPct}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#080E24] rounded-full border border-[#E8B923]/30 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#1B7A6E] via-[#C6296F] to-[#E8B923] rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(progressPct, 5)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Cracked Reward Details if cracked */}
                  {potInst.isCracked && potInst.wonReward && (
                    <div className="my-3 p-3 rounded-xl bg-[#0B1230] border border-emerald-500/40 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-emerald-400" />
                        <div>
                          <span className="text-xs font-bold text-white block">
                            {potInst.wonReward.title}
                          </span>
                          <span className="text-[11px] font-mono text-[#E8B923]">
                            Code: {potInst.wonReward.code}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                        {potInst.wonReward.value}
                      </span>
                    </div>
                  )}

                  {/* Tickets Badge Grid */}
                  <div className="mt-3 pt-3 border-t border-[#E8B923]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-[#F6EEDD]/70 uppercase tracking-wider block mb-1">
                        Grand Cash Draw Tickets ({potInst.tickets.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {potInst.tickets.map((tNum, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-[#080E24] text-[#E8B923] font-mono text-[11px] border border-[#E8B923]/30 font-semibold"
                          >
                            #{tNum}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectAndCrackPot(potInst);
                        onClose();
                      }}
                      className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow ${
                        isCurrent
                          ? 'bg-gradient-to-r from-[#E8B923] to-[#FFE27A] text-[#0B1230] hover:brightness-105'
                          : 'bg-[#14224A] hover:bg-[#1B7A6E]/40 text-[#E8B923] border border-[#E8B923]/40'
                      }`}
                    >
                      <span>{potInst.isCracked ? 'View In Arena' : 'Crack This Pot 🏺'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="mt-6 pt-4 border-t border-[#E8B923]/25 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-[#F6EEDD]/60 text-center sm:text-left">
            Pots are permanently saved to your browser session.
          </p>

          <button
            onClick={() => {
              onClose();
              onClaimNewPot();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1B7A6E] to-[#14224A] hover:brightness-110 border border-[#E8B923]/40 text-[#F6EEDD] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <PlusCircle className="w-4 h-4 text-[#E8B923]" />
            <span>Claim Another Sacred Pot</span>
          </button>
        </div>
      </div>
    </div>
  );
};
