
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      'email', 'currentRevenue', 'businessModel', 'currentDigitalProducts',
      'teamSize', 'industry', 'aiUsage', 'biggestChallenge',
      'monthlyOpportunity', 'annualOpportunity', 'aiAdvantage', 'timeToBreakEven'
    ];

    for (const field of requiredFields) {
      if (!data[field] && data[field] !== 0) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Save calculator result
    const result = await prisma.calculatorResult.create({
      data: {
        email: data.email,
        currentRevenue: data.currentRevenue,
        businessModel: data.businessModel,
        currentDigitalProducts: Array.isArray(data.currentDigitalProducts) 
          ? data.currentDigitalProducts 
          : [data.currentDigitalProducts],
        teamSize: data.teamSize,
        industry: data.industry,
        aiUsage: data.aiUsage,
        biggestChallenge: data.biggestChallenge,
        monthlyOpportunity: data.monthlyOpportunity,
        annualOpportunity: data.annualOpportunity,
        aiAdvantage: data.aiAdvantage,
        timeToBreakEven: data.timeToBreakEven,
      },
    });

    // Save email capture
    try {
      await prisma.emailCapture.upsert({
        where: { email: data.email },
        update: {
          source: 'calculator',
          calculatorResultId: result.id,
        },
        create: {
          email: data.email,
          source: 'calculator',
          calculatorResultId: result.id,
        },
      });
    } catch (emailError) {
      console.error('Error saving email capture:', emailError);
      // Don't fail the request if email capture fails
    }

    return NextResponse.json({ id: result.id, success: true });

  } catch (error) {
    console.error('Error saving calculator result:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
