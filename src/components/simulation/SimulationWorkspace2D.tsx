import React, { useState } from 'react';
import { 
  Building2, Compass, FlaskConical, Wallet, 
  Megaphone, Gauge, Users, Swords, Presentation, 
  CheckCircle2, AlertTriangle, BookOpen, ArrowRight,
  Sparkles, ShieldCheck, ChevronDown, ChevronUp,
  RotateCcw, Save, ExternalLink, Lightbulb, HeartHandshake
} from 'lucide-react';

import type { 
  SimulationState, 
  SimulationLocationId,
  ScenarioId,
  DecisionJournalEntry 
} from '../../simulation/types';
import { ALL_SCENARIOS } from '../../simulation/scenarioData';
import { calculateSimulationResults } from '../../simulation/simulationEngine';
import { ScenarioIllustration } from './ui/ScenarioIllustrations';

interface SimulationWorkspace2DProps {
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  onExit: () => void;
  onReset: () => void;
  onOpenJournal: () => void;
  onOpenAssumptions: () => void;
  onToggleMentor: () => void;
  onOpenReport: () => void;
  onOpenInternHiring: () => void;
}

// ─── 11 Sequential Entrepreneurship Stages ─────────────────────────────────────

interface StageDefinition {
  index: number;
  id: SimulationLocationId;
  stageName: string;
  learningObjective: string;
  situation: Record<ScenarioId, string>;
  challengeTitle: Record<ScenarioId, string>;
  challengeDescription: Record<ScenarioId, string>;
  decisionPrompt: Record<ScenarioId, string>;
  options: Record<ScenarioId, {
    id: string;
    title: string;
    description: string;
    costText?: string;
    benefitText: string;
    riskText: string;
    cashEffect: number;
    satisfactionEffect: number;
    capacityEffect: number;
    reputationEffect: number;
    consequenceExplanation: string;
    tradeoffSummary: string;
  }[]>;
}

