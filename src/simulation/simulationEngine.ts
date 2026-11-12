import type {
  SimulationState,
  SimulationResults,
  BudgetAllocation,
  InvestorPersona,
  PitchRubricCategory,
  BusinessEnding,
  DecisionReplayItem,
} from './types';
import {
  ALL_SCENARIOS,
  ALL_SUPPLIER_OFFERS,
  ALL_ETHICS_OPTIONS,
  CRISIS_EVENTS,
} from './scenarioData';

export const TOTAL_BUDGET = 100000;

export const INITIAL_BUDGET: BudgetAllocation = {
  productDevelopment: 25000,
  marketing: 25000,
  operations: 35000,
  customerSupport: 10000,
  emergencyReserve: 5000,
};

export interface CoreSimulationMetrics {
  startingBudget: number;
  totalBudgetSpent: number;
  remainingCash: number;
  estimatedRevenue: number;
  costOfGoodsSold: number;
  grossProfit: number;
  grossMarginPercentage: number;
  fixedOperatingExpenses: number;
  totalOperationalExpenses: number;
  netFinancialOutcome: number;
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
}

/**
 * Deterministic core calculation engine.
 * Computes all operational, financial, and survival telemetry.
 */
export function computeCoreResults(state: SimulationState): CoreSimulationMetrics {
  const scenario = ALL_SCENARIOS[state.founder?.scenarioId || 'campus_meal'] || ALL_SCENARIOS.campus_meal;
  const startingBudget = scenario.startingBudget || TOTAL_BUDGET;
  const { budget } = state;

  const totalBudgetSpent =
    budget.productDevelopment +
    budget.marketing +
    budget.operations +
    budget.customerSupport;

  // 1. Team Modifiers
  const opsTeamAssigned = state.team.some((t) => t.role === 'Operations' && t.assigned);
  const mktTeamAssigned = state.team.some((t) => t.role === 'Marketing' && t.assigned);
  const productTeamAssigned = state.team.some((t) => t.role === 'Product' && t.assigned);
  const supportTeamAssigned = state.team.some((t) => t.role === 'Support' && t.assigned);

  // 2. Supplier Impact
  const selectedSupplier = ALL_SUPPLIER_OFFERS.find((s) => s.id === state.selectedSupplierOfferId);
  const baseUnitCost = selectedSupplier ? selectedSupplier.unitCostRupees : 48;
  const supplierReliabilityBonus = selectedSupplier ? (selectedSupplier.reliabilityRating - 3) * 5 : 0;

  // 3. Strategic Pivot Impact
  let pivotCost = 0;
  let pivotMarginBoost = 0;
  let pivotAppealBoost = 0;
  let pivotCapacityBoost = 0;
  if (state.activePivot) {
    pivotCost = state.activePivot.implementationCost;
    pivotMarginBoost = state.activePivot.marginAdjustment;
    pivotAppealBoost = state.activePivot.appealAdjustment;
    pivotCapacityBoost = state.activePivot.capacityAdjustment;
  }

  // 4. Base Operational Capacity
  const opsMultiplier = opsTeamAssigned ? 3.8 : 3.2;
  let baseCapacity = Math.round(40 + (budget.operations / 1000) * opsMultiplier + pivotCapacityBoost + supplierReliabilityBonus);

  // Operations Dilemma Choice Modifier
  let opsChoiceCost = 0;
  let opsSatisfactionBoost = 0;
  if (state.selectedOperationsChoice === 'expand') {
    opsChoiceCost = 15000;
    baseCapacity = Math.round(baseCapacity * 1.55);
    opsSatisfactionBoost = 12;
  } else if (state.selectedOperationsChoice === 'cap') {
    opsChoiceCost = 2000;
    opsSatisfactionBoost = 8;
  } else if (state.selectedOperationsChoice === 'optimize') {
    opsChoiceCost = 6000;
    baseCapacity = Math.round(baseCapacity * 1.25);
    opsSatisfactionBoost = 5;
  } else if (state.selectedOperationsChoice === 'overload') {
    opsChoiceCost = 3000;
    baseCapacity = Math.round(baseCapacity * 1.12);
    opsSatisfactionBoost = -24; // severe burnout and delays
  }

  // 5. Marketing Reach & Demand Generation
  let totalChannelReach = 0;
  let weightedConversion = 0.12;

  const channelEntries = Object.entries(state.selectedMarketingChannels);
  if (channelEntries.length > 0) {
    channelEntries.forEach(([chanId, allocated]) => {
      const channel = scenario.marketingChannels.find((c) => c.id === chanId);
      if (channel && allocated > 0) {
        const units = allocated / channel.costPerUnit;
        totalChannelReach += units * channel.reachPerUnit;
        weightedConversion = channel.conversionRate;
      }
    });
  } else {
    totalChannelReach = Math.round((budget.marketing / 1000) * 110);
  }

  if (mktTeamAssigned) {
    totalChannelReach = Math.round(totalChannelReach * 1.25);
  }

  // Feature appeal modifier
  const featureAppealSum = state.selectedFeatureIds.reduce((acc, featId) => {
    const feat = scenario.features.find((f) => f.id === featId);
    return acc + (feat ? feat.customerAppealImpact : 0);
  }, 0);
  const appealMultiplier = 1 + (featureAppealSum * 0.05) + (productTeamAssigned ? 0.15 : 0) + (pivotAppealBoost * 0.01);

  let dailyDemand = Math.round((totalChannelReach * weightedConversion * appealMultiplier) / 22);
  dailyDemand = Math.max(25, dailyDemand);

  // 6. Fulfillment & Order Volume
  const ordersFulfilled = Math.min(dailyDemand, baseCapacity);
  const fulfillmentRate = dailyDemand > 0 ? Math.min(100, Math.round((ordersFulfilled / dailyDemand) * 100)) : 100;

  // 7. Customer Satisfaction Calculation (0 - 100)
  let satisfaction = 72;
  if (fulfillmentRate >= 95) satisfaction += 12;
  else if (fulfillmentRate < 70) satisfaction -= (70 - fulfillmentRate) * 0.8;

  if (budget.customerSupport >= 12000 || supportTeamAssigned) satisfaction += 8;
  else if (budget.customerSupport < 4000) satisfaction -= 12;

  satisfaction += opsSatisfactionBoost;

  let competitionCost = 0;
  if (state.selectedCompetitionChoice === 'quality') {
    competitionCost = 6000;
    satisfaction += 8;
  } else if (state.selectedCompetitionChoice === 'experience') {
    competitionCost = 7500;
    satisfaction += 10;
  } else if (state.selectedCompetitionChoice === 'niche') {
    competitionCost = 4000;
    satisfaction += 5;
  } else if (state.selectedCompetitionChoice === 'price') {
    competitionCost = 10000;
    satisfaction -= 2;
  }

  // 8. Dynamic Events Impact
  let eventsCost = 0;
  let eventsCapacityImpact = 0;
  state.resolvedEvents.forEach((res) => {
    const ev =
      CRISIS_EVENTS.find((e) => e.id === res.eventId) ||
      scenario.events.find((e) => e.id === res.eventId);
    if (ev) {
      const ch = ev.choices.find((c) => c.id === res.choiceId);
      if (ch) {
        eventsCost -= ch.cashEffect; // e.g. -6500 becomes +6500 cash drain
        satisfaction += ch.satisfactionEffect;
        eventsCapacityImpact += ch.capacityEffect;
      }
    }
  });

  baseCapacity = Math.max(20, baseCapacity + eventsCapacityImpact);

  // 9. Ethics & Sustainability Impact
  let ethicsCost = 0;
  let ethicsReputation = 0;
  let ethicsSatisfaction = 0;
  Object.values(state.selectedEthicsChoices || {}).forEach((choiceId) => {
    const opt = ALL_ETHICS_OPTIONS.find((o) => o.id === choiceId);
    if (opt) {
      ethicsCost -= opt.costImpact;
      ethicsReputation += opt.reputationImpact;
      ethicsSatisfaction += opt.satisfactionImpact;
    }
  });

  satisfaction = Math.min(98, Math.max(30, Math.round(satisfaction + ethicsSatisfaction)));

  // 10. Business Reputation
  let reputation = 70 + ethicsReputation;
  if (selectedSupplier?.sustainabilityGrade === 'A+') reputation += 10;
  else if (selectedSupplier?.sustainabilityGrade === 'C-') reputation -= 8;
  if (satisfaction >= 85) reputation += 8;
  else if (satisfaction < 60) reputation -= 12;
  reputation = Math.min(100, Math.max(20, Math.round(reputation)));

  // 11. Survival Accounting (Distinguishing Cash vs Accounting Profit)
  const operatingDays = 26;
  const unitPrice = state.activePivot?.id === 'pivot-specialty-diet' ? 130 : 95;

  const totalMonthlyUnits = ordersFulfilled * operatingDays;
  const estimatedRevenue = Math.round(totalMonthlyUnits * unitPrice);

  // Unit Cost of Goods Sold with pivot and supplier modifier
  const effectiveUnitCost = Math.max(28, Math.round(baseUnitCost * (1 - pivotMarginBoost)));
  const costOfGoodsSold = Math.round(totalMonthlyUnits * effectiveUnitCost);
  const grossProfit = estimatedRevenue - costOfGoodsSold;
  const grossMarginPercentage = estimatedRevenue > 0 ? Math.round((grossProfit / estimatedRevenue) * 100) : 0;

  const fixedOperatingExpenses =
    totalBudgetSpent +
    opsChoiceCost +
    competitionCost +
    pivotCost +
    ethicsCost;

  const totalOperationalExpenses = fixedOperatingExpenses + eventsCost + costOfGoodsSold;
  const netFinancialOutcome = estimatedRevenue - totalOperationalExpenses;
  const accountingProfit = netFinancialOutcome;

  // Working Capital & Cash vs Accounting differences
  // If vendor credit (Bharat Bulk net-30), 40% of COGS invoice is deferred to next month!
  const cogsCashPaid = selectedSupplier?.id === 'supplier-wholesale-hub' ? Math.round(costOfGoodsSold * 0.6) : costOfGoodsSold;
  const totalCashOutflows = fixedOperatingExpenses + eventsCost + cogsCashPaid;
  const totalCashInflows = estimatedRevenue;
  const operatingCashFlow = totalCashInflows - totalCashOutflows;

  const remainingCash = Math.max(
    0,
    startingBudget - totalCashOutflows + totalCashInflows
  );

  // Monthly fixed burn & runway
  const monthlyFixedBurn = Math.max(12000, Math.round(fixedOperatingExpenses * 0.6));
  let runwayMonths = 0;
  if (netFinancialOutcome >= 0) {
    runwayMonths = Number(Math.min(24, Math.max(6, (remainingCash / 15000) + 6)).toFixed(1));
  } else {
    runwayMonths = Number(Math.max(0.2, remainingCash / monthlyFixedBurn).toFixed(1));
  }

  // Customer Acquisition Cost (CAC)
  const totalCustomersAcquired = Math.max(1, Math.round(totalChannelReach * weightedConversion));
  const cacEstimated = Math.round(budget.marketing / totalCustomersAcquired);

  // Grade calculation
  let grade: 'Exceptional' | 'Strong' | 'Average' | 'Vulnerable' | 'Critical' = 'Average';
  if (satisfaction >= 86 && netFinancialOutcome >= 0 && runwayMonths >= 3) {
    grade = 'Exceptional';
  } else if (satisfaction >= 75 && runwayMonths >= 2) {
    grade = 'Strong';
  } else if (satisfaction >= 60) {
    grade = 'Average';
  } else if (satisfaction >= 45) {
    grade = 'Vulnerable';
  } else {
    grade = 'Critical';
  }

  // Diagnostic Pedagogical Insights
  const strategicDiagnosis: string[] = [];
  const keyStrengths: string[] = [];
  const vulnerabilitiesObserved: string[] = [];

  if (budget.operations >= 30000) {
    keyStrengths.push('Healthy operational budget ensured reliable daily delivery capacity without kitchen chaos.');
  }
  if (budget.emergencyReserve >= 10000) {
    keyStrengths.push('Maintaining an emergency reserve absorbed sudden crisis and event costs without insolvency.');
  }
  if (satisfaction >= 80) {
    keyStrengths.push('High customer satisfaction (over 80%) built positive student reputation and repeat orders.');
  }
  if (fulfillmentRate >= 90) {
    keyStrengths.push('Exceptional order fulfillment: you fulfilled over 90% of student demand punctually.');
  }
  if (reputation >= 85) {
    keyStrengths.push('High ethical stewardship and honest marketing won deep community trust and student advocacy.');
  }

  if (budget.marketing > budget.operations * 1.3) {
    vulnerabilitiesObserved.push('Marketing spend outpaced kitchen capacity, causing order backlogs.');
  }
  if (budget.emergencyReserve < 5000) {
    vulnerabilitiesObserved.push('Low contingency buffer left almost no margin for unexpected supplier price changes.');
  }
  if (state.selectedOperationsChoice === 'overload') {
    vulnerabilitiesObserved.push('Overworking existing staff led to delayed lunch deliveries and lower student ratings.');
  }
  if (state.selectedCompetitionChoice === 'price') {
    vulnerabilitiesObserved.push('Entering a price war eroded your profit margins without guaranteeing student loyalty.');
  }
  if (remainingCash < 15000) {
    vulnerabilitiesObserved.push('Low remaining cash balance leaves your venture vulnerable to future unexpected shocks.');
  }

  // Synthesis summary
  if (state.activePivot) {
    strategicDiagnosis.push(`Strategic Pivot: Executed "${state.activePivot.title}", adapting business model to customer reality.`);
  }
  if (state.selectedOperationsChoice === 'expand') {
    strategicDiagnosis.push('You chose operational scaling: investing in capacity protected student trust during peak surge.');
  } else if (state.selectedOperationsChoice === 'cap') {
    strategicDiagnosis.push('You chose disciplined waitlist growth: protecting food quality and runway over unchecked volume.');
  } else {
    strategicDiagnosis.push('You balanced speed and resources, experiencing the real tension between growth and capacity.');
  }

  return {
    startingBudget,
    totalBudgetSpent,
    remainingCash,
    estimatedRevenue,
    costOfGoodsSold,
    grossProfit,
    grossMarginPercentage,
    fixedOperatingExpenses,
    totalOperationalExpenses,
    netFinancialOutcome,
    accountingProfit,
    operatingCashFlow,
    runwayMonths,
    customerSatisfaction: satisfaction,
    customerSatisfactionGrade: grade,
    businessReputation: reputation,
    operationalCapacity: baseCapacity,
    demandGenerated: dailyDemand,
    ordersFulfilled,
    fulfillmentRate,
    marketingReach: Math.round(totalChannelReach),
    cacEstimated,
    strategicDiagnosis,
    keyStrengths,
    vulnerabilitiesObserved,
  };
}

