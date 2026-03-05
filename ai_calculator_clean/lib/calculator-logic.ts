
import { DiagnosticInputs, DiagnosticResults } from './types';

// Revenue midpoints for each range
const REVENUE_MIDPOINTS: Record<string, number> = {
  '30k-50k': 40000,
  '50k-75k': 62500,
  '75k-100k': 87500,
  '100k-150k': 125000,
  '150k-plus': 175000,
};

// Industry-specific base leak rates
const INDUSTRY_LEAK_RATES: Record<string, number> = {
  'med-spa': 0.28,
  'coaching': 0.22,
  'agency': 0.18,
  'home-services': 0.30,
  'health-fitness': 0.25,
  'real-estate': 0.24,
  'ecommerce': 0.15,
  'education': 0.26,
  'other': 0.22,
};

// Follow-up speed multipliers (slower = more leak)
const FOLLOW_UP_MULTIPLIERS: Record<string, number> = {
  'under-5-min': 1.0,
  'under-1-hour': 1.15,
  'same-day': 1.35,
  'next-day-plus': 1.6,
  'dont-know': 1.5,
};

// No-show rate multipliers
const NO_SHOW_MULTIPLIERS: Record<string, number> = {
  'under-10': 1.0,
  '10-25': 1.15,
  '25-50': 1.4,
  'over-50': 1.7,
  'dont-track': 1.35,
};

// System sophistication factor (better systems = less leak)
const SYSTEM_FACTORS: Record<string, number> = {
  'no-system': 1.0,
  'diy-tools': 0.8,
  'agency': 0.65,
  'internal-team': 0.55,
};

export function calculateResults(inputs: DiagnosticInputs): DiagnosticResults {
  const baseRevenue = REVENUE_MIDPOINTS[inputs.monthlyRevenue] || 62500;
  const industryRate = INDUSTRY_LEAK_RATES[inputs.industry] || 0.22;
  const followUpMultiplier = FOLLOW_UP_MULTIPLIERS[inputs.leadFollowUpTime] || 1.35;
  const noShowMultiplier = NO_SHOW_MULTIPLIERS[inputs.noShowRate] || 1.35;
  const systemFactor = SYSTEM_FACTORS[inputs.marketingSetup] || 0.8;

  // Calculate individual leak components
  const followUpLeakAmount = baseRevenue * industryRate * (followUpMultiplier - 1);
  const noShowLeakAmount = baseRevenue * industryRate * (noShowMultiplier - 1);
  const systemLeakAmount = baseRevenue * industryRate * systemFactor;

  // Total monthly leak
  const monthlyLeak = Math.round(
    baseRevenue * industryRate * followUpMultiplier * noShowMultiplier * systemFactor
  );
  const annualLeak = monthlyLeak * 12;

  // System health score (0-100, lower = worse)
  // Start at 100, deduct for each weakness
  let systemScore = 100;

  // Follow-up penalty
  if (inputs.leadFollowUpTime === 'next-day-plus') systemScore -= 25;
  else if (inputs.leadFollowUpTime === 'same-day') systemScore -= 18;
  else if (inputs.leadFollowUpTime === 'dont-know') systemScore -= 22;
  else if (inputs.leadFollowUpTime === 'under-1-hour') systemScore -= 8;

  // No-show penalty
  if (inputs.noShowRate === 'over-50') systemScore -= 25;
  else if (inputs.noShowRate === '25-50') systemScore -= 18;
  else if (inputs.noShowRate === 'dont-track') systemScore -= 15;
  else if (inputs.noShowRate === '10-25') systemScore -= 8;

  // System setup penalty
  if (inputs.marketingSetup === 'no-system') systemScore -= 25;
  else if (inputs.marketingSetup === 'diy-tools') systemScore -= 12;
  else if (inputs.marketingSetup === 'agency') systemScore -= 5;

  // Bottleneck penalty
  if (inputs.biggestBottleneck === 'getting-leads') systemScore -= 8;
  else if (inputs.biggestBottleneck === 'converting-leads') systemScore -= 10;
  else if (inputs.biggestBottleneck === 'showing-up') systemScore -= 12;
  else if (inputs.biggestBottleneck === 'closing') systemScore -= 6;
  else if (inputs.biggestBottleneck === 'delivering') systemScore -= 4;

  systemScore = Math.max(15, Math.min(100, systemScore));

  // Weeks to fix estimate
  let weeksToFix: number;
  if (systemScore >= 70) weeksToFix = 2;
  else if (systemScore >= 55) weeksToFix = 4;
  else if (systemScore >= 35) weeksToFix = 6;
  else weeksToFix = 8;

  // Severity level
  let severityLevel: 'low' | 'medium' | 'high' | 'critical';
  if (monthlyLeak < 3000) severityLevel = 'low';
  else if (monthlyLeak < 8000) severityLevel = 'medium';
  else if (monthlyLeak < 15000) severityLevel = 'high';
  else severityLevel = 'critical';

  // Leak breakdown percentages (for visualization)
  const totalLeakComponents = followUpLeakAmount + noShowLeakAmount + systemLeakAmount;
  const leakBreakdown = {
    followUpLeak: totalLeakComponents > 0
      ? Math.round((followUpLeakAmount / totalLeakComponents) * 100)
      : 33,
    noShowLeak: totalLeakComponents > 0
      ? Math.round((noShowLeakAmount / totalLeakComponents) * 100)
      : 33,
    systemLeak: totalLeakComponents > 0
      ? Math.round((systemLeakAmount / totalLeakComponents) * 100)
      : 34,
  };

  // Generate personalized recommendations
  const recommendations = generateRecommendations(inputs, systemScore);

  return {
    monthlyLeak,
    annualLeak,
    systemScore,
    weeksToFix,
    leakBreakdown,
    recommendations,
    severityLevel,
  };
}

