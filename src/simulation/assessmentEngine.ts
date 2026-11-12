import type { 
  SimulationState, 
  StudentAssessmentReport, 
  CompetencyAssessmentItem, 
  RubricLevel 
} from './types';
import { ALL_PROBLEMS, ALL_SUPPLIER_OFFERS } from './scenarioData';

const RUBRIC_LEVELS: RubricLevel[] = ['Beginning', 'Developing', 'Proficient', 'Advanced'];

export function evaluateStudentAssessment(state: SimulationState): StudentAssessmentReport {
  const competencies: CompetencyAssessmentItem[] = [];

  // 1. Problem Identification
  const selectedProblem = ALL_PROBLEMS.find((p) => p.id === state.selectedProblemId);
  const problemRefl = state.studentReflections['mod_1_problem_discovery'] || '';
  let problemScore = 1;
  let problemEvidence = 'No specific problem validated in the Problem Discovery Lab.';
  let problemFeedback = 'Spend time evaluating customer pain points before jumping to product ideas.';

  if (selectedProblem) {
    if (selectedProblem.severityRating >= 4 && problemRefl.length > 25) {
      problemScore = 4;
      problemEvidence = `Validated high-severity problem: "${selectedProblem.title}" (Severity: ${selectedProblem.severityRating}/5). Documented frequency and student pain in reflection.`;
      problemFeedback = 'Demonstrated advanced ability to distinguish acute, frequent pain points from trivial complaints.';
    } else if (selectedProblem.severityRating >= 4 || problemRefl.length > 15) {
      problemScore = 3;
      problemEvidence = `Selected validated problem: "${selectedProblem.title}" (Severity: ${selectedProblem.severityRating}/5).`;
      problemFeedback = 'Strong problem selection; continue validating customer willingness to pay through direct interviews.';
    } else {
      problemScore = 2;
      problemEvidence = `Selected problem "${selectedProblem.title}", but reflection lacks depth on customer frequency.`;
      problemFeedback = 'Consider how often this problem occurs in daily student routines.';
    }
  }

  competencies.push({
    competencyId: 'problem_identification',
    title: 'Problem Identification & Needs Analysis',
    level: RUBRIC_LEVELS[problemScore - 1],
    score: problemScore,
    maxScore: 4,
    rubricDescriptor:
      problemScore === 4
        ? 'Advanced: Identifies high-severity, high-frequency customer pain points with clear supporting observations.'
        : problemScore === 3
        ? 'Proficient: Articulates a genuine customer problem backed by observed friction.'
        : problemScore === 2
        ? 'Developing: Identifies a general issue but struggles to isolate specific customer pain.'
        : 'Beginning: Focuses on vague ideas without validating an underlying problem.',
    supportingEvidence: problemEvidence,
    formativeFeedback: problemFeedback,
  });

  // 2. Customer Understanding
  const interviewCount = state.interviewedPersonaQuestions.length;
  const segmentSelected = Boolean(state.selectedCustomerSegmentId);
  const custRefl = state.studentReflections['mod_2_customer_research'] || '';
  let custScore = 1;
  let custEvidence = 'Completed fewer than 2 simulated customer persona interviews.';
  let custFeedback = 'Conduct more interviews to understand conflicting needs between hostellers and day scholars.';

  if (interviewCount >= 4 && segmentSelected && custRefl.length > 25) {
    custScore = 4;
    custEvidence = `Conducted ${interviewCount} customer interviews across multiple personas and designated target segment (${state.selectedCustomerSegmentId?.replace('_', ' ')}). Noted interview bias in reflection.`;
    custFeedback = 'Exceptional customer empathy; recognized that different student segments have distinct budget and timing constraints.';
  } else if (interviewCount >= 3 && segmentSelected) {
    custScore = 3;
    custEvidence = `Conducted ${interviewCount} persona interviews and selected target customer segment.`;
    custFeedback = 'Good customer research; ensure product features directly match the primary segment you chose.';
  } else if (interviewCount >= 2) {
    custScore = 2;
    custEvidence = `Conducted ${interviewCount} interviews, but target customer segment remains broad.`;
    custFeedback = 'Narrow your target customer segment to avoid building a product that tries to please everyone.';
  }

  competencies.push({
    competencyId: 'customer_understanding',
    title: 'Customer Research & Empathy',
    level: RUBRIC_LEVELS[custScore - 1],
    score: custScore,
    maxScore: 4,
    rubricDescriptor:
      custScore === 4
        ? 'Advanced: Analyzes distinct customer segments, avoids confirmation bias, and grounds decisions in user habits.'
        : custScore === 3
        ? 'Proficient: Distinguishes target customer personas and understands their primary constraints.'
        : custScore === 2
        ? 'Developing: Collects basic customer feedback but treats all customers as a single homogenous group.'
        : 'Beginning: Relies on personal assumptions rather than listening to target customers.',
    supportingEvidence: custEvidence,
    formativeFeedback: custFeedback,
  });

  // 3. Solution Design
  const featCount = state.selectedFeatureIds.length;
  const supplierSelected = ALL_SUPPLIER_OFFERS.find((s) => s.id === state.selectedSupplierOfferId);
  const prodRefl = state.studentReflections['mod_4_product_design'] || '';
  let solScore = 1;
  let solEvidence = 'Feature scope exceeds 5 features or no commercial supplier agreement signed.';
  let solFeedback = 'Focus on building an MVP with only 2–3 essential features to conserve working capital.';

  if (featCount >= 2 && featCount <= 4 && supplierSelected && prodRefl.length > 20) {
    solScore = 4;
    solEvidence = `Curated focused MVP with ${featCount} core features (${state.availableDevPoints} dev pts remaining). Partnered with "${supplierSelected.partnerName}" under ${supplierSelected.paymentTerms} terms.`;
    solFeedback = 'Exemplary MVP discipline; avoided feature bloat and secured favorable trade credit to protect cash flow.';
  } else if (featCount >= 2 && featCount <= 4 && supplierSelected) {
    solScore = 3;
    solEvidence = `Selected ${featCount} MVP features and partnered with ${supplierSelected.partnerName}.`;
    solFeedback = 'Solid product scope; monitor operational complexity as fulfillment begins.';
  } else if (featCount >= 1) {
    solScore = 2;
    solEvidence = `Selected ${featCount} features (${featCount > 4 ? 'feature creep risk' : 'minimal scope'}).`;
    solFeedback = 'Make sure each selected feature directly addresses the primary lunchtime friction.';
  }

  competencies.push({
    competencyId: 'solution_design',
    title: 'Solution Design & MVP Focus',
    level: RUBRIC_LEVELS[solScore - 1],
    score: solScore,
    maxScore: 4,
    rubricDescriptor:
      solScore === 4
        ? 'Advanced: Defines a disciplined MVP with essential features and commercially viable supplier terms.'
        : solScore === 3
        ? 'Proficient: Builds a focused product addressing the core problem with balanced dev resources.'
        : solScore === 2
        ? 'Developing: Adds unnecessary features that increase cost and delay launch.'
        : 'Beginning: Overloaded feature set with little consideration for development cost or operational viability.',
    supportingEvidence: solEvidence,
    formativeFeedback: solFeedback,
  });

  // 4. Financial Reasoning
  const reserve = state.budget.emergencyReserve;
  const finRefl = state.studentReflections['mod_6_financial_planning'] || '';
  let finScore = 1;
  let finEvidence = `Allocated only ₹${reserve.toLocaleString('en-IN')} to emergency reserve (<₹5,000 buffer).`;
  let finFeedback = 'Increase your emergency cash reserve; unexpected supplier price hikes or repairs could bankrupt the venture.';

  if (reserve >= 15000 && finRefl.length > 25) {
    finScore = 4;
    finEvidence = `Maintained disciplined cash buffer of ₹${reserve.toLocaleString('en-IN')} (3+ months runway). Articulated difference between cash flow and accounting profit in reflection.`;
    finFeedback = 'Mastery of capital discipline; understands that cash runway determines survival during early market shocks.';
  } else if (reserve >= 10000) {
    finScore = 3;
    finEvidence = `Allocated healthy emergency buffer of ₹${reserve.toLocaleString('en-IN')} (2+ months runway).`;
    finFeedback = 'Sound financial planning; monitor variable food costs as order volumes scale.';
  } else if (reserve >= 5000) {
    finScore = 2;
    finEvidence = `Allocated modest emergency buffer of ₹${reserve.toLocaleString('en-IN')}.`;
    finFeedback = 'Adequate short-term cushion, but vulnerable to unexpected operational expenses.';
  }

  competencies.push({
    competencyId: 'financial_reasoning',
    title: 'Financial Reasoning & Capital Discipline',
    level: RUBRIC_LEVELS[finScore - 1],
    score: finScore,
    maxScore: 4,
    rubricDescriptor:
      finScore === 4
        ? 'Advanced: Demonstrates rigorous capital allocation, protects cash runway, and understands unit margins.'
        : finScore === 3
        ? 'Proficient: Balances spending with a prudent emergency buffer and tracks basic expenses.'
        : finScore === 2
        ? 'Developing: Allocates funds across categories but maintains an inadequate cash safety cushion.'
        : 'Beginning: Depletes reserves on non-essential spending with high insolvency risk.',
    supportingEvidence: finEvidence,
    formativeFeedback: finFeedback,
  });

  // 5. Decision-Making & Ethics
  const resolvedCount = state.resolvedEvents.length;
  const ethicsCount = Object.keys(state.selectedEthicsChoices).length;
  const decRefl = state.studentReflections['mod_5_business_model'] || '';
  let decScore = 1;
  let decEvidence = 'Zero crisis events resolved or no ethical governance policies configured.';
  let decFeedback = 'Visit the Business Challenge Room to test how your venture handles unexpected market shocks.';

  if (resolvedCount >= 1 && ethicsCount >= 2 && decRefl.length > 25 && state.businessReputation >= 75) {
    decScore = 4;
    decEvidence = `Resolved crisis event effectively and committed to ${ethicsCount} ethical ESG policies. Maintained strong reputation score of ${state.businessReputation}/100.`;
    decFeedback = 'Exemplary leadership; prioritized customer trust, fair supplier relationships, and operational resilience over quick shortcuts.';
  } else if (resolvedCount >= 1 && ethicsCount >= 1) {
    decScore = 3;
    decEvidence = `Resolved business crisis and adopted ${ethicsCount} responsible business policies (Reputation: ${state.businessReputation}/100).`;
    decFeedback = 'Thoughtful decision-making; continue weighing how cost reductions impact long-term brand goodwill.';
  } else if (resolvedCount >= 1 || ethicsCount >= 1) {
    decScore = 2;
    decEvidence = `Addressed ${resolvedCount} crisis event(s) or adopted basic policy.`;
    decFeedback = 'Formulate clearer long-term policies to handle competitive and operational friction.';
  }

  competencies.push({
    competencyId: 'decision_making',
    title: 'Strategic Decision-Making & Ethics',
    level: RUBRIC_LEVELS[decScore - 1],
    score: decScore,
    maxScore: 4,
    rubricDescriptor:
      decScore === 4
        ? 'Advanced: Navigates crises decisively, weighs second-order consequences, and upholds ethical standards.'
        : decScore === 3
        ? 'Proficient: Makes reasonable trade-offs under pressure and maintains business reputation.'
        : decScore === 2
        ? 'Developing: Reactive choices under stress with occasional negative impacts on customer trust.'
        : 'Beginning: Avoids difficult decisions or selects shortcuts that compromise product integrity.',
    supportingEvidence: decEvidence,
    formativeFeedback: decFeedback,
  });

  // 6. Communication & Pitch Defense
  const deck = state.pitchDeck;
  const isDeckComplete = Boolean(deck.problem && deck.solution && deck.valueProposition && deck.pricingStrategy);
  const commRefl = state.studentReflections['mod_9_pitch_presentation'] || '';
  let commScore = 1;
  let commEvidence = 'Pitch deck slides remain at initial default values.';
  let commFeedback = 'Customize your 11 pitch slides to communicate your venture strategy to investor personas.';

  if (isDeckComplete && state.isPitchCompleted && commRefl.length > 25) {
    commScore = 4;
    commEvidence = `Delivered structured 11-slide pitch defense to investor panel. Addressed unit economics, operational risks, and customer acquisition CAC transparently.`;
    commFeedback = 'Outstanding executive presentation; communicated value proposition clearly while demonstrating command of the numbers.';
  } else if (isDeckComplete && state.isPitchCompleted) {
    commScore = 3;
    commEvidence = `Completed full pitch deck and investor defense in the Pitch Arena.`;
    commFeedback = 'Clear and coherent presentation; practice articulating how your competitive moat defends against rivals.';
  } else if (isDeckComplete) {
    commScore = 2;
    commEvidence = `Structured pitch slides prepared, but formal investor defense not yet completed.`;
    commFeedback = 'Present your deck in the Pitch Arena to receive live investor feedback.';
  }

  competencies.push({
    competencyId: 'communication',
    title: 'Communication & Venture Articulation',
    level: RUBRIC_LEVELS[commScore - 1],
    score: commScore,
    maxScore: 4,
    rubricDescriptor:
      commScore === 4
        ? 'Advanced: Presents a compelling, data-backed pitch; articulates risks and trade-offs with transparency.'
        : commScore === 3
        ? 'Proficient: Communicates value proposition and business model logically with structured slides.'
        : commScore === 2
        ? 'Developing: Covers basic business points but relies on generic marketing slogans over evidence.'
        : 'Beginning: Unclear presentation with missing financial context or unrealistic claims.',
    supportingEvidence: commEvidence,
    formativeFeedback: commFeedback,
  });

  // 7. Reflection & Metacognitive Growth
  const completedReflectionsCount = Object.values(state.studentReflections).filter(
    (text) => text && text.trim().length >= 20
  ).length;
  let reflScore = 1;
  let reflEvidence = `Completed ${completedReflectionsCount} module reflections.`;
  let reflFeedback = 'Complete the reflection questions at each location to consolidate what you learned.';

  if (completedReflectionsCount >= 7) {
    reflScore = 4;
    reflEvidence = `Completed ${completedReflectionsCount} out of 10 structured reflections with deep analysis of trade-offs and personal takeaways.`;
    reflFeedback = 'Exceptional metacognitive awareness; showed genuine ability to learn from simulation setbacks and trade-offs.';
  } else if (completedReflectionsCount >= 4) {
    reflScore = 3;
    reflEvidence = `Completed ${completedReflectionsCount} module reflections examining cause and effect.`;
    reflFeedback = 'Good reflective habit; try to evaluate what you would do differently in counterfactual scenarios.';
  } else if (completedReflectionsCount >= 2) {
    reflScore = 2;
    reflEvidence = `Completed ${completedReflectionsCount} brief reflections.`;
    reflFeedback = 'Expand on your answers by explaining why specific decisions succeeded or failed.';
  }

  competencies.push({
    competencyId: 'reflection',
    title: 'Reflection & Metacognitive Growth',
    level: RUBRIC_LEVELS[reflScore - 1],
    score: reflScore,
    maxScore: 4,
    rubricDescriptor:
      reflScore === 4
        ? 'Advanced: Analyzes alternative choices deeply, acknowledges mistakes, and synthesizes broader principles.'
        : reflScore === 3
        ? 'Proficient: Reflects thoughtfully on business outcomes and connects cause with effect.'
        : reflScore === 2
        ? 'Developing: Describes actions taken with limited analysis of underlying reasons or trade-offs.'
        : 'Beginning: Minimal or superficial reflection with little awareness of learning growth.',
    supportingEvidence: reflEvidence,
    formativeFeedback: reflFeedback,
  });

  const totalScore = competencies.reduce((acc, c) => acc + c.score, 0);
  const avg = totalScore / competencies.length;
  const avgLevel: RubricLevel =
    avg >= 3.5 ? 'Advanced' : avg >= 2.6 ? 'Proficient' : avg >= 1.8 ? 'Developing' : 'Beginning';

  const struggles: string[] = [];
  if (problemScore <= 2) struggles.push('Validating core problem frequency and customer willingness to pay.');
  if (custScore <= 2) struggles.push('Conducting thorough persona interviews to avoid customer bias.');
  if (solScore <= 2) struggles.push('Limiting MVP feature scope to avoid dev point exhaustion.');
  if (finScore <= 2) struggles.push('Maintaining an adequate emergency cash reserve buffer (>2.5 months runway).');
  if (decScore <= 2) struggles.push('Balancing immediate cost-cutting with long-term brand trust and ethics.');
  if (reflScore <= 2) struggles.push('Engaging deeply in written reflection after major decision milestones.');

  return {
    totalScore,
    averageLevel: avgLevel,
    competencies,
    overallEvaluationSummary:
      avgLevel === 'Advanced'
        ? 'Student demonstrates high entrepreneurial acumen, disciplined capital management, and strong reflective reasoning.'
        : avgLevel === 'Proficient'
        ? 'Student has built a solid, viable venture with good grasp of unit economics and customer needs.'
        : avgLevel === 'Developing'
        ? 'Student shows promising foundational ideas but would benefit from tighter cash runway management and MVP scoping.'
        : 'Student is at the early exploratory stage; focus classroom instruction on problem discovery and cash preservation.',
    suggestedTeacherSupportAreas: struggles.length > 0 ? struggles : ['Ready for advanced independent business challenges.'],
  };
}