const STAGES: StageDefinition[] = [
  // ─── Stage 1: Problem Discovery ─────────────────────────────────────────────
  {
    index: 1,
    id: 'customer_discovery',
    stageName: 'Discover a Problem',
    learningObjective: 'Identify an urgent, recurring friction point in your market rather than starting with a solution.',
    situation: {
      campus_meal: 'Surrounding hostel blocks house 4,500 students with strict 35-minute break gaps. Commercial delivery apps take 50+ minutes and charge ₹200+ per meal, while campus canteens are overcrowded.',
      edtech: 'Over 15 million secondary students struggle with fast-paced coaching classrooms. Students fall behind in foundation physics and calculus, but feel intimidated to ask questions in 90-person batches.',
      sustainability: 'University canteens generate 15,000+ single-use styrofoam and plastic takeaway containers weekly. Campus bins overflow with non-recyclable greasy garbage within an hour of lunch.',
      local_services: 'Students experience frequent laptop charger failures and bike punctures with no verified campus technicians.',
      creative: 'Student designers create popular college apparel and prints but face high upfront minimum batch manufacturing costs.',
    },
    challengeTitle: {
      campus_meal: 'The Student Lunch Dilemma',
      edtech: 'The Foundation Gap Crisis',
      sustainability: 'The Single-Use Plastic Deluge',
      local_services: 'The Fragmented Repair Market',
      creative: 'The Merch Inventory Trap',
    },
    challengeDescription: {
      campus_meal: 'Decide which customer pain point your venture will solve first: high daily meal prices, delivery delays that miss lecture breaks, or low-hygiene fried food.',
      edtech: 'Choose which learning barrier to target: fast-paced lecture dropout, lack of active problem-solving practice, or high private tutoring costs.',
      sustainability: 'Choose which campus waste challenge to solve: single-use takeaway food boxes, beverage cups, or delivery parcel waste.',
      local_services: 'Focus on urgent repairs, laundry turnaround, or verified service pricing.',
      creative: 'Focus on zero-inventory print-on-demand, student art popups, or custom club merchandise.',
    },
    decisionPrompt: {
      campus_meal: 'Which urgent student problem statement will your venture tackle?',
      edtech: 'Which educational learning bottleneck will your product resolve?',
      sustainability: 'Which environmental friction point will your circular system tackle?',
      local_services: 'Which service pain point will you address first?',
      creative: 'Which student creator pain point will you solve?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-p1-cost',
          title: 'High Food Spend Draining Student Allowances',
          description: 'Focus on delivering wholesome, honest thalis under ₹85 to stop students running out of money by mid-month.',
          costText: 'Low unit cost (₹55/meal prep)',
          benefitText: 'Massive addressable market (4,500 students)',
          riskText: 'Thin gross margins require strict kitchen portion control',
          cashEffect: 0,
          satisfactionEffect: +10,
          capacityEffect: +30,
          reputationEffect: +12,
          consequenceExplanation: 'You anchored your venture on affordability. Price-sensitive hostellers immediately subscribed in droves, creating reliable recurring volume.',
          tradeoffSummary: 'Low price guarantees rapid adoption, but leaves very little buffer for raw material price spikes.',
        },
        {
          id: 'meal-p2-punctuality',
          title: 'Commercial Apps Consistently Missing 35-Min Breaks',
          description: 'Focus on scheduled batch locker drops delivered 2 minutes before the lecture dismissal bell.',
          costText: 'Requires ₹4,000 thermal runner bags',
          benefitText: 'Eliminates campus gate delivery friction',
          riskText: 'Requires zero-delay kitchen batch timing',
          cashEffect: -4000,
          satisfactionEffect: +15,
          capacityEffect: +20,
          reputationEffect: +15,
          consequenceExplanation: 'You prioritized punctuality. STEM and medical students with tight lab schedules became fiercely loyal advocates.',
          tradeoffSummary: 'Higher operational precision and runner coordination needed, but customers willingly pay on time.',
        },
        {
          id: 'meal-p3-health',
          title: 'Lack of Clean, Low-Oil Home-Style Nutrition',
          description: 'Focus on balanced ghar-ka-khana (dal, roti, clean protein) with verified hygiene audits.',
          costText: 'Higher ingredient sourcing cost (+₹12/meal)',
          benefitText: 'Strong word-of-mouth among long-term hostellers',
          riskText: 'Slightly higher retail price point (₹95/meal)',
          cashEffect: -2000,
          satisfactionEffect: +12,
          capacityEffect: +15,
          reputationEffect: +18,
          consequenceExplanation: 'Health-conscious students and sports teams signed up for monthly plans, giving you higher average order value.',
          tradeoffSummary: 'Higher ingredient quality commands premium pricing but reduces impulse one-off purchases.',
        },
      ],
      edtech: [
        {
          id: 'ed-p1-foundation',
          title: 'Foundation Concept Gaps in Fast-Paced Classes',
          description: 'Target visual learners who fall behind in massive 90-person coaching batches with interactive step-by-step simulations.',
          benefitText: 'High emotional resonance with struggling students',
          riskText: 'Requires custom visual simulation engineering',
          cashEffect: 0,
          satisfactionEffect: +14,
          capacityEffect: +25,
          reputationEffect: +15,
          consequenceExplanation: 'Students reported a 70% reduction in concept anxiety when interacting with variable sliders instead of passive slides.',
          tradeoffSummary: 'High software development effort upfront, but extremely sticky user retention.',
        },
        {
          id: 'ed-p2-active-recall',
          title: 'Video Lecture Fatigue & Passive Learning Dropout',
          description: 'Replace 45-minute passive video recordings with 3-minute gamified concept checkpoints and diagnostic hint recall.',
          benefitText: '4x higher completion rate than standard video courses',
          riskText: 'Requires continuous question bank curation',
          cashEffect: 0,
          satisfactionEffect: +16,
          capacityEffect: +20,
          reputationEffect: +14,
          consequenceExplanation: 'Session completion rates jumped from 22% to 78% as students enjoyed bite-sized interactive challenges.',
          tradeoffSummary: 'Micro-modules require rigorous pedagogical testing to prevent superficial gamification.',
        },
      ],
      sustainability: [
        {
          id: 'sust-p1-takeaway-boxes',
          title: '15,000+ Plastic Meal Boxes Discarded Weekly',
          description: 'Replace non-recyclable styrofoam and single-use takeaway food boxes with an automated deposit-return smart container loop.',
          benefitText: 'Eliminates 80% of campus lunch litter immediately',
          riskText: 'Requires student return compliance and drop-bin infrastructure',
          cashEffect: 0,
          satisfactionEffect: +15,
          capacityEffect: +20,
          reputationEffect: +20,
          consequenceExplanation: 'Campus environmental committees and hostel wardens endorsed your circular model as the official campus sustainability partner.',
          tradeoffSummary: 'High environmental impact, but operational success depends on convenient drop-off points.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },

  // ─── Stage 2: Understand Customers ──────────────────────────────────────────
  {
    index: 2,
    id: 'customer_insights',
    stageName: 'Understand Customers',
    learningObjective: 'Validate willingness to pay and behavioral constraints by listening to real student personas.',
    situation: {
      campus_meal: 'Interviews with Riya (Hosteller, 2nd Year), Vikram (Day Scholar), and Dr. Sharma (Faculty) reveal conflicting needs: hostellers prioritize cost and dinner options; day scholars care exclusively about 1:15 PM lunch punctuality.',
      edtech: 'Student interviews show high anxiety around upcoming semester exams. Parents are willing to pay for clear progress metrics, while students refuse to sit through long lectures after 7 PM.',
      sustainability: 'Student surveys show 88% want to stop plastic waste, but 65% will discard reusable boxes if drop bins are located more than 50 meters away from lecture halls.',
      local_services: 'Interviews show students want fixed upfront repair quotes before handing over devices.',
      creative: 'Students want limited-edition artist apparel but expect delivery within 3 days.',
    },
    challengeTitle: {
      campus_meal: 'Balancing Speed vs Menu Customization',
      edtech: 'Student Engagement vs Parent Reassurance',
      sustainability: 'Frictionless Drop-off vs Sanitization Speed',
      local_services: 'Trust & Transparent Pricing',
      creative: 'Authenticity vs Batch Scale',
    },
    challengeDescription: {
      campus_meal: 'Choose your customer research priority: optimize for pre-scheduled lunch batching or offer custom on-demand choices.',
      edtech: 'Choose your core product promise: gamified student mastery or structured parent/teacher progress reports.',
      sustainability: 'Choose your compliance strategy: gentle deposit refund incentives or mandatory student card holds.',
      local_services: 'Establish fixed price schedules vs free technician diagnostics.',
      creative: 'Focus on student artist royalties vs bulk club merchandise.',
    },
    decisionPrompt: {
      campus_meal: 'Based on customer empathy insights, what will your operational focus be?',
      edtech: 'How will you structure your learning platform for maximum student commitment?',
      sustainability: 'How will you ensure high container return rates from busy students?',
      local_services: 'What customer assurance will you build into your service?',
      creative: 'How will you align with creator expectations?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-ins-batch',
          title: 'Strict Batch Drop-offs at Academic Building Lockers',
          description: 'Focus entirely on guaranteed delivery at 1:12 PM directly to insulated lockers outside major lecture blocks.',
          benefitText: 'Maximum punctuality, eliminates individual runner delays',
          riskText: 'Customers must place orders by 10:30 AM morning cutoff',
          cashEffect: 0,
          satisfactionEffect: +14,
          capacityEffect: +35,
          reputationEffect: +12,
          consequenceExplanation: 'Morning cutoff allowed your kitchen to prepare 200 meals in synchronized batches with zero food waste.',
          tradeoffSummary: 'You lose late-waking impulse customers, but achieve near-perfect kitchen efficiency.',
        },
        {
          id: 'meal-ins-flex',
          title: 'Flexible On-Demand Delivery with Rolling Slots',
          description: 'Allow students to order whenever lecture breaks shift with 15-minute delivery windows.',
          benefitText: 'Captures spontaneous orders and changing schedules',
          riskText: 'Unpredictable kitchen spikes and runner traffic jams',
          cashEffect: -3000,
          satisfactionEffect: +8,
          capacityEffect: -10,
          reputationEffect: +5,
          consequenceExplanation: 'Students loved flexibility, but lunch rush created a 20-minute runner bottleneck at Science Block.',
          tradeoffSummary: 'High customer convenience, but creates volatile kitchen strain and runner staffing costs.',
        },
      ],
      edtech: [
        {
          id: 'ed-ins-bite',
          title: 'Self-Paced 3-Minute Micro-Challenges with Instant Feedback',
          description: 'Design bite-sized visual simulations that students can complete on mobile between classes or during bus commutes.',
          benefitText: 'Exceptional daily active user habit formation',
          riskText: 'Requires rigorous conceptual scaffolding',
          cashEffect: 0,
          satisfactionEffect: +16,
          capacityEffect: +25,
          reputationEffect: +14,
          consequenceExplanation: 'Daily engagement skyrocketed. Students treated problem-solving like an interactive game rather than tedious study.',
          tradeoffSummary: 'Mobile-first micro-learning fits student schedules better than desktop-only long-form courses.',
        },
        {
          id: 'ed-ins-tutor',
          title: 'Hybrid Peer Study Circles with Weekend Expert Doubt Clearing',
          description: 'Pair visual app modules with weekly 45-minute live Q&A circles hosted by high-scoring college mentors.',
          benefitText: 'High perceived value and premium pricing power',
          riskText: 'Higher mentor stipend and scheduling overhead',
          cashEffect: -4500,
          satisfactionEffect: +18,
          capacityEffect: +10,
          reputationEffect: +16,
          consequenceExplanation: 'Parents willingly paid 2x higher subscriptions due to the human mentorship touchpoint.',
          tradeoffSummary: 'Increases customer willingness to pay, but adds recurring mentor payroll costs.',
        },
      ],
      sustainability: [
        {
          id: 'sust-ins-incentive',
          title: 'Effortless Smart Return Bins Outside Every Canteen Exit',
          description: 'Deploy 6 smart drop bins with instant ₹20 deposit refund credit upon scanning student ID card.',
          benefitText: '94% container return rate within 24 hours',
          riskText: 'Higher initial bin hardware investment (₹12,000)',
          cashEffect: -12000,
          satisfactionEffect: +18,
          capacityEffect: +30,
          reputationEffect: +22,
          consequenceExplanation: 'Convenience solved the drop-off barrier. Over 94% of containers were returned cleanly for wash cycles.',
          tradeoffSummary: 'Higher upfront capital required for smart bins, but prevents catastrophic container shrinkage.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },

  // ─── Stage 3: Develop an Idea ───────────────────────────────────────────────
  {
    index: 3,
    id: 'startup_studio',
    stageName: 'Develop an Idea',
    learningObjective: 'Formulate a distinct value proposition and sustainable business model architecture.',
    situation: {
      campus_meal: 'Your core team evaluates three delivery models: an automated lunchbox locker network, a central dining pickup hub, or a roving campus bicycle cart.',
      edtech: 'Your tech team compares a visual simulation engine vs a peer question-and-answer marketplace vs an automated test-series generator.',
      sustainability: 'Your green team compares a smart reusable container deposit network vs compostable palm-leaf trays vs a bulk refill station.',
      local_services: 'Evaluate app-based booking vs student kiosk vs WhatsApp bot.',
      creative: 'Evaluate on-demand printing vs wholesale merch manufacturing.',
    },
    challengeTitle: {
      campus_meal: 'Architecting the Core Operating Model',
      edtech: 'Core Product Architecture Decision',
      sustainability: 'Circular Distribution Architecture',
      local_services: 'Service Booking Architecture',
      creative: 'Merchandising Production Model',
    },
    challengeDescription: {
      campus_meal: 'Select the operational model that delivers hot meals under ₹85 while maintaining kitchen throughput.',
      edtech: 'Select the technology engine that provides self-paced visual STEM mastery.',
      sustainability: 'Select the circular container model that achieves 90%+ reuse cycles.',
      local_services: 'Select your repair dispatcher model.',
      creative: 'Select your creator production pipeline.',
    },
    decisionPrompt: {
      campus_meal: 'Which venture concept architecture will you build?',
      edtech: 'Which product value proposition will define your platform?',
      sustainability: 'Which circular business concept will you deploy?',
      local_services: 'Which model will you operate?',
      creative: 'Which production model will you select?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-idea-locker',
          title: 'Scheduled Thermal Locker Subscription Network',
          description: 'Students subscribe weekly; hot meals are delivered into heated, passcode-protected campus locker hubs.',
          benefitText: 'Zero delivery wait time, automated pick up in under 30 seconds',
          riskText: 'Requires locker lease agreement with college admin',
          cashEffect: -5000,
          satisfactionEffect: +18,
          capacityEffect: +40,
          reputationEffect: +16,
          consequenceExplanation: 'Students loved grabbing their lunch without standing in 20-minute canteen lines.',
          tradeoffSummary: 'Locker infrastructure cost is offset by zero individual delivery runner delays.',
        },
        {
          id: 'meal-idea-express-counter',
          title: 'Campus Central Express Pick-Up Kiosk',
          description: 'Partner with an existing canteen vendor to install a dedicated BiteCraft pre-order pickup window.',
          benefitText: 'Lowest capital outlay, utilizes existing campus food license',
          riskText: 'Dependent on canteen vendor goodwill and counter congestion',
          cashEffect: -2500,
          satisfactionEffect: +10,
          capacityEffect: +20,
          reputationEffect: +10,
          consequenceExplanation: 'Quick to launch, but counter became crowded when 50 students arrived simultaneously at 1:15 PM.',
          tradeoffSummary: 'Cheap and fast to launch, but limits long-term brand differentiation.',
        },
      ],
      edtech: [
        {
          id: 'ed-idea-sim',
          title: 'Interactive STEM Visual Simulation Sandbox',
          description: 'Software-driven interactive science modules where students tweak parameters and see real-time graphical outcomes.',
          benefitText: 'Highly scalable digital asset with near-zero marginal unit delivery cost',
          riskText: 'Higher initial development time and coding effort',
          cashEffect: -8000,
          satisfactionEffect: +20,
          capacityEffect: +50,
          reputationEffect: +18,
          consequenceExplanation: 'Teachers and principals immediately praised the visual simulations for simplifying difficult physics concepts.',
          tradeoffSummary: 'High initial software build cost, but infinite software scalability once built.',
        },
      ],
      sustainability: [
        {
          id: 'sust-idea-smart-box',
          title: 'Smart NFC Deposit-Return Container Ecosystem',
          description: 'Durable biocomposite food boxes with QR/NFC tracking and automated campus collection drop-bins.',
          benefitText: '500+ wash durability per box, zero plastic waste',
          riskText: 'Requires automated washing and sanitization protocol',
          cashEffect: -10000,
          satisfactionEffect: +20,
          capacityEffect: +35,
          reputationEffect: +24,
          consequenceExplanation: 'Canteens eliminated 100% of single-use container purchases, saving ₹3 per meal in disposable packaging costs.',
          tradeoffSummary: 'Significant container fleet purchase, but produces recurring operational savings.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },

  // ─── Stage 4: Design the Solution (MVP Feature Roadmap) ─────────────────────
  {
    index: 4,
    id: 'product_dev',
    stageName: 'Design the Solution',
    learningObjective: 'Balance scope and development resources: configure an MVP that solves the core problem without feature bloat.',
    situation: {
      campus_meal: 'You have 100 development points to allocate across features: batch locker ordering, live runner GPS, meal customization, or a flexible pass wallet.',
      edtech: 'Allocate 100 dev points across: core visual simulation engine, hint generator, student streak tracker, or parent analytics dashboard.',
      sustainability: 'Allocate 100 dev points across: student ID QR scanner, bin fill-level telemetry, automated sanitization logs, or deposit refund wallet.',
      local_services: 'Configure MVP features for booking, technician verification, and rating.',
      creative: 'Configure MVP features for mockups, order tracking, and print specs.',
    },
    challengeTitle: {
      campus_meal: 'MVP Feature Trade-offs',
      edtech: 'Feature Scope vs Student Usability',
      sustainability: 'Hardware Integration vs User Simplicity',
      local_services: 'Service Workflow MVP',
      creative: 'Production Pipeline MVP',
    },
    challengeDescription: {
      campus_meal: 'Focus on reliable core batch ordering or stretch development into complex live tracking and custom toppings.',
      edtech: 'Focus on deep interactive simulations or build a multi-sided parent portal.',
      sustainability: 'Focus on seamless 5-second QR returns or complex hardware sensors.',
      local_services: 'Select core service booking features.',
      creative: 'Select creator pipeline features.',
    },
    decisionPrompt: {
      campus_meal: 'Which MVP feature configuration will you build for launch?',
      edtech: 'Which software feature set will you prioritize for your MVP?',
      sustainability: 'Which circular feature set will you build for launch?',
      local_services: 'Which features will you prioritize?',
      creative: 'Which features will you launch with?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-feat-core',
          title: 'Lean Core MVP: Batch Ordering + Prepaid Lunch Pass',
          description: 'Focus development on bulletproof batch order processing, automated kitchen tickets, and prepaid student pass cards.',
          costText: 'Conserves 40 dev points for future iterations',
          benefitText: 'Zero software bugs at launch, fast 2-week deployment',
          riskText: 'No live runner GPS tracking on map',
          cashEffect: 0,
          satisfactionEffect: +15,
          capacityEffect: +30,
          reputationEffect: +12,
          consequenceExplanation: 'Your lean app launched on time with zero checkout glitches. Orders flowed smoothly directly to kitchen thermal bags.',
          tradeoffSummary: 'Leaving out flashy GPS tracking was the right call: punctuality mattered far more than watching an icon on a map.',
        },
        {
          id: 'meal-feat-all',
          title: 'Heavy Feature Suite: GPS Tracking + Full Meal Customization',
          description: 'Build live runner map tracking, item-by-item vegetable customization, and in-app social meal sharing.',
          costText: 'Consumes all 100 dev points, delays launch by 3 weeks',
          benefitText: 'Impressive looking feature list',
          riskText: 'High chance of app crashes and delayed kitchen preparation',
          cashEffect: -6000,
          satisfactionEffect: -5,
          capacityEffect: -15,
          reputationEffect: +4,
          consequenceExplanation: 'Feature bloat caused checkout lag. Custom meal options confused kitchen cooks, slowing batch prep during lunch rush.',
          tradeoffSummary: 'A cautionary entrepreneurship lesson: building too many features before validating the core loop wastes capital and complicates operations.',
        },
      ],
      edtech: [
        {
          id: 'ed-feat-core',
          title: 'Focused Interactive Engine + Diagnostic Checkpoints',
          description: 'Invest all engineering into intuitive touch/mouse controls, responsive physics graphs, and diagnostic hints.',
          benefitText: 'Flawless performance on school Chromebooks and low-end phones',
          riskText: 'No complex social gamification leaderboards yet',
          cashEffect: 0,
          satisfactionEffect: +18,
          capacityEffect: +35,
          reputationEffect: +15,
          consequenceExplanation: 'Students praised the instant loading speed and zero lag when dragging simulation sliders.',
          tradeoffSummary: 'Prioritizing core pedagogical interactivity over superficial badges created authentic learning retention.',
        },
      ],
      sustainability: [
        {
          id: 'sust-feat-core',
          title: 'Instant 3-Second QR Scan + Wallet Deposit Refund',
          description: 'Streamline the return workflow: student scans container QR, drops into bin, and receives instant refund confirmation.',
          benefitText: 'Zero queues at canteen drop points during rush hour',
          riskText: 'Requires durable laser-etched QR codes',
          cashEffect: 0,
          satisfactionEffect: +18,
          capacityEffect: +30,
          reputationEffect: +16,
          consequenceExplanation: 'Drop-off took less than 4 seconds. Students returned containers without feeling any friction.',
          tradeoffSummary: 'Speed and simplicity at the drop-bin is the #1 factor in circular container adoption.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },

  // ─── Stage 5: Build a Business Model ────────────────────────────────────────
  {
    index: 5,
    id: 'finance_center',
    stageName: 'Build a Business Model',
    learningObjective: 'Structure unit economics: distinguish revenue, cost of goods sold (COGS), gross margin, and operating contribution.',
    situation: {
      campus_meal: 'Your unit costs are ₹55 per standard meal. You must set pricing and decide between a predictable prepaid subscription vs pay-as-you-go on-demand.',
      edtech: 'Your server and authoring costs are ₹45 per active learner/mo. Choose between consumer freemium subscriptions (₹299/mo) vs annual school institutional licenses (₹75,000/yr).',
      sustainability: 'Container manufacturing cost is ₹65 (amortized over 500 washes = ₹0.13/use). Choose your revenue stream: per-use hygiene fee to vendors vs institutional campus green subsidy.',
      local_services: 'Set technician commission rates and student diagnostic pricing.',
      creative: 'Set artist royalty splits and merchandising retail price points.',
    },
    challengeTitle: {
      campus_meal: 'Unit Economics & Cash Predictability',
      edtech: 'B2C Consumer vs B2B Institutional Revenue Model',
      sustainability: 'Circular Unit Economics & Washing Margin',
      local_services: 'Marketplace Take-Rate Economics',
      creative: 'Creator Revenue Share Model',
    },
    challengeDescription: {
      campus_meal: 'Prepaid subscriptions guarantee advance working capital and reduce food waste; pay-as-you-go captures higher one-off pricing but creates volatile daily volume.',
      edtech: 'B2C gives rapid direct feedback; B2B school licensing gives lump-sum upfront cash and institutional credibility.',
      sustainability: 'Merchant packaging replacement subscription vs per-meal eco-deposit fee.',
      local_services: 'Structure technician payout and platform commission.',
      creative: 'Structure royalty splits and retail pricing.',
    },
    decisionPrompt: {
      campus_meal: 'Which business model pricing structure will you establish?',
      edtech: 'Which revenue model will power your platform growth?',
      sustainability: 'How will your circular packaging venture monetize sustainably?',
      local_services: 'Which revenue model will you implement?',
      creative: 'Which revenue split will you adopt?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-bm-sub',
          title: 'Prepaid 20-Day Campus Lunch Pass (₹85/meal)',
          description: 'Students pay ₹1,700 upfront for a monthly pass. Meal cost is ₹55, giving a healthy 35% gross margin (₹30 profit/meal) and advance cash flow.',
          costText: 'Zero unpaid receivables',
          benefitText: 'Predictable kitchen batching, advance working capital',
          riskText: 'Requires upfront commitment from student allowances',
          cashEffect: +25000,
          satisfactionEffect: +12,
          capacityEffect: +20,
          reputationEffect: +14,
          consequenceExplanation: 'Prepaid passes generated ₹25,000 in immediate cash flow, securing your ingredient purchasing runway for 6 weeks.',
          tradeoffSummary: 'Advance cash flow protects the business from bad debt and allows bulk wholesale purchasing discounts.',
        },
        {
          id: 'meal-bm-payg',
          title: 'Pay-As-You-Go On-Demand (₹105/meal)',
          description: 'Charge a higher retail price per single meal. Higher theoretical profit per unit (₹50 gross profit/meal), but volatile daily demand.',
          benefitText: 'Higher per-meal gross margin (48%)',
          riskText: 'Unpredictable daily order volume and kitchen food waste risk',
          cashEffect: +10000,
          satisfactionEffect: +5,
          capacityEffect: -5,
          reputationEffect: +8,
          consequenceExplanation: 'Higher per-meal price generated good margins on peak days, but rainy days saw 40% unused ingredients.',
          tradeoffSummary: 'Higher unit margin is quickly eaten away if unsold prepared food must be discarded.',
        },
      ],
      edtech: [
        {
          id: 'ed-bm-b2b',
          title: 'B2B School Institutional Licensing (₹60,000 / school / yr)',
          description: 'Sell directly to school computer science & physics departments for whole-grade classroom deployment.',
          benefitText: 'Large upfront annual payments, zero student churn mid-year',
          riskText: 'Longer 4-week sales cycle and principal approval meetings',
          cashEffect: +35000,
          satisfactionEffect: +15,
          capacityEffect: +40,
          reputationEffect: +20,
          consequenceExplanation: 'Two pilot schools signed annual contracts, giving your venture ₹70,000 in non-dilutive contract cash.',
          tradeoffSummary: 'Institutional contracts require pedagogical rigor, but provide enviable financial stability.',
        },
        {
          id: 'ed-bm-b2c',
          title: 'B2C Direct Student Freemium (₹249 / month subscription)',
          description: 'Offer Chapter 1 free to all students; charge ₹249/mo for complete interactive problem banks.',
          benefitText: 'Instant user acquisition, rapid feedback loop',
          riskText: 'High monthly subscription drop-off after exams conclude',
          cashEffect: +15000,
          satisfactionEffect: +12,
          capacityEffect: +20,
          reputationEffect: +10,
          consequenceExplanation: '250 students converted to paid plans. Good viral word-of-mouth in student study groups.',
          tradeoffSummary: 'Fast consumer adoption, but requires continuous marketing spend to combat semester churn.',
        },
      ],
      sustainability: [
        {
          id: 'sust-bm-vendor-fee',
          title: 'Merchant Packaging Replacement Fee (₹3.50 / container wash)',
          description: 'Canteen vendors pay ₹3.50 per sanitized container returned, saving them ₹2 compared to single-use boxes (₹5.50 each).',
          benefitText: 'Win-win unit economics: vendor saves money while eliminating plastic',
          riskText: 'Requires prompt daily washing logistics',
          cashEffect: +20000,
          satisfactionEffect: +16,
          capacityEffect: +25,
          reputationEffect: +22,
          consequenceExplanation: 'Three campus canteens joined immediately because the reusable service was cheaper than buying paper/plastic boxes.',
          tradeoffSummary: 'Aligning sustainability with direct vendor cost savings makes adoption a no-brainer.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },

  // ─── Stage 6: Plan Finances & Sourcing ──────────────────────────────────────
  {
    index: 6,
    id: 'finance_center',
    stageName: 'Plan Finances & Sourcing',
    learningObjective: 'Allocate working capital across operations, marketing, and emergency buffer; negotiate supplier trade-offs.',
    situation: {
      campus_meal: 'You must allocate your seed capital across supplier sourcing: Direct local farm co-op (fresh, ₹52/meal) vs Wholesale central mandi (cheap, ₹38/meal, variable quality) vs Organic verified grower (₹68/meal).',
      edtech: 'Allocate capital between cloud server infrastructure, interactive simulation content development, and educator review boards.',
      sustainability: 'Source container material: Certified biocomposite food-grade boxes (₹65/box, 500 wash life) vs Stainless steel tiffins (₹110/box, indestructible) vs Recycled paperboard (₹12/box, disposable).',
      local_services: 'Allocate budget for technician toolkits, background checks, and spare parts buffer.',
      creative: 'Allocate budget for apparel blanks, screen printing setup, and festival popup booth.',
    },
    challengeTitle: {
      campus_meal: 'Supplier Reliability & Quality Sourcing',
      edtech: 'Infrastructure Scaling vs Content Breadth',
      sustainability: 'Material Lifecycle & Durability Economics',
      local_services: 'Supplier Quality & Part Warranties',
      creative: 'Blank Apparel Quality & Print Durability',
    },
    challengeDescription: {
      campus_meal: 'Cheap wholesale mandis increase margins but risk inconsistent quality; direct farm partnerships provide steady reliability.',
      edtech: 'High-availability cloud servers vs basic hosting.',
      sustainability: 'Biocomposite circular boxes vs stainless steel tiffins.',
      local_services: 'OEM replacement parts vs grey-market components.',
      creative: 'Heavy organic cotton vs cheap synthetic polyester blanks.',
    },
    decisionPrompt: {
      campus_meal: 'Which supplier partnership will you formalize?',
      edtech: 'Which infrastructure and content allocation strategy will you fund?',
      sustainability: 'Which container material will you procure for your campus fleet?',
      local_services: 'Which parts supplier will you partner with?',
      creative: 'Which apparel supplier will you contract?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-sup-farm',
          title: 'Direct Local Farmers Co-op (Balanced & Fresh)',
          description: 'Source daily grains, lentils, and vegetables from a peri-urban farmer cooperative at ₹48/meal with guaranteed morning delivery.',
          benefitText: 'Consistent high quality, positive social impact story',
          riskText: 'Requires 48-hour order planning notice',
          cashEffect: -12000,
          satisfactionEffect: +16,
          capacityEffect: +25,
          reputationEffect: +18,
          consequenceExplanation: 'Student satisfaction scored 92% for fresh food taste. The farmer partnership became a beloved campus brand story.',
          tradeoffSummary: 'Paying fair prices to local growers gave you rock-solid delivery punctuality during university exams.',
        },
        {
          id: 'meal-sup-mandi',
          title: 'Wholesale Central Mandi Liquidation (Lowest Cost)',
          description: 'Buy bulk surplus wholesale ingredients at ₹36/meal to maximize short-term gross profit.',
          benefitText: 'Saves ₹12/meal in raw ingredients',
          riskText: 'Variable freshness, bruised vegetables, and food safety risk',
          cashEffect: -6000,
          satisfactionEffect: -8,
          capacityEffect: +10,
          reputationEffect: -10,
          consequenceExplanation: 'A shipment of bruised tomatoes and stale greens produced 18 student complaints and negative WhatsApp reviews.',
          tradeoffSummary: 'Cutting corners on basic ingredient quality quickly destroys student trust in food ventures.',
        },
      ],
      edtech: [
        {
          id: 'ed-sup-cloud',
          title: 'High-Availability Cloud Tier + Verified Physics Curriculum',
          description: 'Fund dedicated low-latency cloud servers and engage two senior CBSE/IB physics educators to verify simulation formulas.',
          benefitText: 'Zero server crashes during 8 PM exam study rushes; bulletproof curriculum trust',
          riskText: 'Higher monthly server reserve cost',
          cashEffect: -14000,
          satisfactionEffect: +18,
          capacityEffect: +40,
          reputationEffect: +22,
          consequenceExplanation: 'Zero downtime during exam week. Teachers praised the error-free physics formula implementations.',
          tradeoffSummary: 'Investing in curriculum accuracy and reliable infrastructure earns institutional respect.',
        },
      ],
      sustainability: [
        {
          id: 'sust-sup-biocomposite',
          title: 'Certified Food-Grade Rice Husk Biocomposite Boxes',
          description: 'Order 800 durable, microwave-safe, dishwasher-safe reusable boxes manufactured from agricultural waste (500+ wash lifespan).',
          benefitText: 'Circular storytelling, light carry weight, microwave-safe',
          riskText: 'Requires initial upfront capital deployment of ₹32,000',
          cashEffect: -25000,
          satisfactionEffect: +20,
          capacityEffect: +35,
          reputationEffect: +24,
          consequenceExplanation: 'The sleek, tactile biocomposite containers became a campus status symbol among students.',
          tradeoffSummary: 'High upfront fleet investment, but amortized cost drops to ₹0.10/meal over its multi-year lifespan.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },

  // ─── Stage 7: Market the Business ───────────────────────────────────────────
  {
    index: 7,
    id: 'marketing_studio',
    stageName: 'Market the Business',
    learningObjective: 'Calculate Customer Acquisition Cost (CAC) and deploy authentic high-trust student acquisition channels.',
    situation: {
      campus_meal: 'You must deploy your marketing budget across: Student Hostel Ambassadors (high trust), Free Lunch Tasting Kiosk (high conversion), Campus WhatsApp Broadcasts (low cost), or Commercial Flyer drops (wasteful).',
      edtech: 'Deploy acquisition budget across: School teacher classroom demos, student study server partnerships, free chapter mock trial links, or paid Instagram ads.',
      sustainability: 'Deploy acquisition across: Campus Green Club orientation pledges, vendor counter QR displays, zero-waste challenge prizes, or campus poster campaign.',
      local_services: 'Deploy marketing via hostel notice boards, fresher orientation kits, and student WhatsApp circles.',
      creative: 'Deploy marketing via Instagram lookbooks, campus influencer seeding, and fest popup booth.',
    },
    challengeTitle: {
      campus_meal: 'Organic Word-of-Mouth vs Paid Campus Advertising',
      edtech: 'Educator Trust vs Social Clickbait',
      sustainability: 'Behavior Change Advocacy vs Passive Signage',
      local_services: 'Campus Trust & Referral Momentum',
      creative: 'Visual Culture & Peer Advocacy',
    },
    challengeDescription: {
      campus_meal: 'Hostel student ambassadors cost money in stipends but generate 4x higher subscription conversion than printed flyers.',
      edtech: 'Educator endorsements take longer but yield entire classrooms; social ads bring fast clicks but poor retention.',
      sustainability: 'Engaging active student clubs drives 80%+ adoption; passive posters are ignored.',
      local_services: 'Referral discounts vs poster blitz.',
      creative: 'Student artist collabs vs generic digital ads.',
    },
    decisionPrompt: {
      campus_meal: 'Which customer acquisition strategy will you deploy?',
      edtech: 'How will you attract committed students to your platform?',
      sustainability: 'How will you drive campus-wide adoption of reusable containers?',
      local_services: 'Which marketing channel will you fund?',
      creative: 'Which promotional channel will you launch?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-mkt-ambassadors',
          title: 'Hostel Student Ambassadors + Free Tasting Kiosk',
          description: 'Recruit 4 respected hostel floor leads to share meal samples and coordinate floor batch deliveries with friends.',
          benefitText: 'Lowest Customer Acquisition Cost (₹28/student), highest retention',
          riskText: 'Requires coordinator stipends and tasting inventory',
          cashEffect: -6500,
          satisfactionEffect: +16,
          capacityEffect: +30,
          reputationEffect: +16,
          consequenceExplanation: 'Taste-testing convinced skeptical hostellers immediately. 180 new monthly subscriptions were booked in 3 days.',
          tradeoffSummary: 'Letting students taste honest food creates genuine peer recommendation that expensive flyers could never buy.',
        },
        {
          id: 'meal-mkt-flyers',
          title: 'Mass Commercial Flyer Blitz & Paid Influencer Posts',
          description: 'Print 5,000 glossy flyers and pay campus social media accounts for sponsored reels.',
          costText: 'Expensive paper printing (₹8,000)',
          benefitText: 'Broad initial visibility across entire university',
          riskText: 'Students throw paper flyers into trash; very low conversion (1.2%)',
          cashEffect: -8000,
          satisfactionEffect: -2,
          capacityEffect: +10,
          reputationEffect: -4,
          consequenceExplanation: 'Most paper flyers ended up littering campus pathways. Only 15 students signed up from the paper blitz.',
          tradeoffSummary: 'Mass spray-and-pray marketing burns cash rapidly with little conversion compared to personal peer trust.',
        },
      ],
      edtech: [
        {
          id: 'ed-mkt-educators',
          title: 'Educator Classroom Demos + Free Chapter Pilot Trials',
          description: 'Provide teachers with free interactive projection tools for their smartboards; students receive free chapter access.',
          benefitText: 'Teacher endorsement gives instant credibility; entire classrooms join together',
          riskText: 'Requires conducting 30-min teacher onboarding workshops',
          cashEffect: -5000,
          satisfactionEffect: +18,
          capacityEffect: +35,
          reputationEffect: +22,
          consequenceExplanation: 'Four school teachers integrated the simulations directly into their weekly lessons, onboarding 420 active learners.',
          tradeoffSummary: 'Empowering educators creates a distribution flywheel that no consumer ad campaign can match.',
        },
      ],
      sustainability: [
        {
          id: 'sust-mkt-ambassadors',
          title: 'Eco-Club Orientation Challenge & Free Beverage Voucher',
          description: 'Partner with campus environmental clubs: students who complete 5 circular returns get a free fresh campus juice.',
          benefitText: 'Turns sustainable habit into a fun social norm across freshers',
          riskText: 'Fund ₹4,000 voucher subsidy',
          cashEffect: -4000,
          satisfactionEffect: +18,
          capacityEffect: +30,
          reputationEffect: +20,
          consequenceExplanation: 'Freshers eagerly completed the return loop to win the juice voucher. Returning containers became second nature.',
          tradeoffSummary: 'Small gamified incentives build positive long-term muscle memory during orientation week.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },

  // ─── Stage 8: Manage Operations & Bottlenecks ───────────────────────────────
  {
    index: 8,
    id: 'operations_center',
    stageName: 'Manage Operations',
    learningObjective: 'Diagnose operational bottlenecks: manage capacity constraints under demand surges without sacrificing service quality.',
    situation: {
      campus_meal: 'Peak lunch rush: 240 orders come in for the 1:15 PM bell, but your current kitchen burner and runner capacity is capped at 160 meals. Demand exceeds capacity by 50%!',
      edtech: 'Exam week traffic spike: 1,500 simultaneous learners load the simulation sandbox at 8 PM before physics finals, causing 4-second render latency.',
      sustainability: 'Lunch return peak: 320 containers are returned to the Science Block drop bin within 20 minutes, threatening an overflow jam before the washing van arrives.',
      local_services: 'Tech repair backlog during semester project deadlines.',
      creative: 'Merchandise fulfillment surge during college annual festival.',
    },
    challengeTitle: {
      campus_meal: 'The 1:15 PM Lunch Rush Bottleneck',
      edtech: 'Concurrent User Latency Surge',
      sustainability: 'Drop-Bin Capacity & Turnaround Logistics',
      local_services: 'Service Backlog Dilemma',
      creative: 'Festival Print Deadline Pressure',
    },
    challengeDescription: {
      campus_meal: 'Accepting every order guarantees cold, delayed meals and student fury; turning orders away leaves revenue behind.',
      edtech: 'Overloaded servers risk crashing; scaling servers instantly burns reserve cash.',
      sustainability: 'Overfilled drop bins cause students to leave containers on the floor; dispatching extra runners costs money.',
      local_services: 'Subcontracting vs extending delivery deadlines.',
      creative: 'Overnight overtime printing vs prioritizing VIP pre-orders.',
    },
    decisionPrompt: {
      campus_meal: 'How will you resolve the lunch rush capacity bottleneck?',
      edtech: 'How will you manage the concurrent server load without crashing?',
      sustainability: 'How will you handle the drop-bin return surge?',
      local_services: 'How will you clear the repair backlog?',
      creative: 'How will you manage the festival merchandise rush?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-ops-cap',
          title: 'Cap Orders at Safe Limit & Open VIP Waitlist for Tomorrow',
          description: 'Fulfill exactly 160 meals to perfection; politely close orders and offer a 10% discount voucher for tomorrow.',
          benefitText: '100% on-time delivery, zero burnt food, protects brand integrity',
          riskText: 'Forgoes short-term revenue from 80 unfulfilled orders',
          cashEffect: 0,
          satisfactionEffect: +12,
          capacityEffect: +10,
          reputationEffect: +16,
          consequenceExplanation: 'All 160 students received piping hot meals exactly at 1:13 PM. The scarcity created even higher demand for tomorrow!',
          tradeoffSummary: 'Protecting quality and punctuality always beats chasing greedy volume that collapses your kitchen.',
        },
        {
          id: 'meal-ops-expand',
          title: 'Emergency Commercial Kitchen Burner Lease + 2 Student Runners',
          description: 'Spend ₹5,500 to activate a second prep counter and hire 2 student runners to clear the full 240-meal surge.',
          benefitText: 'Captures full ₹18,000 revenue from all 240 orders',
          riskText: 'Burns ₹5,500 cash; requires high coordination',
          cashEffect: -5500,
          satisfactionEffect: +14,
          capacityEffect: +50,
          reputationEffect: +15,
          consequenceExplanation: 'Your intern helped coordinate the runner dispatch seamlessly. You fulfilled all 240 meals on schedule!',
          tradeoffSummary: 'Decisive operational scaling funded from cash reserves converted a potential disaster into a triumphant milestone.',
        },
        {
          id: 'meal-ops-rush',
          title: 'Force Kitchen to Speed Up Without Extra Resources',
          description: 'Attempt to cook and pack all 240 meals with existing staff by cutting cooking and delivery buffer time.',
          costText: 'Zero financial investment',
          benefitText: 'Attempts to capture revenue without spending money',
          riskText: 'Under-cooked food, 35-minute delivery delays, runner accidents',
          cashEffect: 0,
          satisfactionEffect: -22,
          capacityEffect: -20,
          reputationEffect: -20,
          consequenceExplanation: 'Disaster: 45 meals reached classrooms 25 minutes late after lectures resumed. Food was lukewarm and students demanded refunds.',
          tradeoffSummary: 'Pushing operations beyond physical capacity without scaling resources is the quickest way to kill a startup.',
        },
      ],
      edtech: [
        {
          id: 'ed-ops-scale',
          title: 'Deploy Automated Cloud Server Auto-Scaling + Asset Compression',
          description: 'Compress simulation 3D vector meshes by 65% and fund auto-scaling server capacity for the 4-day exam window.',
          benefitText: 'Sub-second response time for all 1,500 concurrent learners',
          riskText: 'Costs ₹3,500 in cloud burst fees',
          cashEffect: -3500,
          satisfactionEffect: +18,
          capacityEffect: +50,
          reputationEffect: +18,
          consequenceExplanation: 'Simulations loaded instantly even on weak hostel Wi-Fi. Students shared screenshots praising app speed during finals.',
          tradeoffSummary: 'Technical optimization combined with elastic cloud capacity preserves user trust during high-stakes exams.',
        },
      ],
      sustainability: [
        {
          id: 'sust-ops-sweep',
          title: 'Scheduled Mid-Day Runner Sweeps to Campus Wash Center',
          description: 'Schedule a 1:35 PM runner sweep to empty full bins and transport containers directly to the commercial dishwashing unit.',
          benefitText: 'Bins never overflow; clean containers ready for dinner service',
          riskText: 'Runner logistics coordination required',
          cashEffect: -2000,
          satisfactionEffect: +16,
          capacityEffect: +35,
          reputationEffect: +18,
          consequenceExplanation: 'Bins remained clean and uncluttered. Containers were washed, sanitized, and restocked before dinner.',
          tradeoffSummary: 'Synchronized return logistics prevents container stockouts and keeps turnover high.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },

  // ─── Stage 9: Respond to Challenges & Ethics ────────────────────────────────
  {
    index: 9,
    id: 'business_challenge',
    stageName: 'Respond to Challenges',
    learningObjective: 'Navigate unexpected external shocks and ethical dilemmas under capital scarcity.',
    situation: {
      campus_meal: 'Severe supply shock: Wholesale vegetable and edible oil prices spike by 35% overnight due to unseasonal monsoon rains. At the same time, an aggressive rival launches cheap ₹49 oily meals outside Gate 2.',
      edtech: 'A commercial test-prep chain copies your simulation format and launches a free clone funded by aggressive predatory ads. Meanwhile, an advertiser offers ₹25,000 cash to buy your registered student phone numbers.',
      sustainability: 'A partner canteen threatens to back out of the circular program, complaining that sorting containers takes 5 extra minutes during lunch rush. Meanwhile, an uninspected plastic broker offers cheap disposable bowls.',
      local_services: 'Technician parts supplier delivers counterfeit batteries; decide whether to install or reject.',
      creative: 'Competitor copies your bestselling student graphics and sells inferior thin prints.',
    },
    challengeTitle: {
      campus_meal: 'The 35% Wholesale Inflation Shock & Price War',
      edtech: 'Competitor Imitation & Student Data Privacy Dilemma',
      sustainability: 'Partner Vendor Friction & Circular Integrity',
      local_services: 'Counterfeit Parts & Safety Ethics',
      creative: 'Copyright Infringement & Intellectual Property',
    },
    challengeDescription: {
      campus_meal: 'Absorbing the cost spike burns working capital; passing it to students risks backlash; compromising quality ruins reputation.',
      edtech: 'Compete on superior interactive depth vs engaging in a toxic ad war; strictly protect student data vs taking easy cash.',
      sustainability: 'Work patiently with partner vendors vs abandoning sustainability principles.',
      local_services: 'Reject counterfeit components and uphold customer safety.',
      creative: 'Defend creative intellectual property with trademark and authentic creator storytelling.',
    },
    decisionPrompt: {
      campus_meal: 'How will you respond to the 35% ingredient price shock?',
      edtech: 'How will you respond to the rival clone and the data purchase offer?',
      sustainability: 'How will you resolve vendor friction without sacrificing zero-waste goals?',
      local_services: 'How will you handle the counterfeit parts issue?',
      creative: 'How will you counter the cheap copycat merch?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-cr-smart-menu',
          title: 'Agile Menu Re-engineering + Transparent Student Letter',
          description: 'Re-engineer recipes around abundant root vegetables and seasonal legumes (cost increase held to +₹3) and publish an honest note to students.',
          costText: 'Spends ₹1,500 testing new recipes',
          benefitText: 'Preserves gross margin without hiking meal price to students',
          riskText: 'Requires kitchen creativity and menu changes',
          cashEffect: -1500,
          satisfactionEffect: +14,
          capacityEffect: +10,
          reputationEffect: +20,
          consequenceExplanation: 'Students deeply appreciated your transparency. Word spread that your venture refused to compromise on nutrition or overcharge.',
          tradeoffSummary: 'Menu agility and honest customer communication turns a supply crisis into a massive reputation boost.',
        },
        {
          id: 'meal-cr-absorb',
          title: 'Absorb Full Price Spike from Emergency Cash Buffer',
          description: 'Keep recipes and prices identical, funding the ₹6,000 monthly difference from your emergency reserve.',
          benefitText: 'Zero customer disruption',
          riskText: 'Shrinks cash runway by 3 full weeks',
          cashEffect: -6000,
          satisfactionEffect: +10,
          capacityEffect: 0,
          reputationEffect: +10,
          consequenceExplanation: 'Students stayed happy, but your cash runway shrank dangerously close to zero.',
          tradeoffSummary: 'Absorbing inflation protects short-term sales, but leaves zero buffer if another crisis hits.',
        },
      ],
      edtech: [
        {
          id: 'ed-cr-privacy',
          title: 'Reject Data Sale + Double Down on Pedagogical Depth',
          description: 'Publicly commit to zero ads and total student data privacy. Release 3 new advanced interactive modules that the cheap clone cannot copy.',
          benefitText: 'Attains official school council endorsement; builds unshakeable teacher trust',
          riskText: 'Forgoes ₹25,000 fast cash offer',
          cashEffect: 0,
          satisfactionEffect: +18,
          capacityEffect: +25,
          reputationEffect: +25,
          consequenceExplanation: 'School principals publicly applauded your ethical stance. Parents flocked to your platform because it was ad-free and safe.',
          tradeoffSummary: 'Protecting user trust and data privacy is the ultimate competitive moat for educational startups.',
        },
      ],
      sustainability: [
        {
          id: 'sust-cr-workflow',
          title: 'Provide Vendor Racks + Dedicated Student Sorting Assistant',
          description: 'Spend ₹3,000 on custom drop racks right next to the tray return and assign your intern for 20 minutes to streamline vendor workflow.',
          benefitText: 'Vendors experience zero extra work; strengthens commercial partnership',
          riskText: 'Costs ₹3,000 in custom rack hardware',
          cashEffect: -3000,
          satisfactionEffect: +16,
          capacityEffect: +30,
          reputationEffect: +20,
          consequenceExplanation: 'Vendor tension vanished. The canteen manager became your biggest advocate, urging other canteens to join the loop.',
          tradeoffSummary: 'Solving operational pain for your channel partners is essential for enterprise survival.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },

  // ─── Stage 10: Present the Venture (Investor & Capstone Pitch) ──────────────
  {
    index: 10,
    id: 'investor_arena',
    stageName: 'Present the Venture',
    learningObjective: 'Synthesize your business model, traction metrics, unit economics, and risk mitigation for investor evaluation.',
    situation: {
      campus_meal: 'You stand before the VentureLab Investment Committee. Your pitch deck highlights: 240+ daily meals served, ₹85 pricing with 35% gross margin, zero plastic waste, and 45-day runway.',
      edtech: 'Presenting to the Educational Innovation Panel: 420 active learners, 78% module completion rate, B2B school licensing contracts, and zero student churn.',
      sustainability: 'Presenting to the Campus Sustainability Grant Council: 15,480+ plastic boxes eliminated, 94% return compliance rate, and profitable wash unit economics.',
      local_services: 'Presenting local service marketplace metrics and unit economics.',
      creative: 'Presenting creator community traction and merchandise margins.',
    },
    challengeTitle: {
      campus_meal: 'The Capstone Pitch & Valuation Defense',
      edtech: 'The Institutional Investment Defense',
      sustainability: 'The Green Seed Grant Evaluation',
      local_services: 'Service Marketplace Pitch',
      creative: 'Creator Economy Pitch',
    },
    challengeDescription: {
      campus_meal: 'Defend your expansion strategy: scale into campus dinner subscriptions vs expand into neighbouring colleges.',
      edtech: 'Defend your expansion: add Classes 9-10 science modules vs partner with 10 more schools.',
      sustainability: 'Defend scaling: expand into reusable drink cups vs deploy to corporate business parks.',
      local_services: 'Defend campus density vs geographic expansion.',
      creative: 'Defend curated artist drops vs open self-service marketplace.',
    },
    decisionPrompt: {
      campus_meal: 'What is your core strategic focus for your seed funding ask?',
      edtech: 'What will your next milestone be with investment capital?',
      sustainability: 'What is your expansion thesis for the sustainability grant?',
      local_services: 'What is your growth roadmap?',
      creative: 'What is your scaling strategy?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-pitch-expansion',
          title: 'Deepen Campus Monopolization: Launch Dinner & Evening Snacks',
          description: 'Leverage your existing kitchen, lockers, and customer base to provide dinner passes to the same 4,500 hostellers.',
          benefitText: 'Doubles revenue per customer with zero additional marketing acquisition cost',
          riskText: 'Requires evening kitchen prep shift',
          cashEffect: +40000,
          satisfactionEffect: +16,
          capacityEffect: +40,
          reputationEffect: +20,
          consequenceExplanation: 'The investment panel awarded full marks for capital efficiency. LTV doubled while CAC remained flat.',
          tradeoffSummary: 'Expanding wallet-share with existing loyal customers is much less risky than launching into unknown campuses.',
        },
      ],
      edtech: [
        {
          id: 'ed-pitch-institutional',
          title: 'Institutional School Network Expansion (12 Regional Schools)',
          description: 'Use seed capital to hire 2 curriculum coordinators and expand the B2B school platform across 12 affiliated secondary schools.',
          benefitText: 'Secures ₹7,20,000 in predictable annual recurring school contracts',
          riskText: 'Requires managing 12 institutional relationships',
          cashEffect: +50000,
          satisfactionEffect: +18,
          capacityEffect: +50,
          reputationEffect: +25,
          consequenceExplanation: 'Judges awarded top honors: proven B2B sales traction and high pedagogical integrity.',
          tradeoffSummary: 'Sustainable recurring institutional revenue beats unpredictable consumer churn every single time.',
        },
      ],
      sustainability: [
        {
          id: 'sust-pitch-district',
          title: 'Expand into District University Campuses & Smart Cups',
          description: 'Deploy circular container hubs across 4 neighboring college campuses and introduce reusable hot coffee cups.',
          benefitText: 'Eliminates 60,000+ plastic items monthly across the district',
          riskText: 'Requires centralized commercial sanitization facility',
          cashEffect: +45000,
          satisfactionEffect: +20,
          capacityEffect: +45,
          reputationEffect: +25,
          consequenceExplanation: 'The Green Council awarded your startup the ₹1,00,000 campus environmental leadership grant!',
          tradeoffSummary: 'Proven circular unit economics at one campus creates a replicable blueprint for entire cities.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },

  // ─── Stage 11: Reflect on Decisions (Capstone Review & Journal) ─────────────
  {
    index: 11,
    id: 'reflection_review',
    stageName: 'Reflect on Decisions',
    learningObjective: 'Examine your complete decision history, assess unintended consequences, and articulate key entrepreneurial learnings.',
    situation: {
      campus_meal: 'Your simulated startup has completed its operating journey! Review your decision journal, financial ledger, intern contributions, and final capstone performance.',
      edtech: 'Your EdTech venture has completed its semester cycle! Review student learning outcomes, teacher feedback, and unit economics.',
      sustainability: 'Your circular venture has completed its pilot! Review container circulation metrics, vendor relationships, and plastic waste avoided.',
      local_services: 'Review your marketplace metrics and customer ratings.',
      creative: 'Review your merchandise sales and artist royalties.',
    },
    challengeTitle: {
      campus_meal: 'The Founder Capstone Audit',
      edtech: 'The Educational Impact Review',
      sustainability: 'The Circular Ecosystem Audit',
      local_services: 'Service Review',
      creative: 'Creator Review',
    },
    challengeDescription: {
      campus_meal: 'Review all 10 stages: what was your most consequential decision? Where did you face the sharpest trade-off?',
      edtech: 'Review how pedagogy, software speed, and school partnerships interacted.',
      sustainability: 'Review how vendor incentives, student convenience, and durable materials aligned.',
      local_services: 'Review your operational tradeoffs.',
      creative: 'Review your product margins.',
    },
    decisionPrompt: {
      campus_meal: 'What is your defining entrepreneurial takeaway from this simulation?',
      edtech: 'What did this venture teach you about building educational products?',
      sustainability: 'What was your key insight regarding environmental business models?',
      local_services: 'What is your key takeaway?',
      creative: 'What did you learn?',
    },
    options: {
      campus_meal: [
        {
          id: 'meal-ref-takeaway',
          title: 'Honest Value & Operational Punctuality Beat Flashy Marketing',
          description: 'A sustainable business requires solving real daily pain, keeping financial promises, and aligning operations with customer trust.',
          benefitText: 'Completes graduation portfolio with honors',
          riskText: 'None — reflective capstone milestone',
          cashEffect: 0,
          satisfactionEffect: +10,
          capacityEffect: 0,
          reputationEffect: +10,
          consequenceExplanation: 'Congratulations! You have completed the VentureLab Entrepreneurship Simulation with full honors.',
          tradeoffSummary: 'True entrepreneurship is not about chasing hype; it is about disciplined execution, ethical choices, and customer respect.',
        },
      ],
      edtech: [
        {
          id: 'ed-ref-takeaway',
          title: 'Pedagogical Integrity & Authentic Engagement Build True Moats',
          description: 'Visual problem solving and educator partnerships created a trusted platform that competitors could not easily displace.',
          benefitText: 'Completes graduation portfolio with honors',
          riskText: 'None',
          cashEffect: 0,
          satisfactionEffect: +10,
          capacityEffect: 0,
          reputationEffect: +10,
          consequenceExplanation: 'Congratulations! You have built a credible, pedagogically sound educational enterprise.',
          tradeoffSummary: 'Focusing on real conceptual mastery instead of gamified shortcuts creates lasting educational value.',
        },
      ],
      sustainability: [
        {
          id: 'sust-ref-takeaway',
          title: 'Circularity Succeeds When Convenience & Economics Align',
          description: 'Environmental initiatives fail if they rely solely on goodwill. They succeed when made effortless and cost-effective for everyday users.',
          benefitText: 'Completes graduation portfolio with honors',
          riskText: 'None',
          cashEffect: 0,
          satisfactionEffect: +10,
          capacityEffect: 0,
          reputationEffect: +10,
          consequenceExplanation: 'Congratulations! You proved that environmental stewardship and business profitability can reinforce each other.',
          tradeoffSummary: 'Sustainable design must eliminate customer friction and provide economic incentives to achieve massive scale.',
        },
      ],
      local_services: [],
      creative: [],
    },
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export const SimulationWorkspace2D: React.FC<SimulationWorkspace2DProps> = ({
  state,
  setState,
  onExit,
  onReset,
  onOpenJournal,
  onOpenAssumptions,
  onToggleMentor,
  onOpenReport,
  onOpenInternHiring,
}) => {
  const scenarioId = state.founder?.scenarioId || 'campus_meal';
  const activeScenario = ALL_SCENARIOS[scenarioId] || ALL_SCENARIOS.campus_meal;

  // Track active stage index (1-11)
  const [currentStageIndex, setCurrentStageIndex] = useState(() => {
    // Map current location to stage index
    const found = STAGES.find((s) => s.id === state.currentLocation);
    return found ? found.index : 1;
  });

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [studentReasoning, setStudentReasoning] = useState('');
  const [isDecisionConfirmed, setIsDecisionConfirmed] = useState(false);
  const [lastConsequenceNote, setLastConsequenceNote] = useState<string | null>(null);
  const [statusStripExpanded, setStatusStripExpanded] = useState(true);

  const currentStage = STAGES.find((s) => s.index === currentStageIndex) || STAGES[0];
  
  // Safe options for current stage & scenario
  const availableOptions = (currentStage.options[scenarioId] && currentStage.options[scenarioId].length > 0)
    ? currentStage.options[scenarioId]
    : (currentStage.options.campus_meal || []);

  const selectedOption = availableOptions.find((o) => o.id === selectedOptionId) || null;

  // Progress calculations
  const completedStagesCount = Math.min(11, state.completedLocations.length);
  const overallProgressPercent = Math.round((currentStageIndex / 11) * 100);

  // Derived financial metrics
  const simResults = calculateSimulationResults(state);
  const availableBudget = state.budget.productDevelopment + 
    state.budget.marketing + 
    state.budget.operations + 
    state.budget.customerSupport + 
    state.budget.emergencyReserve;

  // Handle stage jump
  const handleSelectStage = (stageIdx: number) => {
    setCurrentStageIndex(stageIdx);
    const targetStage = STAGES.find((s) => s.index === stageIdx);
    if (targetStage) {
      setState((prev) => ({
        ...prev,
        currentLocation: targetStage.id,
      }));
    }
    setSelectedOptionId(null);
    setIsDecisionConfirmed(false);
    setLastConsequenceNote(null);
    setStudentReasoning('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Confirm Decision
  const handleConfirmDecision = () => {
    if (!selectedOption) return;

    // Apply simulation rules
    setState((prev) => {
      // Intern effects: Aarav gives +25% capacity; Riya gives +25% satisfaction/reach; Kabir saves budget
      let effectiveCapacity = selectedOption.capacityEffect;
      let effectiveSatisfaction = selectedOption.satisfactionEffect;
      if (prev.internHired?.id === 'aarav') {
        effectiveCapacity = Math.round(effectiveCapacity * 1.25);
      } else if (prev.internHired?.id === 'riya') {
        effectiveSatisfaction = Math.round(effectiveSatisfaction * 1.25);
      }

      // Record in decision journal
      const newEntry: DecisionJournalEntry = {
        id: `journal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        location: currentStage.id,
        locationName: currentStage.stageName,
        decision: selectedOption.title,
        consequence: selectedOption.consequenceExplanation,
        tradeoff: selectedOption.tradeoffSummary,
        reflection: studentReasoning.trim() || undefined,
      };

      // Mark location as completed
      const updatedCompleted = prev.completedLocations.includes(currentStage.id)
        ? prev.completedLocations
        : [...prev.completedLocations, currentStage.id];

      // Update budget
      const updatedBudget = {
        ...prev.budget,
        operations: Math.max(0, prev.budget.operations + (selectedOption.cashEffect < 0 ? selectedOption.cashEffect : 0)),
      };

      return {
        ...prev,
        budget: updatedBudget,
        businessReputation: Math.min(100, Math.max(0, prev.businessReputation + selectedOption.reputationEffect)),
        completedLocations: updatedCompleted,
        decisionJournal: [...prev.decisionJournal, newEntry],
      };
    });

    setIsDecisionConfirmed(true);
    setLastConsequenceNote(selectedOption.consequenceExplanation);

    // If Stage 4 (Design Solution) just completed, trigger intern hiring
    if (currentStage.index === 4 && !state.internHiringComplete) {
      setTimeout(() => {
        onOpenInternHiring();
      }, 700);
    }
  };

  // Continue to Next Stage
  const handleNextStage = () => {
    if (currentStageIndex < 11) {
      handleSelectStage(currentStageIndex + 1);
    } else {
      onOpenReport();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F3EA] text-[#22251F] min-h-screen text-left">
      
      {/* ─── 1. COMPACT TOP NAVIGATION ───────────────────────────────────────── */}
      <header className="bg-[#FFFFFF] border-b border-[#D9D5C9] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark & Venture Name */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onExit}
              className="flex items-center gap-2 text-left group cursor-pointer"
              title="Return to Main Overview"
            >
              <div className="w-8 h-8 rounded-lg bg-[#234B3A] text-[#F6F3EA] flex items-center justify-center font-bold text-sm">
                VL
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold tracking-tight text-sm text-[#22251F] block leading-none">
                  VENTURELAB
                </span>
                <span className="text-[10px] text-[#7E8078] font-mono">
                  2D Business Lab
                </span>
              </div>
            </button>

            <div className="h-5 w-px bg-[#D9D5C9] hidden sm:block" />

            <div className="truncate">
              <span className="text-xs font-bold text-[#22251F] truncate block">
                {state.founder?.ventureName || 'My Startup Venture'}
              </span>
              <span className="text-[10px] text-[#575952] truncate block">
                {activeScenario.title} &bull; Stage {currentStage.index} of 11
              </span>
            </div>
          </div>

          {/* Center: Stage Progress Tracker (Hidden on smallest mobile) */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-40 bg-[#D9D5C9] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#234B3A] h-full transition-all duration-300"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#234B3A]">
              {overallProgressPercent}%
            </span>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Decision Journal Button */}
            <button
              onClick={onOpenJournal}
              className="btn-outline text-xs py-1.5 px-2.5 flex items-center gap-1.5"
              title="Open Student Decision Journal"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#234B3A]" />
              <span className="hidden lg:inline">Journal</span>
              {state.decisionJournal.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#234B3A] text-[#F6F3EA] text-[9px] font-mono flex items-center justify-center">
                  {state.decisionJournal.length}
                </span>
              )}
            </button>

            {/* Business Mentor Drawer Toggle */}
            <button
              onClick={onToggleMentor}
              className="btn-outline text-xs py-1.5 px-2.5 flex items-center gap-1.5"
              title="Consult Business Mentor"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#B9684D]" />
              <span className="hidden lg:inline">Mentor</span>
            </button>

            {/* Assumptions Button */}
            <button
              onClick={onOpenAssumptions}
              className="btn-outline text-xs py-1.5 px-2 hidden sm:flex items-center gap-1 text-[#575952]"
              title="Transparent Assumptions & Formulas"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Assumptions</span>
            </button>

            {/* Save & Exit Control */}
            <button
              onClick={onExit}
              className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
              title="Save Progress and Exit"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save &amp; Exit</span>
            </button>
          </div>

        </div>

        {/* ─── Stage Stepper Strip ────────────────────────────────────────── */}
        <div className="border-t border-[#D9D5C9] bg-[#F6F3EA] px-4 sm:px-6 py-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {STAGES.map((stg) => {
              const isCurrent = stg.index === currentStageIndex;
              const isDone = state.completedLocations.includes(stg.id);

              return (
                <button
                  key={stg.index}
                  onClick={() => handleSelectStage(stg.index)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#234B3A] text-[#F6F3EA] shadow-xs'
                      : isDone
                      ? 'bg-[#E8F0EC] text-[#234B3A] border border-[#C4D9CD] hover:bg-[#D9E6DF]'
                      : 'bg-[#FFFFFF] text-[#575952] border border-[#D9D5C9] hover:bg-[#F0EDE4]'
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold">
                    {stg.index < 10 ? `0${stg.index}` : stg.index}
                  </span>
                  <span className="truncate max-w-[110px]">{stg.stageName}</span>
                  {isDone && <CheckCircle2 className="w-3 h-3 text-[#234B3A] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ─── 2. MAIN TWO-COLUMN WORKSPACE ────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ─── LEFT COLUMN: CURRENT BUSINESS SITUATION ────────────────────── */}
          <section className="lg:col-span-6 space-y-5">
            
            {/* Stage Title & Learning Objective Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E8F0EC] border border-[#C4D9CD] text-[10px] font-mono font-bold uppercase tracking-wider text-[#234B3A]">
                <span>STAGE {currentStage.index < 10 ? `0${currentStage.index}` : currentStage.index} // 11</span>
                <span>&bull;</span>
                <span>{currentStage.stageName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#22251F] tracking-tight">
                {currentStage.stageName}
              </h1>
              <p className="text-xs sm:text-sm text-[#575952] leading-relaxed">
                {currentStage.situation[scenarioId] || currentStage.situation.campus_meal}
              </p>
            </div>

            {/* Contextual Flat 2D Vector Illustration (Tailored to Scenario & Stage) */}
            <div className="card-clean overflow-hidden">
              <ScenarioIllustration
                scenarioId={scenarioId}
                stageId={currentStage.id}
              />
            </div>

            {/* Business Challenge Callout Box (Cinnamon Wood Accent) */}
            <div className="p-4 rounded-xl bg-[#F8EFEA] border-l-4 border-l-[#B9684D] border border-[#E5C3B6] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B9684D] font-mono">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>The Core Challenge: {currentStage.challengeTitle[scenarioId] || currentStage.challengeTitle.campus_meal}</span>
              </div>
              <p className="text-xs text-[#22251F] leading-relaxed">
                {currentStage.challengeDescription[scenarioId] || currentStage.challengeDescription.campus_meal}
              </p>
            </div>

            {/* Venture Context Strip */}
            <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D9D5C9] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Founder</span>
                <span className="font-semibold text-[#22251F] truncate block">
                  {state.founder?.displayName || 'Student Founder'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Category</span>
                <span className="font-semibold text-[#22251F] truncate block">
                  {activeScenario.category}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Active Intern</span>
                <span className="font-semibold text-[#234B3A] truncate block">
                  {state.internHired ? `${state.internHired.name.split(' ')[0]} (${state.internHired.roleTitle})` : (
                    currentStage.index <= 4 ? 'Recruiting at Stage 4' : 'Operating Solo'
                  )}
                </span>
              </div>
            </div>

            {/* Pedagogical Learning Objective Card */}
            <div className="p-3.5 rounded-xl bg-[#F0EDE4] border border-[#D9D5C9] text-xs space-y-1 text-[#575952]">
              <div className="font-bold text-[#22251F] flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#234B3A]" />
                Learning Objective
              </div>
              <p>{currentStage.learningObjective}</p>
            </div>

          </section>

          {/* ─── RIGHT COLUMN: DECISION PANEL ───────────────────────────────── */}
          <section className="lg:col-span-6 space-y-5">
            
            <div className="card-clean p-5 sm:p-6 space-y-5">
              
              {/* Decision Prompt Header */}
              <div className="space-y-1 border-b border-[#D9D5C9] pb-4">
                <span className="text-[10px] font-mono uppercase font-bold text-[#B9684D] tracking-wider block">
                  DECISION REQUIRED
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#22251F]">
                  {currentStage.decisionPrompt[scenarioId] || currentStage.decisionPrompt.campus_meal}
                </h2>
                <p className="text-xs text-[#575952]">
                  Carefully evaluate the cost, benefit, and trade-off of each path. Decisions have deterministic outcomes in the simulation.
                </p>
              </div>

              {/* Differentiated Options (2 to 4 choices) */}
              <div className="space-y-3">
                {availableOptions.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        if (!isDecisionConfirmed) {
                          setSelectedOptionId(opt.id);
                        }
                      }}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-[#234B3A] bg-[#E8F0EC]/40 shadow-xs'
                          : 'border-[#D9D5C9] hover:border-[#B8B3A4] bg-[#FFFFFF]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="font-bold text-sm text-[#22251F] leading-snug">
                          {opt.title}
                        </h3>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-[#234B3A] bg-[#234B3A] text-[#F6F3EA]' : 'border-[#D9D5C9]'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <p className="text-xs text-[#575952] mb-3 leading-relaxed">
                        {opt.description}
                      </p>

                      {/* Trade-off Tags */}
                      <div className="pt-2.5 border-t border-[#D9D5C9] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="text-[#234B3A]">
                          <strong>Benefit:</strong> {opt.benefitText}
                        </div>
                        <div className="text-[#B9684D]">
                          <strong>Risk/Trade-off:</strong> {opt.riskText}
                        </div>
                      </div>

                      {opt.costText && (
                        <div className="mt-2 text-[10px] font-mono text-[#575952]">
                          Cost constraint: {opt.costText}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Student Reasoning Input (Optional Reflection) */}
              {!isDecisionConfirmed && (
                <div className="space-y-1.5 pt-2 border-t border-[#D9D5C9]">
                  <label className="text-xs font-semibold text-[#22251F] flex items-center justify-between">
                    <span>Why did you choose this option? (Brief reflection)</span>
                    <span className="text-[10px] text-[#7E8078] font-normal">Optional</span>
                  </label>
                  <input
                    type="text"
                    value={studentReasoning}
                    onChange={(e) => setStudentReasoning(e.target.value)}
                    placeholder="e.g. Prioritizing punctuality builds long-term customer trust over cheap price cuts..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9D5C9] bg-[#F6F3EA] text-[#22251F] focus:outline-none focus:border-[#234B3A] focus:bg-[#FFFFFF]"
                  />
                </div>
              )}

              {/* Confirmed Outcome Feedback Banner */}
              {isDecisionConfirmed && lastConsequenceNote && (
                <div className="p-4 rounded-xl bg-[#E8F0EC] border border-[#C4D9CD] space-y-2 animate-fade-in">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#234B3A] uppercase font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Decision Applied &bull; Simulated Outcome</span>
                  </div>
                  <p className="text-xs text-[#22251F] leading-relaxed">
                    {lastConsequenceNote}
                  </p>
                  <div className="text-[11px] text-[#575952] pt-1 border-t border-[#C4D9CD]">
                    Recorded in your Decision Journal. Metric balances updated in bottom status ledger.
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#D9D5C9]">
                <button
                  onClick={onReset}
                  className="text-xs text-[#7E8078] hover:text-[#B9684D] flex items-center gap-1 cursor-pointer"
                  title="Restart simulation from Stage 1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset Simulation</span>
                </button>

                {!isDecisionConfirmed ? (
                  <button
                    onClick={handleConfirmDecision}
                    disabled={!selectedOptionId}
                    className="btn-primary text-xs"
                  >
                    <span>Confirm Decision &amp; Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNextStage}
                    className="btn-primary text-xs"
                  >
                    <span>
                      {currentStageIndex < 11 
                        ? `Continue to Stage ${currentStageIndex + 1}` 
                        : 'View Final Capstone Report'
                      }
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

          </section>

        </div>
      </main>

      {/* ─── 3. COMPACT BUSINESS STATUS STRIP (BOTTOM SECTION) ────────────────── */}
      <footer className="bg-[#FFFFFF] border-t border-[#D9D5C9] sticky bottom-0 z-30 shadow-md">
        
        {/* Toggle bar for mobile / collapsible viewports */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between text-[11px] text-[#575952] border-b border-[#D9D5C9]/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#234B3A]" />
            <span className="font-semibold text-[#22251F]">Live Simulation Health</span>
            <span className="text-[#7E8078] hidden sm:inline">&bull; Real-time deterministic telemetry</span>
          </div>

          <button
            onClick={() => setStatusStripExpanded(!statusStripExpanded)}
            className="flex items-center gap-1 text-[11px] text-[#234B3A] hover:underline cursor-pointer font-medium"
          >
            <span>{statusStripExpanded ? 'Collapse Metrics' : 'Expand Metrics'}</span>
            {statusStripExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>

        {/* Live Metrics Strip */}
        {statusStripExpanded && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
            
            {/* 1. Cash Remaining */}
            <div className="p-2 rounded-lg bg-[#F6F3EA] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Available Budget</span>
              <span className="text-sm font-bold font-mono text-[#22251F]">
                ₹{availableBudget.toLocaleString('en-IN')}
              </span>
            </div>

            {/* 2. Customer Satisfaction */}
            <div className="p-2 rounded-lg bg-[#F6F3EA] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Customer Satisfaction</span>
              <span className="text-sm font-bold font-mono text-[#234B3A]">
                {simResults.customerSatisfaction}%
              </span>
            </div>

            {/* 3. Operational Capacity */}
            <div className="p-2 rounded-lg bg-[#F6F3EA] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Operational Capacity</span>
              <span className="text-sm font-bold font-mono text-[#22251F]">
                {simResults.dailyCapacity} units/day
              </span>
            </div>

            {/* 4. Business Reputation */}
            <div className="p-2 rounded-lg bg-[#F6F3EA] border border-[#D9D5C9]">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Reputation Score</span>
              <span className="text-sm font-bold font-mono text-[#234B3A]">
                {state.businessReputation} / 100
              </span>
            </div>

            {/* 5. Selected Intern Status */}
            <div className="p-2 rounded-lg bg-[#F6F3EA] border border-[#D9D5C9] col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#7E8078] font-mono uppercase block">First Intern</span>
              <span className="text-xs font-semibold text-[#22251F] truncate block">
                {state.internHired ? (
                  <span className="text-[#234B3A]">{state.internHired.name.split(' ')[0]} ({state.internHired.roleTitle.split(' ')[0]})</span>
                ) : (
                  <span className="text-[#7E8078]">Unassigned</span>
                )}
              </span>
            </div>

            {/* 6. Quick Journal Link */}
            <div className="p-2 rounded-lg bg-[#F6F3EA] border border-[#D9D5C9] hidden lg:flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#7E8078] font-mono uppercase block">Decisions Logged</span>
                <span className="text-xs font-bold font-mono text-[#22251F]">
                  {state.decisionJournal.length} Records
                </span>
              </div>
              <button
                onClick={onOpenJournal}
                className="text-xs text-[#234B3A] hover:underline cursor-pointer font-medium"
              >
                View
              </button>
            </div>

          </div>
        )}

      </footer>

    </div>
  );
};
