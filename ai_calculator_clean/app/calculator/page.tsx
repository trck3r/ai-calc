
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalculatorForm from '@/components/calculator-form';
import { DiagnosticInputs } from '@/lib/types';
import { calculateResults } from '@/lib/calculator-logic';

export default function CalculatorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: DiagnosticInputs & { email: string }) => {
    setIsLoading(true);

    try {
      const results = calculateResults(data);

      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...results }),
      });

      if (response.ok) {
        const { id } = await response.json();
        router.push(`/results/${id}`);
      } else {
        throw new Error('Failed to save results');
      }
    } catch (error) {
      console.error('Error submitting diagnostic:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="spinner mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-white mb-2">Running Your Diagnostic...</h2>
          <p className="text-gray-400">Analyzing your marketing and sales systems</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="hero-glow fixed inset-0 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">
            Free 2-Minute Diagnostic
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Much Revenue Is <span className="leak-gradient">Leaking</span> From Your Business?
          </h1>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            Answer a few questions about your marketing and sales systems.
            We'll show you exactly where the leaks are — and how to fix them.
          </p>
        </div>

        <CalculatorForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
