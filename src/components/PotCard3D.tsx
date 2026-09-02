import React, { useState, useRef } from 'react';
import { PotTier, PotId } from '../types';
import { PeacockFeatherIcon } from './SvgMotifs';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface PotCard3DProps {
  pot: PotTier;
  isSelected: boolean;
  onSelect: (potId: PotId) => void;
  onStartCrack: (potId: PotId) => void;
}

export const PotCard3D: React.FC<PotCard3DProps> = ({
  pot,
  isSelected,
  onSelect,
  onStartCrack,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const isUyyala = pot.id === 'uyyala';

  return (
    <div
      id={`pot-card-container-${pot.id}`}
      className="perspective-1000 w-full max-w-md mx-auto select-none"
    >
      <div
        ref={cardRef}
        id={`pot-card-${pot.id}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(pot.id)}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className={`relative preserve-3d rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 border backdrop-blur-sm ${
          isSelected
            ? isUyyala
              ? 'border-[#C6296F] bg-gradient-to-b from-[#14224A]/95 via-[#1A1A3A]/90 to-[#0B1230]/95 ring-2 ring-[#C6296F]/60 shadow-[0_0_35px_rgba(198,41,111,0.35)]'
              : 'border-[#E8B923] bg-gradient-to-b from-[#14224A]/95 via-[#14224A]/80 to-[#0B1230]/95 ring-2 ring-[#E8B923]/60 shadow-[0_0_35px_rgba(232,185,35,0.3)]'
            : 'border-[#E8B923]/20 bg-[#14224A]/60 hover:border-[#E8B923]/50 hover:bg-[#14224A]/80 shadow-lg'
        }`}
      >
        {/* Ornate Corner Accent */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#E8B923]/60 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#E8B923]/60 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#E8B923]/60 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#E8B923]/60 rounded-br-sm pointer-events-none" />

        {/* Popular / Premium Tier Badge */}
        {isUyyala && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#C6296F] via-[#E8B923] to-[#C6296F] text-[#0B1230] font-black text-[11px] tracking-wider flex items-center gap-1.5 shadow-md uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#0B1230]" />
            Most Auspicious &bull; 3x Grand Entries
          </div>
        )}

        {/* 3D Floating Pot Visual Illustration */}
        <div
          className="preserve-3d flex items-center justify-center my-4 py-2"
          style={{
            transform: `translateZ(${isHovered ? '45px' : '20px'}) scale(${isHovered ? 1.04 : 1})`,
            transition: 'transform 0.25s ease-out',
          }}
        >
          <div className="relative w-44 h-48 sm:w-52 sm:h-56 flex items-center justify-center">
            {/* Ambient Back Glow */}
            <div
              className={`absolute inset-0 rounded-full blur-2xl transition-opacity duration-300 ${
                isUyyala
                  ? 'bg-gradient-to-tr from-[#1B7A6E]/40 via-[#C6296F]/30 to-[#E8B923]/30 opacity-70 group-hover:opacity-100'
                  : 'bg-gradient-to-tr from-[#E8B923]/30 to-[#B8860B]/20 opacity-60'
              }`}
            />

            {/* Custom SVG Terracotta / Krishna Dahi Handi Pot */}
            <svg
              viewBox="0 0 200 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
            >
              <defs>
                <radialGradient id={`potGrad-${pot.id}`} cx="40%" cy="40%" r="70%">
                  <stop offset="0%" stopColor={isUyyala ? '#B34A26' : '#C85A32'} />
                  <stop offset="60%" stopColor={isUyyala ? '#782813' : '#8F3B1E'} />
                  <stop offset="100%" stopColor="#4A180A" />
                </radialGradient>

                <linearGradient id={`goldTrim-${pot.id}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F6EEDD" />
                  <stop offset="50%" stopColor="#E8B923" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>

                <linearGradient id={`butterGrad-${pot.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFDF7" />
                  <stop offset="100%" stopColor="#F6EEDD" />
                </linearGradient>
              </defs>

              {/* Hanging Strings (for Uyyala Pot) */}
              {isUyyala && (
                <g opacity="0.85">
                  <path d="M 40,0 L 70,55" stroke="#E8B923" strokeWidth="1.8" strokeDasharray="3 2" />
                  <path d="M 160,0 L 130,55" stroke="#E8B923" strokeWidth="1.8" strokeDasharray="3 2" />
                  <path d="M 100,0 L 100,50" stroke="#E8B923" strokeWidth="1.8" strokeDasharray="3 2" />
                  <circle cx="70" cy="55" r="4" fill="#E8B923" />
                  <circle cx="130" cy="55" r="4" fill="#E8B923" />
                  <circle cx="100" cy="50" r="4" fill="#C6296F" />
                </g>
              )}

              {/* Main Pot Body */}
              <ellipse
                cx="100"
                cy="135"
                rx="68"
                ry="65"
                fill={`url(#potGrad-${pot.id})`}
                stroke={isUyyala ? '#C6296F' : '#E8B923'}
                strokeWidth={isUyyala ? '2.5' : '1.8'}
              />

              {/* Pot Neck */}
              <path
                d="M 68,75 C 66,95 72,100 80,105 L 120,105 C 128,100 134,95 132,75 Z"
                fill={`url(#potGrad-${pot.id})`}
                stroke={isUyyala ? '#C6296F' : '#E8B923'}
                strokeWidth="1.5"
              />

              {/* Pot Mouth / Rim */}
              <ellipse
                cx="100"
                cy="70"
                rx="36"
                ry="12"
                fill={`url(#goldTrim-${pot.id})`}
                stroke="#4A180A"
                strokeWidth="1"
              />

              {/* Fresh Makkhan / Butter overflowing */}
              <path
                d="M 72,70 C 72,60 128,60 128,70 C 128,82 120,86 114,86 C 108,86 106,78 100,78 C 94,78 92,88 84,88 C 76,88 72,82 72,70 Z"
                fill={`url(#butterGrad-${pot.id})`}
              />

              {/* Butter Drip hanging down */}
              <path
                d="M 97,80 Q 95,102 99,106 Q 103,102 101,80 Z"
                fill="#FFFDF7"
                opacity="0.95"
              />

              {/* Pot Belly Ornate Carvings & Patterns */}
              {isUyyala ? (
                <g>
                  <path d="M 36,132 Q 100,152 164,132" stroke="#E8B923" strokeWidth="3.5" fill="none" />
                  <path d="M 40,140 Q 100,160 160,140" stroke="#1B7A6E" strokeWidth="2" fill="none" />
                  <path d="M 44,124 Q 100,144 156,124" stroke="#C6296F" strokeWidth="2" fill="none" />
                  <circle cx="100" cy="148" r="14" fill="#1B7A6E" stroke="#E8B923" strokeWidth="1.5" />
                  <circle cx="100" cy="148" r="7" fill="#C6296F" />
                  <circle cx="100" cy="148" r="3" fill="#E8B923" />
                </g>
              ) : (
                <g>
                  <path d="M 38,134 Q 100,154 162,134" stroke="#E8B923" strokeWidth="2.5" fill="none" />
                  <circle cx="100" cy="144" r="9" fill="#E8B923" opacity="0.9" />
                  <circle cx="100" cy="144" r="5" fill="#8F3B1E" />
                </g>
              )}

              {/* Pot Base */}
              <ellipse cx="100" cy="192" rx="34" ry="7" fill="#4A180A" opacity="0.7" />
            </svg>

            {/* Feather Tag badge for Uyyala */}
            {isUyyala && (
              <div className="absolute top-2 right-2 rotate-12 scale-90">
                <PeacockFeatherIcon className="w-10 h-14 filter drop-shadow-md" />
              </div>
            )}
          </div>
        </div>

        {/* Card Header & Description */}
        <div className="text-center mt-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs text-[#E8B923] tracking-wider uppercase font-semibold">
              {pot.badge}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif text-[#F6EEDD] font-bold tracking-tight">
            {pot.name}
          </h3>
          <p className="font-telugu text-base text-[#E8B923]/90 font-medium">
            {pot.nameTelugu}
          </p>

          <div className="flex items-center justify-center gap-2 my-2.5">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black tracking-wider uppercase">
              100% Free Celebration
            </span>
            <span className="text-xs text-[#F6EEDD]/75 font-medium">
              &bull; {pot.drawEntries}x Grand Draw {pot.drawEntries > 1 ? 'Entries' : 'Entry'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#F6EEDD]/85 min-h-[36px] px-2 leading-relaxed">
            {pot.description}
          </p>
        </div>

        {/* Feature Points */}
        <div className="mt-4 pt-4 border-t border-[#E8B923]/20 space-y-2 text-xs sm:text-sm text-[#F6EEDD]/80">
          {pot.perks.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#1B7A6E]/30 text-[#E8B923] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            id={`btn-select-pot-${pot.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onStartCrack(pot.id);
            }}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg ${
              isUyyala
                ? 'bg-gradient-to-r from-[#C6296F] via-[#E8B923] to-[#C6296F] text-white hover:brightness-110 active:scale-[0.98]'
                : 'bg-gradient-to-r from-[#E8B923] via-[#FFE27A] to-[#E8B923] text-[#0B1230] hover:brightness-105 active:scale-[0.98]'
            }`}
          >
            <span>Crack {isUyyala ? 'Uyyala Kunda' : 'Venna Kunda'} (Free)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
