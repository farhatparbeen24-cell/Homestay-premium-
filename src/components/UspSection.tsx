'use client';

import { useState, useEffect, useRef } from 'react';
import { Mountain, Compass } from 'lucide-react';
import { businessConfig } from '@/src/config/business.config';
import { IMAGES } from '@/src/config/images';
import { SafeImage } from '@/src/components/SafeImage';

export function UspSection() {
  const usp = businessConfig.usp;
  const bgImage = IMAGES[usp.backgroundImageKey] || IMAGES.uspBackground;

  const [counter, setCounter] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentEl = containerRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReduced) {
            setCounter(usp.stat.value);
            observer.disconnect();
            return;
          }

          const target = usp.stat.value;
          const duration = 1800; // ms
          const start = performance.now();

          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic curve
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounter(Math.floor(eased * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCounter(target);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(currentEl);
    return () => observer.disconnect();
  }, [hasAnimated, usp.stat.value]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-24 md:py-36 overflow-hidden bg-gradient-to-b from-[#101B2D] to-[#2B2540]"
      aria-label="Location and Himalayan Atmosphere"
    >
      {/* Full-width background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={bgImage.url}
          alt={bgImage.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: bgImage.objectPosition || 'center 35%' }}
        />
        <div className="absolute inset-0 bg-[#101B2D]/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D] via-[#2B2540]/60 to-[#101B2D]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Frosted Glass Panel */}
        <div className="max-w-4xl mx-auto bg-[#101B2D]/85 backdrop-blur-md rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#C9993F]/25 shadow-2xl text-[#EFEAE2]">
          {/* Badge */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#C9993F] mb-3">
            <Mountain className="w-4 h-4" />
            <span>{usp.badge}</span>
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-white mb-6 text-balance">
            {usp.title}
          </h2>

          <p className="text-base sm:text-lg text-[#EFEAE2]/85 font-normal leading-relaxed mb-10 max-w-2xl">
            {usp.description}
          </p>

          {/* 2 Short Explainer Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#C9993F]/20 mb-10">
            {usp.explainerBlocks.map((block, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C9993F]" />
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                    {block.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#EFEAE2]/75 leading-relaxed">
                  {block.description}
                </p>
              </div>
            ))}
          </div>

          {/* Single Animated Stat Block (counts up once) */}
          <div className="pt-8 border-t border-[#C9993F]/20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <span className="font-serif text-4xl sm:text-6xl text-[#C9993F] font-light tabular-nums tracking-tight">
                {counter.toLocaleString('en-IN')}{usp.stat.suffix}
              </span>
              <span className="text-sm sm:text-base text-white/90 font-medium block sm:inline-block sm:ml-3">
                {usp.stat.label}
              </span>
            </div>
            <p className="text-xs text-[#EFEAE2]/60 max-w-xs leading-relaxed">
              {usp.stat.context}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
