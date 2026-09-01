import React from 'react';

// Peacock Feather line-art motif
export const PeacockFeatherIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Stem */}
    <path d="M50 135 C50 90 48 50 50 15" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
    
    {/* Outer eye */}
    <ellipse cx="50" cy="40" rx="30" ry="34" stroke="var(--peacock)" strokeWidth="2" fill="#1B7A6E" fillOpacity="0.15" />
    <path d="M22 40 C22 22 78 22 78 40 C78 58 22 58 22 40 Z" stroke="var(--gold)" strokeWidth="1.5" />
    
    {/* Middle eye ring */}
    <ellipse cx="50" cy="42" rx="18" ry="20" fill="var(--indigo-deep)" stroke="var(--gold)" strokeWidth="1.8" />
    
    {/* Inner eye core */}
    <circle cx="50" cy="42" r="10" fill="#1B7A6E" />
    <circle cx="50" cy="40" r="5" fill="var(--rani-pink)" />
    <circle cx="51" cy="39" r="2" fill="var(--gold)" />

    {/* Radiant Barbs */}
    <path d="M50 40 Q25 25 10 15 M50 50 Q20 40 8 32 M50 60 Q22 58 10 52 M50 72 Q24 72 14 70 M50 85 Q28 88 18 90" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
    <path d="M50 40 Q75 25 90 15 M50 50 Q80 40 92 32 M50 60 Q78 58 90 52 M50 72 Q76 72 86 70 M50 85 Q72 88 82 90" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
  </svg>
);

// Flute (Bansuri) line-art silhouette with peacock feather accent
export const FluteMotif: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Main Flute Shaft */}
    <rect x="15" y="24" width="165" height="12" rx="6" fill="url(#fluteGold)" stroke="var(--gold-deep)" strokeWidth="1.5" />
    
    {/* Finger Holes */}
    <circle cx="65" cy="30" r="2.5" fill="var(--indigo-deep)" />
    <circle cx="85" cy="30" r="2.5" fill="var(--indigo-deep)" />
    <circle cx="105" cy="30" r="2.5" fill="var(--indigo-deep)" />
    <circle cx="125" cy="30" r="2.5" fill="var(--indigo-deep)" />
    <circle cx="145" cy="30" r="2.5" fill="var(--indigo-deep)" />
    <circle cx="160" cy="30" r="2.5" fill="var(--indigo-deep)" />
    
    {/* Decorative Thread / Ribbon (Ganda) */}
    <path d="M25 22 Q27 10 32 6 Q38 12 36 24" stroke="var(--rani-pink)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="33" cy="6" r="3" fill="var(--gold)" />
    
    {/* Peacock Feather tucked at the head */}
    <g transform="translate(14, 2) scale(0.28) rotate(-35)">
      <ellipse cx="50" cy="40" rx="24" ry="28" fill="#1B7A6E" opacity="0.8" />
      <circle cx="50" cy="42" r="10" fill="var(--indigo-deep)" />
      <circle cx="50" cy="40" r="4" fill="var(--gold)" />
    </g>

    <defs>
      <linearGradient id="fluteGold" x1="15" y1="24" x2="180" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F6EEDD" />
        <stop offset="0.4" stopColor="#E8B923" />
        <stop offset="0.8" stopColor="#B8860B" />
        <stop offset="1" stopColor="#E8B923" />
      </linearGradient>
    </defs>
  </svg>
);

// Temple Gopuram / Arch SVG outline
export const TempleArchFrame: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`relative ${className}`}>
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 600" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="archBorderGold" x1="0" y1="0" x2="500" y2="600" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8B923" stopOpacity="0.7" />
          <stop offset="0.5" stopColor="#1B7A6E" stopOpacity="0.4" />
          <stop offset="1" stopColor="#E8B923" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Outer Arch */}
      <path 
        d="M 50,590 L 50,220 C 50,130 140,50 250,50 C 360,50 450,130 450,220 L 450,590" 
        stroke="url(#archBorderGold)" 
        strokeWidth="2.5" 
        strokeDasharray="6 3"
      />
      {/* Gopuram Kalasam / Finial at Top */}
      <path d="M 250,20 L 255,40 L 245,40 Z" fill="var(--gold)" />
      <circle cx="250" cy="18" r="4" fill="var(--gold)" />
      {/* Inner Decorative Arch */}
      <path 
        d="M 65,590 L 65,230 C 65,150 150,80 250,80 C 350,80 435,150 435,230 L 435,590" 
        stroke="#E8B923" 
        strokeWidth="1.2" 
        opacity="0.35"
      />
      {/* Corner Filigree Rosettes */}
      <circle cx="50" cy="220" r="6" fill="#14224A" stroke="#E8B923" strokeWidth="1.5" />
      <circle cx="450" cy="220" r="6" fill="#14224A" stroke="#E8B923" strokeWidth="1.5" />
    </svg>
    {children}
  </div>
);

