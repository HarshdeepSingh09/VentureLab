export type BusinessCategory = 
  | 'Technology'
  | 'Food and hospitality'
  | 'Education'
  | 'Sustainability'
  | 'Health and wellness'
  | 'Local services'
  | 'Creative industries';

export type ScenarioId = 
  | 'campus_meal'
  | 'edtech'
  | 'sustainability'
  | 'local_services'
  | 'creative';

export type SimulationLocationId = 
  | 'startup_studio'
  | 'customer_discovery'
  | 'customer_insights'
  | 'product_dev'
  | 'finance_center'
  | 'marketing_studio'
  | 'operations_center'
  | 'business_challenge'
  | 'competition_hub'
  | 'investor_arena'
  | 'reflection_review';

export type LearningModuleId =
  | 'mod_1_problem_discovery'
  | 'mod_2_customer_research'
  | 'mod_3_idea_development'
  | 'mod_4_product_design'
  | 'mod_5_business_model'
  | 'mod_6_financial_planning'
  | 'mod_7_marketing_strategy'
  | 'mod_8_business_operations'
  | 'mod_9_pitch_presentation'
  | 'mod_10_reflection_review';

export type AssessmentCompetencyId =
  | 'problem_identification'
  | 'customer_understanding'
  | 'solution_design'
  | 'financial_reasoning'
  | 'decision_making'
  | 'communication'
  | 'reflection';

export type RubricLevel = 'Beginning' | 'Developing' | 'Proficient' | 'Advanced';

export interface CompetencyAssessmentItem {
  competencyId: AssessmentCompetencyId;
  title: string;
  level: RubricLevel;
  score: number; // 1 to 4
  maxScore: 4;
  rubricDescriptor: string;
  supportingEvidence: string;
  formativeFeedback: string;
}

export interface StudentAssessmentReport {
  totalScore: number; // out of 28
  averageLevel: RubricLevel;
  competencies: CompetencyAssessmentItem[];
  overallEvaluationSummary: string;
  suggestedTeacherSupportAreas: string[];
}

export interface LearningModuleDefinition {
  id: LearningModuleId;
  order: number;
  title: string;
  shortTitle: string;
  locationId: SimulationLocationId;
  learningObjective: string;
  beginnerExplanation: string;
  interactiveActivityTitle: string;
  interactiveActivityDescription: string;
  meaningfulDecisionTask: string;
  feedbackGuidance: string;
  reflectionQuestion: string;
  reflectionPromptPlaceholder: string;
  assessmentCompetency: AssessmentCompetencyId;
}

export type GraphicsQualityMode = 'high' | 'balanced' | 'low';

export type MissionId =
  | 'find_problem'
  | 'interview_customers'
  | 'design_product'
  | 'plan_budget'
  | 'first_customers'
  | 'business_crisis'
  | 'respond_competitor'
  | 'prepare_pitch';

export type MissionStatus = 'locked' | 'active' | 'completed';

export interface MissionDefinition {
  id: MissionId;
  stepNumber: number;
  title: string;
  shortTitle: string;
  locationId: SimulationLocationId;
  objective: string;
  conceptFocus: string;
  requiredActionDescription: string;
  successCriteria: string;
  learningTakeaway: string;
}

export interface FounderProfile {
  displayName: string;
  ventureName: string;
  category: BusinessCategory;
  scenarioId: ScenarioId;
  createdAt: string;
}

export interface ProblemOption {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  customerQuote: string;
  severityRating: number; // 1 - 5
  willingnessToPay: string;
  targetAudience: string;
  keyObservation: string;
  evaluationQuestions: {
    understandable: string;
    targetPersona: string;
    frequency: string;
    existingAlternatives: string;
    whyUseful: string;
  };
}

export interface BusinessIdeaOption {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  targetCustomers: string;
  revenueModel: string;
  mainOperatingChallenge: string;
  estimatedStartupCosts: string;
  baselineMargin: number;
  simulatedCustomerFeedback: {
    persona: string;
    quote: string;
    sentiment: 'positive' | 'cautious' | 'excited';
  }[];
}

export interface ProductFeature {
  id: string;
  name: string;
  description: string;
  devCost: number; // in Points (out of 100)
  rupeeCost: number;
  timeToLaunchWeeks: number;
  customerAppealImpact: number; // +1 to +5
  operationalComplexity: 'Low' | 'Moderate' | 'High';
  recommendedPhase: 'Phase 1: First Version' | 'Phase 2: Customer Feedback' | 'Phase 3: Future Scale';
}

export interface SupplierNegotiationOffer {
  id: string;
  partnerName: string;
  partnerType: 'Local Organic Collective' | 'Industrial Wholesale Hub' | 'Eco Packaging Partner';
  headline: string;
  unitCostRupees: number;
  minimumCommitmentUnits: number;
  paymentTerms: string;
  reliabilityRating: number; // 1 - 5
  sustainabilityGrade: 'A+' | 'B' | 'C-';
  pros: string[];
  cons: string[];
  tradeoffSummary: string;
}

