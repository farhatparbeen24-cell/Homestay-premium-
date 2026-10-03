'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';
import { trackEvent } from '@/src/lib/analytics';

export function MobileStickyBar() {
  const handleCall = () => {
    trackEvent('call_click', { source: 'mobile_sticky_bar' });
  };

  const handleWhatsApp = () => {
    trackEvent('wa_click', { source: 'mobile_sticky_bar' });
  };

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#101B2D]/95 backdrop-blur-md border-t border-[#C9993F]/20 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-lg"
      role="region"
      aria-label="Mobile quick contact bar"
    >
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <a
          href={`tel:${businessConfig.contact.phone}`}
          onClick={handleCall}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#EFEAE2] text-xs font-medium border border-[#C9993F]/25 active:scale-98 transition-transform"
        >
          <Phone className="w-4 h-4 text-[#C9993F]" />
          <span>Call Host</span>
        </a>

        <a
          href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(
            `Namaste! I am browsing ${businessConfig.name} and would like to enquire about room availability.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 text-[#101B2D] text-xs font-semibold shadow-sm active:scale-98 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