// Auspicious Diya (Oil Lamp) with glowing flame
export const DiyaLamp: React.FC<{ className?: string; label?: string }> = ({ className = 'w-10 h-10', label }) => (
  <div className="flex flex-col items-center gap-1 group">
    <div className={`relative ${className}`}>
      {/* Glow aura */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#E8B923]/30 blur-md animate-diya-flicker pointer-events-none" />
      
      <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Flame */}
        <path 
          d="M 30,6 C 27,15 22,20 22,25 C 22,30 26,33 30,33 C 34,33 38,30 38,25 C 38,20 33,15 30,6 Z" 
          fill="url(#diyaFlame)" 
          className="animate-diya-flicker origin-bottom"
        />
        {/* Clay base */}
        <path 
          d="M 12,32 C 14,44 46,44 48,32 C 51,32 54,30 52,28 C 42,28 36,31 30,31 C 24,31 18,28 8,28 C 6,30 9,32 12,32 Z" 
          fill="#8F3B1E" 
          stroke="#E8B923" 
          strokeWidth="1.2"
        />
        {/* Base Pedestal */}
        <path d="M 22,43 L 38,43 L 42,48 L 18,48 Z" fill="#B8860B" />
        
        <defs>
          <radialGradient id="diyaFlame" cx="30" cy="24" r="14" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.3" stopColor="#E8B923" />
            <stop offset="0.75" stopColor="#C6296F" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </div>
    {label && <span className="text-[11px] text-[#F6EEDD]/80 font-medium tracking-wide uppercase">{label}</span>}
  </div>
);

// Auspicious Nemali (Peacock / నెమలి) Icon - Royal Peacock with open feathers & crown crest
export const NemaliIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="nemaliGoldGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFDF7" />
        <stop offset="0.4" stopColor="#E8B923" />
        <stop offset="1" stopColor="#B8860B" />
      </linearGradient>
      <linearGradient id="nemaliFeatherPlume" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1B7A6E" />
        <stop offset="0.6" stopColor="#14224A" />
        <stop offset="1" stopColor="#C6296F" />
      </linearGradient>
    </defs>
    
    {/* Radiant Tail Fan (Plumage) */}
    <g opacity="0.9">
      <path d="M60 85 C30 50 15 25 25 10 C35 25 50 55 60 85 Z" fill="url(#nemaliFeatherPlume)" stroke="url(#nemaliGoldGrad)" strokeWidth="1.2" />
      <path d="M60 85 C42 42 32 15 48 5 C56 22 58 55 60 85 Z" fill="url(#nemaliFeatherPlume)" stroke="url(#nemaliGoldGrad)" strokeWidth="1.2" />
      <path d="M60 85 C55 35 58 10 68 2 C72 20 66 55 60 85 Z" fill="url(#nemaliFeatherPlume)" stroke="url(#nemaliGoldGrad)" strokeWidth="1.2" />
      <path d="M60 85 C68 40 85 15 92 8 C88 28 72 58 60 85 Z" fill="url(#nemaliFeatherPlume)" stroke="url(#nemaliGoldGrad)" strokeWidth="1.2" />
      <path d="M60 85 C78 50 102 28 106 18 C95 36 78 62 60 85 Z" fill="url(#nemaliFeatherPlume)" stroke="url(#nemaliGoldGrad)" strokeWidth="1.2" />
    </g>

    {/* Eyes of the Peacock Feathers (Chandrika) */}
    <circle cx="25" cy="15" r="4.5" fill="#1B7A6E" stroke="#E8B923" strokeWidth="1" />
    <circle cx="25" cy="15" r="2" fill="#C6296F" />
    
    <circle cx="48" cy="10" r="5" fill="#1B7A6E" stroke="#E8B923" strokeWidth="1" />
    <circle cx="48" cy="10" r="2.2" fill="#C6296F" />

    <circle cx="68" cy="8" r="5.5" fill="#1B7A6E" stroke="#E8B923" strokeWidth="1" />
    <circle cx="68" cy="8" r="2.5" fill="#E8B923" />

    <circle cx="90" cy="14" r="5" fill="#1B7A6E" stroke="#E8B923" strokeWidth="1" />
    <circle cx="90" cy="14" r="2.2" fill="#C6296F" />

    <circle cx="104" cy="24" r="4.5" fill="#1B7A6E" stroke="#E8B923" strokeWidth="1" />
    <circle cx="104" cy="24" r="2" fill="#C6296F" />

    {/* Peacock Body & S-Curve Neck */}
    <path d="M60 90 C50 85 45 75 48 64 C50 56 55 52 56 42 C56 34 50 32 52 26 C53 22 58 20 62 22 C66 24 67 28 66 34 C64 42 58 48 57 58 C56 68 64 78 72 82 C68 88 64 90 60 90 Z" fill="#1B7A6E" stroke="url(#nemaliGoldGrad)" strokeWidth="1.5" />
    
    {/* Peacock Crown / Crest (Sikha) */}
    <path d="M54 22 L49 14 M57 21 L57 12 M60 22 L64 13" stroke="#E8B923" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="49" cy="14" r="1.8" fill="#E8B923" />
    <circle cx="57" cy="12" r="1.8" fill="#E8B923" />
    <circle cx="64" cy="13" r="1.8" fill="#E8B923" />

    {/* Beak & Eye */}
    <path d="M52 25 L44 27 L51 29 Z" fill="#E8B923" />
    <circle cx="54" cy="24" r="1.5" fill="#FFFDF7" />

    {/* Breast Shield Shimmer */}
    <path d="M52 50 C54 44 60 44 62 52 C60 62 52 64 52 50 Z" fill="#E8B923" fillOpacity="0.3" />

    {/* Perch Stand */}
    <ellipse cx="62" cy="94" rx="20" ry="4" fill="#B8860B" opacity="0.8" />
  </svg>
);

