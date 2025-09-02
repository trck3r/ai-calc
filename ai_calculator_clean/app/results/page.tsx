
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResultsIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Calculator className="mx-auto h-16 w-16 text-blue-600 mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            View Your Calculator Results
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Looking for your personalized revenue opportunity calculation? 
            Complete the calculator to see your results.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">No Results Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-8">
            <p className="text-gray-600 mb-6">
              You need to complete the AI Product Launch Calculator first to see your 
              personalized results and revenue opportunity analysis.
            </p>
            
            <Link href="/calculator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Calculator className="w-5 h-5 mr-2" />
                Start Calculator Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <p className="text-sm text-gray-500 mt-4">
              Takes just 2 minutes • Get instant results + 7-step roadmap
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
