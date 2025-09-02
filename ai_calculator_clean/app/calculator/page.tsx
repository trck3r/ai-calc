
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalculatorForm from '@/components/calculator-form';
import { CalculatorInputs } from '@/lib/types';
import { calculateResults } from '@/lib/calculator-logic';

export default function CalculatorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: CalculatorInputs & { email: string }) => {
    setIsLoading(true);

    try {
      // Calculate results
      const results = calculateResults(data);

      // Save to database
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, ...results }),
      });

      if (response.ok) {
        const { id } = await response.json();
        // Redirect to results page with ID
        router.push(`/results/${id}`);
      } else {
        throw new Error('Failed to save results');
      }
    } catch (error) {
      console.error('Error submitting calculator:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Calculating Your Opportunity...</h2>
          <p className="text-gray-600">Analyzing your business data and AI potential</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI Product Revenue Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answer a few questions about your business and we'll show you exactly how much revenue 
            you're potentially leaving on the table without an AI-powered digital product.
          </p>
        </div>

        <CalculatorForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
