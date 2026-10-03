'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Check, Copy, Loader2 } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';
import { IMAGES } from '@/src/config/images';
import { SafeImage } from '@/src/components/SafeImage';

interface WelcomePopupProps {
  onClaimPerks?: () => void;
}

export function WelcomePopup({ onClaimPerks }: WelcomePopupProps) {
  const popupConfig = businessConfig.popup;
  const isEnabled = businessConfig.toggles.showPopup && popupConfig.enabled;

  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDatabaseConfigured, setIsDatabaseConfigured] = useState<boolean | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Check if Supabase keys are configured; if missing, hide the popup (no fake success)
  useEffect(() => {
    let isMounted = true;
    fetch('/api/newsletter')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setIsDatabaseConfigured(Boolean(data.isDatabaseConfigured));
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsDatabaseConfigured(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Opens once per visitor shortly after load if enabled and database configured
  useEffect(() => {
    if (!isEnabled || isDatabaseConfigured !== true) return;

    let hasSeen = false;
    try {
      hasSeen = localStorage.getItem('cloudveil_popup_dismissed') === 'true';
    } catch {
      hasSeen = false;
    }

    if (hasSeen) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, popupConfig.delayMs || 2200);

    return () => clearTimeout(timer);
  }, [isEnabled, isDatabaseConfigured, popupConfig.delayMs]);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('cloudveil_popup_dismissed', 'true');
    } catch {
      // Ignore localStorage errors in private browsing/sandboxed environments
    }
  };

  // Focus trap and Esc key support
  useEffect(() => {
    if (!isVisible) return;
    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const firstInput = modalRef.current.querySelector<HTMLElement>('input');
        if (firstInput) {
          firstInput.focus();
        } else {
          const firstBtn = modalRef.current.querySelector<HTMLElement>('button');
          firstBtn?.focus();
        }
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'popup' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsRevealed(true);
        try {
          localStorage.setItem('cloudveil_popup_dismissed', 'true');
        } catch {
          // Ignore storage errors
        }
      } else {
        setError(data.message || 'Subscription could not be processed. Please try again.');
      }
    } catch {
      setError('A connection error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(popupConfig.offerCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // If Supabase keys are missing or popup disabled or invisible, render nothing
  if (!isVisible || !isEnabled || isDatabaseConfigured !== true) {
    return null;
  }

  const popupImg = IMAGES[popupConfig.imageKey] || IMAGES.popupImage || IMAGES.heroRoom;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[#F5F7F8] rounded-3xl shadow-2xl border border-[#C9993F]/25 overflow-hidden text-[#101B2D]"
      >
        {/* Close X top right */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close offer modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-[#101B2D]/60 hover:text-[#101B2D] hover:bg-black/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#C9993F]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Two halves: Left arch photo, Right form / revealed code (mobile stacked) */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[420px]">
          {/* Left half: tall arch-top photo with a small pill badge showing the offer */}
          <div className="relative p-5 sm:p-6 flex flex-col justify-end min-h-[220px] sm:min-h-[260px] md:min-h-full bg-[#101B2D]/5">
            <div className="relative w-full h-full min-h-[200px] md:min-h-[380px] arch-top overflow-hidden shadow-sm bg-[#101B2D]/20">
              <SafeImage
                src={popupImg.url}
                alt={popupImg.alt}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
                style={{ objectPosition: popupImg.objectPosition || 'center center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/80 via-transparent to-transparent pointer-events-none" />

              {/* Small pill badge showing the offer */}
              <div className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-medium bg-[#101B2D]/90 text-[#EFEAE2] border border-[#C9993F]/40 shadow-xs backdrop-blur-xs">
                {popupConfig.badge}
              </div>
            </div>
          </div>

          {/* Right half: headline, one line of subtext, one email input, full-width dark pill button "Reveal code", small consent line */}
          <div className="p-6 sm:p-8 flex flex-col justify-center text-left">
            {!isRevealed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3
                    id="popup-headline"
                    className="font-serif text-2xl sm:text-3xl text-[#101B2D] font-light leading-snug mb-2 pr-6"
                  >
                    {popupConfig.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#101B2D]/75 leading-relaxed">
                    {popupConfig.subtext}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <label htmlFor="popup-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="popup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={popupConfig.inputPlaceholder}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white border border-[#101B2D]/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#101B2D] placeholder-[#101B2D]/40 focus:outline-none focus:border-[#C9993F] focus:ring-1 focus:ring-[#C9993F] transition-all"
                  />

                  {/* Full-width dark pill button "Reveal code" */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full py-3.5 px-6 bg-[#101B2D] hover:bg-[#2B2540] text-[#EFEAE2] font-medium text-xs sm:text-sm transition-all border border-[#C9993F]/30 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#C9993F] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#C9993F]" />
                    ) : (
                      <span>{popupConfig.ctaText}</span>
                    )}
                  </button>
                </div>

                {error && (
                  <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                    {error}
                  </p>
                )}

                {/* Small consent line */}
                <p className="text-[11px] text-[#101B2D]/60 text-center leading-normal pt-1">
                  {popupConfig.consentLine}
                </p>
              </form>
            ) : (
              /* Success state: code revealed from config */
              <div className="space-y-5 py-2">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#8FA08A]/15 text-[#8FA08A] flex items-center justify-center mb-3">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3
                    id="popup-headline"
                    className="font-serif text-2xl sm:text-3xl text-[#101B2D] font-light leading-snug mb-2"
                  >
                    {popupConfig.successHeadline}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#101B2D]/75 leading-relaxed">
                    {popupConfig.successSubtext}
                  </p>
                </div>

                {/* Offer code presentation */}
                <div className="bg-[#101B2D] p-4 rounded-2xl border border-[#C9993F]/40 text-center space-y-3 shadow-inner">
                  <span className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-[#C9993F] block select-all">
                    {popupConfig.offerCode}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-medium text-[#101B2D] bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 transition-all shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{popupConfig.copiedButtonText}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{popupConfig.copyButtonText}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-1 flex flex-col gap-2">
                  {onClaimPerks && (
                    <button
                      type="button"
                      onClick={() => {
                        handleDismiss();
                        onClaimPerks();
                      }}
                      className="w-full py-2.5 px-4 text-xs font-medium text-[#101B2D] bg-white border border-[#101B2D]/15 hover:bg-[#F5F7F8] rounded-full transition-colors"
                    >
                      Apply code to enquiry
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="text-center text-xs text-[#101B2D]/60 hover:text-[#101B2D] transition-colors py-1"
                  >
                    Done & continue browsing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
