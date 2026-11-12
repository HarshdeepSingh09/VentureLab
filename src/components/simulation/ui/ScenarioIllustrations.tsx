import React from 'react';
import type { ScenarioId } from '../../../simulation/types';

interface ScenarioIllustrationProps {
  scenarioId: ScenarioId;
  stageId: string;
  className?: string;
}

export const ScenarioIllustration: React.FC<ScenarioIllustrationProps> = ({
  scenarioId,
  stageId,
  className = '',
}) => {
  // Normalize to 3 core scenarios
  const normalizedScenario = (scenarioId === 'edtech' || scenarioId === 'sustainability') 
    ? scenarioId 
    : 'campus_meal';

  // Render scenario-specific SVG
  if (normalizedScenario === 'campus_meal') {
    return <FoodIllustration stageId={stageId} className={className} />;
  } else if (normalizedScenario === 'edtech') {
    return <EdTechIllustration stageId={stageId} className={className} />;
  } else {
    return <SustainabilityIllustration stageId={stageId} className={className} />;
  }
};

/* ─── 1. FOOD & BEVERAGE ILLUSTRATIONS (Official 5-Colour Palette) ────────────── */

const FoodIllustration: React.FC<{ stageId: string; className?: string }> = ({ stageId, className }) => {
  // Takeaway Counter / Menu / Kitchen Batching / Delivery Runner
  return (
    <div className={`w-full aspect-[16/10] bg-[#F0EDE4] rounded-xl border border-[#D9D5C9] p-4 flex items-center justify-center relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Wall & Floor */}
        <rect width="400" height="170" fill="#F6F3EA" />
        <rect y="170" width="400" height="80" fill="#D9D5C9" />
        <line x1="0" y1="170" x2="400" y2="170" stroke="#B8B3A4" strokeWidth="2" />

        {/* Chalkboard Menu on Wall */}
        <rect x="30" y="25" width="110" height="80" rx="4" fill="#22251F" stroke="#B9684D" strokeWidth="3" />
        <text x="42" y="45" fill="#F6F3EA" fontSize="10" fontFamily="sans-serif" fontWeight="bold">CAMPUS MEAL</text>
        <line x1="42" y1="52" x2="128" y2="52" stroke="#B9684D" strokeWidth="1" />
        <text x="42" y="66" fill="#D9D5C9" fontSize="8" fontFamily="sans-serif">Daily Thali: ₹85</text>
        <text x="42" y="78" fill="#D9D5C9" fontSize="8" fontFamily="sans-serif">Prepaid Pass: ₹75</text>
        <text x="42" y="90" fill="#B9684D" fontSize="7" fontFamily="sans-serif">Lunch Bell: 1:15 PM</text>

        {/* Counter & Shelf */}
        <rect x="25" y="130" width="350" height="40" rx="2" fill="#FFFFFF" stroke="#D9D5C9" strokeWidth="2" />
        <rect x="20" y="125" width="360" height="10" rx="2" fill="#234B3A" />
        
        {/* Thermal Meal Boxes on Counter */}
        <g transform="translate(160, 95)">
          {/* Insulated Delivery Bag */}
          <rect x="0" y="0" width="70" height="50" rx="4" fill="#234B3A" stroke="#1A392C" strokeWidth="2" />
          <rect x="5" y="5" width="60" height="8" rx="2" fill="#B9684D" />
          <circle cx="35" cy="30" r="12" fill="#F6F3EA" />
          <text x="30" y="34" fill="#234B3A" fontSize="11" fontWeight="bold">🍱</text>
          <text x="18" y="45" fill="#F6F3EA" fontSize="6" fontFamily="monospace">BATCH #04</text>
        </g>

        {/* Meal Trays / Bento Boxes */}
        <g transform="translate(245, 105)">
          <rect x="0" y="0" width="45" height="25" rx="3" fill="#FFFFFF" stroke="#B9684D" strokeWidth="2" />
          <circle cx="12" cy="12" r="6" fill="#F8EFEA" stroke="#B9684D" />
          <circle cx="26" cy="8" r="4" fill="#E8F0EC" stroke="#234B3A" />
          <circle cx="26" cy="18" r="4" fill="#F0EDE4" stroke="#D9D5C9" />
          <circle cx="36" cy="12" r="4" fill="#F8EFEA" stroke="#B9684D" />
        </g>

        <g transform="translate(300, 108)">
          <rect x="0" y="0" width="45" height="22" rx="3" fill="#FFFFFF" stroke="#234B3A" strokeWidth="2" />
          <text x="8" y="15" fill="#234B3A" fontSize="7" fontWeight="bold">FRESH MEAL</text>
        </g>

        {/* Delivery Runner Bicycle / Cart on Right Floor */}
        <g transform="translate(50, 160)">
          {/* Wheel 1 */}
          <circle cx="25" cy="40" r="16" fill="none" stroke="#22251F" strokeWidth="3" />
          <circle cx="25" cy="40" r="3" fill="#B9684D" />
          {/* Wheel 2 */}
          <circle cx="75" cy="40" r="16" fill="none" stroke="#22251F" strokeWidth="3" />
          <circle cx="75" cy="40" r="3" fill="#B9684D" />
          {/* Frame */}
          <line x1="25" y1="40" x2="50" y2="40" stroke="#234B3A" strokeWidth="3" />
          <line x1="50" y1="40" x2="40" y2="18" stroke="#234B3A" strokeWidth="3" />
          <line x1="40" y1="18" x2="25" y2="40" stroke="#234B3A" strokeWidth="3" />
          <line x1="50" y1="40" x2="68" y2="18" stroke="#234B3A" strokeWidth="3" />
          <line x1="68" y1="18" x2="75" y2="40" stroke="#234B3A" strokeWidth="3" />
          {/* Front Carrier Basket with Meal Packs */}
          <rect x="70" y="8" width="22" height="15" rx="2" fill="#B9684D" />
          <rect x="73" y="4" width="16" height="5" rx="1" fill="#FFFFFF" />
        </g>

        {/* Clock on Wall showing 1:15 PM */}
        <circle cx="330" cy="50" r="18" fill="#FFFFFF" stroke="#22251F" strokeWidth="2" />
        <line x1="330" y1="50" x2="330" y2="38" stroke="#22251F" strokeWidth="2" />
        <line x1="330" y1="50" x2="338" y2="54" stroke="#B9684D" strokeWidth="2" />
        <circle cx="330" cy="50" r="2" fill="#234B3A" />
      </svg>
      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-[#575952] bg-[#FFFFFF]/90 px-2 py-0.5 rounded border border-[#D9D5C9]">
        BiteCraft Prep Hub &bull; 35-Min Break Window
      </div>
    </div>
  );
};

/* ─── 2. EDTECH PLATFORM ILLUSTRATIONS (Official 5-Colour Palette) ─────────────── */

const EdTechIllustration: React.FC<{ stageId: string; className?: string }> = ({ stageId, className }) => {
  return (
    <div className={`w-full aspect-[16/10] bg-[#F0EDE4] rounded-xl border border-[#D9D5C9] p-4 flex items-center justify-center relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background & Study Room Setting */}
        <rect width="400" height="250" fill="#F6F3EA" />
        <rect y="195" width="400" height="55" fill="#D9D5C9" />

        {/* Central Educational Tablet Screen */}
        <g transform="translate(60, 20)">
          {/* Tablet Body */}
          <rect x="0" y="0" width="280" height="175" rx="12" fill="#22251F" stroke="#22251F" strokeWidth="4" />
          <rect x="8" y="8" width="264" height="159" rx="6" fill="#FFFFFF" />

          {/* App Top Bar */}
          <rect x="8" y="8" width="264" height="24" fill="#234B3A" />
          <circle cx="22" cy="20" r="4" fill="#B9684D" />
          <text x="32" y="24" fill="#F6F3EA" fontSize="9" fontWeight="bold">PeerPrep // Interactive STEM Lab</text>
          <rect x="210" y="13" width="54" height="14" rx="3" fill="#1A392C" />
          <text x="216" y="23" fill="#D9D5C9" fontSize="7" fontFamily="monospace">STREAK: 12d 🔥</text>

          {/* Left Canvas: Interactive Physics Wave Simulation */}
          <g transform="translate(18, 42)">
            <rect x="0" y="0" width="145" height="115" rx="4" fill="#F6F3EA" stroke="#D9D5C9" strokeWidth="1" />
            <text x="8" y="14" fill="#22251F" fontSize="8" fontWeight="bold">Visual Concept: Wave Optics</text>
            <path d="M 10 60 Q 30 25, 50 60 T 90 60 T 130 60" fill="none" stroke="#234B3A" strokeWidth="2.5" />
            <path d="M 10 60 Q 30 40, 50 60 T 90 60 T 130 60" fill="none" stroke="#B9684D" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Variable Slider */}
            <rect x="10" y="90" width="125" height="4" rx="2" fill="#D9D5C9" />
            <circle cx="65" cy="92" r="6" fill="#234B3A" />
            <text x="10" y="105" fill="#575952" fontSize="6" fontFamily="monospace">Wavelength: 520nm &bull; Frequency</text>
          </g>

          {/* Right Panel: Active Problem & Instant Diagnostic Hint */}
          <g transform="translate(172, 42)">
            <rect x="0" y="0" width="92" height="60" rx="4" fill="#F0EDE4" stroke="#D9D5C9" />
            <text x="6" y="12" fill="#22251F" fontSize="7" fontWeight="bold">Checkpoint 3/5</text>
            <text x="6" y="22" fill="#575952" fontSize="6">"If slit distance doubles,</text>
            <text x="6" y="30" fill="#575952" fontSize="6">what happens to fringe width?"</text>
            <rect x="6" y="38" width="80" height="15" rx="3" fill="#234B3A" />
            <text x="16" y="48" fill="#F6F3EA" fontSize="6" fontWeight="bold">Interactive Check ✓</text>

            {/* Diagnostic Hint Box */}
            <rect x="0" y="68" width="92" height="47" rx="4" fill="#F8EFEA" stroke="#E5C3B6" />
            <text x="6" y="80" fill="#B9684D" fontSize="7" fontWeight="bold">Concept Takeaway:</text>
            <text x="6" y="90" fill="#575952" fontSize="6">Fringe width is halved.</text>
            <text x="6" y="98" fill="#575952" fontSize="6">Self-paced visual learning</text>
            <text x="6" y="106" fill="#575952" fontSize="6">beats passive lectures 4x.</text>
          </g>
        </g>

        {/* Notebook & Pen on Desk */}
        <rect x="30" y="185" width="50" height="35" rx="2" fill="#FFFFFF" stroke="#D9D5C9" strokeWidth="1" />
        <line x1="35" y1="195" x2="70" y2="195" stroke="#D9D5C9" />
        <line x1="35" y1="205" x2="65" y2="205" stroke="#D9D5C9" />
        <rect x="75" y="182" width="4" height="40" rx="1" fill="#B9684D" />
      </svg>
      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-[#575952] bg-[#FFFFFF]/90 px-2 py-0.5 rounded border border-[#D9D5C9]">
        PeerPrep Micro-Simulation &bull; Concept Sandbox
      </div>
    </div>
  );
};

/* ─── 3. SUSTAINABLE PRODUCTS ILLUSTRATIONS (Official 5-Colour Palette) ────────── */

const SustainabilityIllustration: React.FC<{ stageId: string; className?: string }> = ({ stageId, className }) => {
  return (
    <div className={`w-full aspect-[16/10] bg-[#F0EDE4] rounded-xl border border-[#D9D5C9] p-4 flex items-center justify-center relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 250" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Campus Setting */}
        <rect width="400" height="250" fill="#F6F3EA" />
        <rect y="185" width="400" height="65" fill="#D9D5C9" />

        {/* Smart Automated Return Drop-Bin */}
        <g transform="translate(60, 45)">
          {/* Bin Body */}
          <rect x="0" y="0" width="90" height="150" rx="6" fill="#234B3A" stroke="#1A392C" strokeWidth="2" />
          <rect x="8" y="10" width="74" height="20" rx="3" fill="#1A392C" />
          <text x="14" y="23" fill="#F6F3EA" fontSize="8" fontWeight="bold">EcoLoop SMART BIN</text>
          
          {/* Drop Slot with Green Glow Indicator */}
          <rect x="15" y="42" width="60" height="14" rx="2" fill="#22251F" />
          <circle cx="70" cy="49" r="3" fill="#F6F3EA" />
          
          {/* QR / NFC Scanner Pad */}
          <rect x="25" y="70" width="40" height="35" rx="3" fill="#F6F3EA" stroke="#C4D9CD" />
          <rect x="33" y="78" width="8" height="8" fill="#22251F" />
          <rect x="49" y="78" width="8" height="8" fill="#22251F" />
          <rect x="41" y="86" width="8" height="8" fill="#234B3A" />
          <text x="18" y="118" fill="#D9D5C9" fontSize="6" fontFamily="monospace">TAP STUDENT ID</text>

          {/* Collection Status */}
          <rect x="12" y="128" width="66" height="12" rx="2" fill="#1A392C" />
          <text x="16" y="137" fill="#F6F3EA" fontSize="6">RETURN RATE: 94%</text>
        </g>

        {/* Circular Biocomposite Reusable Container (Front & Center) */}
        <g transform="translate(180, 70)">
          {/* Durable Container Base */}
          <rect x="0" y="30" width="130" height="60" rx="8" fill="#FFFFFF" stroke="#234B3A" strokeWidth="3" />
          <rect x="0" y="30" width="130" height="12" rx="2" fill="#E8F0EC" />
          <text x="14" y="40" fill="#234B3A" fontSize="7" fontWeight="bold">FOOD-GRADE BIOCOMPOSITE &bull; 500+ WASHES</text>
          
          {/* Internal Dividers */}
          <line x1="50" y1="42" x2="50" y2="85" stroke="#D9D5C9" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="90" y1="42" x2="90" y2="85" stroke="#D9D5C9" strokeWidth="2" strokeDasharray="2 2" />

          {/* Airtight Locking Lid (floating above) */}
          <g transform="translate(0, -25)">
            <rect x="2" y="15" width="126" height="18" rx="6" fill="#B9684D" />
            <rect x="45" y="10" width="40" height="7" rx="3" fill="#9E533A" />
            <circle cx="65" cy="24" r="5" fill="#F6F3EA" />
            <text x="62" y="27" fill="#22251F" fontSize="7" fontWeight="bold">♻</text>
          </g>

          {/* Laser-etched NFC / QR Token on Container Body */}
          <rect x="12" y="52" width="24" height="24" rx="3" fill="#F0EDE4" stroke="#B8B3A4" />
          <circle cx="24" cy="64" r="6" fill="#234B3A" />
          <text x="21" y="67" fill="#F6F3EA" fontSize="8">#</text>
          <text x="42" y="64" fill="#22251F" fontSize="8" fontWeight="bold">ID: ECO-8492</text>
          <text x="42" y="74" fill="#575952" fontSize="7">₹0 Borrow &bull; ₹20 Dep.</text>
        </g>

        {/* Circular Economy Flow Diagram Arrow */}
        <g transform="translate(210, 165)">
          <path d="M 0 0 C 40 -15, 80 -15, 120 0" fill="none" stroke="#234B3A" strokeWidth="2.5" strokeDasharray="4 3" />
          <text x="20" y="15" fill="#234B3A" fontSize="7" fontWeight="bold">Collect &bull; Sanitize &bull; Circulate</text>
        </g>

        {/* Single-Use Avoided Counter Badge */}
        <g transform="translate(290, 30)">
          <rect x="0" y="0" width="90" height="36" rx="4" fill="#F8EFEA" stroke="#E5C3B6" />
          <text x="8" y="14" fill="#B9684D" fontSize="7" fontWeight="bold">Plastic Boxes Avoided</text>
          <text x="8" y="28" fill="#22251F" fontSize="11" fontWeight="bold" fontFamily="monospace">15,480+</text>
        </g>
      </svg>
      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-[#575952] bg-[#FFFFFF]/90 px-2 py-0.5 rounded border border-[#D9D5C9]">
        EcoLoop Smart Drop Network &bull; Zero Single-Use Waste
      </div>
    </div>
  );
};
