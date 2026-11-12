import type { MentorTip, SimulationLocationId, SimulationState } from './types';

export const MENTOR_PERSONA = {
  name: 'Mentor Priya',
  title: 'VentureLab Senior Entrepreneurship Advisor & Educator',
  role: 'VentureLab Senior Entrepreneurship Advisor',
  avatarTitle: 'Founder in Residence & High-School Educator',
  quote: 'Great ventures are not built on luck—they are built by observing student pain, testing quickly, and learning from trade-offs.',
  disclaimer: 'Educational simulation advice based on business model principles; not real-world financial or legal counsel.',
};

export const MENTOR_PROFILE = MENTOR_PERSONA;

export const MENTOR_TIPS: Record<SimulationLocationId, MentorTip> = {
  startup_studio: {
    id: 'tip_studio',
    locationId: 'startup_studio',
    trigger: 'Initial Venture Mission & Setup',
    headline: 'Start with Clarity: Define Who You Are Serving',
    explanation:
      'Founders often want to jump straight to building an app or designing a logo. But the strongest startups begin with a clear, specific mission: which student problem are you obsessed with solving?',
    conceptDefinition: {
      term: 'Value Proposition',
      explanation: 'The primary reason a customer chooses your product over existing alternatives — what friction do you remove for them?',
    },
    reflectiveQuestion: 'If you had to summarize the core benefit of your venture in one single sentence, what would it be?',
    alternativeConsideration: 'Notice how narrowing your initial customer group makes marketing and product design far simpler.',
  },
  customer_discovery: {
    id: 'tip_discovery',
    locationId: 'customer_discovery',
    trigger: 'Problem Evaluation Framework',
    headline: 'High Severity + High Frequency = Strong Business Potential',
    explanation:
      'Not all complaints make viable ventures. You want problems that occur frequently (e.g. daily lunch) and cause genuine pain (e.g. empty wallets, missed lecture breaks). A severity rating of 4 or 5 indicates students are willing to pay for relief.',
    conceptDefinition: {
      term: 'Total Addressable Market (TAM)',
      explanation: 'The total number of potential customers who experience the specific problem you are targeting.',
    },
    reflectiveQuestion: 'Are you choosing this problem because you personally find it interesting, or because you observed real friction among students?',
    alternativeConsideration: 'A smaller problem that occurs every day is often easier to monetize than a huge problem that happens once a year.',
  },
  customer_insights: {
    id: 'tip_insights',
    locationId: 'customer_insights',
    trigger: 'Customer Interviews & Empathy Mapping',
    headline: 'Listen for Habits and Current Workarounds, Not Just Politeness',
    explanation:
      'When you ask customers "Would you buy my app?", they usually say "Yes" to be nice! Instead, ask what they did yesterday, what they actually spent money on, and where they faced delays.',
    conceptDefinition: {
      term: 'Customer Discovery Bias',
      explanation: 'The tendency for interviewees to give agreeable answers rather than reflecting their true purchasing behavior.',
    },
    reflectiveQuestion: 'What surprised you most about the student personas you interviewed?',
    alternativeConsideration: 'Notice how day scholars and hostel students have conflicting meal budgets and pickup constraints.',
  },
  product_dev: {
    id: 'tip_product',
    locationId: 'product_dev',
    trigger: 'MVP Development & Feature Trade-offs',
    headline: 'The Danger of Feature Bloat: Focus on the Core Loop',
    explanation:
      'Every feature you build costs development points and introduces operational complexity. An MVP (Minimum Viable Product) only includes the 1–2 features needed to solve the core problem.',
    conceptDefinition: {
      term: 'Minimum Viable Product (MVP)',
      explanation: 'The simplest version of a product that allows you to collect the maximum amount of validated customer feedback with the least effort.',
    },
    reflectiveQuestion: 'If you could launch with only ONE feature, which one directly solves the lunchtime problem?',
    alternativeConsideration: 'Negotiating payment terms with a supplier can preserve cash just as effectively as cutting dev features.',
  },
  finance_center: {
    id: 'tip_finance',
    locationId: 'finance_center',
    trigger: 'Capital Allocation & Cash Runway',
    headline: 'Profit is Theory; Cash is Reality',
    explanation:
      'You can have high projected sales on paper, but if you run out of cash before customer payments arrive, the venture shuts down. Your emergency reserve is your insurance policy against supplier inflation and broken equipment.',
    conceptDefinition: {
      term: 'Cash Runway',
      explanation: 'The number of months your startup can continue operating before running out of money, calculated as Cash Balance ÷ Monthly Burn Rate.',
    },
    reflectiveQuestion: 'How many months of runway do you have if sales drop by 50% next week?',
    alternativeConsideration: 'Spending heavily on marketing before your kitchen can fulfill orders will burn both cash and customer goodwill.',
  },
  marketing_studio: {
    id: 'tip_marketing',
    locationId: 'marketing_studio',
    trigger: 'Customer Acquisition Cost (CAC)',
    headline: 'Do Not Confuse Awareness with Real Conversion',
    explanation:
      'Getting 2,000 views on an Instagram reel means nothing if zero students actually subscribe. Campus WhatsApp student ambassadors usually yield a much higher conversion rate because students trust their peers.',
    conceptDefinition: {
      term: 'Customer Acquisition Cost (CAC)',
      explanation: 'The total marketing spend divided by the number of paying customers acquired through that channel.',
    },
    reflectiveQuestion: 'Is your CAC low enough that you make a profit on each student over their monthly subscription pass?',
    alternativeConsideration: 'Word-of-mouth is the cheapest marketing channel, but it requires that your first 20 meals arrive hot and on time.',
  },
  business_challenge: {
    id: 'tip_crisis',
    locationId: 'business_challenge',
    trigger: 'Crisis Management & Operational Resilience',
    headline: 'Protect Customer Trust First; Absorb the Shock Second',
    explanation:
      'When demand surges or wholesale prices spike, novice founders often cut corners or blame customers. Strong founders communicate transparently, protect the user experience, and use cash reserves to weather the storm.',
    conceptDefinition: {
      term: 'Operational Bottleneck',
      explanation: 'The single slowest step in your fulfillment process (e.g. food packing table) that limits the entire business from scaling.',
    },
    reflectiveQuestion: 'Did your crisis response protect your long-term reputation or merely save a small amount of money today?',
    alternativeConsideration: 'Capping orders and putting students on a waitlist creates demand and protects quality, whereas delayed meals destroy trust.',
  },
  operations_center: {
    id: 'tip_ops',
    locationId: 'operations_center',
    trigger: 'Capacity Scaling Dilemma',
    headline: 'Scaling Operations Requires Disciplined Unit Economics',
    explanation:
      'Expanding kitchen capacity costs money. Make sure your daily orders are consistently bottlenecked before committing ₹15,000 to second-shift lease agreements.',
    conceptDefinition: {
      term: 'Fulfillment Rate',
      explanation: 'The percentage of received customer orders that are completed and delivered satisfactorily.',
    },
    reflectiveQuestion: 'Can your current team pack 140 lunches in a 35-minute lecture break without compromising hygiene?',
    alternativeConsideration: 'Improving operational efficiency often boosts capacity by 20% without needing to lease additional space.',
  },
  competition_hub: {
    id: 'tip_competition',
    locationId: 'competition_hub',
    trigger: 'Competitor Price Slashing Response',
    headline: 'Never Fight a Price War You Cannot Afford to Win',
    explanation:
      'When QuickBite slashes meals to ₹59, they are trying to bleed your cash reserves. If you drop your price to ₹59 too, your 26% margin becomes negative! Win with punctual drop-boxes and hot food, not suicidal discounts.',
    conceptDefinition: {
      term: 'Competitive Moat',
      explanation: 'A sustainable business advantage that makes it difficult for rivals to copy your offering or steal your customers.',
    },
    reflectiveQuestion: 'What makes a student stick with your meal service even if a competitor is ₹10 cheaper?',
    alternativeConsideration: 'Focusing on a tight niche (e.g. clean home-cooked dal-roti) makes rival fast-food discounting irrelevant.',
  },
  investor_arena: {
    id: 'tip_pitch',
    locationId: 'investor_arena',
    trigger: 'Final Investor Presentation & Defense',
    headline: 'Investors Back Founders Who Know Their Numbers and Admit Trade-offs',
    explanation:
      'Do not pretend your venture was 100% flawless. Investors respect founders who can say: "We faced a capacity crunch, we chose to protect food warmth over order volume, and here is how our unit economics survived."',
    conceptDefinition: {
      term: 'Unit Economics',
      explanation: 'The direct revenues and costs associated with producing and delivering one single unit (e.g. one meal pass).',
    },
    reflectiveQuestion: 'What was your biggest mistake during the simulation, and what did it teach you about entrepreneurship?',
    alternativeConsideration: 'Review your 6-criteria rubric before starting the pitch to ensure you covered both the financial plan and risks.',
  },
};

