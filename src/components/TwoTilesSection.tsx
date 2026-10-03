'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';
import { IMAGES } from '@/src/config/images';
import { SafeImage } from '@/src/components/SafeImage';

interface TwoTilesSectionProps {
  onOpenEnquiry: (preferredRoom?: string) => void;
}

export function TwoTilesSection({ onOpenEnquiry }: TwoTilesSectionProps) {
  const { leftTile, rightTile } = businessConfig.twoTiles;
  const leftImg = IMAGES[leftTile.imageKey] || IMAGES.tileGallery;
  const rightImg = IMAGES[rightTile.imageKey] || IMAGES.tileCta;

  return (
    <section className="py-16 md:py-24 bg-[#F5F7F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Tile: Gallery / Journal */}
          <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] p-8 sm:p-12 flex flex-col justify-end text-white shadow-sm group border border-[#101B2D]/10">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <SafeImage
                src={leftImg.url}
                alt={leftImg.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: leftImg.objectPosition || 'center center' }}
              />
              {/* Deep midnight-plum scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D] via-[#101B2D]/70 to-[#2B2540]/25" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-3 max-w-md">
              <span className="text-xs font-medium text-[#EFEAE2]/90 block">
                {leftTile.badge}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight">
                {leftTile.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#EFEAE2]/85 leading-relaxed pb-3">
                {leftTile.description}
              </p>
              <a
                href={leftTile.ctaHref}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-[#101B2D] bg-white hover:bg-[#F5F7F8] rounded-xl transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#C9993F]"
              >
                <span>{leftTile.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Tile: Final Booking on WhatsApp CTA */}
          <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] p-8 sm:p-12 flex flex-col justify-end text-white shadow-sm group border border-[#101B2D]/10">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <SafeImage
                src={rightImg.url}
                alt={rightImg.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: rightImg.objectPosition || 'center center' }}
              />
              {/* Dark gradient scrim under the text so label and headline pass AA contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D] via-[#101B2D]/85 to-[#2B2540]/30" />
              <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#101B2D] via-[#101B2D]/90 to-transparent pointer-events-none" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-3 max-w-md">
              <span className="text-xs font-medium text-[#C9993F] block">
                {rightTile.badge}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight">
                {rightTile.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#EFEAE2]/90 leading-relaxed pb-3">
                {rightTile.description}
              </p>
              <button
                type="button"
                onClick={() => onOpenEnquiry()}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-medium text-[#101B2D] bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 rounded-xl transition-all shadow-md focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{rightTile.ctaText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
