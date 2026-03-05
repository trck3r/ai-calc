
export interface DiagnosticInputs {
  // Step 1: Your Business
  monthlyRevenue: string;
  industry: string;
  teamSize: string;

  // Step 2: Your Marketing
  clientSources: string[];
  marketingSetup: string;
  monthlyAdSpend: string;

  // Step 3: Your Bottlenecks
  leadFollowUpTime: string;
  noShowRate: string;
  biggestBottleneck: string;
}

// Keep old name as alias for backwards compat in calculator page
export type CalculatorInputs = DiagnosticInputs;

export interface DiagnosticResults {
  monthlyLeak: number;
  annualLeak: number;
  systemScore: number;
  weeksToFix: number;
  leakBreakdown: {
    followUpLeak: number;
    noShowLeak: number;
    systemLeak: number;
  };
  recommendations: string[];
  severityLevel: 'low' | 'medium' | 'high' | 'critical';
}

// Keep old name as alias
export type CalculatorResults = DiagnosticResults;