export const LOCATION_MENTOR_TIPS: MentorTip[] = Object.values(MENTOR_TIPS);

/**
 * Helper to get contextual feedback based on the student's live simulation state
 */
export function getContextualMentorFeedback(state: SimulationState): {
  headline: string;
  feedback: string;
  explanation: string;
  recommendation: string;
  reflectiveQuestion: string;
  alternativeConsideration: string;
} {
  const { budget, remainingCash, customerSatisfaction } = {
    budget: state.budget,
    remainingCash: state.budget.emergencyReserve,
    customerSatisfaction: 75,
  };

  if (state.budget.emergencyReserve < 4000) {
    return {
      headline: 'Low Cash Buffer Warning',
      feedback:
        'You have less than ₹4,000 in emergency reserves. If a supplier raises prices or an order arrives damaged, you may run out of money.',
      explanation:
        'Cash runway is what keeps a startup alive when unforeseen supply delays or price hikes happen.',
      recommendation:
        'Consider shifting a small portion of marketing budget to your emergency reserve before heading into the crisis challenge.',
      reflectiveQuestion:
        'If a key supplier raises prices by 20% tomorrow, how many weeks could your venture survive without running out of cash?',
      alternativeConsideration:
        'Building a smaller initial batch protects working capital until repeat order volumes are proven.',
    };
  }

  if (state.selectedOperationsChoice === 'overload') {
    return {
      headline: 'Staff Overload Alert',
      feedback:
        'Overworking your kitchen staff has strained order punctuality. Student satisfaction dropped because deliveries are missing break timings.',
      explanation:
        'Pushing past 100% operational capacity leads to late orders, high error rates, and team exhaustion.',
      recommendation:
        'In your investor pitch, explain how you will address team burnout and invest in automated prep equipment.',
      reflectiveQuestion:
        'Is it better to cap orders at 100 meals with five-star reviews or deliver 150 meals late and cold?',
      alternativeConsideration:
        'Staggered batch deliveries or express pickup lockers can ease peak break rush hour.',
    };
  }

  if (state.activePivot) {
    return {
      headline: 'Strategic Pivot In Motion',
      feedback:
        `You successfully pivoted to "${state.activePivot.title}". This preserved your margin and realigned your product with actual student demand.`,
      explanation:
        'Pivoting when unit economics or customer habits disagree with your thesis is the hallmark of resilient founders.',
      recommendation:
        'Highlight this pivot prominently on Slide 4 of your final pitch deck to show investor personas your adaptability.',
      reflectiveQuestion:
        'What specific customer friction or data point gave you the conviction to change direction?',
      alternativeConsideration:
        'Ensure existing loyal customers understand the transition so you retain their trust and subscriptions.',
    };
  }

  return {
    headline: 'Venture Strategy on Track',
    feedback:
      'Your budget allocation and product choices reflect a steady balance between marketing reach and operational capacity.',
    explanation:
      'Maintaining disciplined unit margins allows you to reinvest in customer loyalty without taking on unmanageable debt.',
    recommendation:
      'Proceed to your next active mission in the mission tracker to stress-test your business model.',
    reflectiveQuestion:
      'What is your primary competitive moat if another team launches an identical service next term?',
    alternativeConsideration:
      'Direct WhatsApp peer ambassador referral loops can drive organic word-of-mouth with near-zero CAC.',
  };
}
