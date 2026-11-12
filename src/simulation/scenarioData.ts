import type {
  ScenarioId,
  ProblemOption,
  BusinessIdeaOption,
  ProductFeature,
  MarketingChannel,
  CustomerPersona,
  CustomerInterviewQuestion,
  CompetitorData,
  DynamicEvent,
  TeamMember,
  SupplierNegotiationOffer,
  EthicsOption,
  PivotOption,
  ClassroomChallengeScenario,
} from './types';

export interface ScenarioDefinition {
  id: ScenarioId;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  coreChallenge: string;
  startingBudget: number;
  currencySymbol: string;
  initialUnitMetric: string;
  problems: ProblemOption[];
  ideas: BusinessIdeaOption[];
  features: ProductFeature[];
  marketingChannels: MarketingChannel[];
  personas: CustomerPersona[];
  interviewQuestions: CustomerInterviewQuestion[];
  competitor: CompetitorData;
  events: DynamicEvent[];
  teamRoster: TeamMember[];
}

export const SCENARIO_CAMPUS_MEAL: ScenarioDefinition = {
  id: 'campus_meal',
  title: 'Campus Meal Network',
  category: 'Food and hospitality',
  tagline: 'Affordable, punctual, nutritious meals for busy students',
  summary: 'Solve the daily college meal dilemma: balancing affordable pricing, consistent quality, prompt 30-min break delivery, and kitchen capacity.',
  coreChallenge: 'Provide reliable meals under ₹100 while keeping operations resilient during sudden lunch rush hours.',
  startingBudget: 100000,
  currencySymbol: '₹',
  initialUnitMetric: 'Meals / Day',
  problems: [
    {
      id: 'meal-prob-1',
      category: 'Food and hospitality',
      title: 'Daily Food Spend Is Unsustainable for Student Allowances',
      tagline: 'Commercial restaurants charge ₹180–₹250 per meal, draining allowances by mid-month',
      description: 'Hostel and day students spend a disproportionate percentage of their allowance on oily outside food, leading to skipped meals and financial strain.',
      customerQuote: '"By the 20th of every month, my bank account is empty. I cannot keep paying ₹200 for lunch every single afternoon."',
      severityRating: 5,
      willingnessToPay: 'High if wholesome meals stay under ₹80–₹95',
      targetAudience: 'Hostellers, day scholars & undergraduate students',
      keyObservation: 'Students want honest, warm, predictable daily meals rather than expensive dining experiences.',
      evaluationQuestions: {
        understandable: 'Yes — every student with a fixed monthly allowance directly relates to lunch expense anxiety.',
        targetPersona: 'Over 4,500 hostellers in surrounding campus halls with limited kitchen access.',
        frequency: 'Daily occurrence, 5–6 days a week throughout the academic semester.',
        existingAlternatives: 'Campus canteen (repetitive menu) or commercial delivery apps (expensive + high delivery fees).',
        whyUseful: 'Bridges the gap between unhygienic budget street snacks and costly restaurant delivery.',
      },
    },
    {
      id: 'meal-prob-2',
      category: 'Food and hospitality',
      title: 'Commercial Delivery Apps Consistently Miss 35-Min Lunch Breaks',
      tagline: 'Delivery riders arrive 45–60 minutes later at distant campus gates after classes resume',
      description: 'Students have strict 35–45 minute timetable gaps between lectures. Third-party apps take too long and riders are stopped at campus security gates.',
      customerQuote: '"I ordered lunch at 12:45 PM for a 1:15 PM break. The driver reached Gate 3 at 1:55 PM during my chemistry lab."',
      severityRating: 4,
      willingnessToPay: 'Moderate-High for scheduled batch deliveries right outside academic blocks',
      targetAudience: 'Students with dense back-to-back lecture schedules',
      keyObservation: 'Punctuality and organized campus drop hubs matter far more than an infinite 20-page restaurant catalog.',
      evaluationQuestions: {
        understandable: 'Extremely clear friction point: academic schedules do not accommodate delivery delays.',
        targetPersona: 'STEM and pre-med students with tight consecutive laboratory timings.',
        frequency: 'Every weekday around peak 1:00 PM – 1:45 PM rush hour.',
        existingAlternatives: 'Running to the crowded campus canteen counter or skipping meals altogether.',
        whyUseful: 'Consolidated batch drop-offs ensure hot lunch is ready the second the class bell rings.',
      },
    },
    {
      id: 'meal-prob-3',
      category: 'Food and hospitality',
      title: 'Severe Lack of Clean, Home-Style Nutrition on Campus',
      tagline: 'Heavy gravies, excessive oil, and lack of fresh proteins cause daily lethargy',
      description: 'Students living away from their families report digestive fatigue, skin breakouts, and brain fog from consuming fried canteen food daily.',
      customerQuote: '"Three weeks of canteen fried rice made me feel constantly sluggish. I just want simple dal, roti, sabzi, and a clean salad."',
      severityRating: 4,
      willingnessToPay: 'High for hygienic, balanced comfort food (Ghar ka Khana)',
      targetAudience: 'Long-term hostellers and sports/fitness athletes',
      keyObservation: 'Strong latent demand for nutritious comfort meals made with low oil and hygiene-verified ingredients.',
      evaluationQuestions: {
        understandable: 'Health concerns are top-of-mind for students staying in hostels for 3–4 years.',
        targetPersona: 'Students living away from home who miss balanced domestic meals.',
        frequency: 'Recurring daily habit (lunch and dinner).',
        existingAlternatives: 'Packing dry snacks or buying greasy convenience meals.',
        whyUseful: 'Provides a healthy alternative that parents and students both trust.',
      },
    },
  ],
  ideas: [
    {
      id: 'meal-idea-subscription',
      title: 'Scheduled Student Meal Subscription',
      badge: 'Predictable Revenue',
      tagline: 'Prepaid weekly or monthly lunch pass with automated daily campus common room drop-offs',
      description: 'Students sign up for a 5-day or 20-day lunch pass. Batches are cooked centrally in the morning and delivered to designated campus lockers or desks at 1:00 PM sharp.',
      targetCustomers: 'Hostellers with predictable daily lecture routines',
      revenueModel: 'Prepaid 5-day / 20-day meal plans (upfront cash flow, near-zero payment defaults)',
      mainOperatingChallenge: 'Accurately managing pause/resume requests when university schedules shift unexpectedly',
      estimatedStartupCosts: '₹60,000 – ₹80,000 (Packaging bulk inventory, commercial hot-boxes, runner stipends)',
      baselineMargin: 0.28,
      simulatedCustomerFeedback: [
        {
          persona: 'Karan (2nd Year B.Tech Hosteller)',
          quote: 'Having lunch arrive automatically at the common room saves me 25 minutes of waiting in line every single day.',
          sentiment: 'positive',
        },
        {
          persona: 'Ananya (3rd Year Humanities)',
          quote: 'I love subscriptions, but will my credits roll over if I go home for a 4-day weekend?',
          sentiment: 'cautious',
        },
        {
          persona: 'Dean of Student Affairs',
          quote: 'Centralized batch delivery prevents dozens of random bikes blocking the campus entrance.',
          sentiment: 'excited',
        },
      ],
    },
    {
      id: 'meal-idea-marketplace',
      title: 'Verified Home Chef Tiffin Marketplace',
      badge: 'Asset-Light Community',
      tagline: 'Connecting neighborhood home cooks with students craving authentic regional meals',
      description: 'Onboard vetted local home cooks, inspect hygiene, standardize eco-packaging, and organize student campus runners to distribute authentic home meals.',
      targetCustomers: 'Students seeking regional comfort food (North Indian, South Indian, Bengali, etc.)',
      revenueModel: '18% commission per meal delivered + ₹10 campus coordination fee',
      mainOperatingChallenge: 'Maintaining uniform portion sizes and punctual 11:30 AM cook pick-ups across multiple kitchens',
      estimatedStartupCosts: '₹45,000 – ₹65,000 (Home kitchen quality audits, branded tamper-proof packaging, student app)',
      baselineMargin: 0.22,
      simulatedCustomerFeedback: [
        {
          persona: 'Rohan (Architecture Hosteller from Jaipur)',
          quote: 'If a local auntie makes authentic dal baati or rajma chawal twice a week, I will subscribe instantly.',
          sentiment: 'positive',
        },
        {
          persona: 'Pooja (Student Council Rep)',
          quote: 'Who inspects the home kitchens? Trust will collapse if even one meal turns out stale.',
          sentiment: 'cautious',
        },
        {
          persona: 'Mrs. Deshmukh (Partner Home Cook)',
          quote: 'I can easily cook 30 extra hot thalis every morning if your runner picks them up punctually.',
          sentiment: 'excited',
        },
      ],
    },
    {
      id: 'meal-idea-group-drop',
      title: 'Campus Cafeteria Batch-Discount Portal',
      badge: 'High Viral Reach',
      tagline: 'Pre-order pooled deals with nearby restaurants with grouped delivery drop-offs',
      description: 'Negotiate bulk 25% discounts with hygienic partner restaurants when 5 or more students in the same department order lunch together.',
      targetCustomers: 'Department batches, project groups, and day scholars eating in clusters',
      revenueModel: '12% restaurant commission + student group premium membership perks',
      mainOperatingChallenge: 'Dependent on restaurant punctuality during their off-campus dine-in peak hours',
      estimatedStartupCosts: '₹35,000 – ₹50,000 (Web ordering portal, campus student marketing campaigns)',
      baselineMargin: 0.16,
      simulatedCustomerFeedback: [
        {
          persona: 'Vikram (Student Club Leader)',
          quote: 'We sit in groups of six in the library. If pooling orders saves each of us ₹35, everyone will use it.',
          sentiment: 'excited',
        },
        {
          persona: 'Tanvi (Day Scholar)',
          quote: 'If one person in the group is late to pick up their food box, does the delivery runner wait?',
          sentiment: 'cautious',
        },
        {
          persona: 'Green Bowl Cafe Owner',
          quote: 'We can offer 20% off for 20+ meal orders as long as orders are finalized by 11:00 AM.',
          sentiment: 'positive',
        },
      ],
    },
  ],
  features: [
    {
      id: 'feat-order-app',
      name: 'Mobile PWA Ordering Portal',
      description: 'Clean responsive web app allowing students to view daily rotating menus and place orders in 3 clicks.',
      devCost: 25,
      rupeeCost: 15000,
      timeToLaunchWeeks: 2,
      customerAppealImpact: 4,
      operationalComplexity: 'Moderate',
      recommendedPhase: 'Phase 1: First Version',
    },
    {
      id: 'feat-flexi-pass',
      name: 'Flexible Subscription Pass (Pause & Roll-over)',
      description: 'Allows students to freeze lunch plans for weekends or sick days without losing paid balance.',
      devCost: 20,
      rupeeCost: 10000,
      timeToLaunchWeeks: 1,
      customerAppealImpact: 5,
      operationalComplexity: 'Moderate',
      recommendedPhase: 'Phase 1: First Version',
    },
    {
      id: 'feat-insulated-hub',
      name: 'Thermal Hot-Box Campus Stations',
      description: 'Insulated hot containers at 3 campus hotspots to keep food at 65°C until students collect.',
      devCost: 30,
      rupeeCost: 20000,
      timeToLaunchWeeks: 2,
      customerAppealImpact: 5,
      operationalComplexity: 'High',
      recommendedPhase: 'Phase 1: First Version',
    },
    {
      id: 'feat-live-tracking',
      name: 'Real-time GPS Delivery Tracking',
      description: 'Live map tracking of student delivery runners from kitchen dispatch to campus block.',
      devCost: 35,
      rupeeCost: 22000,
      timeToLaunchWeeks: 3,
      customerAppealImpact: 3,
      operationalComplexity: 'High',
      recommendedPhase: 'Phase 2: Customer Feedback',
    },
    {
      id: 'feat-custom-nutrition',
      name: 'Macro & Calorie Customizer',
      description: 'Allows students to choose high-protein, keto, or vegan portions with exact nutritional breakdown.',
      devCost: 25,
      rupeeCost: 14000,
      timeToLaunchWeeks: 2,
      customerAppealImpact: 3,
      operationalComplexity: 'High',
      recommendedPhase: 'Phase 2: Customer Feedback',
    },
    {
      id: 'feat-loyalty-rewards',
      name: 'Peer Referral & Campus Streak Rewards',
      description: 'Earn free desserts or meal discounts after maintaining a 10-day lunch subscription streak.',
      devCost: 15,
      rupeeCost: 8000,
      timeToLaunchWeeks: 1,
      customerAppealImpact: 4,
      operationalComplexity: 'Low',
      recommendedPhase: 'Phase 3: Future Scale',
    },
  ],
  marketingChannels: [
    {
      id: 'mkt-ambassadors',
      name: 'Campus Student Ambassadors',
      description: 'Recruit influential hostel prefects and club heads to introduce the meal service with free tasting trials.',
      costPerUnit: 2500,
      reachPerUnit: 280,
      conversionRate: 0.18,
      timeRequired: '1 week setup',
    },
    {
      id: 'mkt-social-whatsapp',
      name: 'Hostel WhatsApp & Instagram Community',
      description: 'High-energy reels featuring daily hot meals, menu voting polls, and exclusive lunchtime discount codes.',
      costPerUnit: 1500,
      reachPerUnit: 420,
      conversionRate: 0.11,
      timeRequired: 'Immediate launch',
    },
    {
      id: 'mkt-tasting-booth',
      name: 'Campus Fresher Welcome Tasting Kiosk',
      description: 'Set up an approved tasting counter outside the main library distributing 100 mini sample bites.',
      costPerUnit: 5000,
      reachPerUnit: 550,
      conversionRate: 0.22,
      timeRequired: 'Requires campus admin approval',
    },
    {
      id: 'mkt-flyers',
      name: 'Notice Board Posters & Flyers',
      description: 'Physical printed posters pinned to hostel lobby noticeboards and academic block bulletin boards.',
      costPerUnit: 1000,
      reachPerUnit: 200,
      conversionRate: 0.05,
      timeRequired: '2 days printing',
    },
  ],
  personas: [
    {
      id: 'persona-karan',
      name: 'Karan Mehra',
      role: '2nd Year Engineering Hosteller',
      avatarSeed: 'Karan',
      description: 'Stays in Hall 4. Survives on strict ₹3,000 monthly food allowance. Frequently skips lunch when lectures run late.',
      primaryDifficulty: 'Commercial delivery is too expensive; canteen line takes 25 minutes.',
      currentAlternative: 'Instant noodles in hostel kettle or oily canteen samosas.',
      idealSolution: 'Pre-ordered warm meal under ₹85 delivered right to hostel common lounge.',
      blockersToAdoption: 'Worried food will turn cold if his laboratory session runs 15 minutes late.',
      quote: '"If you can guarantee a warm lunch ready at 1:10 PM for ₹85, I will subscribe for the entire term."',
    },
    {
      id: 'persona-priya',
      name: 'Priya Nambiar',
      role: 'Final Year Economics Day Scholar',
      avatarSeed: 'Priya',
      description: 'Commutes 45 minutes daily. Has sensitive digestion and avoids oily outside street food.',
      primaryDifficulty: 'Finding hygienic, fresh, low-oil meals that don’t feel heavy during afternoon lectures.',
      currentAlternative: 'Packs cold food from home in the morning that tastes stale by 1:30 PM.',
      idealSolution: 'Freshly packed home-style thali with salad and fresh curd.',
      blockersToAdoption: 'Needs proof that kitchens maintain strict hygienic vegetable cleaning standards.',
      quote: '"I do not mind paying ₹100 if the ingredients are fresh and the food does not give me stomach acidity."',
    },
    {
      id: 'persona-amit',
      name: 'Amit Patel',
      role: 'Campus Sports Team Captain',
      avatarSeed: 'Amit',
      description: 'Practices athletics daily. Needs high protein, punctual nutrition, and zero delays.',
      primaryDifficulty: 'Canteen food is mostly carbs and oil with virtually zero protein.',
      currentAlternative: 'Spends ₹300 per day on specialized gym cafe bowls.',
      idealSolution: 'Clean paneer/chicken/dal boxes with high portion size.',
      blockersToAdoption: 'Wants generous portion sizes, not skimpy 200g snack boxes.',
      quote: '"I need real nutrition to recover after morning sprints. Small portions will not cut it."',
    },
  ],
  interviewQuestions: [
    {
      id: 'q-difficulty',
      questionText: 'What is your biggest difficulty when getting lunch on campus?',
      answerMap: {
        'persona-karan': 'The canteen line is 50 people deep during our 35-minute break, and Swiggy delivery takes 50 minutes. I usually end up starving or eating chips.',
        'persona-priya': 'Everything available near campus is soaked in cheap palm oil and heavy spice. It makes me feel exhausted for my 2 PM statistics class.',
        'persona-amit': 'Finding adequate protein at reasonable prices. The canteen thali is 90% rice and watery gravy.',
      },
    },
    {
      id: 'q-current-alt',
      questionText: 'What do you currently use as your daily workaround?',
      answerMap: {
        'persona-karan': 'I buy two packets of cream biscuits or instant noodles that I boil using a secret electric kettle in the hostel.',
        'persona-priya': 'I pack cold roti from home at 7 AM, but by lunch it feels completely dry and unappetizing.',
        'persona-amit': 'I spend ₹250–₹300 ordering specialized fitness bowls from the city, which is burning through my savings.',
      },
    },
    {
      id: 'q-ideal-solution',
      questionText: 'What would make a new campus meal service genuinely indispensable for you?',
      answerMap: {
        'persona-karan': 'Predictable delivery at 1:05 PM outside my department block for under ₹90, with the option to pause when I go home.',
        'persona-priya': 'Clear ingredient transparency, hygienic eco-packaging, and simple homestyle recipes with low oil.',
        'persona-amit': 'Reliable protein options with generous portion sizes and a weekly subscription discount.',
      },
    },
    {
      id: 'q-blockers',
      questionText: 'What hesitation would prevent you from paying for a full month upfront?',
      answerMap: {
        'persona-karan': 'If I pay for 20 days and the food arrives cold or late on Day 3, will I get a refund or am I trapped?',
        'persona-priya': 'Menu boredom. Eating the exact same dal-chawal 5 days in a row would make me cancel.',
        'persona-amit': 'Portion consistency. Sometimes startups start great and shrink portions after 2 weeks.',
      },
    },
  ],
  competitor: {
    name: 'QuickBite Express',
    tagline: 'Aggressive commercial kitchen offering ₹59 budget boxes',
    threatDescription: 'A commercial caterer launched a predatory ₹59 lunch box promotion with heavy flyer distribution across freshman hostels, temporarily undercutting your prices.',
    options: [
      {
        id: 'price',
        title: 'Match Price to ₹59 (Price War)',
        description: 'Drop your lunch price to ₹59 to match QuickBite. Protect your customer volume immediately.',
        costImpact: 12000,
        marginImpact: 'Cuts gross margin from 28% to 6%, requiring huge volume just to break even.',
        outcomeSummary: 'Maintains high order volume, but your unit economics turn paper-thin. Any ingredient inflation will trigger cash losses.',
      },
      {
        id: 'quality',
        title: 'Differentiate on Quality & Freshness',
        description: 'Keep your price at ₹89–₹95, but launch a "Clean Kitchen Guarantee" showcasing farm-fresh ingredients, zero palm oil, and insulated warm delivery.',
        costImpact: 6000,
        marginImpact: 'Preserves healthy 26% margin while spending ₹6,000 on transparent ingredient marketing.',
        outcomeSummary: 'QuickBite suffers quality complaints after 10 days of greasy food. Health-conscious students migrate permanently to your brand.',
      },
      {
        id: 'niche',
        title: 'Focus on Hosteller Premium Subscriptions',
        description: 'Pivot away from casual walk-in buyers; offer hostellers guaranteed hot-box desk delivery with free pause options.',
        costImpact: 4000,
        marginImpact: 'Slightly smaller total addressable market, but 90%+ renewal rate and zero customer acquisition churn.',
        outcomeSummary: 'Builds a loyal, predictable moat of 150+ daily subscribers who value punctuality over cheap roadside snacks.',
      },
      {
        id: 'experience',
        title: 'Improve Campus Speed & Delivery Service',
        description: 'Introduce campus runner stations outside lecture halls with 60-second express pickup.',
        costImpact: 7500,
        marginImpact: 'Adds minor delivery stipend cost but eliminates customer waiting time during 30-min break.',
        outcomeSummary: 'Students choose your brand because QuickBite delivery riders get stuck at security gates while your campus runners are already inside.',
      },
    ],
  },
  events: [
    {
      id: 'event-supplier-hike',
      title: 'Kitchen Supplier Ingredient Inflation Spike',
      badge: 'Supply Chain Friction',
      situation: 'Vegetable and cooking oil wholesale prices increase by 18% overnight due to regional transport strikes.',
      whyItMatters: 'If you absorb the cost, your operating profit will decrease; if you raise meal prices, student orders may drop.',
      choices: [
        {
          id: 'absorb',
          label: 'Absorb the Cost & Protect Price Promise',
          actionSummary: 'Keep student price intact; fund the ₹8,000 difference from emergency reserves.',
          cashEffect: -8000,
          satisfactionEffect: +6,
          capacityEffect: 0,
          takeaway: 'Students appreciate price consistency and reward you with high brand loyalty.',
        },
        {
          id: 'substitute',
          label: 'Smart Menu Engineering (Local Substitutions)',
          actionSummary: 'Swap expensive ingredients for seasonal local produce without sacrificing nutrition.',
          cashEffect: -1500,
          satisfactionEffect: 0,
          capacityEffect: 0,
          takeaway: 'Creative operational thinking maintained your profit margin without annoying customers.',
        },
        {
          id: 'surcharge',
          label: 'Add a Temporary ₹10 Fuel & Supply Surcharge',
          actionSummary: 'Pass the inflation cost directly to the student price per meal.',
          cashEffect: 0,
          satisfactionEffect: -14,
          capacityEffect: -15,
          takeaway: 'Price-sensitive students reacted negatively in campus group chats; orders dipped 15%.',
        },
      ],
    },
    {
      id: 'event-viral-spike',
      title: 'Viral Instagram Reel by Campus Influencer',
      badge: 'Demand Surge Opportunity',
      situation: 'The student cultural club president posted an enthusiastic unboxing video of your warm lunch box, causing 140 new signups in 4 hours.',
      whyItMatters: 'Sudden demand spikes test your operational capacity. Overcommitting risks delays and disappointed customers.',
      choices: [
        {
          id: 'expand-shift',
          label: 'Lease Secondary Prep Space & Hire 2 Runners',
          actionSummary: 'Invest ₹10,000 immediately to expand kitchen prep and runner delivery capacity.',
          cashEffect: -10000,
          satisfactionEffect: +10,
          capacityEffect: +90,
          takeaway: 'Bold scaling captured the surge cleanly and cemented your venture as the campus favorite.',
        },
        {
          id: 'vip-waitlist',
          label: 'Cap Daily Orders & Create Exclusive Waitlist',
          actionSummary: 'Accept 40 orders only; place the remaining 100 students on an early-bird VIP waitlist.',
          cashEffect: -1000,
          satisfactionEffect: +4,
          capacityEffect: 0,
          takeaway: 'Scarcity increased desire and maintained 95% satisfaction for served meals.',
        },
        {
          id: 'overwork',
          label: 'Force Existing Team to Cook Double Pace',
          actionSummary: 'Accept all 140 orders without spending extra cash or hiring help.',
          cashEffect: 0,
          satisfactionEffect: -22,
          capacityEffect: +20,
          takeaway: 'Kitchen crashed: deliveries were 40 minutes late, food arrived lukewarm, and negative reviews spread.',
        },
      ],
    },
  ],
  teamRoster: [
    {
      id: 'team-rohit',
      role: 'Operations',
      title: 'Kitchen & Dispatch Lead',
      name: 'Rohit Verma',
      strength: '+30% kitchen throughput and organized batch dispatch schedules.',
      limitation: 'Focuses heavily on process standardization; resists last-minute custom meal orders.',
      assigned: true,
    },
    {
      id: 'team-sneha',
      role: 'Marketing',
      title: 'Campus Growth & Community Lead',
      name: 'Sneha Rao',
      strength: '+45% social media conversion and strong relationship with hostel club heads.',
      limitation: 'Tends to overpromise rapid delivery times in promotional campaigns.',
      assigned: true,
    },
    {
      id: 'team-dev',
      role: 'Product',
      title: 'PWA & Ordering Systems Lead',
      name: 'Dev Anand',
      strength: 'Builds ultra-fast mobile ordering flows with high UX clarity.',
      limitation: 'Prefers coding software features over negotiating packaging contracts.',
      assigned: false,
    },
    {
      id: 'team-maya',
      role: 'Support',
      title: 'Customer Experience & Feedback Coordinator',
      name: 'Maya Sen',
      strength: 'Resolves student order issues in under 90 seconds, turning unhappy users into advocates.',
      limitation: 'Requires dedicated budget for replacement meal vouchers and customer compensation.',
      assigned: false,
    },
    {
      id: 'team-arjun',
      role: 'Finance',
      title: 'Unit Economics & Cash Controller',
      name: 'Arjun Gupta',
      strength: 'Tracks ingredient cost per gram and keeps burn rate strictly disciplined.',
      limitation: 'Extremely cautious about emergency spending, which can slow down rapid operational fixes.',
      assigned: false,
    },
  ],
};

