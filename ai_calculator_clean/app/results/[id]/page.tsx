
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import ResultsDisplay from '@/components/results-display';
import { CalculatorResults } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface ResultsPageProps {
  params: {
    id: string;
  };
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { id } = params;

  try {
    const result = await prisma.calculatorResult.findUnique({
      where: { id },
    });

    if (!result) {
      notFound();
    }

    const results: CalculatorResults = {
      monthlyOpportunity: result.monthlyOpportunity,
      annualOpportunity: result.annualOpportunity,
      aiAdvantage: result.aiAdvantage,
      timeToBreakEven: result.timeToBreakEven,
      industryBenchmark: getIndustryBenchmark(result.industry),
      recommendations: getRecommendations(result.industry, result.biggestChallenge),
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <ResultsDisplay results={results} email={result.email} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching results:', error);
    notFound();
  }
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

function getRecommendations(industry: string, challenge: string): string[] {
  const recommendations = [];
  
  switch (industry) {
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
  switch (challenge) {
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
  
  return recommendations.slice(0, 3);
}
