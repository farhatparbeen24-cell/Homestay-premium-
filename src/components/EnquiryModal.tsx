'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Calendar, Users, Phone, User, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';
import { enquirySchema } from '@/src/lib/validations';
import { trackEvent } from '@/src/lib/analytics';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledRoom?: string;
}

export function EnquiryModal({ isOpen, onClose, prefilledRoom }: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);
  const [room, setRoom] = useState(prefilledRoom || '');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isDatabaseActive, setIsDatabaseActive] = useState<boolean | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // Check if Supabase is active
  useEffect(() => {
    if (isOpen) {
      fetch('/api/enquiry')
        .then((res) => res.json())
        .then((data) => {
          setIsDatabaseActive(Boolean(data.isDatabaseConfigured));
        })
        .catch(() => {
          setIsDatabaseActive(false);
        });
    }
  }, [isOpen]);

  // Handle ESC key and focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const buildWhatsAppMessage = () => {
    let text = `Namaste! I would like to enquire about staying at ${businessConfig.name}.\n\n`;
    text += `👤 *Name:* ${name || 'Prospective Guest'}\n`;
    if (phone) text += `📞 *Phone:* ${phone}\n`;
    if (checkin) text += `📅 *Check-in:* ${checkin}\n`;
    if (checkout) text += `📅 *Check-out:* ${checkout}\n`;
    text += `👥 *Guests:* ${guests}\n`;
    if (room) text += `🏡 *Preferred Suite/Package:* ${room}\n`;
    if (message) text += `📝 *Note:* ${message}\n`;
    text += `\nPlease let me know the availability and tariff. Thank you!`;
    return encodeURIComponent(text);
  };

  const handleDirectWhatsAppFallback = () => {
    trackEvent('wa_click', { source: 'enquiry_direct_fallback' });
    const waUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${buildWhatsAppMessage()}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFormErrors({});

    const formData = {
      name,
      phone,
      checkin: checkin || undefined,
      checkout: checkout || undefined,
      guests,
      room: room || undefined,
      message: message || undefined,
      honeypot,
    };

    const validation = enquirySchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        if (resData.error === 'SUPABASE_NOT_CONFIGURED') {
          // As per prompt: If env keys are missing, direct to WhatsApp rather than fake success
          setIsDatabaseActive(false);
          setServerError(resData.message || 'Direct database is currently being configured.');
          setIsSubmitting(false);
          return;
        }

        setServerError(resData.message || 'Could not submit enquiry. Please use WhatsApp.');
        setIsSubmitting(false);
        return;
      }

      // Track lead submission
      trackEvent('enquiry_submit', { room, guests });

      // Open WhatsApp with prefilled message
      const waUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${buildWhatsAppMessage()}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      onClose();
    } catch {
      setServerError('A network error occurred. Please contact us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-[#F5F7F8] rounded-3xl shadow-2xl border border-[#C9993F]/25 overflow-hidden text-[#101B2D]"
      >
        {/* Header */}
        <div className="bg-[#101B2D] text-[#EFEAE2] p-6 sm:p-7 flex items-start justify-between">
          <div>
            <span className="text-xs text-[#C9993F] font-medium block mb-1">
              Direct host reservation
            </span>
            <h3 id="enquiry-modal-title" className="font-serif text-2xl font-light text-white">
              Check Availability & Rates
            </h3>
            <p className="text-xs text-[#EFEAE2]/70 mt-1">
              {businessConfig.name} · We reply promptly on WhatsApp & phone
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#EFEAE2]/80 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#C9993F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
          {/* If Supabase is unconfigured, show direct WhatsApp booking CTA (Never fake success!) */}
          {isDatabaseActive === false ? (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-2xl bg-[#C9993F]/10 border border-[#C9993F]/30 text-xs text-[#101B2D] space-y-2">
                <div className="flex items-center gap-2 font-medium text-[#101B2D]">
                  <MessageCircle className="w-4 h-4 text-[#C9993F]" />
                  <span>Direct WhatsApp Reservation Active</span>
                </div>
                <p className="text-[#101B2D]/80 leading-relaxed">
                  Our resident hosts manage all custom dates, room allocations, and special requests directly through WhatsApp to guarantee personal attention.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-[#101B2D] mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Elena Rostova"
                    className="w-full bg-white border border-[#101B2D]/15 rounded-xl px-3.5 py-2.5 text-xs text-[#101B2D] focus:border-[#C9993F] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#101B2D] mb-1">Check-in</label>
                    <input
                      type="date"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                      className="w-full bg-white border border-[#101B2D]/15 rounded-xl px-3 py-2 text-xs text-[#101B2D] focus:border-[#C9993F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#101B2D] mb-1">Check-out</label>
                    <input
                      type="date"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      className="w-full bg-white border border-[#101B2D]/15 rounded-xl px-3 py-2 text-xs text-[#101B2D] focus:border-[#C9993F] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDirectWhatsAppFallback}
                className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 text-[#101B2D] font-medium text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Host on WhatsApp</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bot Honeypot */}
              <input
                type="text"
                name="website_url_check"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Server Error Message */}
              {serverError && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-600/30 text-xs text-amber-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#101B2D] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#101B2D]/40 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-[#101B2D]/20 rounded-xl pl-9 pr-3 py-2 text-xs text-[#101B2D] focus:outline-none focus:border-[#C9993F]"
                    />
                  </div>
                  {formErrors.name && (
                    <span className="text-[11px] text-red-600 mt-1 block">{formErrors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#101B2D] mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#101B2D]/40 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-[#101B2D]/20 rounded-xl pl-9 pr-3 py-2 text-xs text-[#101B2D] focus:outline-none focus:border-[#C9993F]"
                    />
                  </div>
                  {formErrors.phone && (
                    <span className="text-[11px] text-red-600 mt-1 block">{formErrors.phone}</span>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#101B2D] mb-1">Check-in Date</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-[#101B2D]/40 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                      className="w-full bg-white border border-[#101B2D]/20 rounded-xl pl-9 pr-3 py-2 text-xs text-[#101B2D] focus:outline-none focus:border-[#C9993F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#101B2D] mb-1">Check-out Date</label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-[#101B2D]/40 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      className="w-full bg-white border border-[#101B2D]/20 rounded-xl pl-9 pr-3 py-2 text-xs text-[#101B2D] focus:outline-none focus:border-[#C9993F]"
                    />
                  </div>
                </div>
              </div>

              {/* Guests & Room */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-[#101B2D] mb-1">Guests</label>
                  <div className="relative">
                    <Users className="w-3.5 h-3.5 text-[#101B2D]/40 absolute left-3 top-3" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-white border border-[#101B2D]/20 rounded-xl pl-9 pr-3 py-2 text-xs text-[#101B2D] focus:outline-none focus:border-[#C9993F]"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#101B2D] mb-1">Preferred Suite / Package</label>
                  <select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full bg-white border border-[#101B2D]/20 rounded-xl px-3 py-2 text-xs text-[#101B2D] focus:outline-none focus:border-[#C9993F]"
                  >
                    <option value="">Any available sanctuary</option>
                    {businessConfig.rooms.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name} ({r.currency}{r.priceFrom}/night)
                      </option>
                    ))}
                    <option value={businessConfig.bundle.title}>
                      {businessConfig.bundle.title}
                    </option>
                  </select>
                </div>
              </div>

              {/* Optional message */}
              <div>
                <label className="block text-xs font-medium text-[#101B2D] mb-1">
                  Specific Requests (Dietary, pickup, celebrations)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="E.g., We would love Kathgodam station pickup and vegetarian Kumaoni dinners."
                  className="w-full bg-white border border-[#101B2D]/20 rounded-xl p-3 text-xs text-[#101B2D] focus:outline-none focus:border-[#C9993F]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 text-[#101B2D] font-medium text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting with hosts...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Enquiry & Open WhatsApp</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-[#101B2D]/60 text-center">
                Submitting stores your enquiry securely and connects you directly with our resident hosts on WhatsApp.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
