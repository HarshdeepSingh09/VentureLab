import type { LearningModuleDefinition, LearningModuleId } from './types';

export const ALL_LEARNING_MODULES: LearningModuleDefinition[] = [
  {
    id: 'mod_1_problem_discovery',
    order: 1,
    title: '1. Problem Discovery',
    shortTitle: 'Problem',
    locationId: 'customer_discovery',
    learningObjective:
      'Identify genuine customer pain points that occur with high frequency and high severity rather than superficial complaints.',
    beginnerExplanation:
      'Successful startups do not begin with an app or a catchy logo; they begin by observing real friction in daily life. We evaluate problems by how frequently they happen and how intensely they affect people.',
    interactiveActivityTitle: 'Problem Discovery & Severity Evaluation',
    interactiveActivityDescription:
      'Analyze four distinct campus problems. Compare their severity (1–5) and customer willingness to pay to select a validated foundation for your venture.',
    meaningfulDecisionTask:
      'Select your core venture problem and articulate why students experience genuine friction in their current workaround.',
    feedbackGuidance:
      'High severity + high frequency creates the strongest business foundation because customers actively search and budget for relief.',
    reflectionQuestion:
      'Why is a frequent daily friction (such as lunch break delays) often easier to monetize than a problem that only happens once a year?',
    reflectionPromptPlaceholder:
      'Reflect on why frequency and severity drive customer willingness to pay for your chosen problem...',
    assessmentCompetency: 'problem_identification',
  },
  {
    id: 'mod_2_customer_research',
    order: 2,
    title: '2. Customer Research & Personas',
    shortTitle: 'Customers',
    locationId: 'customer_insights',
    learningObjective:
      'Uncover customer habits, existing workarounds, and real spending constraints through simulated empathy interviews.',
    beginnerExplanation:
      'When you ask customers "Would you buy my app?", they usually say "Yes" out of politeness! True research asks what they did yesterday, what they actually spent money on, and where they faced delays.',
    interactiveActivityTitle: 'Persona Empathy Interviews & Segment Designation',
    interactiveActivityDescription:
      'Ask targeted questions across four student personas (Hostel Resident, Day Scholar, Faculty, Budget Student). Identify conflicting constraints and designate your primary target segment.',
    meaningfulDecisionTask:
      'Select your target customer segment and explain how their specific habits differ from other campus groups.',
    feedbackGuidance:
      'Narrowing your initial customer segment makes product design and marketing far simpler and prevents wasted capital.',
    reflectionQuestion:
      'What is the danger of asking customers hypothetical questions ("Would you pay ₹95?") instead of behavioral questions ("What did you do for lunch yesterday?")?',
    reflectionPromptPlaceholder:
      'Explain how customer interview insights helped you define your specific target audience...',
    assessmentCompetency: 'customer_understanding',
  },
  {
    id: 'mod_3_idea_development',
    order: 3,
    title: '3. Idea Development & Mission',
    shortTitle: 'Ideation',
    locationId: 'startup_studio',
    learningObjective:
      'Formulate a focused venture mission and value proposition that directly eliminates observed customer friction.',
    beginnerExplanation:
      'An idea is an unproven hypothesis. A strong business idea clearly defines who you serve, what primary benefit you deliver, and what alternative you replace.',
    interactiveActivityTitle: 'Venture Mission & Concept Framing',
    interactiveActivityDescription:
      'Review three distinct business model concepts tailored to your chosen problem. Evaluate baseline margins, operational challenges, and target customer quotes.',
    meaningfulDecisionTask:
      'Formulate your venture name, mission statement, and select the core business model concept.',
    feedbackGuidance:
      'A sharp value proposition allows anyone to understand the primary benefit of your venture in under ten seconds.',
    reflectionQuestion:
      'If you had to summarize your venture\'s primary benefit in one single sentence for a classmate, what would you say?',
    reflectionPromptPlaceholder:
      'Write your one-sentence core value proposition and explain why customers will choose it...',
    assessmentCompetency: 'solution_design',
  },
  {
    id: 'mod_4_product_design',
    order: 4,
    title: '4. Product or Service Design',
    shortTitle: 'Product MVP',
    locationId: 'product_dev',
    learningObjective:
      'Define a Minimum Viable Product (MVP) by balancing customer value against development costs and operational complexity.',
    beginnerExplanation:
      'Novice founders often try to launch with ten complex features. An MVP contains only the essential 1–2 features needed to solve the core problem and collect validated feedback with minimal cash burn.',
    interactiveActivityTitle: 'MVP Feature Scope & Supplier Negotiation',
    interactiveActivityDescription:
      'Allocate 100 development points across feature options. Then, negotiate commercial terms (unit cost, MOQs, Net-30 payment credit) with three fictional suppliers.',
    meaningfulDecisionTask:
      'Finalize your launch MVP feature set and sign a commercial partnership agreement with your chosen supplier.',
    feedbackGuidance:
      'Every extra feature costs dev points and introduces operational bugs. Prioritizing launch speed over feature bloat preserves runway.',
    reflectionQuestion:
      'Why does building too many features before launch increase both financial burn rate and operational failure risk?',
    reflectionPromptPlaceholder:
      'Describe why you chose your specific MVP features and supplier terms over more complex alternatives...',
    assessmentCompetency: 'solution_design',
  },
  {
    id: 'mod_5_business_model',
    order: 5,
    title: '5. Business Model & Ethics',
    shortTitle: 'Business Model',
    locationId: 'business_challenge',
    learningObjective:
      'Establish sustainable unit economics and navigate ethical, ESG, and business trade-offs under real-world pressure.',
    beginnerExplanation:
      'A business model defines how your venture creates, delivers, and captures value. True leadership means defending brand trust and ethics even when short-term cost-cutting is tempting.',
    interactiveActivityTitle: 'Crisis Simulation & Responsible Governance',
    interactiveActivityDescription:
      'Face sudden business crises (supplier price increases, demand spikes, competitor price wars). Select your response and configure ethical policies for sourcing and data privacy.',
    meaningfulDecisionTask:
      'Resolve the operational crisis and commit to corporate ESG policies that protect student trust.',
    feedbackGuidance:
      'Ethical policies may carry small cost impacts, but they safeguard your brand reputation and prevent catastrophic customer churn.',
    reflectionQuestion:
      'When short-term cost savings conflict with customer trust or fair supplier pay, how should a founder decide?',
    reflectionPromptPlaceholder:
      'Reflect on how your crisis response and ethics policies balance short-term margins against long-term brand reputation...',
    assessmentCompetency: 'decision_making',
  },
  {
    id: 'mod_6_financial_planning',
    order: 6,
    title: '6. Financial Planning & Survival',
    shortTitle: 'Finance',
    locationId: 'finance_center',
    learningObjective:
      'Distinguish revenue, gross margin, operating expenses, and cash runway to ensure business survival under uncertainty.',
    beginnerExplanation:
      'Profit is an accounting formula; cash is the oxygen that keeps your startup alive. If your cash reaches zero before customer payments arrive, the venture shuts down regardless of paper profits.',
    interactiveActivityTitle: 'Seed Capital Allocation & Survival Ledger',
    interactiveActivityDescription:
      'Allocate your ₹1,00,000 seed budget across product, marketing, operations, customer support, and emergency cash reserves. Inspect the live Cash vs Accounting Profit ledger.',
    meaningfulDecisionTask:
      'Lock in your budget allocation and ensure you retain at least 2.5 months of emergency cash runway.',
    feedbackGuidance:
      'An emergency cash reserve is your insurance policy against supplier inflation, broken equipment, and delayed customer payments.',
    reflectionQuestion:
      'Why can a startup with high projected paper profits still face sudden bankruptcy if it runs out of cash runway?',
    reflectionPromptPlaceholder:
      'Explain your capital allocation strategy and why you chose your specific emergency cash buffer...',
    assessmentCompetency: 'financial_reasoning',
  },
  {
    id: 'mod_7_marketing_strategy',
    order: 7,
    title: '7. Marketing Strategy & CAC',
    shortTitle: 'Marketing',
    locationId: 'marketing_studio',
    learningObjective:
      'Identify cost-effective customer acquisition channels and calculate realistic Customer Acquisition Cost (CAC).',
    beginnerExplanation:
      'Social media views and likes do not pay rent. Effective marketing creates repeatable acquisition channels where the gross profit earned from each customer exceeds the cost spent to acquire them.',
    interactiveActivityTitle: 'Multi-Channel Acquisition Mix & Unit CAC',
    interactiveActivityDescription:
      'Distribute marketing funds across student ambassadors, WhatsApp broadcast groups, campus flyers, and tasting kiosks. Compare cost per unit, reach, and conversion rates.',
    meaningfulDecisionTask:
      'Finalize your acquisition channel mix to maximize paying customer subscribers while maintaining a sustainable CAC.',
    feedbackGuidance:
      'Direct peer recommendations usually achieve significantly higher conversion rates than passive print flyers because students trust fellow classmates.',
    reflectionQuestion:
      'Why is Customer Acquisition Cost (CAC) such a critical metric when deciding whether to scale up marketing spend?',
    reflectionPromptPlaceholder:
      'Discuss which marketing channels proved most cost-effective for reaching your target student segment...',
    assessmentCompetency: 'communication',
  },
  {
    id: 'mod_8_business_operations',
    order: 8,
    title: '8. Business Operations & Capacity',
    shortTitle: 'Operations',
    locationId: 'operations_center',
    learningObjective:
      'Balance daily fulfillment capacity with customer demand to prevent operational bottlenecks and protect service quality.',
    beginnerExplanation:
      'Surging customer demand is dangerous if your operations cannot fulfill orders on time. Pushing staff beyond 100% capacity leads to late orders, high error rates, team burnout, and lost customers.',
    interactiveActivityTitle: 'Fulfillment Capacity Stress-Test',
    interactiveActivityDescription:
      'Evaluate your order fulfillment pipeline against lunchtime break constraints. Decide whether to cap orders, lease extra equipment, or optimize batch prep workflows.',
    meaningfulDecisionTask:
      'Select your operational capacity scaling strategy to maintain a fulfillment rate above 85%.',
    feedbackGuidance:
      'Capping orders and maintaining a waitlist protects customer satisfaction, whereas delivering cold or late meals destroys brand trust.',
    reflectionQuestion:
      'Is it better to cap daily orders at 100 with 100% on-time delivery or accept 200 orders with 35% late deliveries? Explain your reasoning.',
    reflectionPromptPlaceholder:
      'Reflect on how operational capacity limits influenced your venture’s customer satisfaction rating...',
    assessmentCompetency: 'decision_making',
  },
  {
    id: 'mod_9_pitch_presentation',
    order: 9,
    title: '9. Pitch Presentation & Defense',
    shortTitle: 'Pitch Arena',
    locationId: 'investor_arena',
    learningObjective:
      'Synthesize business decisions into a cohesive 11-slide pitch deck and defend unit economics under transparent rubric evaluation.',
    beginnerExplanation:
      'A great pitch does not hide trade-offs or pretend a venture is flawless. Investors back founders who know their numbers, admit past operational bottlenecks, and articulate clear plans to mitigate risk.',
    interactiveActivityTitle: '11-Slide Deck Presentation & Panel Defense',
    interactiveActivityDescription:
      'Present your complete pitch deck to simulated investor archetypes. Receive transparent scoring across 6 evaluation criteria and unlock your deterministic venture ending.',
    meaningfulDecisionTask:
      'Deliver your pitch defense and review your score breakdown across Problem, Solution, Finance, Operations, Strategy, and ESG.',
    feedbackGuidance:
      'Articulating what you learned from simulation challenges demonstrates executive maturity and strategic adaptability.',
    reflectionQuestion:
      'Why do experienced investors value founders who honestly explain their past mistakes and risks over those who promise guaranteed success?',
    reflectionPromptPlaceholder:
      'Summarize the core argument you presented in your pitch and how you defended your unit economics...',
    assessmentCompetency: 'communication',
  },
  {
    id: 'mod_10_reflection_review',
    order: 10,
    title: '10. Reflection & Capstone Portfolio',
    shortTitle: 'Reflection',
    locationId: 'reflection_review',
    learningObjective:
      'Evaluate personal learning growth, analyze counterfactual "What-If" decisions, and export a complete venture portfolio.',
    beginnerExplanation:
      'Entrepreneurship is fundamentally an experiential learning journey. Reviewing what worked, what failed, and what you would do differently develops resilience and critical thinking for any future career.',
    interactiveActivityTitle: 'Counterfactual Retrospective & Portfolio Export',
    interactiveActivityDescription:
      'Review your complete decision timeline alongside alternative "What-If" scenarios. Verify your 4-level rubric assessment and generate a classroom-ready PDF venture portfolio.',
    meaningfulDecisionTask:
      'Complete your capstone reflection and generate your formal VentureLab Entrepreneurship Portfolio.',
    feedbackGuidance:
      'Reflecting on alternative counterfactual choices cements lasting mental models of cause, effect, and resource trade-offs.',
    reflectionQuestion:
      'Looking back across all ten modules, what was the most surprising trade-off you encountered, and what did it teach you about building a business?',
    reflectionPromptPlaceholder:
      'Synthesize your biggest takeaways from the simulation and how your understanding of entrepreneurship evolved...',
    assessmentCompetency: 'reflection',
  },
];

export const MODULE_MAP: Record<LearningModuleId, LearningModuleDefinition> = 
  ALL_LEARNING_MODULES.reduce((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {} as Record<LearningModuleId, LearningModuleDefinition>);

export const LOCATION_TO_MODULE_MAP: Record<string, LearningModuleDefinition> = {
  customer_discovery: MODULE_MAP.mod_1_problem_discovery,
  customer_insights: MODULE_MAP.mod_2_customer_research,
  startup_studio: MODULE_MAP.mod_3_idea_development,
  product_dev: MODULE_MAP.mod_4_product_design,
  business_challenge: MODULE_MAP.mod_5_business_model,
  finance_center: MODULE_MAP.mod_6_financial_planning,
  marketing_studio: MODULE_MAP.mod_7_marketing_strategy,
  operations_center: MODULE_MAP.mod_8_business_operations,
  competition_hub: MODULE_MAP.mod_8_business_operations,
  investor_arena: MODULE_MAP.mod_9_pitch_presentation,
  reflection_review: MODULE_MAP.mod_10_reflection_review,
};
