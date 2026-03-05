
import React from 'react';
import {
  ArrowRight,
  Clock,
  PhoneOff,
  Settings2,
  TrendingDown,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/6 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-sm font-bold tracking-widest text-white uppercase">
            Reactiiv
          </span>
          <Link
            href="/calculator"
            className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Start Diagnostic &rarr;
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-4">
            Free 2-Minute Diagnostic
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            How Much Revenue Is Your Business{' '}
            <span className="leak-gradient">Leaking?</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Most businesses doing $50–150K/month lose $3,000–$12,000 every month through
            broken follow-up, no-shows, and system gaps.{' '}
            <span className="text-white font-medium">Find out your number.</span>
          </p>

          <Link
            href="/calculator"
            className="cta-btn-primary inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-white"
          >
            Take the Diagnostic — Free
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-xs text-gray-500 mt-4">
            No credit card &middot; Takes 2 minutes &middot; Instant results
          </p>
        </div>
      </section>

      {/* Problem Stats */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              The Leaks You Can't See
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              These are the silent killers in businesses doing $50K–$150K/month.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-glow rounded-xl p-8 text-center">
              <Clock className="w-8 h-8 text-red-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">78%</div>
              <p className="text-sm text-gray-400">
                of leads go unfollowed past the first hour. After 5 minutes, your odds of
                connecting drop by <span className="text-red-400 font-medium">80%</span>.
              </p>
            </div>

            <div className="card-glow rounded-xl p-8 text-center">
              <PhoneOff className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">$1,200</div>
              <p className="text-sm text-gray-400">
                Average monthly cost of no-shows for a service business — and most don't
                even <span className="text-amber-400 font-medium">track it</span>.
              </p>
            </div>

            <div className="card-glow rounded-xl p-8 text-center">
              <Settings2 className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">62%</div>
              <p className="text-sm text-gray-400">
                of businesses rely on manual processes for client acquisition. The result:
                <span className="text-blue-400 font-medium"> inconsistent revenue</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              What the Diagnostic Shows You
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: TrendingDown,
                title: 'Your monthly revenue leak — in dollars',
                desc: 'Not a guess. A calculation based on your actual follow-up speed, no-show rate, and system setup.',
              },
              {
                icon: Settings2,
                title: 'A system health score for your marketing & sales',
                desc: 'See where you fall on a 0–100 scale and exactly which areas are dragging you down.',
              },
              {
                icon: CheckCircle,
                title: 'Personalized fixes ranked by impact',
                desc: 'Your top 3 highest-leverage changes — specific to your industry, bottleneck, and current setup.',
              },
              {
                icon: Clock,
                title: 'How long it takes to fix',
                desc: 'A realistic timeline for closing the leaks, based on the severity of your system gaps.',
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-6">
            Real Results
          </p>
          <p className="text-3xl md:text-4xl font-bold text-white mb-3">
            <span className="text-gray-500">$30K/mo</span>
            <span className="mx-4 text-gray-600">&rarr;</span>
            <span className="stat-gradient">$105K/mo</span>
          </p>
          <p className="text-sm text-gray-400 max-w-lg mx-auto mb-2">
            Sugar Studios went from $30K to $105K/month in gross revenue after we rebuilt
            their marketing and sales system. Same team. Same service. Better infrastructure.
          </p>
          <p className="text-xs text-gray-500">
            3.5x growth &middot; Verified Jan 2026
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white">Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Is this actually free?',
                a: 'Yes. No credit card, no hidden upsell wall. You get your full diagnostic results instantly. We offer a book and strategy calls for people who want to go deeper, but the diagnostic is 100% free.',
              },
              {
                q: 'How accurate are the numbers?',
                a: "The calculation uses industry-specific leak rates, follow-up timing data, and no-show benchmarks from real businesses. It's directionally accurate — your real number could be higher or lower depending on variables we can't measure in 2 minutes.",
              },
              {
                q: 'What industries does this work for?',
                a: 'Any service-based business doing $30K–$150K+/month. We have specific benchmarks for med spas, coaching, agencies, home services, health/fitness, real estate, e-commerce, and education.',
              },
              {
                q: 'What happens after I get my results?',
                a: "You'll see your monthly leak, system health score, and top 3 fixes. From there you can grab our $27 playbook to implement the fixes yourself, or book a free strategy call to explore done-for-you options.",
              },
            ].map(({ q, a }, i) => (
              <div key={i} className="card-dark rounded-xl p-5">
                <div className="flex gap-3 items-start">
                  <HelpCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">{q}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find Out What You're Losing
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            2 minutes. Free. See the number, see the fixes, decide what to do about it.
          </p>

          <Link
            href="/calculator"
            className="cta-btn-primary inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-white"
          >
            Take the Diagnostic — Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; 2026 Reactiiv. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link href="/calculator" className="hover:text-gray-400 transition-colors">
              Diagnostic
            </Link>
            <a href="https://book.reactiiv.ai/book/" className="hover:text-gray-400 transition-colors">
              Book
            </a>
            <a href="https://reactiiv.ai" className="hover:text-gray-400 transition-colors">
              Reactiiv
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
