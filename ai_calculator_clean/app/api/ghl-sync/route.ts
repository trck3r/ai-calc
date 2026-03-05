
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const GHL_BASE = 'https://services.leadconnectorhq.com';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
      console.error('[GHL-SYNC] Missing GHL_API_KEY or GHL_LOCATION_ID');
      return NextResponse.json(
        { error: 'GHL not configured' },
        { status: 500 }
      );
    }

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // Determine severity tag
    const severityTag = `revenue-leak-${data.severityLevel || 'medium'}`;

    // 1. Create or update GHL contact
    const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        locationId,
        email: data.email,
        tags: ['diagnostic-lead', severityTag],
        source: 'Revenue Leak Diagnostic',
      }),
    });

    const contactData = await contactRes.json();
    const contactId = contactData?.contact?.id;

    if (!contactId) {
      console.error('[GHL-SYNC] Failed to create contact:', JSON.stringify(contactData));
      return NextResponse.json(
        { error: 'Failed to create GHL contact' },
        { status: 500 }
      );
    }

    console.log(`[GHL-SYNC] Contact upserted: ${contactId} | ${data.email}`);

    // 2. Add diagnostic data as a note
    try {
      const noteLines = [
        `--- REVENUE LEAK DIAGNOSTIC ---`,
        `Monthly Revenue: ${data.monthlyRevenue}`,
        `Industry: ${data.industry}`,
        `Team Size: ${data.teamSize}`,
        `Marketing Setup: ${data.marketingSetup}`,
        `Lead Follow-Up: ${data.leadFollowUpTime}`,
        `No-Show Rate: ${data.noShowRate}`,
        `Biggest Bottleneck: ${data.biggestBottleneck}`,
        ``,
        `--- RESULTS ---`,
        `Monthly Leak: $${Math.round(data.monthlyLeak).toLocaleString()}`,
        `System Score: ${data.systemScore}/100`,
        `Severity: ${data.severityLevel}`,
        ``,
        `Result URL: /results/${data.resultId}`,
        `Submitted: ${new Date().toISOString()}`,
      ];

      await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ body: noteLines.join('\n'), userId: null }),
      });
    } catch (noteErr) {
      console.error('[GHL-SYNC] Note creation failed:', noteErr);
    }

    // 3. Save contactId back to DB
    if (data.resultId) {
      try {
        await prisma.calculatorResult.update({
          where: { id: data.resultId },
          data: { ghlContactId: contactId },
        });
      } catch (dbErr) {
        console.error('[GHL-SYNC] Failed to save contactId to DB:', dbErr);
      }
    }

    return NextResponse.json({ success: true, contactId });
  } catch (error) {
    console.error('[GHL-SYNC] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