/**
 * 6-Category Transparent Pitch Rubric Generator
 */
export function evaluatePitchRubric(
  state: SimulationState,
  core: CoreSimulationMetrics
): PitchRubricCategory[] {
  const interviewedCount = state.interviewedPersonaQuestions.length;
  const hasSelectedSegment = Boolean(state.selectedCustomerSegmentId);
  const featureCount = state.selectedFeatureIds.length;
  const hasContingency = state.budget.emergencyReserve >= 8000;
  const isProfitable = core.netFinancialOutcome >= 0;
  const highFulfillment = core.fulfillmentRate >= 85;
  const differentiationChosen =
    state.selectedCompetitionChoice === 'quality' || state.selectedCompetitionChoice === 'experience';
  const ethicalCount = Object.keys(state.selectedEthicsChoices || {}).length;

  // 1. Problem Understanding & Customer Insights (Max 20 pts)
  let problemScore = 8;
  if (interviewedCount >= 4) problemScore += 8;
  else if (interviewedCount >= 2) problemScore += 5;
  if (hasSelectedSegment) problemScore += 4;
  problemScore = Math.min(20, problemScore);

  // 2. Value Proposition & Product Viability (Max 15 pts)
  let productScore = 6;
  if (featureCount >= 2 && featureCount <= 4) productScore += 6; // Focused MVP
  else if (featureCount > 4) productScore += 3; // Feature creep
  if (core.customerSatisfaction >= 78) productScore += 3;
  productScore = Math.min(15, productScore);

  // 3. Financial Awareness & Unit Economics (Max 20 pts)
  let financeScore = 8;
  if (hasContingency) financeScore += 4;
  if (core.grossMarginPercentage >= 25) financeScore += 4;
  if (isProfitable) financeScore += 4;
  financeScore = Math.min(20, financeScore);

  // 4. Operational Feasibility & Delivery (Max 15 pts)
  let opsScore = 6;
  if (highFulfillment) opsScore += 6;
  if (core.operationalCapacity >= 60) opsScore += 3;
  opsScore = Math.min(15, opsScore);

  // 5. Competitive Strategy & Differentiation (Max 15 pts)
  let compScore = 6;
  if (differentiationChosen) compScore += 6;
  else if (state.selectedCompetitionChoice === 'niche') compScore += 5;
  if (state.activePivot) compScore += 3;
  compScore = Math.min(15, compScore);

  // 6. Ethical Responsibility & Sustainability (Max 15 pts)
  let ethicsScore = 6;
  if (ethicalCount >= 2) ethicsScore += 5;
  if (core.businessReputation >= 80) ethicsScore += 4;
  ethicsScore = Math.min(15, ethicsScore);

  return [
    {
      id: 'rubric-problem',
      name: 'Problem Understanding & Customer Insights',
      maxScore: 20,
      achievedScore: problemScore,
      criteriaDescription:
        'Depth of customer empathy, problem articulation, and evidence from persona interviews.',
      feedback:
        interviewedCount >= 3
          ? 'Clear evidence of customer empathy: grounded solution in validated student friction points.'
          : 'Conduct more direct customer interviews to eliminate assumptions before designing features.',
    },
    {
      id: 'rubric-product',
      name: 'Value Proposition & Product MVP Design',
      maxScore: 15,
      achievedScore: productScore,
      criteriaDescription:
        'Clarity of value proposition, feature prioritization discipline, and avoidance of bloat.',
      feedback:
        featureCount <= 4
          ? 'Disciplined MVP scope: focused on solving the core friction point cleanly.'
          : 'Be cautious of feature bloat; students value dependable core execution over endless buttons.',
    },
    {
      id: 'rubric-financial',
      name: 'Financial Awareness & Unit Economics',
      maxScore: 20,
      achievedScore: financeScore,
      criteriaDescription:
        'Understanding margins, working capital runway, contingency buffers, and cost structures.',
      feedback:
        isProfitable
          ? `Positive unit economics with ${core.grossMarginPercentage}% gross margin and healthy runway.`
          : 'Operating costs exceeded revenues; review unit price, vendor terms, and fixed burn rate.',
    },
    {
      id: 'rubric-operational',
      name: 'Operational Feasibility & Delivery Capacity',
      maxScore: 15,
      achievedScore: opsScore,
      criteriaDescription:
        'Realistic alignment of marketing demand with kitchen and runner delivery throughput.',
      feedback:
        highFulfillment
          ? `Fulfilled ${core.fulfillmentRate}% of student demand without breakdown.`
          : 'Demand surged past delivery capacity, causing student delays. Align marketing with throughput.',
    },
    {
      id: 'rubric-competitive',
      name: 'Competitive Strategy & Strategic Positioning',
      maxScore: 15,
      achievedScore: compScore,
      criteriaDescription:
        'Differentiation against cheap substitutes and avoidance of destructive price wars.',
      feedback:
        differentiationChosen
          ? 'Resisted price-matching race to the bottom; built loyalty through quality and experience.'
          : 'Defend your venture with unique service advantages rather than slashing margins.',
    },
    {
      id: 'rubric-ethics',
      name: 'Ethical Responsibility & ESG Stewardship',
      maxScore: 15,
      achievedScore: ethicsScore,
      criteriaDescription:
        'Responsible sourcing, honest marketing, fair worker compensation, and customer data privacy.',
      feedback:
        core.businessReputation >= 80
          ? `Exceptional business reputation (${core.businessReputation}/100) through principled decisions.`
          : 'Balancing short-term financial savings with ethical transparency strengthens long-term brand equity.',
    },
  ];
}

