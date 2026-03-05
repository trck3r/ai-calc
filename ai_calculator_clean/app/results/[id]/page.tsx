
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import ResultsDisplay from '@/components/results-display';
import { DiagnosticResults } from '@/lib/types';

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

    const results: DiagnosticResults = {
      monthlyLeak: result.monthlyLeak,
      annualLeak: result.annualLeak,
      systemScore: result.systemScore,
      weeksToFix: result.weeksToFix,
      leakBreakdown: {
        followUpLeak: result.followUpLeakPct,
        noShowLeak: result.noShowLeakPct,
        systemLeak: result.systemLeakPct,
      },
      recommendations: result.recommendations,
      severityLevel: result.severityLevel as DiagnosticResults['severityLevel'],
    };

    return (
      <div className="min-h-screen bg-background py-12">
        <div className="hero-glow fixed inset-0 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4">
          <ResultsDisplay results={results} email={result.email} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching results:', error);
    notFound();
  }
}