export interface EthicsOption {
  id: string;
  category: 'Honest Marketing' | 'Responsible Sourcing' | 'Customer Privacy' | 'Eco Packaging';
  title: string;
  description: string;
  costImpact: number;
  reputationImpact: number;
  satisfactionImpact: number;
  consequenceExplanation: string;
}

export interface PivotOption {
  id: string;
  title: string;
  badge: string;
  description: string;
  reasoning: string;
  implementationCost: number;
  marginAdjustment: number; // e.g. +0.06
  appealAdjustment: number; // e.g. +15
  capacityAdjustment: number; // e.g. +20
  recordedLesson: string;
}

export interface BudgetAllocation {
  productDevelopment: number;
  marketing: number;
  operations: number;
  customerSupport: number;
  emergencyReserve: number;
}

export interface MarketingChannel {
  id: string;
  name: string;
  description: string;
  costPerUnit: number;
  reachPerUnit: number;
  conversionRate: number; // e.g. 0.08
  timeRequired: string;
}

export interface CustomerPersona {
  id: string;
  name: string;
  role: string;
  avatarSeed: string;
  description: string;
  primaryDifficulty: string;
  currentAlternative: string;
  idealSolution: string;
  blockersToAdoption: string;
  quote: string;
}

export interface CustomerInterviewQuestion {
  id: string;
  questionText: string;
  answerMap: Record<string, string>; // personaId -> answer
}

export interface OperationsChoice {
  id: 'expand' | 'cap' | 'optimize' | 'overload';
  title: string;
  subtitle: string;
  costImpact: number;
  capacityImpact: number;
  satisfactionImpact: number;
  tradeoffDescription: string;
}

export interface CompetitorData {
  name: string;
  tagline: string;
  threatDescription: string;
  options: {
    id: 'price' | 'quality' | 'niche' | 'experience';
    title: string;
    description: string;
    costImpact: number;
    marginImpact: string;
    outcomeSummary: string;
  }[];
}

export interface DynamicEvent {
  id: string;
  title: string;
  badge: string;
  situation: string;
  whyItMatters: string;
  choices: {
    id: string;
    label: string;
    actionSummary: string;
    cashEffect: number;
    satisfactionEffect: number;
    capacityEffect: number;
    takeaway: string;
  }[];
}

export interface TeamMember {
  id: string;
  role: 'Product' | 'Marketing' | 'Finance' | 'Operations' | 'Support';
  title: string;
  name: string;
  strength: string;
  limitation: string;
  assigned: boolean;
}

export interface InternCandidate {
  id: 'aarav' | 'riya' | 'kabir';
  name: string;
  roleTitle: string;
  age: number;
  background: string;
  avatar: string; // emoji
  qualities: {
    focusOrg: number;      // 1-5 (Focus and organisation)
    creativity: number;    // 1-5 (Creativity)
    communication: number; // 1-5 (Communication)
    adaptability: number;  // 1-5 (Adaptability)
  };
  skills: {
    research: number;      // 1-5
    marketing: number;     // 1-5
    finance: number;       // 1-5
    operations: number;    // 1-5
    creativity: number;    // 1-5
  };
  monthlyStipend: number;
  strength: string;
  strengthsList: string[];
  limitation: string;
  limitationsList: string[];
  personality: string;
  bestFor: string[];
  consequence: {
    operationsBonus: number;    // capacity multiplier bonus e.g. +0.25
    marketingBonus: number;     // reach multiplier bonus e.g. +0.25
    researchBonus: number;      // satisfaction bonus
    budgetDrain: number;        // monthly rupee cost
  };
}

export interface DecisionJournalEntry {
  id: string;
  timestamp: string;
  location: SimulationLocationId;
  locationName: string;
  decision: string;
  consequence: string;
  tradeoff: string;
  reflection?: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  pedagogicalTakeaway: string;
}

export interface InvestorPersona {
  id: 'advocate' | 'thinker' | 'builder';
  name: string;
  title: string;
  archetype: string;
  focus: string;
  quote: string;
  evaluate: (state: SimulationState, precalculated?: any) => {
    score: number; // 0 - 100
    sentiment: 'Bullish' | 'Constructive' | 'Cautious';
    keyObservation: string;
    actionableAdvice: string;
  };
}

export type BusinessEndingType =
  | 'sustainable_business'
  | 'fast_growth_high_risk'
  | 'customer_favourite'
  | 'smart_pivot'
  | 'learning_from_failure';

export interface BusinessEnding {
  type: BusinessEndingType;
  title: string;
  badge: string;
  summary: string;
  pedagogicalVerdict: string;
  keyDrivers: string[];
  recommendedNextStep: string;
}

