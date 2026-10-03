'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';
import { trackEvent } from '@/src/lib/analytics';

interface NavbarProps {
  onOpenEnquiry: (preferredRoom?: string) => void;
}

export function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallClick = () => {
    trackEvent('call_click', { source: 'navbar' });
  };

  const handleWhatsAppClick = () => {
    trackEvent('wa_click', { source: 'navbar' });
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#101B2D]/95 backdrop-blur-md py-3.5 shadow-md border-b border-[#C9993F]/20 text-[#EFEAE2]'
          : 'bg-[#101B2D]/50 backdrop-blur-xs py-5 text-[#EFEAE2]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <Link
          href="/"
          className="font-serif text-xl sm:text-2xl tracking-tight text-[#EFEAE2] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#C9993F] rounded-sm"
        >
          {businessConfig.name}
        </Link>

        {/* Zone 2: 3 clean text navigation links (Stay, Experience, Reviews) */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#EFEAE2]/85"
        >
          {businessConfig.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#C9993F] decoration-2 focus-visible:ring-1 focus-visible:ring-[#C9993F] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Call + WhatsApp CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${businessConfig.contact.phone}`}
            onClick={handleCallClick}
            aria-label={`Call ${businessConfig.contact.phoneDisplay}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#EFEAE2] hover:text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors border border-[#C9993F]/25 focus-visible:ring-2 focus-visible:ring-[#C9993F]"
          >
            <Phone className="w-3.5 h-3.5 text-[#C9993F]" aria-hidden="true" />
            <span>Call</span>
          </a>

          <a
            href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(
              `Hello! I would like to enquire about staying at ${businessConfig.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            aria-label="Chat with resident host on WhatsApp"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#101B2D] bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 rounded-lg transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-white"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#EFEAE2] hover:text-[#C9993F] transition-colors focus-visible:ring-2 focus-visible:ring-[#C9993F] rounded-md"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#101B2D] to-[#2B2540] border-b border-[#C9993F]/20 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {businessConfig.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#EFEAE2]/90 hover:text-[#C9993F] transition-colors py-1.5 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-2.5 px-4 text-sm font-medium text-center text-[#101B2D] bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 rounded-lg transition-all shadow-sm"
            >
              Check Availability
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${businessConfig.contact.phone}`}
                onClick={handleCallClick}
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-[#EFEAE2] bg-white/10 rounded-lg border border-[#C9993F]/25 hover:bg-white/15"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9993F]" />
                <span>Call Host</span>
              </a>
              <a
                href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(
                  `Hello! I would like to enquire about staying at ${businessConfig.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-[#101B2D] bg-gradient-to-r from-[#C9993F] to-[#E3C27A] rounded-lg shadow-xs hover:brightness-105"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
