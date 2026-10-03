-- Cloudveil Ridge Homestay - Supabase Database Schema
-- Provides storage for enquiry leads and newsletter subscribers with strict Row Level Security.

-- 1. Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    checkin DATE,
    checkout DATE,
    guests INTEGER DEFAULT 2,
    room TEXT,
    message TEXT,
    source TEXT DEFAULT 'website_enquiry',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    source TEXT DEFAULT 'footer_newsletter',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Enable Row Level Security (RLS) on both tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 4. No public access policies.
-- By default when RLS is enabled and no policies exist, public anon users have zero read/insert/update/delete access.
-- Server route handlers authenticate using SUPABASE_SERVICE_ROLE_KEY which bypasses RLS securely.
COMMENT ON TABLE public.leads IS 'Homestay booking enquiries submitted via the modal form.';
COMMENT ON TABLE public.newsletter_subscribers IS 'Homestay newsletter and journal subscriber list.';