/**
 * 5 Deterministic Business Endings Evaluator
 */
export function determineBusinessEnding(
  state: SimulationState,
  core: CoreSimulationMetrics
): BusinessEnding {
  // 1. Smart Pivot Ending
  if (state.activePivot && core.netFinancialOutcome >= -5000 && core.customerSatisfaction >= 70) {
    return {
      type: 'smart_pivot',
      title: 'Agile Strategic Pivot',
      badge: 'Strategic Adaptation',
      summary:
        `Recognized market bottlenecks early and successfully pivoted to "${state.activePivot.title}". Transformed initial friction into sustainable product-market fit.`,
      pedagogicalVerdict:
        'The true hallmark of entrepreneurship is not sticking blindly to a flawed first plan, but having the humility and analytical courage to pivot based on real evidence.',
      keyDrivers: [
        'Validated market feedback and recognized operational constraints.',
        'Repositioned value proposition without burning all contingency capital.',
        `Achieved ${core.customerSatisfaction}% customer satisfaction post-pivot.`,
      ],
      recommendedNextStep:
        'Standardize unit economics of the new model and expand to adjacent campus hostels.',
    };
  }

  // 2. Customer Favourite
  if (core.customerSatisfaction >= 86 && core.fulfillmentRate >= 88 && core.businessReputation >= 80) {
    return {
      type: 'customer_favourite',
      title: 'Beloved Campus Champion',
      badge: 'Community Favorite',
      summary:
        'Created a customer-first brand that students genuinely love, trust, and enthusiastically recommend across campus hostels.',
      pedagogicalVerdict:
        'High empathy, punctual delivery, and honest ethics build an organic word-of-mouth moat that money cannot buy.',
      keyDrivers: [
        `Outstanding customer satisfaction score: ${core.customerSatisfaction}%.`,
        `High operational fulfillment rate: ${core.fulfillmentRate}%.`,
        'Principled ethics choices protected community trust during crisis moments.',
      ],
      recommendedNextStep:
        'Leverage student brand evangelists to launch a peer ambassador referral loop.',
    };
  }

  // 3. Fast Growth High Risk
  if (core.demandGenerated >= 85 && (core.remainingCash < 12000 || core.runwayMonths < 2.0)) {
    return {
      type: 'fast_growth_high_risk',
      title: 'High-Growth, Capital Constrained',
      badge: 'Aggressive Scaleup',
      summary:
        'Generated explosive student demand and high transaction velocity, but rapid expansion pushed working capital and cash reserves to the absolute edge.',
      pedagogicalVerdict:
        'Rapid growth eats cash. Scaling demand without expanding operational capacity and cash buffers creates dangerous vulnerability.',
      keyDrivers: [
        `Generated ${core.demandGenerated} daily student orders across campus channels.`,
        `Cash runway compressed to ${core.runwayMonths} months due to aggressive upfront expenditures.`,
        'Operational capacity struggled to fulfill sudden peak demand bursts.',
      ],
      recommendedNextStep:
        'Slow down paid marketing; focus on operational efficiency and vendor payment term negotiations.',
    };
  }

  // 4. Sustainable Business
  if (core.netFinancialOutcome >= 0 && core.runwayMonths >= 3.0 && core.customerSatisfaction >= 74) {
    return {
      type: 'sustainable_business',
      title: 'Resilient & Sustainable Venture',
      badge: 'Sustainable Profitability',
      summary:
        'Balanced financial prudence, operational discipline, and customer satisfaction to build a self-sustaining, profitable campus venture.',
      pedagogicalVerdict:
        'Real entrepreneurial success is not vanity valuation; it is building a resilient business that generates more value than it consumes.',
      keyDrivers: [
        `Positive net monthly outcome: +₹${core.netFinancialOutcome.toLocaleString('en-IN')}.`,
        `Healthy working capital runway: ${core.runwayMonths} months.`,
        'Maintained disciplined contingency reserve throughout dynamic events.',
      ],
      recommendedNextStep:
        'Reinvest a portion of monthly operating profit into automated equipment and team training.',
    };
  }

  // 5. Learning from Failure (Always constructive, never punitive)
  return {
    type: 'learning_from_failure',
    title: 'Constructive Discovery & Resilience',
    badge: 'Learning Milestone',
    summary:
      'Encountered operational bottlenecks, cash constraints, and market friction that tested venture viability.',
    pedagogicalVerdict:
      'Failure in simulation is the safest, most valuable learning experience in business. Every great founder navigated early missteps before finding the right model.',
    keyDrivers: [
      core.remainingCash < 5000
        ? 'Working capital ran low due to high fixed expenses and supply chain shocks.'
        : 'Customer satisfaction dropped during peak delivery rush hours.',
      'Identified critical bottlenecks between customer expectations and kitchen fulfillment.',
      'Documented clear insights on what assumptions to challenge next time.',
    ],
    recommendedNextStep:
      'Review the Decision Replay timeline, adjust initial budget allocations, and test a focused MVP pilot.',
  };
}