export const SCENARIO_EDTECH: ScenarioDefinition = {
  id: 'edtech',
  title: 'PeerPrep EdTech',
  category: 'Education',
  tagline: 'Interactive peer-to-peer exam mastery and concept micro-modules',
  summary: 'Help high school and pre-college students master complex STEM subjects through bite-sized interactive simulations and peer problem-solving circles.',
  coreChallenge: 'Deciding between free freemium access vs paid coaching tiers while managing content authoring costs and user retention.',
  startingBudget: 100000,
  currencySymbol: '₹',
  initialUnitMetric: 'Active Learners / Day',
  problems: [
    {
      id: 'ed-prob-1',
      category: 'Education',
      title: 'Standard Coaching Classes Move Too Fast for Conceptual Gaps',
      tagline: 'Students get left behind in 80-person lecture halls and fear asking basic questions',
      description: 'Massive coaching centers prioritize top rankers, leaving the majority of students with foundation gaps in physics, calculus, and organic chemistry.',
      customerQuote: '"In my coaching batch of 90 students, the teacher finished electrostatics in 2 days. I was completely lost but embarrassed to raise my hand."',
      severityRating: 5,
      willingnessToPay: 'High if visual problem breakdowns actually make concepts click',
      targetAudience: 'Classes 10–12 CBSE, ICSE & entrance exam aspirants',
      keyObservation: 'Students need step-by-step visual problem breakdowns where they can learn at their own pace without judgment.',
      evaluationQuestions: {
        understandable: 'Very clear: almost every high school student has experienced falling behind in a fast-paced classroom.',
        targetPersona: 'Over 15 million secondary students preparing for competitive and board examinations.',
        frequency: 'Daily study routine during evening revision hours.',
        existingAlternatives: 'Private tutors (₹1,500/hr) or generic passive YouTube videos with zero interactive feedback.',
        whyUseful: 'Provides self-paced visual interactive simulations where students learn by doing.',
      },
    },
    {
      id: 'ed-prob-2',
      category: 'Education',
      title: 'Passive Video Lectures Cause High Dropout and Low Retention',
      tagline: 'Students watch 45-minute recorded lectures with high drop-off and zero problem-solving practice',
      description: 'Watching a video gives the illusion of learning, but students freeze when facing a blank exam question.',
      customerQuote: '"I watched 8 hours of thermodynamics videos, but when I opened the test paper, I could not solve even the second question."',
      severityRating: 4,
      willingnessToPay: 'Moderate-High for interactive practice that tests active recall',
      targetAudience: 'Students with short attention spans who get bored by monotone videos',
      keyObservation: 'Active problem solving with instant diagnostic hints creates 4x higher concept retention than passive watching.',
      evaluationQuestions: {
        understandable: 'Directly addresses the difference between passive recognition and active problem solving.',
        targetPersona: 'High school students striving to improve their test scores.',
        frequency: 'Weekly mock test preparation and chapter revisions.',
        existingAlternatives: 'Static textbook question banks with unhelpful printed answer keys.',
        whyUseful: 'Breaks complex derivations into bite-sized gamified checkpoints.',
      },
    },
  ],
  ideas: [
    {
      id: 'ed-idea-micro',
      title: 'Visual Micro-Simulation Mastery App',
      badge: 'High Engagement',
      tagline: 'Interactive 3-minute visual simulations where students tweak variables to master STEM concepts',
      description: 'Instead of watching slides, students adjust magnetic field strength, optical lens focal lengths, or reaction temperatures directly on screen.',
      targetCustomers: 'Visual learners and students preparing for conceptual physics and chemistry',
      revenueModel: '₹299/month subscription for all subject modules + free trial chapter',
      mainOperatingChallenge: 'High initial time and software authoring effort per interactive science simulation',
      estimatedStartupCosts: '₹50,000 – ₹75,000 (Interactive web dev, curriculum expert review, cloud hosting)',
      baselineMargin: 0.72,
      simulatedCustomerFeedback: [
        {
          persona: 'Aryan (Class 11 CBSE Student)',
          quote: 'Moving the slider to see how electron orbits shift made Bohr’s model make sense in 2 minutes.',
          sentiment: 'excited',
        },
        {
          persona: 'Mrs. Sen (High School Physics Teacher)',
          quote: 'I would happily recommend this to my students as homework practice before practical exams.',
          sentiment: 'positive',
        },
      ],
    },
    {
      id: 'ed-idea-peer',
      title: 'Peer Doubt-Solving & Micro-Study Circles',
      badge: 'Community-Driven',
      tagline: 'Verified senior student mentors solving exam questions in structured 10-minute audio study rooms',
      description: 'Students upload a photo of a stuck question. Top college mentors answer with structured voice and whiteboard annotations.',
      targetCustomers: 'Students studying late at night when teachers and tutors are unavailable',
      revenueModel: 'Pay-per-doubt credits (₹20/question) or ₹499 monthly unlimited doubt pass',
      mainOperatingChallenge: 'Ensuring mentor quality and maintaining quick response times during 9 PM – 12 AM peak',
      estimatedStartupCosts: '₹40,000 – ₹60,000 (Mentor verification, audio room infra, moderation)',
      baselineMargin: 0.40,
      simulatedCustomerFeedback: [
        {
          persona: 'Tanya (Class 12 Aspirant)',
          quote: 'Having a senior explain where I made a sign error at 11 PM saved me 2 hours of frustration.',
          sentiment: 'positive',
        },
      ],
    },
  ],
  features: [
    {
      id: 'feat-ed-sims',
      name: 'Interactive Visual STEM Simulation Engine',
      description: 'Interactive HTML5/WebGL physics and chemistry manipulables with instant formula feedback.',
      devCost: 35,
      rupeeCost: 22000,
      timeToLaunchWeeks: 3,
      customerAppealImpact: 5,
      operationalComplexity: 'High',
      recommendedPhase: 'Phase 1: First Version',
    },
    {
      id: 'feat-ed-hints',
      name: 'Smart Diagnostic Hint Ladder',
      description: 'Provides 3 progressive clues before showing full solutions to teach problem-solving grit.',
      devCost: 20,
      rupeeCost: 12000,
      timeToLaunchWeeks: 1,
      customerAppealImpact: 4,
      operationalComplexity: 'Low',
      recommendedPhase: 'Phase 1: First Version',
    },
    {
      id: 'feat-ed-analytics',
      name: 'Parent & Student Concept Mastery Dashboard',
      description: 'Visual breakdown showing strong chapters vs. vulnerable formulas needing revision.',
      devCost: 20,
      rupeeCost: 10000,
      timeToLaunchWeeks: 2,
      customerAppealImpact: 4,
      operationalComplexity: 'Moderate',
      recommendedPhase: 'Phase 2: Customer Feedback',
    },
  ],
  marketingChannels: [
    {
      id: 'mkt-school-workshops',
      name: 'School Atal Tinkering Lab Workshops',
      description: 'Conduct free 45-minute interactive science masterclasses in partnership with school STEM coordinators.',
      costPerUnit: 3000,
      reachPerUnit: 350,
      conversionRate: 0.24,
      timeRequired: '1 week planning',
    },
    {
      id: 'mkt-youtube-shorts',
      name: 'Concept Teaser Shorts & Reels',
      description: 'Bite-sized 45-second mind-blowing science paradox videos explaining difficult exam questions.',
      costPerUnit: 1500,
      reachPerUnit: 800,
      conversionRate: 0.08,
      timeRequired: 'Weekly production',
    },
  ],
  personas: [
    {
      id: 'persona-ed-aryan',
      name: 'Aryan Verma',
      role: 'Class 11 Science Student',
      avatarSeed: 'Aryan',
      description: 'Struggling with rotational motion and organic mechanisms. Afraid to ask questions in big coaching halls.',
      primaryDifficulty: 'Visualizing 3D forces and abstract physics vectors in textbook diagrams.',
      currentAlternative: 'Watching random 2-hour YouTube lectures at 1.75x speed.',
      idealSolution: 'Bite-sized 5-minute interactive simulations that explain the core intuition before formulas.',
      blockersToAdoption: 'Needs reassurance that the content strictly aligns with his school examination syllabus.',
      quote: '"If I can understand why the formula works instead of memorizing 20 steps, my marks will jump 30%."',
    },
    {
      id: 'persona-ed-tanya',
      name: 'Tanya Basu',
      role: 'Class 12 Medical Aspirant',
      avatarSeed: 'Tanya',
      description: 'Studies 6 hours daily. Needs prompt doubt resolution at night when coaching teachers are unreachable.',
      primaryDifficulty: 'Getting stuck on one calculation and wasting hours spinning her wheels.',
      currentAlternative: 'Texting classmates in WhatsApp groups and waiting hours for incomplete replies.',
      idealSolution: 'On-demand 5-minute step-by-step diagnostic breakdown from a qualified mentor.',
      blockersToAdoption: 'Price sensitivity; cannot spend more than ₹400/month.',
      quote: '"I need someone to point out my exact calculation mistake at 10:30 PM so I can finish my homework."',
    },
  ],
  interviewQuestions: [
    {
      id: 'q-ed-diff',
      questionText: 'What is your biggest barrier when studying difficult STEM chapters alone?',
      answerMap: {
        'persona-ed-aryan': 'Textbook diagrams are static. I cannot visualize how torque or magnetic flux behaves in 3D space.',
        'persona-ed-tanya': 'When I make a mistake, conventional answer keys just print the final answer without showing where my reasoning diverged.',
      },
    },
    {
      id: 'q-ed-sol',
      questionText: 'What feature would make you pay for a monthly subscription?',
      answerMap: {
        'persona-ed-aryan': 'Interactive 3D sliders where I can manipulate variables and see the physical reaction immediately.',
        'persona-ed-tanya': 'Step-by-step progressive clues that coach me through the answer without spoiling the solution.',
      },
    },
  ],
  competitor: {
    name: 'MegaPrep Online',
    tagline: 'Massive venture-backed coaching portal with 500-hour video catalogs',
    threatDescription: 'MegaPrep launched a free promotional tier giving away 100 recorded video lectures, trying to lock students into their ecosystem.',
    options: [
      {
        id: 'price',
        title: 'Launch a 100% Free Ad-Supported Tier',
        description: 'Compete directly on free access, relying on future banner ads to cover hosting.',
        costImpact: 10000,
        marginImpact: 'Destroys subscription revenue; school principals dislike classroom apps with ads.',
        outcomeSummary: 'Attracts high casual traffic, but software server costs quickly drain your capital.',
      },
      {
        id: 'quality',
        title: 'Double Down on Active Interactive Simulations',
        description: 'Position your platform against "Boring 500-Hour Video Fatigue". Emphasize: Learn in 5 minutes by doing.',
        costImpact: 5000,
        marginImpact: 'Maintains healthy ₹299/mo subscription; students retain concepts 4x better.',
        outcomeSummary: 'MegaPrep users suffer video burnout and switch to your interactive modules for exam week revision.',
      },
      {
        id: 'niche',
        title: 'Focus Exclusively on School Science Teachers',
        description: 'Provide teachers with classroom simulation projection tools and student assessment rubrics.',
        costImpact: 3000,
        marginImpact: 'Predictable B2B annual school software licenses.',
        outcomeSummary: 'Schools adopt your platform for computer lab sessions, generating steady institutional revenue.',
      },
      {
        id: 'experience',
        title: 'Introduce 1-on-1 Student Diagnostic Mentorship',
        description: 'Pair each student with a senior college mentor for a weekly 15-minute concept review call.',
        costImpact: 8000,
        marginImpact: 'High satisfaction and word-of-mouth recommendations from grateful parents.',
        outcomeSummary: 'Parents gladly pay for genuine human mentorship over impersonal automated video catalogs.',
      },
    ],
  },
  events: [
    {
      id: 'event-board-exam',
      title: 'Pre-Board Exam Revision Rush',
      badge: 'Peak Season Demand',
      situation: 'Schools announce pre-board dates two weeks earlier than expected; platform queries spike 300%.',
      whyItMatters: 'Opportunity to convert free trial users into paying subscribers if your servers remain fast.',
      choices: [
        {
          id: 'cloud-boost',
          label: 'Scale Cloud Cloud Server Capacity Instantly',
          actionSummary: 'Spend ₹7,000 on high-availability cloud servers to ensure zero lag during peak evening study hours.',
          cashEffect: -7000,
          satisfactionEffect: +12,
          capacityEffect: +150,
          takeaway: 'Flawless performance during exam crunch created high student loyalty and 85 new paid sign-ups.',
        },
        {
          id: 'curate-cheat-sheets',
          label: 'Release Quick-Revision Interactive Cheat Sheets',
          actionSummary: 'Team works overtime to release high-yield revision summaries for top 10 exam chapters.',
          cashEffect: -2000,
          satisfactionEffect: +8,
          capacityEffect: 0,
          takeaway: 'Smart educational curation resonated with stressed students; organic shares jumped.',
        },
      ],
    },
  ],
  teamRoster: [
    {
      id: 'team-ed-priya',
      role: 'Product',
      title: 'Curriculum & Pedagogy Designer',
      name: 'Priya Iyer',
      strength: 'Translates difficult NCERT/CBSE textbook concepts into intuitive step-by-step simulations.',
      limitation: 'Takes longer to polish each module before allowing public release.',
      assigned: true,
    },
    {
      id: 'team-ed-manish',
      role: 'Operations',
      title: 'Content & Tech Platform Lead',
      name: 'Manish Kumar',
      strength: 'Keeps cloud infrastructure rock-solid with sub-second page loading speeds.',
      limitation: 'Focuses heavily on backend optimization rather than community student outreach.',
      assigned: true,
    },
  ],
};