export interface DecisionReplayItem {
  id: string;
  missionId: MissionId;
  missionTitle: string;
  choiceMade: string;
  consequenceSummary: string;
  tradeoffExplained: string;
  alternativeChoice: string;
  hypotheticalOutcome: string;
}

export interface PitchRubricCategory {
  id: string;
  name: string;
  maxScore: number;
  achievedScore: number;
  criteriaDescription: string;
  feedback: string;
}

export interface SimulationResults {
  startingBudget: number;
  totalBudgetSpent: number;
  remainingCash: number;
  estimatedRevenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  grossMarginPercentage: number;
  fixedOperatingExpenses: number;
  totalOperationalExpenses: number;
  netFinancialOutcome: number; // Net Profit or Loss
  accountingProfit: number;
  operatingCashFlow: number;
  runwayMonths: number;
  customerSatisfaction: number;
  customerSatisfactionGrade: 'Exceptional' | 'Strong' | 'Average' | 'Vulnerable' | 'Critical';
  businessReputation: number;
  operationalCapacity: number;
  demandGenerated: number;
  ordersFulfilled: number;
  fulfillmentRate: number;
  marketingReach: number;
  cacEstimated: number;
  strategicDiagnosis: string[];
  keyStrengths: string[];
  vulnerabilitiesObserved: string[];
  investorScore: number;
  rubricBreakdown: PitchRubricCategory[];
  ending: BusinessEnding;
  decisionReplay: DecisionReplayItem[];
}

export interface PitchDeckData {
  businessName: string;
  problem: string;
  solution: string;
  targetCustomer: string;
  valueProposition: string;
  businessModel: string;
  pricingStrategy: string;
  budgetAllocation: string;
  acquisitionStrategy: string;
  mainRisks: string;
  financialResults: string;
  futurePlans: string;
}

export interface MentorTip {
  id: string;
  locationId: SimulationLocationId;
  trigger: string;
  headline: string;
  explanation: string;
  conceptDefinition?: { term: string; explanation: string };
  reflectiveQuestion: string;
  alternativeConsideration: string;
}

export interface ClassroomChallengeScenario {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  curriculumContext: string;
  description: string;
  startingBudget: number;
  specialConstraint: string;
  targetGoal: string;
  discussionQuestions: string[];
}

export interface SimulationState {
  founder: FounderProfile;
  currentLocation: SimulationLocationId;
  completedLocations: SimulationLocationId[];
  isDashboardOnlyMode: boolean;

  // Mission System
  missions: Record<MissionId, MissionStatus>;

  // Mission 1: Problem & Idea
  selectedProblemId: string | null;
  customProblemText?: string;
  selectedIdeaId: string | null;

  // Mission 2: Customer Research
  interviewedPersonaQuestions: { personaId: string; questionId: string }[];
  selectedCustomerSegmentId: string | null;

  // Mission 3: Product Dev & Negotiation
  selectedFeatureIds: string[];
  availableDevPoints: number;
  selectedSupplierOfferId: string | null;

  // Mission 4: Budget Allocation & Survival
  budget: BudgetAllocation;

  // Mission 5: Marketing Channels & First Customers
  selectedMarketingChannels: Record<string, number>; // channelId -> budget allocated

  // Mission 6: Business Crisis Room
  activeEvent: DynamicEvent | null;
  resolvedEvents: { eventId: string; choiceId: string }[];

  // Mission 7: Competition & Operations Dilemma
  selectedOperationsChoice: 'expand' | 'cap' | 'optimize' | 'overload' | null;
  selectedCompetitionChoice: 'price' | 'quality' | 'niche' | 'experience' | null;

  // Ethics & Sustainability Decisions
  selectedEthicsChoices: Record<string, string>; // category -> choiceId

  // Strategic Pivot
  activePivot: PivotOption | null;

  // Business Reputation & Brand Trust (0 - 100)
  businessReputation: number;

  // Team Assignment
  team: TeamMember[];

  // Achievements
  achievements: Achievement[];

  // Pitch Deck
  pitchDeck: PitchDeckData;

  // Simulation End status
  isPitchCompleted: boolean;
  finalResults: SimulationResults | null;

  // Active Challenge Mode (if launched from Educator / Challenge portal)
  selectedChallengeId: string | null;

  // Mentor Tip Active
  activeMentorTipId: string | null;

  // 10 Structured Learning Modules & Reflections
  completedModules: LearningModuleId[];
  studentReflections: Record<LearningModuleId, string>;

  // Performance & Graphics Adaptive Setting
  graphicsQuality: GraphicsQualityMode;

  // Intern Hiring Stage
  internHired: InternCandidate | null;
  internHiringComplete: boolean;

  // Decision Journal (tracks student choices across the simulation)
  decisionJournal: DecisionJournalEntry[];

  // Student Evidence Assessment
  assessmentReport?: StudentAssessmentReport;
}
