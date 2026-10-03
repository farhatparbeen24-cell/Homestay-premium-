import { NextRequest, NextResponse } from 'next/server';
import { enquirySchema } from '@/src/lib/validations';
import { getSupabaseServerClient, isSupabaseConfigured } from '@/src/lib/supabaseServer';
import { checkRateLimit } from '@/src/lib/rateLimit';

export async function GET() {
  return NextResponse.json({
    isDatabaseConfigured: isSupabaseConfigured(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
    const rateCheck = checkRateLimit(`enquiry_${ip}`, 5, 60_000);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many enquiry requests. Please wait a minute or connect directly on WhatsApp.',
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot detection
    if (body.honeypot && body.honeypot.trim() !== '') {
      return NextResponse.json(
        { success: false, error: 'SPAM_REJECTED', message: 'Submission rejected.' },
        { status: 400 }
      );
    }

    const validationResult = enquirySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'VALIDATION_ERROR',
          issues: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check Supabase status
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'SUPABASE_NOT_CONFIGURED',
          message: 'Direct database storage is not active. Please proceed directly to WhatsApp.',
        },
        { status: 503 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        {
          success: false,
          error: 'DATABASE_UNAVAILABLE',
          message: 'Unable to connect to database service.',
        },
        { status: 500 }
      );
    }

    const { data: inserted, error: insertError } = await supabase
      .from('leads')
      .insert({
        name: data.name,
        phone: data.phone,
        checkin: data.checkin || null,
        checkout: data.checkout || null,
        guests: data.guests,
        room: data.room || null,
        message: data.message || null,
        source: data.source || 'website_enquiry',
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Supabase lead insertion error:', insertError);
      return NextResponse.json(
        {
          success: false,
          error: 'INSERTION_FAILED',
          message: 'Database storage error occurred. Please contact us on WhatsApp directly.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: inserted?.id,
    });
  } catch (err: unknown) {
    console.error('Unhandled enquiry error:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred.',
      },
      { status: 500 }
    );
  }
}