export const SCENARIO_SUSTAINABILITY: ScenarioDefinition = {
  id: 'sustainability',
  title: 'EcoLoop Circular Campus',
  category: 'Sustainability',
  tagline: 'Zero-waste campus circular packaging & material upcycling',
  summary: 'Eliminate single-use plastic takeaway containers across educational institutions through an automated deposit-return smart container ecosystem.',
  coreChallenge: 'Balancing sustainable material costs against student return compliance and merchant adoption.',
  startingBudget: 100000,
  currencySymbol: '₹',
  initialUnitMetric: 'Containers Circulated / Day',
  problems: [
    {
      id: 'sust-prob-1',
      category: 'Sustainability',
      title: '15,000+ Single-Use Plastic Food Boxes Discarded on Campus Weekly',
      tagline: 'Campus bins overflow with oily non-recyclable styrofoam and plastic meal boxes',
      description: 'Educational institutes produce tons of plastic litter weekly from canteen takeaways and food delivery packaging, clogging local municipal landfills.',
      customerQuote: '"By 3 PM every day, every single dustbin outside our hostel is overflowing with plastic food boxes and greasy wrappers."',
      severityRating: 5,
      willingnessToPay: 'Moderate-High if refundable deposit system makes participation effortless',
      targetAudience: 'University administrations, eco-conscious student bodies, and campus canteens',
      keyObservation: 'Students care deeply about plastic pollution but lack a convenient reusable infrastructure.',
      evaluationQuestions: {
        understandable: 'Visible daily environmental problem that campuses are under pressure to resolve.',
        targetPersona: 'Eco-conscious students and school sustainability committees.',
        frequency: 'Daily occurrence after every lunch break.',
        existingAlternatives: 'Ineffective plastic bans that canteens bypass with thin paper-lined plastic bowls.',
        whyUseful: 'Creates a convenient circular loop where reusable stainless steel or biocomposite boxes are washed and sanitized.',
      },
    },
  ],
  ideas: [
    {
      id: 'sust-idea-smart-box',
      title: 'Smart NFC Deposit-Return Container Network',
      badge: 'Circular Infrastructure',
      tagline: 'Durable biocomposite food boxes with QR/NFC tracking and automated campus collection drop-bins',
      description: 'Students scan their student ID to borrow a clean sanitised container at any food counter for ₹0, paying a ₹20 refundable deposit only if unreturned within 48 hours.',
      targetCustomers: 'Campus food vendors and students grabbing lunch on the go',
      revenueModel: 'B2B campus hygiene & washing service fee + vendor packaging replacement subscription',
      mainOperatingChallenge: 'Ensuring 92%+ container return rates and commercial sanitization logistics',
      estimatedStartupCosts: '₹60,000 – ₹85,000 (Initial 1,000 food-grade containers, smart drop bins, sanitization unit)',
      baselineMargin: 0.32,
      simulatedCustomerFeedback: [
        {
          persona: 'Kavita (Eco Club Lead)',
          quote: 'If drop bins are located outside every lecture building, students will return them without any friction.',
          sentiment: 'excited',
        },
      ],
    },
  ],
  features: [
    {
      id: 'feat-sust-qr',
      name: 'QR / Student ID Instant Checkout Flow',
      description: 'Students tap their student ID card or phone QR code at the canteen counter to borrow containers in 2 seconds.',
      devCost: 25,
      rupeeCost: 15000,
      timeToLaunchWeeks: 2,
      customerAppealImpact: 5,
      operationalComplexity: 'Moderate',
      recommendedPhase: 'Phase 1: First Version',
    },
    {
      id: 'feat-sust-dropbins',
      name: 'Campus Automated Smart Collection Return Bins',
      description: 'Smart return kiosks with weight and optical scanners that instantly credit student deposit balances.',
      devCost: 35,
      rupeeCost: 25000,
      timeToLaunchWeeks: 3,
      customerAppealImpact: 5,
      operationalComplexity: 'High',
      recommendedPhase: 'Phase 1: First Version',
    },
  ],
  marketingChannels: [
    {
      id: 'mkt-green-campaign',
      name: 'Campus Green Challenge & Inter-Hostel Leaderboard',
      description: 'Hostel competition tracking kg of single-use plastic prevented with rewards for highest return rate.',
      costPerUnit: 2000,
      reachPerUnit: 400,
      conversionRate: 0.20,
      timeRequired: '1 week launch',
    },
  ],
  personas: [
    {
      id: 'persona-sust-kavita',
      name: 'Kavita Sharma',
      role: 'Student Sustainability Council Head',
      avatarSeed: 'Kavita',
      description: 'Advocates for zero-waste campus initiatives. Frustrated by endless greenwashing and lip service.',
      primaryDifficulty: 'Getting regular students to return reusable containers instead of leaving them in dorm rooms.',
      currentAlternative: 'Putting up educational posters that students ignore.',
      idealSolution: 'Seamless tap-and-return system integrated with existing student ID cards.',
      blockersToAdoption: 'Needs return kiosks to be clean, odor-free, and placed directly along high-traffic walkway routes.',
      quote: '"If returning the box is easier than walking to the trash bin, 90% of students will gladly adopt it."',
    },
  ],
  interviewQuestions: [
    {
      id: 'q-sust-diff',
      questionText: 'What is the biggest operational hurdle to keeping reusable boxes circulating?',
      answerMap: {
        'persona-sust-kavita': 'Students hoarding boxes in their rooms for 3 weeks until someone reminds them. You need gentle nudge notifications.',
      },
    },
  ],
  competitor: {
    name: 'DisposableBio Pack',
    tagline: 'Cheap single-use bagasse paper packaging supplier',
    threatDescription: 'A disposable paper box vendor offered canteens thin single-use cardboard boxes at ₹3 per unit, claiming to be biodegradable.',
    options: [
      {
        id: 'quality',
        title: 'Expose Hidden Plastic Liners & True Cost',
        description: 'Publish verified lab report showing disposable boxes have waterproof PFAS plastic linings that end up in microplastics.',
        costImpact: 4000,
        marginImpact: 'Wins ethical campus mandate and administration backing.',
        outcomeSummary: 'Campus administration mandates EcoLoop reusable containers as the official university standard.',
      },
      {
        id: 'price',
        title: 'Subsidize Borrow Fee to ₹0',
        description: 'Cover all initial user fees to drive immediate campus-wide container circulation.',
        costImpact: 9000,
        marginImpact: 'Lowers short-term cash reserves but locks out single-use disposable competitors.',
        outcomeSummary: 'Vendor adoption reaches 100% across all 4 campus cafeterias.',
      },
      {
        id: 'niche',
        title: 'Partner with Eco-Friendly Canteen Vendors First',
        description: 'Launch pilot with the two most popular student cafes before expanding campus-wide.',
        costImpact: 2000,
        marginImpact: 'Low capital expenditure; proves 95% return rate before major rollout.',
        outcomeSummary: 'Smooth rollout proves high unit economics and wins student praise.',
      },
      {
        id: 'experience',
        title: 'Introduce Instant Cashback Green Rewards',
        description: 'Every container returned within 24 hours earns a ₹2 campus cafe voucher.',
        costImpact: 6000,
        marginImpact: 'Return compliance reaches an extraordinary 98.4%.',
        outcomeSummary: 'Students actively remind each other to drop boxes into the smart kiosks.',
      },
    ],
  },
  events: [
    {
      id: 'event-sust-lost',
      title: 'Initial Return Rate Dip During Exam Week',
      badge: 'Operational Bottleneck',
      situation: 'During end-semester exams, students take meals to their hostel rooms and forget to drop containers into kiosks for 4 days.',
      whyItMatters: 'Container inventory drops by 35%, threatening next day lunch service at canteens.',
      choices: [
        {
          id: 'hostel-sweep',
          label: 'Deploy Student Green Runners for Hostel Room Sweeps',
          actionSummary: 'Offer student runners ₹1,500 to conduct convenient collection drives at hostel entrances.',
          cashEffect: -1500,
          satisfactionEffect: +8,
          capacityEffect: +80,
          takeaway: 'Recovered 94% of unreturned containers without alienating busy studying students.',
        },
        {
          id: 'strict-fee',
          label: 'Enforce Automatic ₹25 Unreturned Penalty',
          actionSummary: 'Deduct penalty fee directly from delinquent student accounts.',
          cashEffect: +3000,
          satisfactionEffect: -18,
          capacityEffect: 0,
          takeaway: 'Students were furious about penalties during stressful exam weeks; word-of-mouth sentiment plunged.',
        },
      ],
    },
  ],
  teamRoster: [
    {
      id: 'team-sust-tara',
      role: 'Operations',
      title: 'Circulation & Sanitization Lead',
      name: 'Tara Vats',
      strength: 'Maintains hospital-grade thermal sanitization and zero bacterial contamination.',
      limitation: 'Refuses to expand to new canteens until wash cycles meet 100% hygiene certifications.',
      assigned: true,
    },
  ],
};

