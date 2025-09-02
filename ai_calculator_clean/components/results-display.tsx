
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, ArrowRight, TrendingUp, Clock, Target, Zap } from 'lucide-react';
import { CalculatorResults } from '@/lib/types';

interface ResultsDisplayProps {
  results: CalculatorResults;
  email: string;
}

export default function ResultsDisplay({ results, email }: ResultsDisplayProps) {
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [annualCount, setAnnualCount] = useState(0);
  const [advantageCount, setAdvantageCount] = useState(0);

  useEffect(() => {
    // Animate the numbers counting up
    const monthlyDuration = 2000;
    const annualDuration = 2500;
    const advantageDuration = 1500;

    // Monthly opportunity animation
    const monthlyInterval = setInterval(() => {
      setMonthlyCount(prev => {
        const increment = results.monthlyOpportunity / (monthlyDuration / 50);
        const next = prev + increment;
        return next >= results.monthlyOpportunity ? results.monthlyOpportunity : next;
      });
    }, 50);

    // Annual opportunity animation
    setTimeout(() => {
      const annualInterval = setInterval(() => {
        setAnnualCount(prev => {
          const increment = results.annualOpportunity / (annualDuration / 50);
          const next = prev + increment;
          return next >= results.annualOpportunity ? results.annualOpportunity : next;
        });
      }, 50);

      return () => clearInterval(annualInterval);
    }, 500);

    // AI advantage animation
    setTimeout(() => {
      const advantageInterval = setInterval(() => {
        setAdvantageCount(prev => {
          const increment = results.aiAdvantage / (advantageDuration / 50);
          const next = prev + increment;
          return next >= results.aiAdvantage ? results.aiAdvantage : next;
        });
      }, 50);

      return () => clearInterval(advantageInterval);
    }, 1000);

    return () => clearInterval(monthlyInterval);
  }, [results]);

  const handleDownloadRoadmap = async () => {
    // Trigger roadmap PDF download
    window.open('/api/download-roadmap?email=' + encodeURIComponent(email), '_blank');
  };

  const handleBookCall = () => {
    // Redirect to booking page
    window.open('https://calendly.com/ai-product-intensive', '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Primary Results */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your AI Product Revenue Opportunity
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Based on your business profile, here's what you're potentially leaving on the table
        </p>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-600 mb-1">
                ${Math.round(monthlyCount).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Monthly Opportunity</div>
              <div className="text-xs text-gray-500 mt-1">
                This is what you're potentially leaving on the table
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-600 mb-1">
                ${Math.round(annualCount).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Annual Impact</div>
              <div className="text-xs text-gray-500 mt-1">
                Your 12-month opportunity cost
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {Math.round(advantageCount)}%
              </div>
              <div className="text-sm text-gray-600">AI Advantage</div>
              <div className="text-xs text-gray-500 mt-1">
                Revenue increase potential vs traditional products
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {results.timeToBreakEven}
              </div>
              <div className="text-sm text-gray-600">Days to Break-Even</div>
              <div className="text-xs text-gray-500 mt-1">
                Based on typical $2k investment
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Industry Benchmark */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Industry Benchmark
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{results.industryBenchmark}</p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Competitive Gap:</strong> While 77% of businesses are exploring AI, only 35% have implemented it. 
                This is your window of opportunity to gain first-mover advantage.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personalized Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Personalized AI Product Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <Badge variant="secondary" className="mb-2">
                    Recommended for you
                  </Badge>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {recommendation}
                  </h4>
                  <p className="text-sm text-gray-600">
                    High-impact AI enhancement for your specific business model and challenges.
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 7-Step Roadmap Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Your 7-Step AI Product Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">What you'll get:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Step-by-step implementation guide tailored to your business
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    AI tools and templates for rapid product development
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Launch strategy based on your revenue and industry
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Performance optimization checklist
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center">
                <Button 
                  onClick={handleDownloadRoadmap}
                  className="mb-4 bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Your Roadmap (PDF)
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Sent to {email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Capture Your ${Math.round(results.monthlyOpportunity).toLocaleString()}/Month Opportunity?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join the next AI Product Launch Intensive and build your AI-enhanced digital product in just 7 days 
              with our proven done-with-you system.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center text-blue-100">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                7-day done-with-you implementation program
              </div>
              <div className="flex items-center justify-center text-blue-100">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                AI tools, templates, and automation setup included
              </div>
              <div className="flex items-center justify-center text-blue-100">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span>
                30-day revenue guarantee or full refund
              </div>
            </div>

            <Button 
              onClick={handleBookCall}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Strategy Call (Only 20 Spots Available)
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <p className="text-xs text-blue-200 mt-4">
              Limited to 20 operators per intensive • Next cohort starts January 15th
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function DollarSign({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
      />
    </svg>
  );
}
