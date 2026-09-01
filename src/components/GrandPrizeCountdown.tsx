import React, { useState, useEffect } from 'react';
import { Trophy, Clock, ShieldAlert, Sparkles, Radio, Check } from 'lucide-react';
import { DiyaLamp } from './SvgMotifs';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const GrandPrizeCountdown: React.FC = () => {
  // Target: 10th September 2026 Midnight IST (or 9 days from current runtime)
  const calculateTimeLeft = (): TimeLeft => {
    // Current runtime metadata is 2026-09-01T11:21:44-07:00
    // Target: September 10, 2026 00:00:00 UTC / IST
    const targetDate = new Date('2026-09-10T00:00:00Z').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 8, hours: 14, minutes: 38, seconds: 20 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="countdown-section"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#14224A]/95 via-[#0B1230] to-[#14224A]/90 border-2 border-[#E8B923]/40 shadow-[0_0_50px_rgba(232,185,35,0.2)] overflow-hidden">
        
        {/* Background Decorative Gold Stars & Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#E8B923]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#1B7A6E]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E8B923]/10 border border-[#E8B923]/30 text-[#E8B923] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Grand Festive Finale</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#F6EEDD] tracking-tight">
            Grand Prize Cash Draw &bull; 180 Pot Crackers
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#E8B923] font-medium max-w-xl">
            Live Winner Draw on 10th September 2026
          </p>
          <p className="text-xs sm:text-sm text-[#F6EEDD]/75 mt-1">
            Draw will be streamed on official channels with random cryptographic verification. Every broken pot increases your odds!
          </p>
        </div>

        {/* Live Countdown Flip Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto my-8 relative z-10">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-4 sm:p-6 bg-[#0B1230] border border-[#E8B923]/40 flex flex-col items-center justify-center shadow-lg relative group overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8B923] to-transparent opacity-80" />
              <span className="text-3xl sm:text-5xl font-extrabold text-[#E8B923] font-mono tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm text-[#F6EEDD]/70 uppercase tracking-widest mt-2 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* 4 Prize Pool Breakdown Cards for 180 Pot Crackers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8 pt-6 border-t border-[#E8B923]/20 relative z-10">
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1B2958] to-[#0B1230] border-2 border-[#E8B923] text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#E8B923]" />
            <span className="text-[11px] text-[#E8B923] font-bold uppercase tracking-wider block">Grand Prize</span>
            <span className="text-3xl font-serif font-extrabold text-[#F6EEDD] mt-1 block">₹1,000</span>
            <span className="text-xs font-semibold text-[#E8B923] bg-[#E8B923]/15 px-2.5 py-0.5 rounded-full inline-block mt-1">
              For 10 Pot Crackers
            </span>
            <span className="text-[11px] text-[#F6EEDD]/60 block mt-1.5">Direct UPI / Bank Transfer</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#14224A] to-[#0B1230] border border-[#C6296F]/50 text-center shadow-md relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#C6296F]" />
            <span className="text-[11px] text-[#C6296F] font-bold uppercase tracking-wider block">Next Tier</span>
            <span className="text-3xl font-serif font-extrabold text-[#F6EEDD] mt-1 block">₹500</span>
            <span className="text-xs font-semibold text-[#C6296F] bg-[#C6296F]/15 px-2.5 py-0.5 rounded-full inline-block mt-1">
              For 20 Pot Crackers
            </span>
            <span className="text-[11px] text-[#F6EEDD]/60 block mt-1.5">Instant Wallet Cash</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#14224A] to-[#0B1230] border border-[#1B7A6E]/50 text-center shadow-md relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#1B7A6E]" />
            <span className="text-[11px] text-[#1B7A6E] font-bold uppercase tracking-wider block">Lucky Tier</span>
            <span className="text-3xl font-serif font-extrabold text-[#F6EEDD] mt-1 block">₹200</span>
            <span className="text-xs font-semibold text-[#1B7A6E] bg-[#1B7A6E]/15 px-2.5 py-0.5 rounded-full inline-block mt-1">
              For 50 Pot Crackers
            </span>
            <span className="text-[11px] text-[#F6EEDD]/60 block mt-1.5">Fast Cashback Drop</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#14224A] to-[#0B1230] border border-[#E8B923]/30 text-center shadow-md relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#E8B923]/60" />
            <span className="text-[11px] text-[#E8B923]/90 font-bold uppercase tracking-wider block">Festive Tier</span>
            <span className="text-3xl font-serif font-extrabold text-[#F6EEDD] mt-1 block">₹100</span>
            <span className="text-xs font-semibold text-[#E8B923] bg-[#E8B923]/15 px-2.5 py-0.5 rounded-full inline-block mt-1">
              For 100 Pot Crackers
            </span>
            <span className="text-[11px] text-[#F6EEDD]/60 block mt-1.5">Instant Shopping Credit</span>
          </div>
        </div>

        {/* Legal & TDS Notice */}
        <div className="mt-8 p-3 rounded-xl bg-[#0B1230]/50 border border-[#E8B923]/15 flex items-center justify-center gap-2 text-xs text-[#F6EEDD]/70 text-center relative z-10">
          <ShieldAlert className="w-4 h-4 text-[#E8B923] shrink-0" />
          <span>
            Total 180 Grand Draw Cash Winners selected randomly with cryptographic verification on 10th September 2026.
          </span>
        </div>
      </div>
    </section>
  );
};
