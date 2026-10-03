'use client';

import { useState } from 'react';
import { AnnouncementBar } from '@/src/components/AnnouncementBar';
import { Navbar } from '@/src/components/Navbar';
import { HeroSlider } from '@/src/components/HeroSlider';
import { RoomCardsSection } from '@/src/components/RoomCardsSection';
import { BundleSection } from '@/src/components/BundleSection';
import { UspSection } from '@/src/components/UspSection';
import { StorySection } from '@/src/components/StorySection';
import { TestimonialsSection } from '@/src/components/TestimonialsSection';
import { StoriesScroller } from '@/src/components/StoriesScroller';
import { TwoTilesSection } from '@/src/components/TwoTilesSection';
import { Footer } from '@/src/components/Footer';
import { EnquiryModal } from '@/src/components/EnquiryModal';
import { WelcomePopup } from '@/src/components/WelcomePopup';
import { MobileStickyBar } from '@/src/components/MobileStickyBar';

export default function HomePage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (preferredRoom?: string) => {
    setSelectedRoom(preferredRoom);
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#F5F7F8] text-[#101B2D] flex flex-col">
      {/* 0. Announcement bar */}
      <AnnouncementBar onOpenEnquiry={handleOpenEnquiry} />

      {/* 1. Nav */}
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Content Sections (In exact required order) */}
      <main className="flex-1">
        {/* 2. Hero slider (main moment) */}
        <HeroSlider onOpenEnquiry={handleOpenEnquiry} />

        {/* Thin gold hairline divider */}
        <div className="w-full border-t border-[#C9993F]/20" aria-hidden="true" />

        {/* 3. Room cards (row of 4, arch-top images) */}
        <RoomCardsSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Thin gold hairline divider */}
        <div className="w-full border-t border-[#C9993F]/20" aria-hidden="true" />

        {/* 4. Bundle card (large split card + mini gallery) */}
        <BundleSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Thin gold hairline divider */}
        <div className="w-full border-t border-[#C9993F]/20" aria-hidden="true" />

        {/* 5. USP section (frosted glass panel + animated stat) */}
        <UspSection />

        {/* Thin gold hairline divider */}
        <div className="w-full border-t border-[#C9993F]/20" aria-hidden="true" />

        {/* 6. Story section (host story + large image) */}
        <StorySection />

        {/* Thin gold hairline divider */}
        <div className="w-full border-t border-[#C9993F]/20" aria-hidden="true" />

        {/* 7. Testimonials (carousel of guest cards + rating header) */}
        <TestimonialsSection />

        {/* Thin gold hairline divider */}
        <div className="w-full border-t border-[#C9993F]/20" aria-hidden="true" />

        {/* 8. Stories scroller (mixed-shape tiles) */}
        <StoriesScroller />

        {/* Thin gold hairline divider */}
        <div className="w-full border-t border-[#C9993F]/20" aria-hidden="true" />

        {/* 9. Two tiles (Gallery/Journal + WhatsApp CTA) */}
        <TwoTilesSection onOpenEnquiry={handleOpenEnquiry} />
      </main>

      {/* Thin gold hairline divider */}
      <div className="w-full border-t border-[#C9993F]/20" aria-hidden="true" />

      {/* 10. Footer */}
      <Footer />

      {/* Interactive Overlays */}
      <EnquiryModal
        key={`${isEnquiryOpen ? 'open' : 'closed'}-${selectedRoom || 'none'}`}
        isOpen={isEnquiryOpen}
        onClose={handleCloseEnquiry}
        prefilledRoom={selectedRoom}
      />

      <WelcomePopup onClaimPerks={() => handleOpenEnquiry()} />

      <MobileStickyBar />
    </div>
  );
}