export const ALL_SCENARIOS: Record<ScenarioId, ScenarioDefinition> = {
  campus_meal: SCENARIO_CAMPUS_MEAL,
  edtech: SCENARIO_EDTECH,
  sustainability: SCENARIO_SUSTAINABILITY,
  local_services: {
    ...SCENARIO_CAMPUS_MEAL,
    id: 'local_services',
    title: 'CampusFix Local Services',
    category: 'Local services',
    tagline: 'Verified on-campus tech repair, laundry, and bicycle servicing',
    summary: 'A curated marketplace connecting students with vetted local service technicians with transparent student pricing.',
    coreChallenge: 'Ensuring technician punctuality, background verification, and quality dispute management.',
  },
  creative: {
    ...SCENARIO_CAMPUS_MEAL,
    id: 'creative',
    title: 'ArtisanForge Creative Studio',
    category: 'Creative industries',
    tagline: 'Student artist merchandising, print-on-demand & festival popups',
    summary: 'Empower student designers and creators to monetize their merchandise, art prints, and apparel without high inventory risk.',
    coreChallenge: 'Balancing upfront printing production costs against unpredictable artistic demand.',
  },
};

export const ALL_PROBLEMS: ProblemOption[] = Object.values(ALL_SCENARIOS).flatMap((s) => s.problems);