// Celestial Radha Krishna Aesthetic Divine Silhouette & Vrindavan Kadamba Artwork
export const RadhaKrishnaDivineMotif: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <div className={`relative flex items-center justify-center select-none ${className}`}>
    <svg viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="divineAuraGrad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.4" />
          <stop offset="35%" stopColor="#E8B923" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#1B7A6E" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="divineGoldFill" x1="0" y1="0" x2="600" y2="340" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDF7" />
          <stop offset="0.3" stopColor="#E8B923" />
          <stop offset="0.7" stopColor="#D4A017" />
          <stop offset="1" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="divineRadhaGlow" x1="200" y1="50" x2="400" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDF7" />
          <stop offset="0.5" stopColor="#C6296F" />
          <stop offset="1" stopColor="#E8B923" />
        </linearGradient>
      </defs>

      {/* Luminous Halo Aura */}
      <circle cx="300" cy="150" r="140" fill="url(#divineAuraGrad)" />
      
      {/* Sacred Halo Ring (Prabhavali) */}
      <circle cx="300" cy="150" r="120" stroke="url(#divineGoldFill)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
      <circle cx="300" cy="150" r="128" stroke="#E8B923" strokeWidth="0.8" opacity="0.3" />

      {/* Vrindavan Kadamba Sacred Tree Branch Silhouette (Top Frame) */}
      <g stroke="url(#divineGoldFill)" strokeWidth="1.5" opacity="0.45" strokeLinecap="round">
        <path d="M 60,30 Q 180,60 280,40 Q 420,20 540,50" fill="none" />
        <path d="M 120,45 Q 160,80 200,70" fill="none" />
        <path d="M 400,35 Q 440,75 480,60" fill="none" />
        {/* Kadamba Leaves & Blossoms */}
        <circle cx="150" cy="55" r="4" fill="#1B7A6E" />
        <circle cx="190" cy="72" r="3.5" fill="#E8B923" />
        <circle cx="230" cy="48" r="4" fill="#C6296F" />
        <circle cx="430" cy="52" r="4" fill="#1B7A6E" />
        <circle cx="470" cy="65" r="3.5" fill="#E8B923" />
      </g>

      {/* Left: Divine Srimati Radharani Silhouette */}
      <g opacity="0.95">
        {/* Radha Head with Dupatta / Ghunghat */}
        <path d="M 235,105 C 220,108 205,120 202,140 C 198,160 205,185 210,210 C 215,235 220,275 225,310 L 260,310 C 255,275 250,230 248,190 C 248,160 252,130 245,112 C 242,108 238,105 235,105 Z" fill="#14224A" stroke="url(#divineRadhaGlow)" strokeWidth="1.8" />
        
        {/* Radha Face Profile & Tilak */}
        <circle cx="236" cy="120" r="14" fill="#0B1230" stroke="url(#divineGoldFill)" strokeWidth="1.2" />
        <path d="M 230,118 Q 236,122 242,118" stroke="#E8B923" strokeWidth="1.2" fill="none" />
        
        {/* Radha Kundal (Earring) & Maang Tikka */}
        <circle cx="230" cy="124" r="2.5" fill="#E8B923" />
        <path d="M 236,106 L 236,112" stroke="#E8B923" strokeWidth="1.2" />
        <circle cx="236" cy="113" r="1.5" fill="#C6296F" />

        {/* Radha Lotus in Hand offered to Krishna */}
        <path d="M 252,190 C 265,185 272,175 270,165 C 268,172 260,178 250,182 Z" fill="#C6296F" stroke="#E8B923" strokeWidth="1" />
        <circle cx="270" cy="165" r="4" fill="#C6296F" stroke="#E8B923" strokeWidth="0.8" />
      </g>

      {/* Right: Lord Sri Krishna (Muralidhar) Silhouette with Bansuri */}
      <g opacity="0.95">
        {/* Krishna Mukut (Crown) with Royal Crest */}
        <path d="M 335,80 L 350,60 L 365,80 L 360,95 L 340,95 Z" fill="#14224A" stroke="url(#divineGoldFill)" strokeWidth="1.8" />
        <circle cx="350" cy="62" r="3" fill="#E8B923" />

        {/* Auspicious Peacock Feather (Mor Pankh / Nemali Pincha) in Crown */}
        <g transform="translate(352, 28) scale(0.38) rotate(18)">
          <ellipse cx="50" cy="40" rx="26" ry="32" fill="#1B7A6E" stroke="#E8B923" strokeWidth="2.5" />
          <circle cx="50" cy="42" r="14" fill="#14224A" stroke="#E8B923" strokeWidth="2" />
          <circle cx="50" cy="40" r="7" fill="#C6296F" />
          <circle cx="50" cy="38" r="3" fill="#E8B923" />
          <path d="M50 40 Q25 25 10 15 M50 50 Q20 40 8 32" stroke="#E8B923" strokeWidth="2" />
          <path d="M50 40 Q75 25 90 15 M50 50 Q80 40 92 32" stroke="#E8B923" strokeWidth="2" />
        </g>

        {/* Krishna Face & Devotional Profile */}
        <circle cx="348" cy="112" r="17" fill="#0B1230" stroke="url(#divineGoldFill)" strokeWidth="1.5" />
        
        {/* Auspicious Urdhva Pundra Tilak */}
        <path d="M 345,102 L 348,110 L 351,102" stroke="#E8B923" strokeWidth="1.5" fill="none" />
        <circle cx="348" cy="112" r="1" fill="#C6296F" />

        {/* Krishna Tribhanga Stance (Body & Pitambara Silks) */}
        <path d="M 340,128 C 330,145 320,175 325,215 C 330,250 338,280 342,310 L 375,310 C 378,280 375,245 370,210 C 365,175 362,145 358,128 Z" fill="#14224A" stroke="url(#divineGoldFill)" strokeWidth="1.8" />
        
        {/* Krishna Divine Flute (Bansuri) held to lips */}
        <g>
          {/* Flute Bar */}
          <path d="M 285,130 L 400,105" stroke="url(#divineGoldFill)" strokeWidth="4" strokeLinecap="round" />
          
          {/* Flute Finger Holes */}
          <circle cx="315" cy="124" r="1.5" fill="#0B1230" />
          <circle cx="330" cy="121" r="1.5" fill="#0B1230" />
          <circle cx="345" cy="117" r="1.5" fill="#0B1230" />
          <circle cx="360" cy="114" r="1.5" fill="#0B1230" />
          <circle cx="375" cy="111" r="1.5" fill="#0B1230" />

          {/* Flute Tassel & Hanging Pearls (Ganda) */}
          <path d="M 288,131 Q 282,145 285,155" stroke="#C6296F" strokeWidth="1.8" />
          <circle cx="285" cy="156" r="3" fill="#E8B923" />
        </g>

        {/* Divine Arm & Hand Gracefully Holding Flute */}
        <path d="M 355,130 C 362,132 375,130 380,120 C 385,115 375,112 368,115" stroke="url(#divineGoldFill)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 330,135 C 322,136 312,132 308,125 C 305,122 315,120 322,125" stroke="url(#divineGoldFill)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>

      {/* Auspicious Nemali (Peacock) standing gracefully near Radha-Krishna's feet */}
      <g transform="translate(110, 185) scale(0.85)">
        {/* Peacock Tail Fan */}
        <path d="M 50,60 C 20,30 10,10 20,0 C 30,10 40,40 50,60 Z" fill="#1B7A6E" stroke="#E8B923" strokeWidth="1" opacity="0.8" />
        <path d="M 50,60 C 35,25 25,5 40,0 C 45,15 48,40 50,60 Z" fill="#14224A" stroke="#E8B923" strokeWidth="1" opacity="0.8" />
        <path d="M 50,60 C 55,25 60,5 68,0 C 70,15 62,40 50,60 Z" fill="#C6296F" stroke="#E8B923" strokeWidth="1" opacity="0.8" />
        {/* Feathers Eyes */}
        <circle cx="20" cy="5" r="3" fill="#E8B923" />
        <circle cx="40" cy="3" r="3.5" fill="#E8B923" />
        <circle cx="66" cy="4" r="3" fill="#E8B923" />
        {/* Peacock Neck & Head looking up to the divine music */}
        <path d="M 50,65 C 45,50 48,35 55,25 C 57,20 62,18 64,22 C 65,26 62,32 58,45 C 55,55 58,62 60,65 Z" fill="#1B7A6E" stroke="#E8B923" strokeWidth="1.2" />
        <path d="M 64,20 L 70,22 L 64,24 Z" fill="#E8B923" />
      </g>

      {/* Auspicious Blooming Lotus at Base */}
      <g transform="translate(255, 280) scale(0.9)">
        <path d="M 50,20 C 30,0 20,30 50,45 C 80,30 70,0 50,20 Z" fill="#C6296F" stroke="#E8B923" strokeWidth="1.2" />
        <path d="M 30,35 C 10,20 0,40 25,48 C 40,48 38,40 30,35 Z" fill="#C6296F" stroke="#E8B923" strokeWidth="1" opacity="0.8" />
        <path d="M 70,35 C 90,20 100,40 75,48 C 60,48 62,40 70,35 Z" fill="#C6296F" stroke="#E8B923" strokeWidth="1" opacity="0.8" />
        <circle cx="50" cy="35" r="4" fill="#E8B923" />
      </g>

      {/* Floating Sparkles & Divine Music Notes */}
      <g fill="#E8B923" opacity="0.8">
        <circle cx="180" cy="90" r="2.5" />
        <circle cx="430" cy="95" r="2" />
        <circle cx="210" cy="65" r="1.5" />
        <circle cx="390" cy="70" r="3" />
        <circle cx="480" cy="140" r="2" />
        <path d="M 440,110 Q 445,100 452,105" stroke="#E8B923" strokeWidth="1.2" fill="none" />
      </g>
    </svg>
  </div>
);

