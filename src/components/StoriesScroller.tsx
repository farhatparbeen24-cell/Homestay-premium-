'use client';

import { Sparkles } from 'lucide-react';
import { businessConfig, StoryTileItem } from '@/src/config/business.config';
import { IMAGES } from '@/src/config/images';
import { SafeImage } from '@/src/components/SafeImage';

export function StoriesScroller() {
  const stories = businessConfig.storiesScroller;

  return (
    <section id="stories" className="py-20 md:py-28 bg-[#F5F7F8] text-[#101B2D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-[#8FA08A] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9993F]" />
            <span>{stories.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#101B2D] font-light tracking-tight mb-3">
            {stories.title}
          </h2>
          <p className="text-sm md:text-base text-[#101B2D]/75 leading-relaxed">
            {stories.description}
          </p>
        </div>
      </div>

      {/* Horizontal Scroller of Mixed-Shape Tiles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none items-end">
          {stories.tiles.map((tile: StoryTileItem) => {
            const img = IMAGES[tile.imageKey] || IMAGES.storyTile1;

            // Determine mask shape and aspect ratio
            const isCircle = tile.shape === 'circle';
            const isArch = tile.shape === 'arch';
            const shapeClass = isCircle
              ? 'rounded-full aspect-square'
              : isArch
              ? 'arch-top rounded-b-2xl aspect-[3/4]'
              : 'rounded-2xl aspect-[3/4]';

            return (
              <div
                key={tile.id}
                className="flex-[0_0_240px] sm:flex-[0_0_280px] md:flex-[0_0_300px] snap-start flex flex-col justify-between"
              >
                {/* Photo container with distinctive shape */}
                <div
                  className={`relative w-full overflow-hidden shadow-xs bg-[#101B2D]/10 mb-4 ${shapeClass}`}
                >
                  <SafeImage
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 70vw, 300px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Caption below */}
                <div className="px-1 text-center sm:text-left">
                  <h3 className="font-serif text-lg font-normal text-[#101B2D] mb-1">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-[#101B2D]/70 leading-relaxed">
                    {tile.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