/**
 * Decision Replay Timeline Generator with "What-If" Counterfactuals
 */
export function generateDecisionReplay(
  state: SimulationState,
  _core: CoreSimulationMetrics
): DecisionReplayItem[] {
  const items: DecisionReplayItem[] = [];

  // 1. Mission 1: Problem Selection
  const scenario = ALL_SCENARIOS[state.founder?.scenarioId || 'campus_meal'] || ALL_SCENARIOS.campus_meal;
  const problem = scenario.problems.find((p) => p.id === state.selectedProblemId) || scenario.problems[0];
  items.push({
    id: 'replay-problem',
    missionId: 'problem_discovery',
    missionTitle: 'Find the Problem',
    choiceMade: problem ? problem.title : 'Selected Core Friction Point',
    consequenceSummary: 'Defined the core value proposition and customer demographic targeted by your venture.',
    tradeoffExplained: 'Focusing on one specific problem narrows your market initially, but creates clarity for early adopters.',
    alternativeChoice: 'Targeting a broad, vague problem for everyone.',
    hypotheticalOutcome: 'Would have diluted marketing messages and made it difficult to build initial passionate customer loyalty.',
  });

  // 2. Mission 2: Customer Research
  const interviewCount = state.interviewedPersonaQuestions.length;
  items.push({
    id: 'replay-interviews',
    missionId: 'customer_interview',
    missionTitle: 'Interview Customers',
    choiceMade:
      interviewCount >= 3
        ? `Interviewed ${interviewCount} student customer personas`
        : 'Launched with minimal persona interviews',
    consequenceSummary:
      interviewCount >= 3
        ? 'Validated actual willingness to pay and delivery break frustrations before committing budget.'
        : 'Relied on initial assumptions rather than empirical customer validation.',
    tradeoffExplained:
      'Customer interviews require time and patience, but eliminate expensive downstream product rework.',
    alternativeChoice: 'Spending all capital on marketing without interviewing customers.',
    hypotheticalOutcome:
      interviewCount < 3
        ? 'Customer interviews would have revealed that punctual 30-min break delivery mattered far more than menu variety.'
        : 'Skipping interviews might have led to building features nobody actually wanted.',
  });

  // 3. Mission 3: Product Scope & Supplier Negotiation
  const supplier = ALL_SUPPLIER_OFFERS.find((s) => s.id === state.selectedSupplierOfferId);
  items.push({
    id: 'replay-supplier',
    missionId: 'product_design',
    missionTitle: 'Design the Product & Negotiate Terms',
    choiceMade: supplier
      ? `Partnered with ${supplier.partnerName} (${supplier.paymentTerms})`
      : 'Standard local ingredient procurement',
    consequenceSummary: supplier
      ? `Unit cost fixed at ₹${supplier.unitCostRupees} with ${supplier.sustainabilityGrade} sustainability grade.`
      : 'Standard costs without long-term volume agreements.',
    tradeoffExplained: supplier?.tradeoffSummary || 'Trade-off between unit cost, sustainability, and payment credit.',
    alternativeChoice:
      supplier?.id === 'supplier-wholesale-hub'
        ? 'GreenRoots Organic Collective (higher cost, premium brand)'
        : 'Bharat Bulk Agri Hub (lowest cost, credit terms)',
    hypotheticalOutcome:
      supplier?.id === 'supplier-wholesale-hub'
        ? 'Choosing organic would have elevated brand reputation and protected against quality complaints, but reduced cash buffer.'
        : 'Choosing wholesale credit would have conserved ₹15,000 cash runway at the cost of variable freshness.',
  });

  // 4. Mission 4: Budget Allocation & Reserve
  items.push({
    id: 'replay-budget',
    missionId: 'budget_planning',
    missionTitle: 'Plan the Budget',
    choiceMade: `Allocated ₹${state.budget.emergencyReserve.toLocaleString('en-IN')} to Emergency Reserve`,
    consequenceSummary:
      state.budget.emergencyReserve >= 8000
        ? 'Prudent reserve absorbed supply shocks and equipment failures without threatening payroll.'
        : 'Minimal cash cushion left venture vulnerable when unexpected expenses struck.',
    tradeoffExplained:
      'Emergency reserves do not generate immediate marketing orders, but protect the business from insolvency during crises.',
    alternativeChoice:
      state.budget.emergencyReserve >= 8000
        ? 'Spending reserve entirely on promotional discounts.'
        : 'Maintaining a disciplined ₹15,000 emergency buffer.',
    hypotheticalOutcome:
      state.budget.emergencyReserve >= 8000
        ? 'Zero reserve would have forced order cancellations or debt when the crisis hit.'
        : 'A larger reserve would have kept cash runway above 3.5 months.',
  });

  // 5. Mission 6: Crisis Response
  if (state.resolvedEvents.length > 0) {
    const firstRes = state.resolvedEvents[0];
    const ev = CRISIS_EVENTS.find((e) => e.id === firstRes.eventId) || scenario.events[0];
    const ch = ev?.choices.find((c) => c.id === firstRes.choiceId);
    if (ev && ch) {
      items.push({
        id: 'replay-crisis',
        missionId: 'business_crisis',
        missionTitle: 'Handle a Business Crisis',
        choiceMade: ch.label,
        consequenceSummary: ch.takeaway,
        tradeoffExplained: `Financial impact: ₹${Math.abs(ch.cashEffect).toLocaleString('en-IN')}, Customer satisfaction impact: ${ch.satisfactionEffect > 0 ? '+' : ''}${ch.satisfactionEffect}%.`,
        alternativeChoice: ev.choices.find((c) => c.id !== ch.id)?.label || 'Alternative response',
        hypotheticalOutcome:
          'Different choices in crisis trade immediate financial savings against long-term brand equity and customer trust.',
      });
    }
  }

  // 6. Mission 7: Competitive Positioning
  items.push({
    id: 'replay-competition',
    missionId: 'competitor_response',
    missionTitle: 'Respond to a Competitor',
    choiceMade:
      state.selectedCompetitionChoice === 'quality'
        ? 'Differentiated on Freshness & Quality'
        : state.selectedCompetitionChoice === 'price'
        ? 'Engaged in Price Matching War'
        : state.selectedCompetitionChoice === 'experience'
        ? 'Invested in Express Campus Delivery'
        : 'Focused on Hosteller Subscriptions',
    consequenceSummary:
      state.selectedCompetitionChoice === 'price'
        ? 'Protected short-term volume but severely eroded gross profit margin.'
        : 'Defended healthy unit economics and attracted discerning student customers.',
    tradeoffExplained:
      'Price wars are easily matched by competitors with deeper pockets; differentiated value creates durable loyalty.',
    alternativeChoice:
      state.selectedCompetitionChoice === 'price'
        ? 'Quality differentiation with transparent hygiene'
        : 'Aggressive 40% discount price matching',
    hypotheticalOutcome:
      state.selectedCompetitionChoice === 'price'
        ? 'Quality differentiation would have preserved 30%+ margins and built sustainable recurring subscribers.'
        : 'A price match would have triggered ₹14,000 in immediate cash burn.',
  });

  return items;
}

