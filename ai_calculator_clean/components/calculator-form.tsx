
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft, DollarSign, Target, AlertTriangle, Calculator } from 'lucide-react';
import { DiagnosticInputs } from '@/lib/types';

interface CalculatorFormProps {
  onSubmit: (data: DiagnosticInputs & { email: string }) => void;
}

// Step 1: Your Business
const REVENUE_OPTIONS = [
  { value: '30k-50k', label: '$30K – $50K' },
  { value: '50k-75k', label: '$50K – $75K' },
  { value: '75k-100k', label: '$75K – $100K' },
  { value: '100k-150k', label: '$100K – $150K' },
  { value: '150k-plus', label: '$150K+' },
];

const INDUSTRY_OPTIONS = [
  { value: 'med-spa', label: 'Med Spa / Aesthetics' },
  { value: 'coaching', label: 'Coaching / Consulting' },
  { value: 'agency', label: 'Agency' },
  { value: 'home-services', label: 'Home Services' },
  { value: 'health-fitness', label: 'Health / Fitness' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'education', label: 'Education / Training' },
  { value: 'other', label: 'Other' },
];

const TEAM_SIZE_OPTIONS = [
  { value: 'solo', label: 'Just me' },
  { value: '2-5', label: '2–5' },
  { value: '6-15', label: '6–15' },
  { value: '15-plus', label: '15+' },
];

// Step 2: Your Marketing
const CLIENT_SOURCE_OPTIONS = [
  { value: 'referrals', label: 'Referrals / Word of Mouth' },
  { value: 'meta-ads', label: 'Meta / IG Ads' },
  { value: 'google-ads', label: 'Google Ads' },
  { value: 'seo-content', label: 'SEO / Content' },
  { value: 'cold-outreach', label: 'Cold Outreach' },
  { value: 'other', label: 'Other' },
];

const MARKETING_SETUP_OPTIONS = [
  { value: 'no-system', label: 'No system — I wing it' },
  { value: 'diy-tools', label: 'DIY with tools (Mailchimp, HubSpot, etc.)' },
  { value: 'agency', label: 'Hired an agency' },
  { value: 'internal-team', label: 'Built internal team' },
];

const AD_SPEND_OPTIONS = [
  { value: '0', label: '$0' },
  { value: 'under-2k', label: 'Under $2K' },
  { value: '2k-5k', label: '$2K – $5K' },
  { value: '5k-10k', label: '$5K – $10K' },
  { value: '10k-plus', label: '$10K+' },
];

// Step 3: Your Bottlenecks
const FOLLOW_UP_OPTIONS = [
  { value: 'under-5-min', label: 'Under 5 minutes' },
  { value: 'under-1-hour', label: 'Under 1 hour' },
  { value: 'same-day', label: 'Same day' },
  { value: 'next-day-plus', label: 'Next day or later' },
  { value: 'dont-know', label: "I don't know" },
];

const NO_SHOW_OPTIONS = [
  { value: 'under-10', label: 'Under 10%' },
  { value: '10-25', label: '10–25%' },
  { value: '25-50', label: '25–50%' },
  { value: 'over-50', label: 'Over 50%' },
  { value: 'dont-track', label: "I don't track it" },
];

const BOTTLENECK_OPTIONS = [
  { value: 'getting-leads', label: 'Getting enough leads' },
  { value: 'converting-leads', label: 'Converting leads to calls' },
  { value: 'showing-up', label: 'Getting people to show up' },
  { value: 'closing', label: 'Closing on calls' },
  { value: 'delivering', label: 'Delivering without me involved' },
];

const STEP_ICONS = [DollarSign, Target, AlertTriangle, Calculator];
const STEP_TITLES = ['Your Business', 'Your Marketing', 'Your Bottlenecks', 'Get Your Results'];
const STEP_DESCRIPTIONS = [
  'Tell us about your business so we can benchmark your systems.',
  'How are you getting and managing leads today?',
  'Where are the gaps costing you the most?',
  'See exactly how much revenue your business is leaking — and what to do about it.',
];

