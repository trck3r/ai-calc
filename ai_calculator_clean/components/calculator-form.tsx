
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ArrowLeft, Calculator, DollarSign, Users, Zap } from 'lucide-react';
import { CalculatorInputs } from '@/lib/types';

interface CalculatorFormProps {
  onSubmit: (data: CalculatorInputs & { email: string }) => void;
}

const REVENUE_OPTIONS = [
  { value: '5k-10k', label: '$5k-$10k' },
  { value: '10k-15k', label: '$10k-$15k' },
  { value: '15k-20k', label: '$15k-$20k' },
  { value: '20k-25k', label: '$20k-$25k' },
  { value: '25k-30k', label: '$25k-$30k' },
  { value: '30k-plus', label: '$30k+' }
];

const BUSINESS_MODEL_OPTIONS = [
  { value: 'service-based', label: 'Service-based business' },
  { value: 'ecommerce', label: 'E-commerce/Physical products' },
  { value: 'saas', label: 'SaaS/Software' },
  { value: 'consulting', label: 'Consulting/Coaching' },
  { value: 'agency', label: 'Agency' },
  { value: 'other', label: 'Other' }
];

const DIGITAL_PRODUCTS = [
  { value: 'none', label: 'None' },
  { value: 'basic-course', label: 'Basic course/ebook' },
  { value: 'membership-site', label: 'Membership site' },
  { value: 'software-tool', label: 'Software tool' },
  { value: 'templates-resources', label: 'Templates/Resources' }
];

const TEAM_SIZE_OPTIONS = [
  { value: 'solo', label: 'Solo operator' },
  { value: '2-5', label: '2-5 team members' },
  { value: '6-10', label: '6-10 team members' },
  { value: '10-plus', label: '10+ team members' }
];

const INDUSTRY_OPTIONS = [
  { value: 'marketing-advertising', label: 'Marketing/Advertising' },
  { value: 'business-consulting', label: 'Business Consulting' },
  { value: 'health-fitness', label: 'Health/Fitness' },
  { value: 'finance-accounting', label: 'Finance/Accounting' },
  { value: 'technology', label: 'Technology' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'education', label: 'Education' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'other', label: 'Other' }
];

const AI_USAGE_OPTIONS = [
  { value: 'not-using', label: 'Not using AI at all' },
  { value: 'basic-tools', label: 'Basic AI tools (ChatGPT, etc.)' },
  { value: 'content-creation', label: 'AI for content creation' },
  { value: 'business-processes', label: 'AI for business processes' },
  { value: 'advanced-integration', label: 'Advanced AI integration' }
];

const CHALLENGE_OPTIONS = [
  { value: 'scaling', label: 'Scaling without more time investment' },
  { value: 'leads', label: 'Generating consistent leads' },
  { value: 'conversion', label: 'Converting prospects to customers' },
  { value: 'efficiency', label: 'Delivering services efficiently' },
  { value: 'revenue', label: 'Creating predictable revenue' }
];

export default function CalculatorForm({ onSubmit }: CalculatorFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CalculatorInputs & { email: string }>>({
    currentDigitalProducts: []
  });

  const totalSteps = 4;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDigitalProductChange = (value: string, checked: boolean) => {
    const current = formData.currentDigitalProducts || [];
    if (checked) {
      setFormData({
        ...formData,
        currentDigitalProducts: [...current, value]
      });
    } else {
      setFormData({
        ...formData,
        currentDigitalProducts: current.filter(item => item !== value)
      });
    }
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onSubmit(formData as CalculatorInputs & { email: string });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.currentRevenue && formData.businessModel;
      case 1:
        return formData.currentDigitalProducts && formData.aiUsage;
      case 2:
        return formData.industry && formData.teamSize && formData.biggestChallenge;
      case 3:
        return formData.email;
      default:
        return false;
    }
  };

  const isFormValid = () => {
    return formData.currentRevenue && 
           formData.businessModel && 
           formData.currentDigitalProducts &&
           formData.aiUsage && 
           formData.industry && 
           formData.teamSize && 
           formData.biggestChallenge &&
           formData.email;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <DollarSign className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Business Basics</h2>
              <p className="text-gray-600 mt-2">Let's understand your current business foundation</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Current Monthly Revenue</Label>
                <Select value={formData.currentRevenue} onValueChange={(value) => setFormData({...formData, currentRevenue: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    {REVENUE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold">Primary Business Model</Label>
                <RadioGroup 
                  value={formData.businessModel} 
                  onValueChange={(value) => setFormData({...formData, businessModel: value})}
                  className="mt-2"
                >
                  {BUSINESS_MODEL_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Zap className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Current State</h2>
              <p className="text-gray-600 mt-2">Tell us about your existing products and AI usage</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Current Digital Products (select all that apply)</Label>
                <div className="mt-2 space-y-2">
                  {DIGITAL_PRODUCTS.map((product) => (
                    <div key={product.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={product.value}
                        checked={formData.currentDigitalProducts?.includes(product.value) || false}
                        onCheckedChange={(checked) => handleDigitalProductChange(product.value, checked as boolean)}
                      />
                      <Label htmlFor={product.value}>{product.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold">Current AI Usage</Label>
                <RadioGroup 
                  value={formData.aiUsage} 
                  onValueChange={(value) => setFormData({...formData, aiUsage: value})}
                  className="mt-2"
                >
                  {AI_USAGE_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Users className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Context & Goals</h2>
              <p className="text-gray-600 mt-2">Help us understand your business context and challenges</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Industry/Niche</Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold">Team Size</Label>
                <Select value={formData.teamSize} onValueChange={(value) => setFormData({...formData, teamSize: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your team size" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold">Biggest Business Challenge</Label>
                <RadioGroup 
                  value={formData.biggestChallenge} 
                  onValueChange={(value) => setFormData({...formData, biggestChallenge: value})}
                  className="mt-2"
                >
                  {CHALLENGE_OPTIONS.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Calculator className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Get Your Results</h2>
              <p className="text-gray-600 mt-2">Enter your email to receive your personalized revenue opportunity report</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-2"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>You'll receive:</strong>
                </p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Your personalized revenue opportunity calculation</li>
                  <li>• Industry-specific AI product recommendations</li>
                  <li>• The complete 7-step AI product roadmap (PDF)</li>
                  <li>• Exclusive bonuses and resources</li>
                </ul>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center bg-blue-600 hover:bg-blue-700"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="flex items-center bg-green-600 hover:bg-green-700"
            >
              Calculate My Opportunity
              <Calculator className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
