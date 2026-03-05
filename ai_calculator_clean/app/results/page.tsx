
import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResultsIndexPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="hero-glow fixed inset-0 pointer-events-none" />
      <div className="relative max-w-lg text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-amber-400 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-3">
          No Results Found
        </h1>
        <p className="text-gray-400 mb-8">
          Complete the Revenue Leak Diagnostic first to see your
          personalized results and system health analysis.
        </p>

        <Link
          href="/calculator"
          className="cta-btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white"
        >
          Start Diagnostic
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="text-xs text-gray-500 mt-4">
          Takes 2 minutes &middot; Free &middot; Instant results
        </p>

        <div className="mt-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
