'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight, Play, X, Quote } from 'lucide-react';
import { businessConfig, TestimonialItem } from '@/src/config/business.config';
import { IMAGES } from '@/src/config/images';
import { SafeImage } from '@/src/components/SafeImage';

export function TestimonialsSection() {
  const reviewsConfig = businessConfig.reviews;
  const testimonials = reviewsConfig.testimonials;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const updateState = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', updateState);

    const raf = requestAnimationFrame(updateState);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', updateState);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="reviews" className="py-20 md:py-32 bg-[#F5F7F8] text-[#101B2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Rating + Review Count */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#101B2D]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-medium text-[#8FA08A]">
              <span>Guest reflections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#101B2D] font-light tracking-tight">
              Words from those who stayed.
            </h2>
          </div>

          {/* Rating Banner: Only show Google rating and count if googleVerified is true */}
          <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-[#101B2D]/10 shadow-xs">
            <div className="flex items-center gap-1 text-[#C9993F]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs text-[#101B2D]">
              {reviewsConfig.googleVerified ? (
                <>
                  <span className="font-bold text-sm text-[#101B2D]">
                    {reviewsConfig.googleRating.toFixed(2)}
                  </span>{' '}
                  <span className="text-[#101B2D]/65">
                    ({reviewsConfig.reviewCount} Google rating)
                  </span>
                </>
              ) : (
                <span className="font-medium text-sm text-[#101B2D]">
                  Guest reviews
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Embla Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6">
              {testimonials.map((item: TestimonialItem) => {
                const img = IMAGES[item.imageKey] || IMAGES.testimonialGuest1;

                return (
                  <div
                    key={item.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6 min-w-0"
                  >
                    <div className="h-full bg-white rounded-2xl border border-[#101B2D]/10 p-6 sm:p-7 flex flex-col justify-between shadow-xs">
                      <div>
                        {/* Rating stars & Quote symbol */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1 text-[#C9993F]">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <Quote className="w-5 h-5 text-[#8FA08A]/30" />
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-xs sm:text-sm text-[#101B2D]/80 leading-relaxed mb-6 italic">
                          &ldquo;{item.text}&rdquo;
                        </p>
                      </div>

                      {/* Guest Info + Media Avatar */}
                      <div className="pt-4 border-t border-[#101B2D]/10 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-[#101B2D]/15 bg-[#101B2D]/10">
                            <SafeImage
                              src={img.url}
                              alt={item.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-[#101B2D] leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-[#101B2D]/60 mt-0.5">
                              {item.location} · {item.stayDate}
                            </p>
                          </div>
                        </div>

                        {/* Video control if videoUrl is set in config */}
                        {item.videoUrl && (
                          <button
                            type="button"
                            onClick={() => setActiveVideoUrl(item.videoUrl!)}
                            aria-label={`Watch video review from ${item.name}`}
                            className="w-9 h-9 rounded-full bg-[#101B2D] text-white flex items-center justify-center hover:bg-[#C9993F] transition-colors shrink-0 shadow-xs focus-visible:ring-2 focus-visible:ring-[#C9993F]"
                          >
                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                    index === selectedIndex
                      ? 'bg-[#101B2D] w-6'
                      : 'bg-[#101B2D]/20 hover:bg-[#101B2D]/40'
                  }`}
                  aria-label={`Jump to review slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full border border-[#101B2D]/20 bg-white text-[#101B2D] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#101B2D] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#C9993F]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                aria-label="Next review"
                className="w-10 h-10 rounded-full border border-[#101B2D]/20 bg-white text-[#101B2D] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#101B2D] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#C9993F]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video review modal dialog if opened */}
      {activeVideoUrl && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveVideoUrl(null)}
              aria-label="Close video"
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#D69A3E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <video
                src={activeVideoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
