'use client';

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play } from 'lucide-react';
import { businessConfig, HeroSlide } from '@/src/config/business.config';
import { IMAGES } from '@/src/config/images';
import { SafeImage } from '@/src/components/SafeImage';

interface HeroSliderProps {
  onOpenEnquiry: (preferredRoom?: string) => void;
}

export function HeroSlider({ onOpenEnquiry }: HeroSliderProps) {
  const slides = businessConfig.heroSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 6000;
  const TICK_INTERVAL = 50;

  // Check reduced motion preference using useSyncExternalStore
  const prefersReducedMotion = useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false),
    () => false
  );

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Manage timer and progress
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const step = (TICK_INTERVAL / SLIDE_DURATION) * 100;
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + step;
      });
    }, TICK_INTERVAL);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, prefersReducedMotion, goToNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      goToNext();
    } else if (distance < -50) {
      goToPrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section
      className="relative w-full h-[88vh] min-h-[580px] max-h-[920px] bg-[#101B2D] text-white overflow-hidden select-none -mt-20 md:-mt-22"
      aria-label="Hero Showcase Slider"
      onMouseEnter={() => !prefersReducedMotion && setIsPlaying(false)}
      onMouseLeave={() => !prefersReducedMotion && setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides media container */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        const imageConfig = IMAGES[slide.imageKey] || IMAGES.heroView;
        const isFirst = idx === 0;

        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div
              className={`relative w-full h-full transform transition-transform duration-[6500ms] ease-out ${
                isActive && !prefersReducedMotion ? 'scale-105' : 'scale-100'
              }`}
            >
              <SafeImage
                src={imageConfig.url}
                alt={imageConfig.alt}
                fill
                priority={isFirst}
                loading={isFirst ? undefined : 'lazy'}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: imageConfig.objectPosition || 'center center' }}
              />
            </div>

            {/* Cinematic contrast scrims: midnight-plum gradient, lightened for photo vibrance */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/70 via-[#2B2540]/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101B2D]/50 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* Main Slide Content Area */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-end pb-24 md:pb-28">
        <div className="max-w-2xl text-left">
          {/* Unboxed natural category text (sentence case, no tracking-widest) */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-[#C9993F] font-medium mb-3">
            <span>{slides[currentIndex].category}</span>
            <span aria-hidden="true">·</span>
            <span>Slide 0{currentIndex + 1} of 0{slides.length}</span>
          </div>

          {/* Large serif headline */}
          <h1
            key={`title-${currentIndex}`}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.12] mb-4 text-balance"
          >
            {slides[currentIndex].title}
          </h1>

          {/* Quiet subtitle with strict measure */}
          <p
            key={`sub-${currentIndex}`}
            className="text-sm sm:text-base md:text-lg text-white/85 font-normal leading-relaxed max-w-xl mb-7"
          >
            {slides[currentIndex].subtitle}
          </p>

          {/* CTAs: Primary + Secondary */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onOpenEnquiry()}
              className="px-6 py-3.5 text-sm font-medium text-[#101B2D] bg-gradient-to-r from-[#C9993F] to-[#E3C27A] hover:brightness-105 rounded-xl transition-all shadow-md flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{slides[currentIndex].primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <a
              href={slides[currentIndex].secondaryHref}
              className="px-5 py-3.5 text-sm font-medium text-[#EFEAE2] hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs rounded-xl transition-colors border border-[#C9993F]/30 inline-flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#C9993F]"
            >
              <span>{slides[currentIndex].secondaryCtaText}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating navigation controls (Arrows + Autoplay toggle) */}
      <div className="absolute right-6 sm:right-10 bottom-24 md:bottom-28 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous slide"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#C9993F]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next slide"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#C9993F]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors ml-1 focus-visible:ring-2 focus-visible:ring-[#C9993F] motion-reduce:hidden"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Thumbnail Strip with active progress indicator line */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#101B2D]/85 backdrop-blur-sm border-t border-[#C9993F]/20 py-2.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="grid grid-cols-5 gap-2 sm:gap-4 w-full">
            {slides.map((s, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={`thumb-${s.id}`}
                  onClick={() => goToSlide(idx)}
                  className="group text-left py-1 cursor-pointer focus-visible:ring-1 focus-visible:ring-[#C9993F] rounded"
                  aria-label={`Jump to slide ${idx + 1}: ${s.category}`}
                  aria-current={isSelected ? 'true' : undefined}
                >
                  {/* Progress Line */}
                  <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-[#C9993F] transition-all duration-75"
                      style={{
                        width: isSelected
                          ? `${progress}%`
                          : idx < currentIndex
                          ? '100%'
                          : '0%',
                      }}
                    />
                  </div>
                  {/* Caption */}
                  <div className="hidden sm:flex items-center justify-between text-[11px] text-white/70 group-hover:text-white transition-colors">
                    <span className="truncate">{s.category}</span>
                    <span className="font-mono text-[10px] text-white/50">0{idx + 1}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