export const ALL_SUPPLIER_OFFERS: SupplierNegotiationOffer[] = [
  {
    id: 'supplier-organic-coop',
    partnerName: 'GreenRoots Organic Farmers Collective',
    partnerType: 'Local Organic Collective',
    headline: 'Certified pesticide-free local produce with daily morning harvesting',
    unitCostRupees: 58,
    minimumCommitmentUnits: 60,
    paymentTerms: '50% advance upon order, 50% net-7 days',
    reliabilityRating: 5,
    sustainabilityGrade: 'A+',
    pros: [
      'Unmatched freshness & farm-to-table hygiene transparency',
      'Boosts student brand trust & willingness to pay higher price',
      'Zero plastic: all ingredients delivered in reusable jute crates',
    ],
    cons: [
      'Highest unit cost (₹58/unit vs standard ₹44/unit)',
      'Strict minimum order quantity of 60 daily units',
      'Requires upfront cash commitment each week',
    ],
    tradeoffSummary:
      'High unit cost lowers initial gross margins, but creates a premium brand reputation that protects against price wars.',
  },
  {
    id: 'supplier-wholesale-hub',
    partnerName: 'Bharat Bulk Agri & Staples Hub',
    partnerType: 'Industrial Wholesale Hub',
    headline: 'Maximum volume discounts with flexible net-30 vendor credit',
    unitCostRupees: 36,
    minimumCommitmentUnits: 200,
    paymentTerms: 'Zero upfront; 100% invoice payable at net-30 days',
    reliabilityRating: 3,
    sustainabilityGrade: 'C-',
    pros: [
      'Lowest unit cost in the region (₹36/unit allows 50%+ gross margin)',
      'Generous 30-day payment credit preserves working capital',
      'Unlimited surge capacity if demand suddenly doubles',
    ],
    cons: [
      'Heavy single-use plastic wrapping on all bulk produce',
      'Frequent 15–20% batch inconsistency in vegetable freshness',
      'Requires massive 200 unit minimum commitment that risks spoilage',
    ],
    tradeoffSummary:
      'Excellent financial runway and immediate cash flow safety, but variable freshness risks student complaints and negative reviews.',
  },
  {
    id: 'supplier-ecopack-solutions',
    partnerName: 'BioPack Circular Packaging & Provisions',
    partnerType: 'Eco Packaging Partner',
    headline: '100% compostable sugarcane bagasse trays & certified clean pantry items',
    unitCostRupees: 46,
    minimumCommitmentUnits: 100,
    paymentTerms: '20% deposit, balance net-14 days',
    reliabilityRating: 4,
    sustainabilityGrade: 'A+',
    pros: [
      'Trays decompose completely in 45 days in campus compost pits',
      'Balanced unit economics (₹46/unit gives healthy 35% margin)',
      'Strong appeal to eco-conscious university administration',
    ],
    cons: [
      'Moderate minimum commitment of 100 units/day',
      'Requires dry storage facility to prevent tray moisture softening',
      'Re-orders require 48-hour lead time notice',
    ],
    tradeoffSummary:
      'The balanced middle ground: sustainable brand positioning, solid vendor reliability, and realistic margins.',
  },
];

