'use client';

import { ArrowRight, Heart } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';
import { IMAGES } from '@/src/config/images';
import { SafeImage } from '@/src/components/SafeImage';

export function StorySection() {
  const story = businessConfig.story;
  const imageConfig = IMAGES[story.imageKey] || IMAGES.hostStory;

  return (
    <section id="story" className="py-20 md:py-32 bg-[#F5F7F8] text-[#101B2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text and Host Signature (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-[#8FA08A]">
              <Heart className="w-3.5 h-3.5 text-[#C9993F]" />
              <span>{story.badge}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#101B2D] font-light tracking-tight leading-tight text-balance">
              {story.title}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#101B2D]/80 leading-relaxed max-w-xl">
              {story.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Host signature */}
            <div className="pt-4 pb-2 border-t border-[#101B2D]/10 flex items-center gap-4">
              <div>
                <span className="font-serif text-lg font-medium text-[#101B2D] block">
                  {story.hostNames}
                </span>
                <span className="text-xs text-[#101B2D]/60">
                  {story.hostRole}
                </span>
              </div>
            </div>

            {/* "Learn more" anchor */}
            <div>
              <a
                href={story.anchorHref}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#101B2D] hover:text-[#C9993F] underline underline-offset-4 decoration-2 decoration-[#C9993F] transition-colors focus-visible:ring-2 focus-visible:ring-[#C9993F] rounded px-1 py-0.5"
              >
                <span>{story.anchorText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: One Large Image (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden shadow-lg border border-[#101B2D]/10 bg-[#101B2D]/10">
              <SafeImage
                src={imageConfig.url}
                alt={imageConfig.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                style={{ objectPosition: imageConfig.objectPosition || 'center 30%' }}
              />
              {/* Subtle caption pill-free overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs text-[#101B2D] text-xs p-3.5 rounded-xl shadow-xs border border-[#101B2D]/5">
                <span className="font-medium block">{story.hostNames}</span>
                <span className="text-[11px] text-[#101B2D]/70">Pahadi hospitality rooted in Mukteshwar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
