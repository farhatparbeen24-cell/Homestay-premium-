'use client';

import { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';
import { IMAGES } from '@/src/config/images';
import { SafeImage } from '@/src/components/SafeImage';

interface BundleSectionProps {
  onOpenEnquiry: (preferredRoom?: string) => void;
}

export function BundleSection({ onOpenEnquiry }: BundleSectionProps) {
  const bundle = businessConfig.bundle;
  const [activeGalleryKey, setActiveGalleryKey] = useState<string>(bundle.mainImageKey);

  const mainImage = IMAGES[activeGalleryKey] || IMAGES[bundle.mainImageKey] || IMAGES.bundleMain;

  return (
    <section id="bundle" className="py-20 md:py-28 bg-[#F5F7F8] text-[#101B2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Split Bundle Card */}
        <div className="bg-white rounded-3xl border border-[#101B2D]/10 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content Column (7 cols on lg) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between">
              <div>
                {/* Subtle text badge */}
                <div className="flex items-center gap-2 text-xs font-medium text-[#8FA08A] mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9993F]" />
                  <span>{bundle.badge}</span>
                </div>

                {/* Headline */}
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#101B2D] font-light tracking-tight leading-tight mb-4">
                  {bundle.title}
                </h2>

                <p className="text-sm sm:text-base text-[#101B2D]/75 leading-relaxed mb-8 max-w-xl">
                  {bundle.description}
                </p>

                {/* 4 Inclusions List */}
                <div className="space-y-4 mb-10">
                  {bundle.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-5 h-5 rounded-full bg-[#8FA08A]/15 text-[#8FA08A] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#101B2D]">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#101B2D]/70 leading-relaxed mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA Footer Bar */}
              <div className="pt-6 border-t border-[#101B2D]/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    {bundle.regularPrice && (
                      <span className="text-sm text-[#101B2D]/40 line-through">
                        {bundle.currency}{bundle.regularPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="font-serif text-2xl sm:text-3xl font-medium text-[#101B2D]">
                      {bundle.currency}{bundle.packagePrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs text-[#101B2D]/65 block mt-0.5">
                    {bundle.duration}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenEnquiry(bundle.title)}
                  className="px-6 py-3.5 text-sm font-medium text-[#101B2D] bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 rounded-xl transition-all shadow-sm flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#101B2D]"
                >
                  <span>{bundle.ctaText}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right Media Column with 4-image mini gallery (5 cols on lg) */}
            <div className="lg:col-span-5 bg-[#101B2D]/5 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#101B2D]/10">
              {/* Main Featured Image */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-xs bg-[#101B2D]/10">
                <SafeImage
                  src={mainImage.url}
                  alt={mainImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-opacity duration-300"
                  style={{ objectPosition: mainImage.objectPosition || 'center center' }}
                />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg truncate">
                  {mainImage.alt}
                </div>
              </div>

              {/* 4-Image Mini Gallery Thumbnails */}
              <div>
                <span className="text-[11px] text-[#101B2D]/60 font-medium block mb-2">
                  Experience Highlights ({bundle.galleryImageKeys.length} moments)
                </span>
                <div className="grid grid-cols-4 gap-2.5">
                  {bundle.galleryImageKeys.map((key, idx) => {
                    const img = IMAGES[key] || IMAGES.bundleMini1;
                    const isSelected = activeGalleryKey === key;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveGalleryKey(key)}
                        className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#C9993F] ${
                          isSelected
                            ? 'ring-2 ring-[#C9993F] ring-offset-2 scale-[1.02]'
                            : 'opacity-75 hover:opacity-100'
                        }`}
                        aria-label={`View photo: ${img.alt}`}
                      >
                        <SafeImage
                          src={img.url}
                          alt={img.alt}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