export const ALL_ETHICS_OPTIONS: EthicsOption[] = [
  {
    id: 'ethics-marketing',
    category: 'Honest Marketing',
    title: 'Transparent Ingredients vs Exaggerated Superfood Claims',
    description:
      'A digital marketer advises claiming your meals "guarantee a 25% boost in exam concentration and stamina" to triple click-through rates.',
    costImpact: -2000,
    reputationImpact: +18,
    satisfactionImpact: +12,
    consequenceExplanation:
      'You chose total honesty: publishing exact nutrition facts and source farms. Students respect your authentic integrity, building long-term word-of-mouth trust.',
  },
  {
    id: 'ethics-sourcing',
    category: 'Responsible Sourcing',
    title: 'Fair Farm Prices vs Uninspected Distress Liquidation',
    description:
      'A wholesale broker offers severely discounted ingredients at 60% below market, but refuses to provide safety inspection papers or farmer payment proofs.',
    costImpact: -4000,
    reputationImpact: +20,
    satisfactionImpact: +15,
    consequenceExplanation:
      'You rejected questionable liquidation stock and supported verified local growers. Zero food safety incidents occurred, safeguarding student health.',
  },
  {
    id: 'ethics-privacy',
    category: 'Customer Privacy',
    title: 'Strict Student Data Protection vs Selling Campus Lead Lists',
    description:
      'A commercial test-prep coaching chain offers ₹35,000 cash to purchase your registered student phone numbers and timetable habits.',
    costImpact: 0,
    reputationImpact: +25,
    satisfactionImpact: +20,
    consequenceExplanation:
      'You upheld strict data privacy and turned down the quick cash. Campus student council publicly commended your ethics, making your venture an official campus partner.',
  },
  {
    id: 'ethics-labor',
    category: 'Responsible Sourcing',
    title: 'Fair Living Stipends for Student Runners vs Low Piece-Rates',
    description:
      'Competitors pay ₹15 per delivery run regardless of delays or weather. Your team discusses introducing guaranteed hourly stipends plus safety insurance.',
    costImpact: -5000,
    reputationImpact: +22,
    satisfactionImpact: +18,
    consequenceExplanation:
      'Guaranteed fair stipends attracted punctual, dedicated student runners. Delivery reliability hit 98.7% and runner turnover dropped to zero.',
  },
];

