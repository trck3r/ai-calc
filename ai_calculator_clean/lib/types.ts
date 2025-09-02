
export interface CalculatorInputs {
  currentRevenue: string;
  businessModel: string;
  currentDigitalProducts: string[];
  teamSize: string;
  industry: string;
  aiUsage: string;
  biggestChallenge: string;
}

export interface CalculatorResults {
  monthlyOpportunity: number;
  annualOpportunity: number;
  aiAdvantage: number;
  timeToBreakEven: number;
  industryBenchmark: string;
  recommendations: string[];
}

export interface IndustryMultiplier {
  name: string;
  multiplier: number;
}

export interface AIEnhancementFactor {
  level: string;
  factor: number;
}
