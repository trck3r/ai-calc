
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      'email', 'monthlyRevenue', 'industry', 'teamSize',
      'clientSources', 'marketingSetup', 'monthlyAdSpend',
      'leadFollowUpTime', 'noShowRate', 'biggestBottleneck',
      'monthlyLeak', 'annualLeak', 'systemScore', 'weeksToFix',
    ];

    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Save diagnostic result
    const result = await prisma.calculatorResult.create({
      data: {
        email: data.email,
        monthlyRevenue: data.monthlyRevenue,
        industry: data.industry,
        teamSize: data.teamSize,
        clientSources: Array.isArray(data.clientSources)
          ? data.clientSources
          : [data.clientSources],
        marketingSetup: data.marketingSetup,
        monthlyAdSpend: data.monthlyAdSpend,
        leadFollowUpTime: data.leadFollowUpTime,
        noShowRate: data.noShowRate,
        biggestBottleneck: data.biggestBottleneck,
        monthlyLeak: data.monthlyLeak,
        annualLeak: data.annualLeak,
        systemScore: data.systemScore,
        weeksToFix: data.weeksToFix,
        followUpLeakPct: data.leakBreakdown?.followUpLeak ?? 33,
        noShowLeakPct: data.leakBreakdown?.noShowLeak ?? 33,
        systemLeakPct: data.leakBreakdown?.systemLeak ?? 34,
        recommendations: data.recommendations ?? [],
        severityLevel: data.severityLevel ?? 'medium',
      },
    });

    // Save email capture (non-blocking)
    try {
      await prisma.emailCapture.upsert({
        where: { email: data.email },
        update: {
          source: 'diagnostic',
          calculatorResultId: result.id,
        },
        create: {
          email: data.email,
          source: 'diagnostic',
          calculatorResultId: result.id,
        },
      });
    } catch (emailError) {
      console.error('Error saving email capture:', emailError);
    }

    // Sync to GHL (non-blocking)
    try {
      const baseUrl = request.nextUrl.origin;
      fetch(`${baseUrl}/api/ghl-sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          monthlyRevenue: data.monthlyRevenue,
          industry: data.industry,
          teamSize: data.teamSize,
          marketingSetup: data.marketingSetup,
          leadFollowUpTime: data.leadFollowUpTime,
          noShowRate: data.noShowRate,
          biggestBottleneck: data.biggestBottleneck,
          monthlyLeak: data.monthlyLeak,
          systemScore: data.systemScore,
          severityLevel: data.severityLevel,
          resultId: result.id,
        }),
      }).catch((err) => console.error('GHL sync fire-and-forget error:', err));
    } catch (ghlError) {
      console.error('Error initiating GHL sync:', ghlError);
    }

    return NextResponse.json({ id: result.id, success: true });
  } catch (error) {
    console.error('Error saving diagnostic result:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