export const ALL_PIVOT_OPTIONS: PivotOption[] = [
  {
    id: 'pivot-subscription',
    title: 'Hostel Semester Meal Subscription',
    badge: 'Business Model Pivot',
    description:
      'Transition from unpredictable on-demand walk-in orders to prepaid weekly and monthly lunch passes for hostellers.',
    reasoning:
      'Solves kitchen demand unpredictability and provides upfront cash before ingredients are purchased.',
    implementationCost: 8000,
    marginAdjustment: +0.08,
    appealAdjustment: +18,
    capacityAdjustment: +35,
    recordedLesson:
      'Moving to recurring subscriptions stabilized operating cash flow and reduced daily marketing spend by 60%.',
  },
  {
    id: 'pivot-specialty-diet',
    title: 'High-Protein & Clean Health Kitchen',
    badge: 'Customer Segment Pivot',
    description:
      'Reposition exclusively for college athletes, gym-goers, and fitness enthusiasts willing to pay ₹130+ for measured macronutrients.',
    reasoning:
      'Escapes low-margin commodity price wars by delivering premium value to an underserved, passionate niche.',
    implementationCost: 12000,
    marginAdjustment: +0.14,
    appealAdjustment: +12,
    capacityAdjustment: -15,
    recordedLesson:
      'Specialization allowed a 40% price premium, proving that solving a specific problem deeply beats being mediocre for everyone.',
  },
  {
    id: 'pivot-express-counter',
    title: 'Decentralized Express Drop-Boxes',
    badge: 'Distribution Channel Pivot',
    description:
      'Replace room-by-room runners with 3 temperature-controlled smart drop lockers stationed directly outside major lecture halls.',
    reasoning:
      'Eliminates delivery delays during tight 30-minute breaks and reduces runner labor costs.',
    implementationCost: 15000,
    marginAdjustment: +0.05,
    appealAdjustment: +22,
    capacityAdjustment: +60,
    recordedLesson:
      'Solving the distribution bottleneck enabled 300+ students to grab meals within 4 minutes of class dismissal.',
  },
];

export const CRISIS_EVENTS: DynamicEvent[] = [
  {
    id: 'crisis-supplier-price',
    title: 'Wholesale Supplier Price Spike (+22%)',
    badge: 'Supply Chain Crisis',
    situation:
      'Unseasonal monsoon rains flood agricultural logistics routes. Your primary ingredient supplier announces an immediate 22% price increase across fresh produce and cooking staples.',
    whyItMatters:
      'If you absorb the cost, your gross profit shrinks rapidly. If you hike prices immediately, price-sensitive students may abandon your service.',
    choices: [
      {
        id: 'absorb-reserve',
        label: 'Absorb the Spike Using Emergency Reserve',
        actionSummary:
          'Maintain your price promise to students and fund the ₹6,500 difference from your cash buffer.',
        cashEffect: -6500,
        satisfactionEffect: +10,
        capacityEffect: 0,
        takeaway:
          'Students rewarded your price stability with fierce loyalty, but your cash runway shortened by 2 weeks.',
      },
      {
        id: 'smart-substitutions',
        label: 'Redesign Menu with Resilient Seasonal Alternatives',
        actionSummary:
          'Spend ₹2,000 to re-engineer menus around abundant root vegetables and seasonal legumes without compromising nutrition.',
        cashEffect: -2000,
        satisfactionEffect: +4,
        capacityEffect: 0,
        takeaway:
          'Agile operational flexibility protected both profit margins and customer trust through creative problem solving.',
      },
      {
        id: 'direct-surcharge',
        label: 'Pass Full Price Hike to Students (+₹15/meal)',
        actionSummary:
          'Increase the retail meal price immediately to preserve your exact percentage margin.',
        cashEffect: 0,
        satisfactionEffect: -18,
        capacityEffect: -15,
        takeaway:
          'Students felt caught off-guard; campus WhatsApp groups saw complaints and active order cancellations.',
      },
    ],
  },
  {
    id: 'crisis-unexpected-demand',
    title: 'Surge Demand from Inter-College Fest (+180% Orders)',
    badge: 'Operational Bottleneck',
    situation:
      'The university cultural festival brings 2,000 visiting students to campus. Morning pre-orders spike to 280% of your maximum daily kitchen capacity.',
    whyItMatters:
      'Taking every order without capacity guarantees delayed, cold meals and operational collapse. Turning customers away leaves money and visibility on the table.',
    choices: [
      {
        id: 'surge-hire-kitchen',
        label: 'Emergency Second Kitchen Shift & Extra Runners',
        actionSummary:
          'Lease commercial prep space at the community hall for ₹8,500 and hire 4 temporary student runners.',
        cashEffect: -8500,
        satisfactionEffect: +16,
        capacityEffect: +120,
        takeaway:
          'Decisive resource scaling allowed you to fulfill 350+ meals seamlessly, cementing your brand across visiting colleges.',
      },
      {
        id: 'capped-vip-batches',
        label: 'Cap Orders at Safe Capacity & Open VIP Waitlist',
        actionSummary:
          'Accept only 120 orders to guarantee 100% hot punctuality; offer waitlisted students a 10% coupon for next week.',
        cashEffect: -1000,
        satisfactionEffect: +6,
        capacityEffect: 0,
        takeaway:
          'Quality discipline protected brand reputation, although team members regretted missing peak fest sales.',
      },
      {
        id: 'stretch-capacity',
        label: 'Force Existing Equipment & Team to Double Speed',
        actionSummary:
          'Accept all incoming orders without additional cash spend or extra equipment.',
        cashEffect: +4000,
        satisfactionEffect: -28,
        capacityEffect: +30,
        takeaway:
          'Disaster struck: 70 orders arrived 45 minutes late, food arrived squashed, and your ratings plummeted.',
      },
    ],
  },
  {
    id: 'crisis-negative-feedback',
    title: 'Viral Social Media Complaint About Late Delivery',
    badge: 'Reputation Crisis',
    situation:
      'A delivery delay caused 12 hostellers to receive lukewarm meals 20 minutes late. One student posted a blistering critique on the campus Reddit & Instagram, gaining 450 student upvotes.',
    whyItMatters:
      'In a dense campus environment, unaddressed negative feedback spreads within minutes and can permanently ruin customer acquisition.',
    choices: [
      {
        id: 'public-apology-refund',
        label: 'Full Refund, Public Transparency & Root Cause Fix',
        actionSummary:
          'Personally refund the affected students (₹1,800), publish a transparent apology explaining the transit bottleneck, and offer a free replacement.',
        cashEffect: -1800,
        satisfactionEffect: +18,
        capacityEffect: +10,
        takeaway:
          'Radical honesty transformed critics into vocal brand champions. Students praised your humble, mature leadership.',
      },
      {
        id: 'ignore-troll',
        label: 'Ignore the Post and Focus on Silent Happy Customers',
        actionSummary:
          'Do not publicly engage; treat the complaint as normal student grumbling.',
        cashEffect: 0,
        satisfactionEffect: -15,
        capacityEffect: 0,
        takeaway:
          'Silence was interpreted as arrogance. Skepticism spread among prospective subscribers.',
      },
      {
        id: 'blame-traffic',
        label: 'Defensive Statement Blaming Campus Security Gate',
        actionSummary:
          'Post a notice stating delays were caused solely by slow security guard check-ins.',
        cashEffect: 0,
        satisfactionEffect: -10,
        capacityEffect: 0,
        takeaway:
          'Passing the blame irritated both campus security and students; accountability matters in entrepreneurship.',
      },
    ],
  },
  {
    id: 'crisis-competitor-price',
    title: 'Aggressive Competitor Slashes Prices by 40%',
    badge: 'Market Competition Dilemma',
    situation:
      'A deep-pocketed rival vendor "QuickBite Express" launches a ₹49 lunch meal campaign with free soft drinks, attempting to drive you out of the campus market.',
    whyItMatters:
      'Engaging in an irrational price war burns cash quickly. Ignoring it might cause short-term student drop-off.',
    choices: [
      {
        id: 'highlight-nutrition',
        label: 'Launch "Clean Nutrition vs Junk" Transparency Campaign',
        actionSummary:
          'Invest ₹3,000 in comparative flyers detailing your farm-fresh ingredients, zero palm oil, and high protein vs deep-fried competitor filler.',
        cashEffect: -3000,
        satisfactionEffect: +14,
        capacityEffect: +15,
        takeaway:
          'Smart differentiation won: health-conscious students and faculty boycotted QuickBite and backed your mission.',
      },
      {
        id: 'destructive-price-match',
        label: 'Match Price to ₹45 (Uncapped Price War)',
        actionSummary:
          'Slash your meal price to ₹45 to beat QuickBite, losing ₹12 on every single meal served.',
        cashEffect: -14000,
        satisfactionEffect: +8,
        capacityEffect: +20,
        takeaway:
          'Order volume was enormous, but you burned ₹14,000 in 10 days. Paper-thin margins brought your venture close to insolvency.',
      },
      {
        id: 'loyalty-perks',
        label: 'Introduce 10-Meal Loyalty Punch-Card with Free Fruit',
        actionSummary:
          'Keep your regular price intact; reward existing subscribers with guaranteed daily fresh fruit and free weekend dessert.',
        cashEffect: -2500,
        satisfactionEffect: +12,
        capacityEffect: 0,
        takeaway:
          'Retention strategy succeeded. Over 88% of your core subscribers stayed loyal despite rival discount stunts.',
      },
    ],
  },
  {
    id: 'crisis-unexpected-expense',
    title: 'Commercial Cold-Storage Compressor Breakdown',
    badge: 'Equipment Emergency',
    situation:
      'The primary commercial refrigeration unit in your prep kitchen breaks down on Thursday evening with ₹18,000 worth of perishable dairy, paneer, and fresh greens inside.',
    whyItMatters:
      'Without immediate action, all stock spoils overnight, forcing a weekend shutdown and severe financial loss.',
    choices: [
      {
        id: 'emergency-technician',
        label: 'Emergency Technician Repair & Backup Dry Ice Rental',
        actionSummary:
          'Spend ₹5,200 for immediate 2-hour technician dispatch and dry ice cooling chests to preserve 100% of inventory.',
        cashEffect: -5200,
        satisfactionEffect: +5,
        capacityEffect: 0,
        takeaway:
          'Quick proactive crisis management saved ₹18,000 worth of stock and kept morning dispatch perfectly on schedule.',
      },
      {
        id: 'flash-sale-cook',
        label: 'Emergency Overnight Curry & Stew Flash Sale',
        actionSummary:
          'Cook perishable ingredients immediately into hearty hostel dinner bowls and sell them at ₹50 for late-night study groups.',
        cashEffect: +3500,
        satisfactionEffect: +15,
        capacityEffect: +20,
        takeaway:
          'Incredible entrepreneurial agility turned a potential disaster into ₹3,500 cash and thrilled night-owl hostellers!',
      },
      {
        id: 'delay-till-morning',
        label: 'Wait for Regular Friday Working Hours Technician',
        actionSummary:
          'Attempt to save emergency technician fees by waiting until 10:00 AM Friday.',
        cashEffect: -12000,
        satisfactionEffect: -20,
        capacityEffect: -30,
        takeaway:
          'Tragic false economy: 70% of perishable ingredients spoiled overnight, forcing meal cancellations on Friday.',
      },
    ],
  },
  {
    id: 'crisis-partnership-offer',
    title: 'University Sports Council Exclusive Catering Proposal',
    badge: 'Strategic Partnership',
    situation:
      'The university athletics director offers your venture an exclusive 3-month contract to provide post-training recovery meals for 85 varsity student athletes.',
    whyItMatters:
      'Guarantees massive recurring revenue, but requires strict protein certification, rigid 6:00 AM delivery, and a ₹10,000 refundable performance bond.',
    choices: [
      {
        id: 'accept-partnership-bond',
        label: 'Sign Agreement, Post Bond & Partner with Sports Council',
        actionSummary:
          'Deposit ₹10,000 bond, adjust morning prep shift to 5:00 AM, and deliver certified athletic nutrition.',
        cashEffect: -10000,
        satisfactionEffect: +22,
        capacityEffect: +85,
        takeaway:
          'Transformational growth: recurring varsity contracts created stable monthly revenue and university-wide prestige.',
      },
      {
        id: 'negotiate-trial',
        label: 'Counter-Offer: 2-Week Pilot Without Upfront Bond',
        actionSummary:
          'Propose a 14-day trial for the swim and basketball teams first before committing the entire venture.',
        cashEffect: -2000,
        satisfactionEffect: +12,
        capacityEffect: +30,
        takeaway:
          'Prudent risk management: successfully validated morning kitchen workflows without tying up precious startup cash.',
      },
      {
        id: 'decline-partnership',
        label: 'Decline to Protect Core Hostel Customer Focus',
        actionSummary:
          'Politely pass on the contract to prevent distracting the team from general student lunch operations.',
        cashEffect: 0,
        satisfactionEffect: 0,
        capacityEffect: 0,
        takeaway:
          'Maintained laser focus on your core product, avoiding operational overextension.',
      },
    ],
  },
];