function generateRecommendations(
  inputs: DiagnosticInputs,
  systemScore: number
): string[] {
  const recs: string[] = [];

  // Follow-up recommendation
  if (['next-day-plus', 'same-day', 'dont-know'].includes(inputs.leadFollowUpTime)) {
    recs.push(
      'Automate lead follow-up to under 5 minutes. Speed-to-lead is the single highest-leverage fix — businesses that respond in under 5 minutes are 21x more likely to qualify the lead.'
    );
  }

  // No-show recommendation
  if (['25-50', 'over-50', 'dont-track'].includes(inputs.noShowRate)) {
    recs.push(
      'Implement automated appointment reminders (SMS + email, 24hr + 1hr before). Add a confirmation step. This alone can cut no-shows by 40-60%.'
    );
  }

  // System recommendation
  if (inputs.marketingSetup === 'no-system') {
    recs.push(
      'Build a centralized CRM and automation layer. Right now leads, follow-ups, and appointments live in your head or scattered tools. A single system connecting ads → CRM → nurture → booking eliminates manual gaps.'
    );
  } else if (inputs.marketingSetup === 'diy-tools') {
    recs.push(
      'Connect your existing tools into one automated pipeline. You have the pieces — they just aren\'t talking to each other. Integration eliminates the manual handoffs where leads fall through.'
    );
  }

  // Bottleneck-specific
  if (inputs.biggestBottleneck === 'getting-leads' && recs.length < 3) {
    recs.push(
      'Your lead generation needs a predictable paid channel. Organic and referrals plateau — a dialed-in Meta or Google ads system can 3-5x your pipeline volume in 30 days.'
    );
  }
  if (inputs.biggestBottleneck === 'converting-leads' && recs.length < 3) {
    recs.push(
      'Your conversion problem is likely a nurture problem. Most leads need 5-12 touchpoints before they book. An automated nurture sequence (email + SMS) bridges the gap between "interested" and "ready."'
    );
  }
  if (inputs.biggestBottleneck === 'closing' && recs.length < 3) {
    recs.push(
      'Improve your pre-call positioning. Send a pre-call video or case study that frames the conversation before it starts. Prospects who arrive pre-sold close at 2-3x the rate.'
    );
  }
  if (inputs.biggestBottleneck === 'delivering' && recs.length < 3) {
    recs.push(
      'Systematize delivery with SOPs, automations, and team workflows. If delivery depends on you, you\'re the bottleneck. Build a system that runs without your daily involvement.'
    );
  }

  // Industry-specific fallback
  if (recs.length < 3) {
    const industryRecs: Record<string, string> = {
      'med-spa': 'Med spas with automated booking + SMS reminders see 30-50% fewer no-shows and 2x rebooking rates.',
      'coaching': 'Coaching businesses that automate onboarding and session reminders retain clients 40% longer.',
      'agency': 'Agencies that productize their offer and automate client reporting free up 15-20 hours/week of delivery time.',
      'home-services': 'Home service businesses with speed-to-lead automation win 60% more jobs from the same ad spend.',
      'health-fitness': 'Fitness businesses with automated trial-to-member nurture sequences convert at 2x the industry average.',
      'real-estate': 'Real estate teams with automated drip campaigns on stale leads reactivate 8-12% into appointments.',
      'ecommerce': 'E-commerce brands with abandoned cart + post-purchase sequences recover 15-25% of lost revenue.',
      'education': 'Education businesses with automated enrollment sequences reduce drop-off by 35%.',
      'other': 'Businesses that automate their top 3 manual processes typically recover 15-25% of leaked revenue within 60 days.',
    };
    recs.push(industryRecs[inputs.industry] || industryRecs['other']);
  }

  return recs.slice(0, 3);
}
