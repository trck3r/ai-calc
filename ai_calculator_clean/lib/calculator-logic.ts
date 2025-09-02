
import { CalculatorInputs, CalculatorResults } from './types';

const INDUSTRY_MULTIPLIERS: Record<string, number> = {
  'marketing-advertising': 2.8,
  'business-consulting': 2.5,
  'health-fitness': 2.2,
  'finance-accounting': 2.0,
  'technology': 3.2,
  'real-estate': 1.8,
  'education': 2.6,
  'ecommerce': 2.1,
  'other': 2.0
};

const AI_ENHANCEMENT_FACTORS: Record<string, number> = {
  'not-using': 1.5,
  'basic-tools': 1.3,
  'content-creation': 1.2,
  'business-processes': 1.1,
  'advanced-integration': 1.0
};

const DIGITAL_PRODUCT_FACTORS: Record<string, number> = {
  'none': 1.0,
  'basic-course': 0.7,
  'membership-site': 0.5,
  'software-tool': 0.4,
  'templates-resources': 0.8
};

const REVENUE_VALUES: Record<string, number> = {
  '5k-10k': 7500,
  '10k-15k': 12500,
  '15k-20k': 17500,
  '20k-25k': 22500,
  '25k-30k': 27500,
  '30k-plus': 35000
};

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  const baseRevenue = REVENUE_VALUES[inputs.currentRevenue] || 12500;
  const industryMultiplier = INDUSTRY_MULTIPLIERS[inputs.industry] || 2.0;
  const aiEnhancementFactor = AI_ENHANCEMENT_FACTORS[inputs.aiUsage] || 1.3;
  
  // Calculate digital product reduction factor
  let digitalProductFactor = 1.0;
  if (inputs.currentDigitalProducts?.length > 0) {
    const factors = inputs.currentDigitalProducts.map(product => 
      1 - (DIGITAL_PRODUCT_FACTORS[product] || 0.7)
    );
    digitalProductFactor = Math.max(0.2, Math.min(...factors));
  }
  
  // Urgency multiplier for Q4 2024/Q1 2025
  const urgencyMultiplier = 1.3;
  
  // Base calculation
  const baseOpportunity = baseRevenue * industryMultiplier * aiEnhancementFactor;
  const monthlyOpportunity = baseOpportunity * digitalProductFactor * urgencyMultiplier;
  const annualOpportunity = monthlyOpportunity * 12;
  
  // AI advantage percentage
  const aiAdvantage = ((aiEnhancementFactor - 1) * 100) + ((industryMultiplier - 1) * 50);
  
  // Time to break-even (assuming $2k investment)
  const timeToBreakEven = Math.ceil((2000 / monthlyOpportunity) * 30);
  
  // Generate recommendations based on inputs
  const recommendations = generateRecommendations(inputs);
  
  // Industry benchmark
  const industryBenchmark = getIndustryBenchmark(inputs.industry);
  
  return {
    monthlyOpportunity: Math.round(monthlyOpportunity),
    annualOpportunity: Math.round(annualOpportunity),
    aiAdvantage: Math.round(aiAdvantage),
    timeToBreakEven: Math.max(7, timeToBreakEven),
    industryBenchmark,
    recommendations
  };
}

function generateRecommendations(inputs: CalculatorInputs): string[] {
  const recommendations = [];
  
  switch (inputs.industry) {
    case 'marketing-advertising':
      recommendations.push('AI-powered marketing audit tool');
      recommendations.push('Automated campaign optimization system');
      break;
    case 'business-consulting':
      recommendations.push('AI-enhanced business assessment tool');
      recommendations.push('Automated report generation system');
      break;
    case 'health-fitness':
      recommendations.push('AI nutrition planning tool');
      recommendations.push('Personalized workout generator');
      break;
    case 'technology':
      recommendations.push('AI-enhanced software feature');
      recommendations.push('Intelligent automation tool');
      break;
    case 'education':
      recommendations.push('AI tutoring system');
      recommendations.push('Personalized learning path creator');
      break;
    default:
      recommendations.push('AI-powered industry analysis tool');
      recommendations.push('Automated customer insight generator');
  }
  
  // Add challenge-specific recommendation
  switch (inputs.biggestChallenge) {
    case 'scaling':
      recommendations.push('AI process automation system');
      break;
    case 'leads':
      recommendations.push('AI lead qualification tool');
      break;
    case 'conversion':
      recommendations.push('AI sales optimization system');
      break;
    case 'efficiency':
      recommendations.push('AI workflow optimizer');
      break;
    case 'revenue':
      recommendations.push('AI revenue forecasting tool');
      break;
  }
  
  return recommendations.slice(0, 3); // Return top 3 recommendations
}

function getIndustryBenchmark(industry: string): string {
  const benchmarks: Record<string, string> = {
    'marketing-advertising': 'Marketing operators typically see 180% revenue increase with AI products',
    'business-consulting': 'Consulting businesses report 150% higher conversion rates with AI tools',
    'health-fitness': 'Health & fitness operators achieve 120% better client engagement with AI',
    'technology': 'Tech operators see 220% faster product development with AI integration',
    'education': 'Education businesses report 160% improvement in learning outcomes with AI',
    'real-estate': 'Real estate operators achieve 80% faster lead qualification with AI',
    'ecommerce': 'E-commerce operators see 110% increase in average order value with AI',
    'finance-accounting': 'Financial operators report 100% faster client onboarding with AI'
  };
  
  return benchmarks[industry] || 'Operators in your industry typically see 100-200% revenue increase with AI products';
}
