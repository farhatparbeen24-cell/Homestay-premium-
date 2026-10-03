'use client';

import { ArrowRight, Users, Bed, Maximize2 } from 'lucide-react';
import { businessConfig, RoomItem } from '@/src/config/business.config';
import { IMAGES } from '@/src/config/images';
import { SafeImage } from '@/src/components/SafeImage';

interface RoomCardsSectionProps {
  onOpenEnquiry: (preferredRoom?: string) => void;
}

export function RoomCardsSection({ onOpenEnquiry }: RoomCardsSectionProps) {
  const rooms = businessConfig.rooms;

  return (
    <section id="rooms" className="py-20 md:py-28 bg-[#F5F7F8] text-[#101B2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <span className="text-xs font-medium text-[#8FA08A] mb-2 block">
            Accommodations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#101B2D] font-light tracking-tight mb-4 text-balance">
            Sanctuaries framed in stone, timber, and mist.
          </h2>
          <p className="text-sm md:text-base text-[#101B2D]/80 leading-relaxed">
            Only four distinct living spaces, each oriented toward the snow ranges with handcrafted deodar woodwork and private verandas.
          </p>
        </div>

        {/* 4 Room Cards: horizontal scroll on mobile, 4-col grid on desktop */}
        <div className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none">
          {rooms.map((room: RoomItem) => {
            const imageConfig = IMAGES[room.imageKey] || IMAGES.roomCedar;

            return (
              <div
                key={room.id}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-start flex flex-col bg-white rounded-b-2xl border border-[#101B2D]/10 shadow-sm transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Arch-top window shaped mask for the room photo */}
                <div className="relative w-full aspect-[4/5] overflow-hidden arch-top bg-[#101B2D]/10">
                  <SafeImage
                    src={imageConfig.url}
                    alt={imageConfig.alt}
                    fill
                    sizes="(max-width: 768px) 80vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    style={{ objectPosition: imageConfig.objectPosition || 'center 50%' }}
                  />
                  {/* Subtle top glare/frame highlight */}
                  <div className="absolute inset-0 arch-top ring-1 ring-inset ring-black/10 pointer-events-none" />
                </div>

                {/* Card body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Name */}
                    <h3 className="font-serif text-xl sm:text-2xl text-[#101B2D] font-normal mb-1.5">
                      {room.name}
                    </h3>

                    {/* Short line */}
                    <p className="text-xs sm:text-sm text-[#101B2D]/75 leading-relaxed mb-4">
                      {room.shortDescription}
                    </p>

                    {/* Quiet specs metadata without pill enclosures */}
                    <div className="flex items-center gap-2 text-[11px] text-[#101B2D]/65 mb-5 pb-4 border-b border-[#101B2D]/10">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#8FA08A]" />
                        <span>{room.capacity}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3 text-[#8FA08A]" />
                        <span>{room.bed}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-[#8FA08A]" />
                        <span>{room.size}</span>
                      </span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-[#101B2D]/60 block leading-tight">From</span>
                      <span className="font-serif text-lg sm:text-xl font-medium text-[#101B2D]">
                        {room.currency}{room.priceFrom.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#101B2D]/60 ml-1">/ night</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenEnquiry(room.name)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#101B2D] bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 rounded-xl transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#101B2D]"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
