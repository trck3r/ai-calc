
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Phone, TrendingDown, ShieldAlert, Clock, Activity } from 'lucide-react';
import { DiagnosticResults } from '@/lib/types';

interface ResultsDisplayProps {
  results: DiagnosticResults;
  email: string;
}

function useCountUp(target: number, duration: number = 2000, delay: number = 0) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime.current) startTime.current = timestamp;
        const elapsed = timestamp - startTime.current;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(target * eased));
        if (progress < 1) {
          animRef.current = requestAnimationFrame(animate);
        }
      };
      animRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [target, duration, delay]);

  return count;
}

function MetricCard({
  icon: Icon,
  label,
  value,
  sublabel,
  accentClass,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sublabel: string;
  accentClass: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`card-dark rounded-xl p-6 ${accentClass}`}
    >
      <Icon className="h-5 w-5 text-gray-500 mb-3" />
      <div className="text-3xl md:text-4xl font-bold text-white mb-1 count-up">
        {value}
      </div>
      <div className="text-sm font-medium text-gray-300">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{sublabel}</div>
    </motion.div>
  );
}

function LeakBar({
  label,
  percentage,
  color,
  delay,
}: {
  label: string;
  percentage: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400 font-medium">{percentage}%</span>
      </div>
      <div className="leak-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
          className="leak-bar-fill"
          style={{ background: color }}
        />
      </div>
    </motion.div>
  );
}

export default function ResultsDisplay({ results, email }: ResultsDisplayProps) {
  const monthlyCount = useCountUp(results.monthlyLeak, 2000, 300);
  const annualCount = useCountUp(results.annualLeak, 2500, 600);
  const scoreCount = useCountUp(results.systemScore, 1500, 900);

  const handleBookClick = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'diagnostic_book_click');
    }
    window.open('https://book.reactiiv.ai/book/', '_blank');
  };

  const handleCallClick = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'diagnostic_call_click');
    }
    window.open('https://calendly.com/reactiiv/strategy', '_blank');
  };

  const severityColors: Record<string, string> = {
    low: 'text-green-400',
    medium: 'text-amber-400',
    high: 'text-orange-400',
    critical: 'text-red-400',
  };

  const severityLabels: Record<string, string> = {
    low: 'Minor leaks detected',
    medium: 'Moderate revenue leak',
    high: 'Significant revenue leak',
    critical: 'Critical system failure',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">
          Your Diagnostic Results
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Your Business Is Leaking{' '}
          <span className="leak-gradient">
            ${monthlyCount.toLocaleString()}
          </span>
          /month
        </h1>
        <p className={`text-sm font-medium ${severityColors[results.severityLevel]}`}>
          {severityLabels[results.severityLevel]}
        </p>
      </motion.div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={TrendingDown}
          label="Monthly Leak"
          value={`$${monthlyCount.toLocaleString()}`}
          sublabel="Revenue lost per month"
          accentClass="metric-red"
          delay={0.2}
        />
        <MetricCard
          icon={ShieldAlert}
          label="Annual Impact"
          value={`$${annualCount.toLocaleString()}`}
          sublabel="12-month cost of inaction"
          accentClass="metric-amber"
          delay={0.4}
        />
        <MetricCard
          icon={Activity}
          label="System Health"
          value={`${scoreCount}/100`}
          sublabel={scoreCount < 40 ? 'Needs urgent attention' : scoreCount < 70 ? 'Room for improvement' : 'Healthy foundation'}
          accentClass="metric-blue"
          delay={0.6}
        />
        <MetricCard
          icon={Clock}
          label="Weeks to Fix"
          value={`${results.weeksToFix}`}
          sublabel="Estimated with the right system"
          accentClass="metric-green"
          delay={0.8}
        />
      </div>

      {/* Leak Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="card-dark rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-1">Where You're Leaking</h3>
        <p className="text-sm text-gray-500 mb-6">Breakdown of your revenue loss by category</p>
        <div className="space-y-5">
          <LeakBar
            label="Slow Lead Follow-Up"
            percentage={results.leakBreakdown.followUpLeak}
            color="linear-gradient(90deg, #ef4444, #f87171)"
            delay={1.1}
          />
          <LeakBar
            label="No-Shows & Drop-Off"
            percentage={results.leakBreakdown.noShowLeak}
            color="linear-gradient(90deg, #f59e0b, #fbbf24)"
            delay={1.2}
          />
          <LeakBar
            label="System & Automation Gaps"
            percentage={results.leakBreakdown.systemLeak}
            color="linear-gradient(90deg, #3b82f6, #60a5fa)"
            delay={1.3}
          />
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="card-dark rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-1">Your Top 3 Fixes</h3>
        <p className="text-sm text-gray-500 mb-6">Personalized recommendations based on your diagnostic</p>
        <div className="space-y-4">
          {results.recommendations.map((rec, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-400">{i + 1}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed pt-1">{rec}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="card-dark rounded-xl p-6 text-center"
      >
        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Case Study</p>
        <p className="text-2xl font-bold text-white mb-2">
          <span className="text-gray-500">$30K/mo</span>
          <span className="mx-3 text-gray-600">&rarr;</span>
          <span className="stat-gradient">$105K/mo</span>
        </p>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Sugar Studios went from $30K to $105K/month in gross revenue after we rebuilt their
          marketing and sales system from scratch. Same team. Same service. Better infrastructure.
        </p>
      </motion.div>

      {/* Dual CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="space-y-4"
      >
        {/* Primary: Book CTA */}
        <div className="card-dark rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Get the Playbook to Fix This
          </h3>
          <p className="text-sm text-gray-400 mb-6 max-w-lg mx-auto">
            10 chapters. Real case studies. The exact system that took a business
            from $30K to $105K/month. Everything you need to close the leaks yourself.
          </p>
          <button
            onClick={handleBookClick}
            className="cta-btn-primary rounded-lg px-8 py-4 text-base font-semibold text-white inline-flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Get the Book — $27
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Instant digital delivery &middot; 10 chapters &middot; Actionable frameworks
          </p>
        </div>

        {/* Secondary: Call CTA */}
        <div className="card-dark rounded-xl p-6 text-center">
          <p className="text-sm text-gray-400 mb-3">
            Want to skip ahead?
          </p>
          <button
            onClick={handleCallClick}
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Book a strategy call — see what this system looks like built for your business
            <ArrowRight className="w-3 h-3" />
          </button>
          <p className="text-xs text-gray-500 mt-2">
            30 minutes &middot; No pitch &middot; Just clarity
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-center pt-4 pb-8">
        <p className="text-xs text-gray-600">
          Results sent to {email} &middot; Powered by{' '}
          <a href="https://reactiiv.ai" className="text-blue-500 hover:text-blue-400 transition-colors">
            Reactiiv
          </a>
        </p>
      </div>
    </div>
  );
}
