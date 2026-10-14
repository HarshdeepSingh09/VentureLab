export interface JourneyStage {
  id: string;
  stageNumber: string;
  title: string;
  tagline: string;
  description: string;
  exampleScenario: string;
  learningConcept: string;
  keySkills: string[];
  interactionTitle: string;
  interactionDescription: string;
}

export interface BudgetAllocation {
  productDevelopment: number;
  marketing: number;
  operations: number;
  emergencyReserve: number;
}

export type ChallengeOptionId = 'A' | 'B' | 'C';

export interface ChallengeOption {
  id: ChallengeOptionId;
  title: string;
  shortSummary: string;
  operationalImpact: string;
  financialImpact: string;
  customerImpact: string;
  detailedAnalysis: string;
  strategicTakeaway: string;
}

export interface PartnershipFormData {
  fullName: string;
  designation: string;
  institution: string;
  email: string;
  city: string;
  interestType: 'Learning more' | 'Providing feedback' | 'Exploring a potential pilot';
  message: string;
  consent: boolean;
}