function OptionCard({
  value,
  label,
  selected,
  onClick,
}: {
  value: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`option-card w-full text-left rounded-lg px-4 py-3 text-sm font-medium transition-all ${
        selected
          ? 'selected border-blue-500/50 bg-blue-500/8 text-white'
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function CheckboxCard({
  value,
  label,
  checked,
  onChange,
}: {
  value: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`option-card w-full text-left rounded-lg px-4 py-3 text-sm font-medium flex items-center gap-3 transition-all ${
        checked
          ? 'selected border-blue-500/50 bg-blue-500/8 text-white'
          : 'text-gray-300 hover:text-white'
      }`}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="pointer-events-none border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
      />
      {label}
    </button>
  );
}

function SelectCard({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: string; label: string }[];
  value: string | undefined;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-400">{label}</Label>
      <div className="grid gap-2">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            value={option.value}
            label={option.label}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

export default function CalculatorForm({ onSubmit }: CalculatorFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<DiagnosticInputs & { email: string }>>({
    clientSources: [],
  });

  const totalSteps = 4;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    // Fire Meta Pixel event on step 1 start
    if (currentStep === 0 && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'diagnostic_started');
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClientSourceChange = (value: string, checked: boolean) => {
    const current = formData.clientSources || [];
    if (checked) {
      setFormData({ ...formData, clientSources: [...current, value] });
    } else {
      setFormData({ ...formData, clientSources: current.filter((s) => s !== value) });
    }
  };

  const handleSubmit = () => {
    if (isStepValid()) {
      // Fire Meta Pixel event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('trackCustom', 'diagnostic_completed');
      }
      onSubmit(formData as DiagnosticInputs & { email: string });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.monthlyRevenue && formData.industry && formData.teamSize;
      case 1:
        return (
          formData.clientSources &&
          formData.clientSources.length > 0 &&
          formData.marketingSetup &&
          formData.monthlyAdSpend
        );
      case 2:
        return formData.leadFollowUpTime && formData.noShowRate && formData.biggestBottleneck;
      case 3:
        return formData.email && formData.email.includes('@');
      default:
        return false;
    }
  };

  const StepIcon = STEP_ICONS[currentStep];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <SelectCard
              label="Monthly Revenue"
              options={REVENUE_OPTIONS}
              value={formData.monthlyRevenue}
              onChange={(v) => setFormData({ ...formData, monthlyRevenue: v })}
            />
            <SelectCard
              label="Industry"
              options={INDUSTRY_OPTIONS}
              value={formData.industry}
              onChange={(v) => setFormData({ ...formData, industry: v })}
            />
            <SelectCard
              label="Team Size"
              options={TEAM_SIZE_OPTIONS}
              value={formData.teamSize}
              onChange={(v) => setFormData({ ...formData, teamSize: v })}
            />
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-400">
                How do you get clients now? (select all)
              </Label>
              <div className="grid gap-2">
                {CLIENT_SOURCE_OPTIONS.map((option) => (
                  <CheckboxCard
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    checked={formData.clientSources?.includes(option.value) || false}
                    onChange={(checked) => handleClientSourceChange(option.value, checked)}
                  />
                ))}
              </div>
            </div>
            <SelectCard
              label="Current marketing setup"
              options={MARKETING_SETUP_OPTIONS}
              value={formData.marketingSetup}
              onChange={(v) => setFormData({ ...formData, marketingSetup: v })}
            />
            <SelectCard
              label="Monthly ad spend"
              options={AD_SPEND_OPTIONS}
              value={formData.monthlyAdSpend}
              onChange={(v) => setFormData({ ...formData, monthlyAdSpend: v })}
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <SelectCard
              label="How fast do you follow up with new leads?"
              options={FOLLOW_UP_OPTIONS}
              value={formData.leadFollowUpTime}
              onChange={(v) => setFormData({ ...formData, leadFollowUpTime: v })}
            />
            <SelectCard
              label="What's your no-show rate?"
              options={NO_SHOW_OPTIONS}
              value={formData.noShowRate}
              onChange={(v) => setFormData({ ...formData, noShowRate: v })}
            />
            <SelectCard
              label="Biggest bottleneck right now"
              options={BOTTLENECK_OPTIONS}
              value={formData.biggestBottleneck}
              onChange={(v) => setFormData({ ...formData, biggestBottleneck: v })}
            />
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-gray-400">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input-dark rounded-lg px-4 py-3 text-base"
              />
            </div>

            <div className="card-dark rounded-xl p-5 space-y-3">
              <p className="text-sm font-medium text-white">You'll see:</p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">$</span>
                  Your estimated monthly revenue leak
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">%</span>
                  A system health score for your marketing + sales
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">&rarr;</span>
                  Personalized recommendations to close the gaps
                </li>
              </ul>
            </div>

            <p className="text-xs text-gray-500 text-center">
              No spam. Just your diagnostic results.
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card-dark rounded-2xl max-w-2xl mx-auto overflow-hidden">
      <div className="p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-xs font-medium text-gray-500">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1 bg-white/6 rounded-full overflow-hidden">
            <div
              className="progress-bar h-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step header */}
        <div className="text-center mb-8">
          <StepIcon className="mx-auto h-10 w-10 text-blue-400 mb-4" />
          <h2 className="text-xl font-bold text-white">{STEP_TITLES[currentStep]}</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
            {STEP_DESCRIPTIONS[currentStep]}
          </p>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/6">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid()}
              className="cta-btn-primary rounded-lg px-6 py-3 text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="cta-btn-primary rounded-lg px-6 py-3 text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
            >
              See My Revenue Leak
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