export const CLASSROOM_CHALLENGES: ClassroomChallengeScenario[] = [
  {
    id: 'challenge-bootstrap',
    title: 'The Shoestring Bootstrap Challenge',
    difficulty: 'Intermediate',
    curriculumContext: 'Unit 3: Financial Prudence & Lean Startup Methodology',
    description:
      'Launch and validate a viable campus venture with a severely restricted starting budget of only ₹35,000. Every single rupee spent must directly validate customer demand.',
    startingBudget: 35000,
    specialConstraint:
      'Total budget capped at ₹35,000. Emergency reserves cannot fall below ₹8,000.',
    targetGoal:
      'Reach operational break-even while sustaining customer satisfaction above 82%.',
    discussionQuestions: [
      'What core product features did you deliberately cut to survive within ₹35,000?',
      'How does limited working capital change your marketing channel selection?',
      'Why is customer word-of-mouth far more critical when marketing budgets are minimal?',
    ],
  },
  {
    id: 'challenge-supply-shock',
    title: 'The Supply Chain Shock Simulator',
    difficulty: 'Advanced',
    curriculumContext: 'Unit 5: Operations Management & Crisis Resilience',
    description:
      'Navigate unpredictable raw material shortages and sudden +35% wholesale price spikes while maintaining delivery punctuality during university exams.',
    startingBudget: 90000,
    specialConstraint:
      'Wholesale supplier costs are elevated by 25%. Crisis events trigger early in the journey.',
    targetGoal:
      'Survive two consecutive crisis events without dropping customer satisfaction below 75%.',
    discussionQuestions: [
      'Did your venture choose to absorb supplier price shocks or pass them to customers?',
      'How does menu or product flexibility protect margins during unexpected inflation?',
      'What operational metrics provide the earliest warning of supply chain strain?',
    ],
  },
  {
    id: 'challenge-price-war',
    title: 'Intense Competitor Price War',
    difficulty: 'Intermediate',
    curriculumContext: 'Unit 4: Competitive Strategy & Value Differentiation',
    description:
      'An aggressive discount competitor enters your campus, undercutting your prices by 35%. Prove that customer loyalty and superior quality beat cheap imitation.',
    startingBudget: 80000,
    specialConstraint:
      'Competitor QuickBite actively advertises ₹49 meals across campus WhatsApp channels.',
    targetGoal:
      'Maintain positive gross margin above 25% and achieve an investor rubric score of 80+.',
    discussionQuestions: [
      'Why is matching a competitor into an uncapped price war usually suicidal for startups?',
      'What unique value proposition convinced customers to pay higher prices for your venture?',
      'How does authentic transparency build a moat that competitors cannot easily copy?',
    ],
  },
  {
    id: 'challenge-sustainability',
    title: 'The 100% Circular Campus Venture',
    difficulty: 'Advanced',
    curriculumContext: 'Unit 6: Business Ethics, ESG & Environmental Stewardship',
    description:
      'Build an environmentally regenerative campus enterprise. You must achieve zero single-use plastic, source exclusively from verified ethical growers, and pay fair student wages.',
    startingBudget: 110000,
    specialConstraint:
      'All packaging must maintain Grade A+ eco-certification. Minimum runner pay is guaranteed.',
    targetGoal:
      'Attain a Business Reputation score of 90+ while achieving sustainable profitability.',
    discussionQuestions: [
      'Does environmental sustainability necessarily conflict with financial profitability?',
      'How willing are Gen-Z student consumers to support transparently ethical businesses?',
      'What long-term cost efficiencies emerge from reusable, circular packaging systems?',
    ],
  },
];

