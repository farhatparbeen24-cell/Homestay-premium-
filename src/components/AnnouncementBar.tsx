'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';

interface AnnouncementBarProps {
  onOpenEnquiry: (preferredRoom?: string) => void;
}

export function AnnouncementBar({ onOpenEnquiry }: AnnouncementBarProps) {
  return (
    <div
      id="announcement"
      className="bg-[#101B2D] text-[#EFEAE2] border-b border-[#C9993F]/20 text-xs py-2.5 px-4 transition-colors relative z-40"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-center text-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-[#EFEAE2]/90">
          <Sparkles className="w-3.5 h-3.5 text-[#C9993F] shrink-0" aria-hidden="true" />
          <span>{businessConfig.announcement.text}</span>
        </span>
        <button
          onClick={() => onOpenEnquiry()}
          type="button"
          className="inline-flex items-center gap-1 text-[#C9993F] hover:text-[#E3C27A] underline underline-offset-4 font-medium transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-[#C9993F] rounded px-1"
        >
          <span>{businessConfig.announcement.linkText}</span>
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
