'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';
import { IMAGES } from '@/src/config/images';
import { SafeImage } from '@/src/components/SafeImage';
import { trackEvent } from '@/src/lib/analytics';

export function Footer() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot, source: 'footer_newsletter' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing to our mountain journal.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Unable to subscribe. Please connect with us directly.');
      }
    } catch {
      setStatus('error');
      setMessage('A connection error occurred. Please try again.');
    }
  };

  const handlePhoneClick = () => {
    trackEvent('call_click', { source: 'footer' });
  };

  return (
    <footer id="location" className="bg-[#101B2D] text-[#EFEAE2] pt-20 pb-28 md:pb-16 border-t border-[#C9993F]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Info + Columns + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#C9993F]/20">
          {/* Column 1: Brand Wordmark, Tagline & Newsletter (lg: 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="font-serif text-2xl sm:text-3xl tracking-tight text-[#EFEAE2] block hover:text-[#C9993F] transition-colors"
            >
              {businessConfig.name}
            </Link>

            <p className="text-xs sm:text-sm text-[#EFEAE2]/80 leading-relaxed max-w-sm">
              {businessConfig.tagline}
            </p>

            <p className="text-xs text-[#EFEAE2]/65 leading-relaxed max-w-sm">
              {businessConfig.footer.about}
            </p>

            {/* Newsletter signup (real Supabase insert) */}
            {businessConfig.toggles.showNewsletter && (
              <div className="pt-2">
                <span className="text-xs text-[#C9993F] font-medium block mb-2">
                  Mountain journal & seasonal dispatch
                </span>
                <p className="text-xs text-[#EFEAE2]/65 mb-3">
                  Receive quarterly stories on apple blossoms, bird migrations, and snowfall notes. No spam.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  {/* Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="website_secondary_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="flex gap-2 max-w-md">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@domain.com"
                      required
                      className="flex-1 bg-white/10 border border-[#C9993F]/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#EFEAE2] placeholder-[#EFEAE2]/40 focus:outline-none focus:border-[#C9993F]"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-4 py-2.5 bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 text-[#101B2D] text-xs font-semibold rounded-xl transition-all shrink-0 flex items-center justify-center disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {status === 'success' && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{message}</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 mt-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{message}</span>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Column 2: Link Columns (lg: 3 cols) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6">
            {businessConfig.footer.columns.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <span className="text-xs text-[#C9993F] font-medium block">
                  {col.title}
                </span>
                <ul className="space-y-2 text-xs">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="text-[#EFEAE2]/75 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 3: Contact & Google Maps Embed (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs text-[#C9993F] font-medium block">
              Reach our homestead
            </span>

            <div className="space-y-2 text-xs text-[#EFEAE2]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8FA08A] shrink-0 mt-0.5" />
                <span>{businessConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8FA08A] shrink-0" />
                <a
                  href={`tel:${businessConfig.contact.phone}`}
                  onClick={handlePhoneClick}
                  className="hover:text-white transition-colors"
                >
                  {businessConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8FA08A] shrink-0" />
                <a
                  href={`mailto:${businessConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {businessConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Google Maps embed iframe */}
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#C9993F]/20 bg-white/5">
              <iframe
                title="Cloudveil Ridge Homestay Location Map"
                src={businessConfig.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(0.9)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Copyright Line above the large display wordmark */}
        <div className="pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EFEAE2]/60 gap-4">
          <p>{businessConfig.footer.copyrightNotice}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <a
              href={`https://wa.me/${businessConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9993F] hover:underline"
            >
              Direct Host Line
            </a>
          </div>
        </div>

        {/* Very large full-width display wordmark of the homestay name over a dark textured image band */}
        <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-[#C9993F]/20 bg-[#101B2D]">
          {/* Dark textured image band */}
          <div className="absolute inset-0 z-0">
            <SafeImage
              src={IMAGES.footerBand?.url || IMAGES.heroView.url}
              alt={IMAGES.footerBand?.alt || 'Dark textured mountain ridge at dusk'}
              fill
              sizes="100vw"
              className="object-cover opacity-15 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#101B2D]/90 via-[#2B2540]/80 to-[#101B2D]/95" />
          </div>

          {/* Large display wordmark (text from config, responsive, no overflow at 360px) */}
          <div className="relative z-10 py-10 sm:py-16 md:py-24 px-3 sm:px-6 text-center select-none flex items-center justify-center overflow-hidden">
            <span className="font-serif tracking-tight font-light uppercase text-[#EFEAE2]/20 hover:text-[#C9993F]/35 transition-colors duration-500 text-[clamp(1.5rem,7.8vw,9.5rem)] leading-none block select-none">
              {businessConfig.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
