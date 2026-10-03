import type { Metadata, Viewport } from 'next';
import { Newsreader, Instrument_Sans } from 'next/font/google';
import Script from 'next/script';
import { businessConfig } from '@/src/config/business.config';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500'],
  variable: '--font-newsreader',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: businessConfig.theme.colors.midnight,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: businessConfig.seo.metaTitle,
  description: businessConfig.seo.metaDescription,
  keywords: businessConfig.seo.keywords,
  authors: [{ name: businessConfig.name }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudveilridge.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: businessConfig.seo.metaTitle,
    description: businessConfig.seo.metaDescription,
    type: 'website',
    locale: 'en_US',
    siteName: businessConfig.name,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: `${businessConfig.name} - Boutique mountain sanctuary`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: businessConfig.seo.metaTitle,
    description: businessConfig.seo.metaDescription,
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=630&q=85'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const lodgingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: businessConfig.name,
    description: businessConfig.seo.metaDescription,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudveilridge.com',
    telephone: businessConfig.contact.phone,
    email: businessConfig.contact.email,
    priceRange: businessConfig.seo.priceRange,
    checkinTime: businessConfig.seo.checkinTime,
    checkoutTime: businessConfig.seo.checkoutTime,
    petsAllowed: businessConfig.seo.petsAllowed,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Upper Chafi Road, Near Mukteshwar Temple',
      addressLocality: 'Mukteshwar',
      addressRegion: 'Uttarakhand',
      postalCode: '263138',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessConfig.contact.coordinates?.lat || 29.4722,
      longitude: businessConfig.contact.coordinates?.lng || 79.6477,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: businessConfig.reviews.googleRating,
      reviewCount: businessConfig.reviews.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${instrumentSans.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F5F7F8] text-[#101B2D] antialiased selection:bg-[#C9993F] selection:text-[#101B2D] font-sans"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }}
        />
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
