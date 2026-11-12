export interface SimulationAssumptionItem {
  name: string;
  category: 'Illustrative Input' | 'Fixed Assumption' | 'Student Variable' | 'Simplified Condition';
  valueOrFormula: string;
  rationale: string;
  pedagogicalPurpose: string;
}

export const SIMULATION_ASSUMPTIONS_DATA: SimulationAssumptionItem[] = [
  {
    name: 'Starting Seed Capital',
    category: 'Illustrative Input',
    valueOrFormula: '₹1,00,000 (One Lakh INR)',
    rationale: 'Provides a realistic, accessible seed pool typical of school innovation grants or incubation competitions.',
    pedagogicalPurpose: 'Teaches students how to allocate finite resources across competing departments without overspending.',
  },
  {
    name: 'Campus Cohort Size',
    category: 'Illustrative Input',
    valueOrFormula: '4,500 students (Day Scholars & Hostellers)',
    rationale: 'Represents a mid-sized school campus or undergraduate cluster with concentrated lunch timing.',
    pedagogicalPurpose: 'Introduces Total Addressable Market (TAM) vs Serviceable Obtainable Market (SOM).',
  },
  {
    name: 'Base Meal Price & Unit Cost',
    category: 'Illustrative Input',
    valueOrFormula: 'Retail Price: ₹95 | Base Ingredients: ₹42 / meal',
    rationale: 'Reflects typical wholesome student cafeteria meals in Indian high-school & college campuses.',
    pedagogicalPurpose: 'Demonstrates Gross Margin calculations (₹95 - ₹42 = ₹53 gross profit per meal, or 55.8% gross margin).',
  },
  {
    name: 'Academic Calendar Schedule',
    category: 'Fixed Assumption',
    valueOrFormula: '22 operational days / month (5-day academic week)',
    rationale: 'Accounts for weekends and institutional holidays during standard school term time.',
    pedagogicalPurpose: 'Standardizes monthly recurring revenue (MRR) and working capital burn projections.',
  },
  {
    name: 'Break-Time Delivery Window',
    category: 'Fixed Assumption',
    valueOrFormula: 'Strict 35-minute lecture break window',
    rationale: 'Students cannot wait past their scheduled class dismissal break for lunch fulfillment.',
    pedagogicalPurpose: 'Illustrates operational bottlenecks: orders delivered after break time result in severe satisfaction drops.',
  },
  {
    name: 'Cash vs Accounting Profit Rule',
    category: 'Simplified Condition',
    valueOrFormula: 'Operating Cash Flow = Revenue - (COGS Cash Outflows + Deferrals + Expenses)',
    rationale: 'Models supplier payment terms. For instance, Net-30 credit allows cash payment 30 days after ingredient delivery.',
    pedagogicalPurpose: 'Critical lesson: Distinguishes paper accounting profit from actual liquid bank cash needed to stay solvent.',
  },
  {
    name: 'Emergency Cash Buffer & Runway',
    category: 'Simplified Condition',
    valueOrFormula: 'Runway (Months) = Emergency Cash Reserve ÷ Monthly Net Burn Rate',
    rationale: 'Measures how many months the venture can operate before running out of funds during unexpected shocks.',
    pedagogicalPurpose: 'Instills risk management: students who keep 0 reserve fail the simulation when a supplier raises prices.',
  },
  {
    name: 'Product Development Points',
    category: 'Student Variable',
    valueOrFormula: '100 Development Points (Budgeted across features)',
    rationale: 'Limits initial launch feature scope to prevent students from building an unwieldy app.',
    pedagogicalPurpose: 'Reinforces Minimum Viable Product (MVP) discipline: choosing 2–3 core features over feature bloat.',
  },
  {
    name: 'Supplier Commercial Terms',
    category: 'Student Variable',
    valueOrFormula: 'Choice of 3 suppliers: GreenRoots (₹48, Net-30), Bharat Bulk (₹38, COD), BioPack (₹54, Eco A+)',
    rationale: 'Forces students to trade off unit cost against payment terms, minimum order quantities (MOQs), and sustainability.',
    pedagogicalPurpose: 'Hands-on procurement negotiation: lower unit price often comes with strict immediate cash payment and higher MOQs.',
  },
  {
    name: 'Customer Acquisition Cost (CAC)',
    category: 'Student Variable',
    valueOrFormula: 'CAC = Total Marketing Spend ÷ Acquired Customer Cohort',
    rationale: 'Derived from channel conversion rates (e.g. WhatsApp ambassadors 8% vs paper flyers 1.5%).',
    pedagogicalPurpose: 'Teaches go-to-market unit economics: spending ₹10,000 on broad flyers that yield 10 users equals an unsustainable ₹1,000 CAC.',
  },
  {
    name: 'Fulfillment Capacity & Bottlenecks',
    category: 'Student Variable',
    valueOrFormula: 'Fulfillment Rate = (Orders Completed within 35 mins ÷ Incoming Demand) × 100',
    rationale: 'If demand exceeds kitchen throughput (e.g. 180 demand vs 120 capacity), fulfillment drops to 66%.',
    pedagogicalPurpose: 'Teaches operational scaling: why taking too many orders without staff capacity destroys customer satisfaction.',
  },
  {
    name: 'Brand Reputation & Trust Index',
    category: 'Simplified Condition',
    valueOrFormula: 'Reputation (0–100 scale) driven by ESG ethics and crisis response',
    rationale: 'Customer loyalty decays rapidly if a venture cuts ingredient quality or abuses workers to save ₹2,000.',
    pedagogicalPurpose: 'Teaches corporate governance: ethical sourcing and fair labor practices protect brand equity over time.',
  },
];

export const CORE_FINANCIAL_FORMULAS = [
  {
    name: 'Gross Profit',
    formula: 'Gross Profit = Total Revenue - Cost of Goods Sold (COGS)',
    explanation: 'The profit remaining after paying the direct costs of producing meals.',
  },
  {
    name: 'Gross Margin %',
    formula: 'Gross Margin % = (Gross Profit ÷ Total Revenue) × 100',
    explanation: 'The percentage of each rupee earned that contributes to paying fixed overhead and profits.',
  },
  {
    name: 'Net Operating Profit',
    formula: 'Net Profit = Gross Profit - Fixed Overhead - Marketing Spend - Customer Support',
    explanation: 'The true bottom line of the venture after covering all business operations.',
  },
  {
    name: 'Cash Runway',
    formula: 'Cash Runway (Months) = Cash Balance ÷ Monthly Net Operating Deficit',
    explanation: 'How long the startup can survive before running out of bank cash.',
  },
  {
    name: 'Customer Acquisition Cost (CAC)',
    formula: 'CAC = Channel Marketing Expenditure ÷ New Paying Customers Acquired',
    explanation: 'How much money it costs to persuade one student to purchase a meal subscription.',
  },
];

export const PEDAGOGICAL_DISCLAIMER_TEXT =
  'Educational Simulation Notice: All data, personas, formulas, customer feedback, and financial outputs are deterministic educational simulations for high school students in Classes 9–12. They are designed to teach foundational business logic and trade-offs. They do not constitute actual commercial forecasts, real market research, or investment advice.';