// Investor Personas with zero-recursion evaluation
export const INVESTOR_PERSONAS: InvestorPersona[] = [
  {
    id: 'advocate',
    name: 'Ananya Roy',
    title: 'Partner, Human-Centered Ventures',
    archetype: 'The Customer Advocate',
    focus: 'Customer empathy, problem-solution fit, and sustained student satisfaction.',
    quote: '"I do not care how flashy your deck is if you have not listened to the daily frustrations of the actual person using it."',
    evaluate: (state: SimulationState, precalculated?: CoreSimulationMetrics) => {
      const results = precalculated || computeCoreResults(state);
      const interviewedCount = state.interviewedPersonaQuestions.length;
      let score = 50;

      // Customer interviews completed
      if (interviewedCount >= 4) score += 20;
      else if (interviewedCount >= 2) score += 10;

      // Customer satisfaction impact
      if (results.customerSatisfaction >= 85) score += 25;
      else if (results.customerSatisfaction >= 70) score += 15;
      else if (results.customerSatisfaction < 55) score -= 20;

      // Support budget
      if (state.budget.customerSupport >= 10000) score += 10;
      else if (state.budget.customerSupport === 0) score -= 15;

      score = Math.min(98, Math.max(35, score));
      let sentiment: 'Bullish' | 'Constructive' | 'Cautious' = 'Constructive';
      if (score >= 82) sentiment = 'Bullish';
      else if (score < 60) sentiment = 'Cautious';

      return {
        score,
        sentiment,
        keyObservation:
          results.customerSatisfaction >= 80
            ? 'Strong student empathy: your focus on customer support and punctuality protected trust.'
            : 'Customer satisfaction showed vulnerabilities: over-promising without operational buffer caused student frustration.',
        actionableAdvice:
          'Continue doing weekly qualitative interviews. Word-of-mouth on a college campus is your most valuable organic acquisition channel.',
      };
    },
  },
  {
    id: 'thinker',
    name: 'Vikramaditya Singhania',
    title: 'Managing Director, Horizon Growth Capital',
    archetype: 'The Financial Thinker',
    focus: 'Unit economics, capital allocation discipline, cash runway, and margin resilience.',
    quote: '"Revenue is vanity, profit is sanity, but cash flow is reality. Show me where every single rupee travels."',
    evaluate: (state: SimulationState, precalculated?: CoreSimulationMetrics) => {
      const results = precalculated || computeCoreResults(state);
      let score = 50;

      // Emergency reserve discipline
      if (state.budget.emergencyReserve >= 10000) score += 20;
      else if (state.budget.emergencyReserve >= 5000) score += 10;
      else score -= 15;

      // Runway evaluation
      if (results.runwayMonths >= 4) score += 20;
      else if (results.runwayMonths >= 2.5) score += 10;
      else score -= 15;

      // Budget discipline (did they spend within starting budget)
      const totalSpent =
        state.budget.productDevelopment +
        state.budget.marketing +
        state.budget.operations +
        state.budget.customerSupport +
        state.budget.emergencyReserve;
      if (totalSpent === (results.startingBudget || TOTAL_BUDGET)) score += 10;

      // Net outcome
      if (results.netFinancialOutcome >= 0) score += 15;

      score = Math.min(98, Math.max(35, score));
      let sentiment: 'Bullish' | 'Constructive' | 'Cautious' = 'Constructive';
      if (score >= 82) sentiment = 'Bullish';
      else if (score < 60) sentiment = 'Cautious';

      return {
        score,
        sentiment,
        keyObservation:
          results.remainingCash > 20000
            ? `Prudent capital discipline: you finished with ₹${results.remainingCash.toLocaleString('en-IN')} cash and estimated ${results.runwayMonths} months of runway.`
            : 'Tight cash buffer: high upfront marketing and emergency expenses left minimal working capital runway.',
        actionableAdvice:
          'Never reduce your contingency reserve to zero. In physical operations, supply price shifts and equipment repairs happen inevitably.',
      };
    },
  },
  {
    id: 'builder',
    name: 'Sunita Ramanathan',
    title: 'Founding Partner, ScaleForge Engine',
    archetype: 'The Strategic Builder',
    focus: 'Operational robustness, scalable systems, product differentiation, and competitive moats.',
    quote: '"Anyone can spend money on ads to get orders. Can your operational architecture deliver them with zero failure rate?"',
    evaluate: (state: SimulationState, precalculated?: CoreSimulationMetrics) => {
      const results = precalculated || computeCoreResults(state);
      let score = 50;

      // Fulfillment rate
      if (results.fulfillmentRate >= 90) score += 25;
      else if (results.fulfillmentRate >= 75) score += 15;
      else score -= 20;

      // Competition strategy
      if (state.selectedCompetitionChoice === 'quality' || state.selectedCompetitionChoice === 'experience') {
        score += 20;
      } else if (state.selectedCompetitionChoice === 'price') {
        score -= 10; // Price wars erode margins
      }

      // Feature roadmap focus
      if (state.selectedFeatureIds.length >= 2 && state.selectedFeatureIds.length <= 4) {
        score += 15; // Focused MVP
      } else if (state.selectedFeatureIds.length > 4) {
        score -= 10; // Feature bloat
      }

      score = Math.min(98, Math.max(35, score));
      let sentiment: 'Bullish' | 'Constructive' | 'Cautious' = 'Constructive';
      if (score >= 82) sentiment = 'Bullish';
      else if (score < 60) sentiment = 'Cautious';

      return {
        score,
        sentiment,
        keyObservation:
          results.fulfillmentRate >= 85
            ? 'High operational execution: your team fulfilled demand cleanly without breaking delivery promises.'
            : 'Logistical bottleneck observed: customer interest outpaced your daily delivery capability.',
        actionableAdvice:
          'Resist the temptation to enter a price war against low-cost competitors. Defend your offering through differentiated customer experience.',
      };
    },
  },
];

/**
 * Calculates complete simulation results including survival accounting, rubric breakdown,
 * deterministic endings, and decision replay timeline.
 */
export function calculateSimulationResults(state: SimulationState): SimulationResults {
  const core = computeCoreResults(state);

  const rubricBreakdown = evaluatePitchRubric(state, core);
  const investorScore = Math.round(
    rubricBreakdown.reduce((acc, cat) => acc + cat.achievedScore, 0)
  );

  const ending = determineBusinessEnding(state, core);
  const decisionReplay = generateDecisionReplay(state, core);

  return {
    ...core,
    investorScore,
    rubricBreakdown,
    ending,
    decisionReplay,
  };
}

