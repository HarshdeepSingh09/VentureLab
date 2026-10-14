import React, { useState } from 'react';
import { 
  AlertCircle, Sparkles, CheckCircle2, ChevronRight, Target
} from 'lucide-react';


interface Props {
  stageId: string;
}

export const JourneyInteractivePreview: React.FC<Props> = ({ stageId }) => {
  // Stage 1 State: Problem Selection
  const [selectedProblem, setSelectedProblem] = useState<number>(0);
  const problems = [
    {
      id: 0,
      title: 'Hostel Lunch Bottleneck',
      urgency: 'Critical',
      frequency: 'Daily (Mon-Sat)',
      willingnessToPay: 'High (₹70–₹110/meal)',
      description: 'Hostel mess food is perceived as unhygienic and monotonous; 35-minute recess between lectures makes traveling outside campus impossible.',
      sampleQuote: '"By 1:15 PM the cafeteria line is 40 people deep. If I leave campus, I miss my 2:00 PM lab."',
      quoteAuthor: 'Pooja S., 3rd Year B.Tech Student',
      validationScore: 92,
    },
    {
      id: 1,
      title: 'Late-Night Exam Nutrition',
      urgency: 'Moderate-High',
      frequency: 'Exam Weeks (Seasonal)',
      willingnessToPay: 'Moderate (₹50–₹90)',
      description: 'Students rely on sodium-heavy instant noodles during exam revisions; library gates close at 11:30 PM with zero nutritious options.',
      sampleQuote: '"During midterms, we just eat chips or stale sandwiches. Everyone complains of fatigue."',
      quoteAuthor: 'Arjun M., 2nd Year Commerce Student',
      validationScore: 78,
    },
    {
      id: 2,
      title: 'Weekend Laundry Delays',
      urgency: 'Low-Medium',
      frequency: 'Weekly',
      willingnessToPay: 'Low (₹20–₹40/kg)',
      description: 'Local dhobi turnaround takes 4–5 days, but most students have already adapted to washing basics in dorm sinks.',
      sampleQuote: '"It is inconvenient, but not painful enough to spend ₹500 a month on an app."',
      quoteAuthor: 'Dev K., 1st Year Science Student',
      validationScore: 54,
    },
  ];

  // Stage 2 State: Solution Selection
  const [selectedSolution, setSelectedSolution] = useState<number>(0);
  const solutions = [
    {
      id: 0,
      name: 'Curated Tiffin Subscription ("CampusDabba")',
      model: 'Pre-ordered recurring lunch box',
      tagline: 'Fresh home-style meals dropped at hostel security points by 12:45 PM.',
      personaFeedback: [
        {
          persona: 'Budget-Conscious Hosteller',
          sentiment: 'Positive',
          comment: 'Pre-paying ₹1,900 a month relieves daily lunch stress completely.',
        },
        {
          persona: 'College Administration',
          sentiment: 'Neutral / Cautious',
          comment: 'Deliveries must be organized cleanly at campus gates without crowd congestion.',
        },
      ],
      pros: 'Predictable recurring volume; zero daily order churn.',
      risk: 'Requires tight culinary partner consistency.',
    },
    {
      id: 1,
      name: 'Local Home-Cook Aggregator Platform',
      model: 'Marketplace platform connecting hostellers to neighbourhood aunties',
      tagline: 'Browse home kitchens within 2km with daily changing menus.',
      personaFeedback: [
        {
          persona: 'Food Enthusiast Student',
          sentiment: 'High Excitement',
          comment: 'Love the variety of authentic regional meals!',
        },
        {
          persona: 'Operations Mentor',
          sentiment: 'Caution',
          comment: 'Regulating food safety across 15 separate domestic kitchens is very hard for a student team.',
        },
      ],
      pros: 'High perceived food authenticity and menu variety.',
      risk: 'Complex hygiene audits & fragmented pickup points.',
    },
    {
      id: 2,
      name: 'Campus Canteen Express Pre-Order App',
      model: 'Digital skip-the-line queuing app for existing campus food vendors',
      tagline: 'Order 20 minutes before class ends, pickup with QR code.',
      personaFeedback: [
        {
          persona: 'Day Scholar',
          sentiment: 'Positive',
          comment: 'Saves 25 minutes of standing in chaotic canteen lines.',
        },
        {
          persona: 'Cafeteria Contractor',
          sentiment: 'Skeptical',
          comment: 'Staff struggle to handle kitchen tickets during peak rush without tablets.',
        },
      ],
      pros: 'Zero food preparation liabilities or kitchen rentals.',
      risk: 'Low transaction commissions (5–8%) limit total margins.',
    },
  ];

  // Stage 3 State: Pricing Model
  const [pricingPlan, setPricingPlan] = useState<'monthly' | 'weekly' | 'ondemand'>('monthly');
  const pricingData = {
    monthly: {
      pricePerMeal: 89,
      unitCost: 58,
      margin: 34.8,
      estimatedVolume: '320 Active Subscribers',
      monthlyRevenue: '₹6,83,520',
      predictability: 'High (Prepaid cash flow upfront)',
      risk: 'Higher initial barrier for student budget sign-ups.',
    },
    weekly: {
      pricePerMeal: 99,
      unitCost: 61,
      margin: 38.3,
      estimatedVolume: '240 Weekly Pass Holders',
      monthlyRevenue: '₹4,75,200',
      predictability: 'Medium (Weekly renewal drop-offs)',
      risk: 'Requires constant mid-week promotional re-engagement.',
    },
    ondemand: {
      pricePerMeal: 129,
      unitCost: 68,
      margin: 47.2,
      estimatedVolume: '110 Irregular Daily Orders',
      monthlyRevenue: '₹3,40,560',
      predictability: 'Low (Severe demand spikes and kitchen wastage)',
      risk: 'High food spoilage during rainy or exam-free days.',
    },
  };

  // Stage 4 State: Mini Budget Preview
  const [sampleBudget, setSampleBudget] = useState({
    product: 25000,
    marketing: 20000,
    operations: 35000,
    support: 10000,
    reserve: 10000,
  });

  const updateStage4Budget = (key: keyof typeof sampleBudget, val: number) => {
    setSampleBudget(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  const stage4Total = Object.values(sampleBudget).reduce((a, b) => a + b, 0);

  // Stage 5 State: Challenge Response
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<number | null>(null);
  const challengeResponses = [
    {
      id: 0,
      title: 'Match Price: Slash to ₹49 to protect market volume',
      tagline: 'Defend user numbers at the expense of profit',
      outcomeType: 'High Cash Drain',
      consequence:
        'You defend your student headcount, but every meal sold incurs a ₹12 net loss. Within 22 days, your working capital is drained by ₹58,000, forcing emergency budget cuts in packaging.',
      learningHighlight: 'Price wars without structural cost advantages quickly bankrupt young ventures.',
    },
    {
      id: 1,
      title: 'Value Defense: Introduce Insulated Thermal Bento & Guaranteed Punctuality',
      tagline: 'Differentiate on quality, reliability, and hygiene',
      outcomeType: 'Strategic Win with Margin Discipline',
      consequence:
        'You lose 14% of price-sensitive one-off buyers, but 86% of monthly subscribers stay because the competitor’s ₹49 food arrives lukewarm and late. Your unit margin remains healthy.',
      learningHighlight: 'Customer retention often hinges on dependability rather than bottom-dollar discounting.',
    },
    {
      id: 2,
      title: 'Partner Bundle: Collaborate with Campus Library & Coffee Kiosks',
      tagline: 'Expand the perceived value without lowering ticket size',
      outcomeType: 'Creative Non-Zero-Sum Pivot',
      consequence:
        'Subscribers receive free filtered cold coffee vouchers sponsored by the campus café. Acquisition costs drop 30% while maintaining meal price at ₹89.',
      learningHighlight: 'Distribution partnerships can unlock asymmetric competitive moats.',
    },
  ];

  // Stage 6 State: Pitch Deck Slide
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const pitchSlides = [
    {
      number: '01 / 07',
      title: 'The Problem Statement',
      category: 'Market Need',
      summary: '1,400+ campus hostellers have only a 35-minute recess window. 74% report skipping lunch or settling for stale roadside snacks.',
      metrics: ['35 min recess constraint', '74% dissatisfaction rate', '₹2,400 monthly student spend'],
    },
    {
      number: '02 / 07',
      title: 'The Solution: CampusDabba',
      category: 'Value Proposition',
      summary: 'Pre-ordered, hot, home-cooked lunch subscriptions dropped in designated campus smart lockers at exactly 1:00 PM.',
      metrics: ['Zero queue wait-time', '100% compostable packaging', '3 regional menu rotations'],
    },
    {
      number: '03 / 07',
      title: 'Target Customer Segments',
      category: 'Customer Discovery',
      summary: 'Primary: 1st & 2nd Year On-Campus Hostellers without cooking amenities. Secondary: Faculty & administrative staff.',
      metrics: ['TAM: 4,800 students', 'Initial Beachhead: 350 hostellers', '84% repeat intent'],
    },
    {
      number: '04 / 07',
      title: 'Unit Economics & Revenue Model',
      category: 'Financial Model',
      summary: 'Monthly prepaid subscriptions at ₹89/meal (₹2,136/month). Direct meal prep cost: ₹54, logistics & packaging: ₹9. Contribution margin: 29.2%.',
      metrics: ['₹89 price / meal', '29.2% gross margin', 'Prepaid cash cycle (Negative CCC)'],
    },
    {
      number: '05 / 07',
      title: 'Capital Allocation & Runway',
      category: 'Resource Management',
      summary: 'Simulated ₹1,00,000 initial allocation: 35% operations & insulated containers, 25% tech/ordering portal, 20% marketing, 10% support, 10% reserve.',
      metrics: ['4-month operational runway', 'Break-even at 185 daily meals', '₹10,000 contingency buffer'],
    },
    {
      number: '06 / 07',
      title: 'Navigating Key Challenges',
      category: 'Risk & Adaptation',
      summary: 'Responded to rival price-cutting by doubling down on thermal insulation and strict 12:45 PM delivery SLA rather than margin-destroying discounts.',
      metrics: ['88% subscriber retention', 'Zero food contamination incidents', '3.8/5.0 CSAT benchmark'],
    },
    {
      number: '07 / 07',
      title: 'Future Scaling & Institutional Vision',
      category: 'Milestones & Growth',
      summary: 'Phase 2 expansion to adjoining medical college campus and introduction of evening healthy snack bundles with local cloud kitchens.',
      metrics: ['2nd campus expansion in Q3', 'Projected 650 active subscribers', 'Target ₹14L annual ARR'],
    },
  ];

  return (
    <div className="w-full">
      {/* STAGE 01 PREVIEW */}
      {stageId === 'stage-1' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <p className="text-xs uppercase tracking-wider font-semibold text-cyan-400">
                Interactive Problem Investigation
              </p>
            </div>
            <span className="text-xs text-slate-400">Click a card to evaluate viability</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {problems.map((prob) => {
              const isSelected = selectedProblem === prob.id;
              return (
                <button
                  key={prob.id}
                  onClick={() => setSelectedProblem(prob.id)}
                  className={`p-3.5 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Problem #{prob.id + 1}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        prob.urgency === 'Critical'
                          ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                          : prob.urgency.includes('High')
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {prob.urgency}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-slate-100 mb-1">{prob.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{prob.description}</p>
                </button>
              );
            })}
          </div>

          {/* Active Problem Deep-Dive Display */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mt-3">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <h5 className="text-sm font-semibold text-slate-200">
                  {problems[selectedProblem].title} — Field Observation
                </h5>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Opportunity Viability Score:</span>
                <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50">
                  {problems[selectedProblem].validationScore} / 100
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="text-slate-400 block mb-0.5">Frequency of Pain:</span>
                <span className="text-slate-200 font-medium">{problems[selectedProblem].frequency}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60">
                <span className="text-slate-400 block mb-0.5">Willingness to Pay:</span>
                <span className="text-emerald-400 font-medium">{problems[selectedProblem].willingnessToPay}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-900/40">
              <p className="text-xs italic text-cyan-200/90 mb-1">
                {problems[selectedProblem].sampleQuote}
              </p>
              <span className="text-[11px] text-cyan-400/80 font-medium">
                — {problems[selectedProblem].quoteAuthor}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                <strong>Learning take-away:</strong> Notice how high urgency + high daily recurrence makes Problem #1 the most viable commercial opportunity.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 02 PREVIEW */}
      {stageId === 'stage-2' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse"></span>
              <p className="text-xs uppercase tracking-wider font-semibold text-violet-400">
                Ideation & Customer Feedback Tester
              </p>
            </div>
            <span className="text-xs text-slate-400">Select a proposed business model</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {solutions.map((sol) => {
              const isSelected = selectedSolution === sol.id;
              return (
                <button
                  key={sol.id}
                  onClick={() => setSelectedSolution(sol.id)}
                  className={`p-3.5 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-violet-950/40 border-violet-500 shadow-lg shadow-violet-950/50'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 mb-2 inline-block">
                    Concept #{sol.id + 1}
                  </span>
                  <h4 className="font-semibold text-sm text-slate-100 mb-1">{sol.name}</h4>
                  <p className="text-xs text-slate-400 mb-2">{sol.tagline}</p>
                  <div className="text-[11px] text-violet-300 font-mono">{sol.model}</div>
                </button>
              );
            })}
          </div>

          {/* Persona feedback card */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mt-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Simulated Stakeholder Reactions to &ldquo;{solutions[selectedSolution].name}&rdquo;
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {solutions[selectedSolution].personaFeedback.map((fb, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-200">{fb.persona}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800/40">
                      {fb.sentiment}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic">&ldquo;{fb.comment}&rdquo;</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800/80">
              <div className="text-emerald-400 flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                <span><strong>Key Advantage:</strong> {solutions[selectedSolution].pros}</span>
              </div>
              <div className="text-amber-300 flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span><strong>Operational Bottleneck:</strong> {solutions[selectedSolution].risk}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 03 PREVIEW */}
      {stageId === 'stage-3' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <p className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                Interactive Unit Economics & Pricing Simulator
              </p>
            </div>
            <span className="text-xs text-slate-400">Toggle pricing strategies</span>
          </div>

          {/* Pricing switcher */}
          <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setPricingPlan('monthly')}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                pricingPlan === 'monthly'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Prepaid Monthly (₹89/meal)
            </button>
            <button
              onClick={() => setPricingPlan('weekly')}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                pricingPlan === 'weekly'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Weekly Flex (₹99/meal)
            </button>
            <button
              onClick={() => setPricingPlan('ondemand')}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                pricingPlan === 'ondemand'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pay-As-You-Go (₹129/meal)
            </button>
          </div>

          {/* Calculated Output Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Selling Price / Meal</span>
              <span className="text-lg font-bold font-mono text-white">
                ₹{pricingData[pricingPlan].pricePerMeal}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Kitchen & Delivery Cost</span>
              <span className="text-lg font-bold font-mono text-slate-300">
                ₹{pricingData[pricingPlan].unitCost}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Gross Margin %</span>
              <span className="text-lg font-bold font-mono text-emerald-400">
                {pricingData[pricingPlan].margin}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Projected Monthly GMV</span>
              <span className="text-lg font-bold font-mono text-cyan-400">
                {pricingData[pricingPlan].monthlyRevenue}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Estimated Demand & Customer Lock-in:</span>
              <span className="font-semibold text-slate-200">{pricingData[pricingPlan].estimatedVolume}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Cash Flow Predictability:</span>
              <span className="font-semibold text-emerald-300">{pricingData[pricingPlan].predictability}</span>
            </div>
            <div className="flex items-center justify-between text-amber-300/90 pt-1 border-t border-slate-800">
              <span className="text-slate-400">Primary Strategic Trade-off:</span>
              <span>{pricingData[pricingPlan].risk}</span>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 04 PREVIEW */}
      {stageId === 'stage-4' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
              <p className="text-xs uppercase tracking-wider font-semibold text-blue-400">
                Working Capital Allocation Preview (Simulated Seed ₹1,00,000)
              </p>
            </div>
            <span className="text-xs text-slate-400">Test quick sliders</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Operations & Food Packaging</span>
                <span className="font-mono text-blue-400">₹{sampleBudget.operations.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="50000"
                step="5000"
                value={sampleBudget.operations}
                onChange={(e) => updateStage4Budget('operations', Number(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 block">Insulated thermal crates & delivery bag fleet</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Product & Ordering App</span>
                <span className="font-mono text-indigo-400">₹{sampleBudget.product.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="40000"
                step="5000"
                value={sampleBudget.product}
                onChange={(e) => updateStage4Budget('product', Number(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 block">Web app portal, QR scanner, & kitchen dashboard</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Campus Marketing & Trials</span>
                <span className="font-mono text-cyan-400">₹{sampleBudget.marketing.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="35000"
                step="5000"
                value={sampleBudget.marketing}
                onChange={(e) => updateStage4Budget('marketing', Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 block">Dorm ambassador incentives & sampling booths</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Emergency Contingency Reserve</span>
                <span className="font-mono text-amber-400">₹{sampleBudget.reserve.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="25000"
                step="5000"
                value={sampleBudget.reserve}
                onChange={(e) => updateStage4Budget('reserve', Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 block">Buffer for supplier price hikes and refunds</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400">Allocated Total: </span>
              <span className="font-mono font-bold text-slate-100">
                ₹{stage4Total.toLocaleString('en-IN')}
              </span>
              <span className="text-slate-500"> / ₹1,00,000</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-[11px]">Simulated runway buffer:</span>
              <span className="font-mono text-emerald-400 font-bold">~4.2 Months</span>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 05 PREVIEW */}
      {stageId === 'stage-5' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse"></span>
              <p className="text-xs uppercase tracking-wider font-semibold text-rose-400">
                Simulated Business Challenge
              </p>
            </div>
            <span className="text-xs text-slate-400">Select your founder decision</span>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-200 block mb-0.5">Sudden Competitive Incident:</strong>
                <p className="text-slate-300">
                  &ldquo;A well-funded rival launches an aggressive ₹49 predatory introductory discount across all campus dorms right before midterms.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {challengeResponses.map((res) => {
              const isSelected = selectedChallengeOption === res.id;
              return (
                <div key={res.id} className="space-y-2">
                  <button
                    onClick={() => setSelectedChallengeOption(isSelected ? null : res.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-950/40'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 mb-0.5">{res.title}</div>
                      <div className="text-[11px] text-slate-400">{res.tagline}</div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isSelected ? 'rotate-90 text-indigo-400' : ''
                      }`}
                    />
                  </button>

                  {isSelected && (
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-indigo-900/50 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Simulated Outcome:</span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800">
                          {res.outcomeType}
                        </span>
                      </div>
                      <p className="text-slate-300">{res.consequence}</p>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
                        <strong>Educational principle:</strong> {res.learningHighlight}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STAGE 06 PREVIEW */}
      {stageId === 'stage-6' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <p className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                Final Synthesis: Interactive 7-Part Pitch Deck Preview
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex(c => Math.max(0, c - 1))}
                className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 disabled:opacity-40 text-xs font-mono"
              >
                Prev
              </button>
              <span className="text-xs font-mono text-slate-400">
                {pitchSlides[currentSlideIndex].number}
              </span>
              <button
                disabled={currentSlideIndex === pitchSlides.length - 1}
                onClick={() => setCurrentSlideIndex(c => Math.min(pitchSlides.length - 1, c + 1))}
                className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 disabled:opacity-40 text-xs font-mono"
              >
                Next
              </button>
            </div>
          </div>

          {/* Active slide card */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">
                {pitchSlides[currentSlideIndex].category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Slide {currentSlideIndex + 1} of {pitchSlides.length}
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-100">
              {pitchSlides[currentSlideIndex].title}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              {pitchSlides[currentSlideIndex].summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              {pitchSlides[currentSlideIndex].metrics.map((m, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slide thumbnails */}
          <div className="grid grid-cols-7 gap-1.5">
            {pitchSlides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlideIndex === idx ? 'bg-amber-400' : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={slide.title}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
