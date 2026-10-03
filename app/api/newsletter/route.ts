import { NextRequest, NextResponse } from 'next/server';
import { newsletterSchema } from '@/src/lib/validations';
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
    const rateCheck = checkRateLimit(`newsletter_${ip}`, 6, 60_000);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: 'RATE_LIMIT_EXCEEDED', message: 'Please wait before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body.honeypot && body.honeypot.trim() !== '') {
      return NextResponse.json(
        { success: false, error: 'SPAM_REJECTED', message: 'Subscription rejected.' },
        { status: 400 }
      );
    }

    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'VALIDATION_ERROR',
          issues: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'SUPABASE_NOT_CONFIGURED',
          message: 'Newsletter database is currently inactive. Reach out via WhatsApp or email.',
        },
        { status: 503 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'DATABASE_UNAVAILABLE', message: 'Database client error.' },
        { status: 500 }
      );
    }

    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: validation.data.email.toLowerCase().trim(),
        source: validation.data.source || 'footer_newsletter',
      });

    if (insertError) {
      // 23505 is PostgreSQL unique constraint violation
      if (insertError.code === '23505') {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to our mountain journal. Welcome back!',
        });
      }

      console.error('Supabase newsletter insert error:', insertError);
      return NextResponse.json(
        {
          success: false,
          error: 'INSERTION_FAILED',
          message: 'Could not complete subscription at this time.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to Cloudveil Ridge journal.',
    });
  } catch (err: unknown) {
    console.error('Newsletter route error:', err);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_ERROR', message: 'Server error occurred.' },
      { status: 500 }
    );
  }
}