// Rangoli Mandala Pattern Background / Divider
export const RangoliDivider: React.FC<{ className?: string }> = ({ className = 'w-full h-8' }) => (
  <div className={`flex items-center justify-center gap-3 opacity-60 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#E8B923]/40 to-[#E8B923]/80" />
    <div className="flex items-center gap-1.5 text-[#E8B923]">
      <span className="text-xs">✦</span>
      <div className="w-2.5 h-2.5 rotate-45 border border-[#E8B923] bg-[#14224A]" />
      <span className="text-sm font-serif">ॐ</span>
      <div className="w-2.5 h-2.5 rotate-45 border border-[#E8B923] bg-[#14224A]" />
      <span className="text-xs">✦</span>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#E8B923]/40 to-[#E8B923]/80" />
  </div>
);

// WhatsApp Brand Icon
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.123-.523-1.464-.608-2.457-2.091-2.531-2.19-.074-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.137-.149.3-.187.4-.187.1 0 .2 0 .288.005.093.004.218-.035.34.258.126.299.43 1.05.468 1.127.038.077.064.168.013.268-.052.1-.077.163-.153.253-.077.09-.161.2-.23.269-.078.077-.16.161-.068.319.091.156.406.67 1.026 1.222.798.711 1.47 1.002 1.68 1.088.21.087.332.073.456-.068.125-.141.536-.624.68-.838.143-.213.287-.179.48-.107.194.072 1.229.58 1.44.685.212.106.353.158.405.247.051.089.051.517-.093.922z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.982-1.396A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.61 0-3.11-.453-4.39-1.239l-.315-.192-2.955.828.835-2.883-.21-.334A8.17 8.17 0 013.8 12c0-4.529 3.671-8.2 8.2-8.2 4.529 0 8.2 3.671 8.2 8.2 0 4.529-3.671 8.2-8.2 8.2z" />
  </svg>
);

// Instagram Brand Icon
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
