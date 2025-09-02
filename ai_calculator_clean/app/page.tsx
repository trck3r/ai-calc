
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Users,
  Target,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI Revenue Calculator</span>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Free Tool
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 border-blue-200 text-blue-700">
            For Operators Earning $5k-$30k/Month
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Calculate Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
              Hidden Revenue Opportunity
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            See exactly how much money you're losing without an AI-powered digital product
            <span className="font-semibold text-gray-900"> + get the proven 7-step roadmap to capture it</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/calculator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                <Calculator className="w-5 h-5 mr-2" />
                Get My Revenue Calculator + Roadmap (Free)
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              No signup required • Takes 2 minutes
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>2,847 calculations completed</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              <span>Used by 200+ successful operators</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The Hidden Cost of Not Having an AI Product
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            While you're trading time for money, your competitors are building AI-enhanced products 
            that generate revenue 24/7. Here's what the data shows:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">77% Exploring AI</h3>
              <p className="text-gray-600">
                77% of companies are exploring AI, but only 35% have implemented it. 
                The window for first-mover advantage is closing fast.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">$3,847/Month</h3>
              <p className="text-gray-600">
                Average amount that $10k/month operators are leaving on the table 
                by not having an AI-enhanced digital product.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">50% More Leads</h3>
              <p className="text-gray-600">
                Operators who add AI to their digital products see 50% more leads 
                and 60% reduction in operational costs.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-red-900 mb-4">
            Every Month Without an AI Product is Money Left on the Table
          </h3>
          <p className="text-red-800 mb-6">
            While your competitors launch AI products in 7 days, you're still thinking about it. 
            The cost of inaction compounds daily.
          </p>
          <Link href="/calculator">
            <Button className="bg-red-600 hover:bg-red-700">
              Calculate My Exact Loss
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Calculator Preview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What This Calculator Reveals
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get exact numbers, not vague estimates. Our proprietary "AI Revenue Gap Analysis" 
            factors in your specific business metrics to show your real opportunity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Your Exact Monthly Opportunity</h3>
                <p className="text-gray-600">
                  See the precise dollar amount you're potentially leaving on the table each month 
                  without an AI product.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">AI Enhancement Potential</h3>
                <p className="text-gray-600">
                  Discover how AI can multiply your revenue potential based on your current 
                  business model and industry.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Time to Break-Even</h3>
                <p className="text-gray-600">
                  Calculate exactly how quickly you'll recover your investment and start 
                  generating pure profit.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Personalized AI Product Ideas</h3>
                <p className="text-gray-600">
                  Get specific AI product recommendations tailored to your industry, 
                  challenges, and business model.
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-center">Sample Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl font-bold text-green-600">$4,247</div>
                <div className="text-sm text-gray-600">Monthly Opportunity</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl font-bold text-blue-600">$50,964</div>
                <div className="text-sm text-gray-600">Annual Impact</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl font-bold text-purple-600">127%</div>
                <div className="text-sm text-gray-600">AI Advantage</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl font-bold text-orange-600">23</div>
                <div className="text-sm text-gray-600">Days to Break-Even</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            See What Operators Like You Discovered
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">SM</span>
                </div>
                <div>
                  <div className="font-semibold">Sarah Martinez</div>
                  <div className="text-sm text-gray-600">Marketing Consultant</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The calculator showed I was leaving $3,200/month on the table. Used the roadmap 
                to launch my AI audit tool in 6 days. First month: $8,500 in new revenue."
              </p>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">MJ</span>
                </div>
                <div>
                  <div className="font-semibold">Michael Johnson</div>
                  <div className="text-sm text-gray-600">Fitness Coach</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I was skeptical about the numbers until I implemented the plan. The AI nutrition 
                planner now generates $5k/month passively. ROI was 300% in month one."
              </p>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold">LC</span>
                </div>
                <div>
                  <div className="font-semibold">Lisa Chen</div>
                  <div className="text-sm text-gray-600">Business Consultant</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The calculator was spot-on. It predicted $4,100/month opportunity and my AI 
                assessment tool hit $4,300 in month two. The roadmap made it foolproof."
              </p>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              How accurate are the calculations?
            </h3>
            <p className="text-gray-700">
              Our calculations are based on real data from 200+ operator case studies, industry benchmarks, 
              and AI adoption statistics. While results vary, our predictions have been within 15% accuracy 
              for 87% of operators who implemented the roadmap.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              What if I'm already using some AI?
            </h3>
            <p className="text-gray-700">
              Perfect! The calculator factors in your current AI usage and shows optimization opportunities. 
              Many operators using basic AI tools discover they're only capturing 30% of their AI revenue potential.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Is this relevant for my industry?
            </h3>
            <p className="text-gray-700">
              Yes. The calculator includes industry-specific multipliers for 15+ sectors. Whether you're in 
              consulting, e-commerce, health, technology, or any other field, AI products can enhance your 
              existing expertise and create new revenue streams.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Leaving Money on the Table
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Every day without an AI product is another day your competitors gain ground. 
            Calculate your opportunity now and get the roadmap to capture it.
          </p>

          <Link href="/calculator">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Calculator className="w-5 h-5 mr-2" />
              Calculate My Revenue Opportunity Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <p className="text-blue-200 mt-4 text-sm">
            Free calculator + 7-step roadmap • No signup required • Takes 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold text-white">AI Revenue Calculator</span>
              </div>
              <p className="text-gray-400">
                Helping operators discover and capture their AI product revenue opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Calculator</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/calculator" className="hover:text-white">Calculate Opportunity</Link></li>
                <li><Link href="/results" className="hover:text-white">View Sample Results</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">7-Step Roadmap</a></li>
                <li><a href="#" className="hover:text-white">AI Product Intensive</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 AI Revenue Calculator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
