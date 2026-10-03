export interface ContactConfig {
  phone: string;
  phoneDisplay: string;
  whatsapp: string; // E.g. "919876543210" without '+' or spaces for wa.me link
  whatsappDisplay: string;
  email: string;
  address: string;
  coordinates?: { lat: number; lng: number };
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tripadvisor?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroSlide {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  secondaryHref: string;
  imageKey: string;
}

export interface RoomItem {
  id: string;
  name: string;
  shortDescription: string;
  details: string;
  priceFrom: number;
  currency: string;
  pricePeriod: string;
  capacity: string;
  bed: string;
  size: string;
  imageKey: string;
}

export interface BundleInclusion {
  title: string;
  description: string;
}

export interface BundleConfig {
  badge: string;
  title: string;
  description: string;
  regularPrice?: number;
  packagePrice: number;
  currency: string;
  duration: string;
  inclusions: BundleInclusion[];
  ctaText: string;
  mainImageKey: string;
  galleryImageKeys: string[];
}

export interface UspBlock {
  title: string;
  description: string;
}

export interface StatConfig {
  value: number;
  suffix: string;
  label: string;
  context: string;
}

export interface UspConfig {
  badge: string;
  title: string;
  description: string;
  explainerBlocks: [UspBlock, UspBlock];
  stat: StatConfig;
  backgroundImageKey: string;
}

export interface StoryConfig {
  badge: string;
  title: string;
  paragraphs: string[];
  hostNames: string;
  hostRole: string;
  imageKey: string;
  anchorText: string;
  anchorHref: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  stayDate: string;
  rating: number;
  text: string;
  imageKey: string;
  videoUrl?: string; // Optional direct video URL or embed
}

export interface StoryTileItem {
  id: string;
  shape: 'arch' | 'circle' | 'rounded';
  title: string;
  caption: string;
  imageKey: string;
}

export interface TwoTilesConfig {
  leftTile: {
    badge: string;
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    imageKey: string;
  };
  rightTile: {
    badge: string;
    title: string;
    description: string;
    ctaText: string;
    imageKey: string;
  };
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface PopupConfig {
  enabled: boolean;
  delayMs: number;
  badge: string;
  title: string;
  tagline?: string;
  subtext: string;
  description?: string;
  perks?: string[];
  inputPlaceholder: string;
  ctaText: string;
  offerCode: string;
  offerBadge?: string;
  consentLine: string;
  successMessage?: string;
  successHeadline: string;
  successSubtext: string;
  copyButtonText: string;
  copiedButtonText: string;
  imageKey: string;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  brandKicker: string;
  announcement: {
    text: string;
    linkText: string;
  };
  contact: ContactConfig;
  social: SocialLinks;
  navLinks: NavLink[];
  heroSlides: HeroSlide[];
  rooms: RoomItem[];
  bundle: BundleConfig;
  usp: UspConfig;
  story: StoryConfig;
  reviews: {
    googleVerified: boolean;
    googleRating: number;
    reviewCount: number;
    sourceLabel: string;
    testimonials: TestimonialItem[];
  };
  storiesScroller: {
    badge: string;
    title: string;
    description: string;
    tiles: StoryTileItem[];
  };
  twoTiles: TwoTilesConfig;
  footer: {
    about: string;
    columns: FooterColumn[];
    copyrightNotice: string;
  };
  popup: PopupConfig;
  toggles: {
    showPopup: boolean;
    showFaq: boolean;
    showNewsletter: boolean;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    priceRange: string;
    checkinTime: string;
    checkoutTime: string;
    petsAllowed: boolean;
  };
  mapEmbedUrl: string;
  theme: {
    colors: {
      midnight: string;
      plum: string;
      snow: string;
      ivory: string;
      gold: string;
      goldLight: string;
      sage: string;
    };
  };
}

export const businessConfig: BusinessConfig = {
  name: 'Cloudveil Ridge',
  tagline: 'High-altitude homestay sanctuary nestled in the pine ridgelines of Mukteshwar.',
  brandKicker: 'Mukteshwar, Kumaon Himalayas · 7,200 ft',

  announcement: {
    text: 'Reserve directly for complimentary Himalayan pine-honey tea & guided forest trail walk',
    linkText: 'Claim direct perk',
  },

  contact: {
    phone: '+91 98112 34567',
    phoneDisplay: '+91 98112 34567',
    whatsapp: '919811234567',
    whatsappDisplay: '+91 98112 34567',
    email: 'namaste@cloudveilridge.com',
    address: 'Cloudveil Ridge, Upper Chafi Road, Near Mukteshwar Temple, Uttarakhand 263138, India',
    coordinates: {
      lat: 29.4722,
      lng: 79.6477,
    },
  },

  social: {
    instagram: 'https://instagram.com/cloudveilridge',
    facebook: 'https://facebook.com/cloudveilridge',
    tripadvisor: 'https://tripadvisor.com',
  },

  navLinks: [
    { label: 'Stay', href: '#rooms' },
    { label: 'Experience', href: '#experience' },
    { label: 'Reviews', href: '#reviews' },
  ],

  heroSlides: [
    {
      id: 'view',
      category: 'The Panorama',
      title: 'A quiet mountain sanctuary above the cloud line.',
      subtitle: 'Wake up to unfiltered 180-degree vistas of the snow-clad peaks, where the only morning sound is cedar breezes.',
      primaryCtaText: 'Check availability',
      secondaryCtaText: 'Explore suites',
      secondaryHref: '#rooms',
      imageKey: 'heroView',
    },
    {
      id: 'room',
      category: 'The Architecture',
      title: 'Handcrafted stone sanctuaries framed in alpine glass.',
      subtitle: 'Rooms shaped from locally quarried slate, reclaimed cedar beams, and floor-to-ceiling glass embracing the forest.',
      primaryCtaText: 'Check availability',
      secondaryCtaText: 'View accommodations',
      secondaryHref: '#rooms',
      imageKey: 'heroRoom',
    },
    {
      id: 'food',
      category: 'Slow Cuisine',
      title: 'Heirloom Kumaoni recipes from our terrace orchards.',
      subtitle: 'Slow-simmered Pahadi lentil broths, wild mint chutneys, and stoneground millet breads baked over wood embers.',
      primaryCtaText: 'Check availability',
      secondaryCtaText: 'Our food philosophy',
      secondaryHref: '#bundle',
      imageKey: 'heroFood',
    },
    {
      id: 'experience',
      category: 'The Wilderness',
      title: 'Ancient cedar paths and hidden waterfall ridges.',
      subtitle: 'Step straight from our garden gate onto centuries-old shepherd trails winding through rhododendron groves.',
      primaryCtaText: 'Check availability',
      secondaryCtaText: 'Discover trails',
      secondaryHref: '#experience',
      imageKey: 'heroExperience',
    },
    {
      id: 'evening',
      category: 'The Twilight',
      title: 'Evenings gathered around the stone hearth.',
      subtitle: 'Watch dusk settle over the valley with spiced mountain tea, acoustic folklore, and unpolluted stargazing.',
      primaryCtaText: 'Check availability',
      secondaryCtaText: 'Reserve your escape',
      secondaryHref: '#rooms',
      imageKey: 'heroEvening',
    },
  ],

  rooms: [
    {
      id: 'cedar-forest-suite',
      name: 'Cedar Forest Suite',
      shortDescription: 'Wraparound deck overlooking ancient deodar groves.',
      details: 'Spacious 480 sq ft suite with private sunset deck, natural stone fireplace, and king bed dressed in hand-spun cotton.',
      priceFrom: 6800,
      currency: '₹',
      pricePeriod: 'per night',
      capacity: '2 Guests',
      bed: 'King bed',
      size: '480 sq ft',
      imageKey: 'roomCedar',
    },
    {
      id: 'mist-valley-loft',
      name: 'Mist Valley Loft',
      shortDescription: 'Vaulted timber eaves framing drifting valley clouds.',
      details: 'Split-level loft with cedar ceiling beams, skylight reading nook, and an expansive cantilevered veranda.',
      priceFrom: 7500,
      currency: '₹',
      pricePeriod: 'per night',
      capacity: '2–3 Guests',
      bed: 'King bed + Daybed',
      size: '560 sq ft',
      imageKey: 'roomMistValley',
    },
    {
      id: 'the-ridge-penthouse',
      name: 'The Ridge Penthouse',
      shortDescription: '270-degree panorama of Himalayan snow ridges.',
      details: 'Top-tier aerie featuring deep copper soaking tub overlooking the valley, fireplace, and private telescope.',
      priceFrom: 9800,
      currency: '₹',
      pricePeriod: 'per night',
      capacity: '2 Guests',
      bed: 'Super King bed',
      size: '640 sq ft',
      imageKey: 'roomRidgePenthouse',
    },
    {
      id: 'pine-cottage',
      name: 'Pine Cottage',
      shortDescription: 'Standalone stone hideaway with private garden patio.',
      details: 'Quiet stone cottage surrounded by wild mint and apple trees, ideal for writers, couples, and longer creative retreats.',
      priceFrom: 8200,
      currency: '₹',
      pricePeriod: 'per night',
      capacity: '2–4 Guests',
      bed: 'King bed + Twin',
      size: '600 sq ft',
      imageKey: 'roomPineCottage',
    },
  ],

  bundle: {
    badge: 'Seasonal experience',
    title: 'Ridge Retreat Package',
    description: 'A thoughtfully curated 2-night residency combining private suite stay, curated Kumaoni dining, and guided mountain explorations.',
    regularPrice: 22400,
    packagePrice: 17800,
    currency: '₹',
    duration: '2 Nights / 3 Days for 2 Guests',
    inclusions: [
      {
        title: 'All-inclusive orchard-to-table meals',
        description: 'Daily breakfast on the cedar deck, fireside communal family dinners, and freshly brewed herbal infusions.',
      },
      {
        title: 'Guided sunset ridge walk & herb foraging',
        description: 'Led by village naturalist Gopal through protected deodar sanctuary with wild thyme and pine honey tastings.',
      },
      {
        title: 'Fireside acoustic storytelling & stargazing',
        description: 'Evening warmth by our outdoor stone pit with high-magnification telescope and local folk ballads.',
      },
      {
        title: 'Late checkout & artisanal parting keepsake',
        description: 'Relaxed 2:00 PM checkout with a jar of raw mountain apricot jam harvested from our family trees.',
      },
    ],
    ctaText: 'Enquire for package',
    mainImageKey: 'bundleMain',
    galleryImageKeys: ['bundleMini1', 'bundleMini2', 'bundleMini3', 'bundleMini4'],
  },

  usp: {
    badge: 'Location & altitude',
    title: 'Perched at 7,200 ft where silence is a physical sensation.',
    description: 'Unlike commercial tourist towns, Cloudveil Ridge rests 12 km off the main transit highway on a quiet bridleway.',
    explainerBlocks: [
      {
        title: 'Zero commercial sound, 100% pine air',
        description: 'Dense evergreen canopies filter the mountain breeze, keeping year-round temperatures 10 degrees cooler than the plains.',
      },
      {
        title: 'Pure gravity-fed spring water & solar harmony',
        description: 'Our water flows directly from an underground mineral spring, and 80% of our daytime electricity comes from mountain solar panels.',
      },
    ],
    stat: {
      value: 1420,
      suffix: '+',
      label: 'Mindful travelers welcomed',
      context: 'Across 34 countries since 2018 with 98% returning or referral guests.',
    },
    backgroundImageKey: 'uspBackground',
  },

  story: {
    badge: 'Our story',
    title: 'Built by hands that have walked these ridges for three generations.',
    paragraphs: [
      'In 1994, our grandfather planted the first sixty apple saplings on this terraced hillside. He believed that the mountains give clarity to those willing to listen to the wind.',
      'We spent four years restoring the homestead using fallen timber, local river pebbles, and lime plaster. We intentionally built only four suites so that every traveler is treated not as a room number, but as an honored guest in our family home.',
      'Here, there are no buffet lines or loudspeaker announcements. Just the rhythm of the sunrise, conversations over steaming chai, and the scent of woodsmoke in the evening chill.',
    ],
    hostNames: 'Devika & Anand Joshi',
    hostRole: 'Custodians & Resident Hosts',
    imageKey: 'hostStory',
    anchorText: 'Read about our village initiative',
    anchorHref: '#experience',
  },

  reviews: {
    googleVerified: false,
    googleRating: 4.96,
    reviewCount: 184,
    sourceLabel: 'Guest reviews',
    testimonials: [
      {
        id: 't1',
        name: 'Elena Rostova',
        location: 'Berlin, Germany',
        stayDate: 'Stayed November 2025',
        rating: 5,
        text: 'The silence at Cloudveil Ridge stays with you long after you descend the valley. Waking up to the golden dawn light hitting the bedroom wall through the arch windows was pure medicine. Anand and Devika made us feel like lifelong friends.',
        imageKey: 'testimonialGuest1',
      },
      {
        id: 't2',
        name: 'Devendra Sharma',
        location: 'Mumbai, India',
        stayDate: 'Stayed January 2026',
        rating: 5,
        text: 'As someone dealing with nonstop startup pressure, three nights here completely recalibrated my nervous system. The Himalayan thali by the wood fire and the guided morning cedar walk were unforgettable.',
        imageKey: 'testimonialGuest2',
      },
      {
        id: 't3',
        name: 'Sarah Jenkins',
        location: 'Melbourne, Australia',
        stayDate: 'Stayed October 2025',
        rating: 5,
        text: 'Far and away the most authentic and soulful stay in Uttarakhand. The attention to detail in the rooms—hot water bottles in the evening, locally sourced wool blankets, handcrafted soap—is unmatched.',
        imageKey: 'testimonialGuest3',
      },
      {
        id: 't4',
        name: 'Kabir & Ananya',
        location: 'New Delhi, India',
        stayDate: 'Stayed December 2025',
        rating: 5,
        text: 'We came for a weekend and ended up extending by another three days. Stargazing with the telescope on the upper terrace with piping hot spiced tea was magical.',
        imageKey: 'testimonialGuest4',
      },
    ],
  },

  storiesScroller: {
    badge: 'Everyday moments',
    title: 'Glimpses from life along the ridgeline.',
    description: 'No curated staging—just the natural rhythm of mountain living recorded by our guests and hosts.',
    tiles: [
      {
        id: 'st1',
        shape: 'arch',
        title: 'Morning cloud veil',
        caption: '06:45 AM mist lifting over the lower valley deodar trees.',
        imageKey: 'storyTile1',
      },
      {
        id: 'st2',
        shape: 'circle',
        title: 'Wild thyme brew',
        caption: 'Handpicked herbs steeped with raw mountain honey.',
        imageKey: 'storyTile2',
      },
      {
        id: 'st3',
        shape: 'rounded',
        title: 'Chiselled slate',
        caption: 'Traditional dry-stone architecture keeping interiors cool in summer, warm in winter.',
        imageKey: 'storyTile3',
      },
      {
        id: 'st4',
        shape: 'arch',
        title: 'The reading nook',
        caption: 'Corner sanctuary overlooking the Trisul peak on crisp mornings.',
        imageKey: 'storyTile4',
      },
      {
        id: 'st5',
        shape: 'rounded',
        title: 'Orchard harvest',
        caption: 'Seasonal stone fruits simmered into small-batch breakfast preserves.',
        imageKey: 'storyTile5',
      },
    ],
  },

  twoTiles: {
    leftTile: {
      badge: 'Visual journal',
      title: 'Atmospheric seasons of Mukteshwar.',
      description: 'From autumn apple harvests to deep winter snowfalls, explore how the landscape shifts through the months.',
      ctaText: 'View journal gallery',
      ctaHref: '#stories',
      imageKey: 'tileGallery',
    },
    rightTile: {
      badge: 'Direct reservation',
      title: 'Book your stay directly on WhatsApp.',
      description: 'Have specific dates or custom dietary preferences? Speak with our resident hosts directly for tailored itineraries and best guaranteed rates.',
      ctaText: 'Enquire on WhatsApp',
      imageKey: 'tileCta',
    },
  },

  footer: {
    about: 'Cloudveil Ridge is an independent family-run homestay dedicated to slow Himalayan living, native architectural preservation, and low-impact eco-hospitality.',
    columns: [
      {
        title: 'The Stay',
        links: [
          { label: 'Suites & Cottages', href: '#rooms' },
          { label: 'Ridge Retreat Package', href: '#bundle' },
          { label: 'Mountain Dining', href: '#experience' },
          { label: 'Seasonal Tariff', href: '#rooms' },
        ],
      },
      {
        title: 'Discover',
        links: [
          { label: 'Forest Trails & Treks', href: '#experience' },
          { label: 'Guest Reflections', href: '#reviews' },
          { label: 'Our Heritage Story', href: '#story' },
          { label: 'Visual Journal', href: '#stories' },
        ],
      },
      {
        title: 'Guest Care',
        links: [
          { label: 'Direct Booking Perks', href: '#announcement' },
          { label: 'Privacy & Terms', href: '/privacy' },
          { label: 'Location & Directions', href: '#location' },
          { label: 'WhatsApp Concierge', href: 'https://wa.me/919811234567' },
        ],
      },
    ],
    copyrightNotice: 'Cloudveil Ridge Homestay. All rights reserved. Handcrafted with reverence for the Kumaon Himalayas.',
  },

  popup: {
    enabled: true,
    delayMs: 2200,
    badge: '15% Off + Daily Breakfast',
    title: 'Sanctuary reservation privilege',
    tagline: 'Direct Sanctuary Privilege',
    subtext: 'Enter your email to reveal our resident booking code & daily orchard breakfast.',
    inputPlaceholder: 'your.email@domain.com',
    description: 'When you book directly with our resident hosts rather than online travel portals, we reinvest the fees into elevating your stay.',
    perks: [
      'Guaranteed best room tariff without aggregator commissions',
      'Daily farm-to-table morning breakfast for two included',
      'Personalized guided forest walk with village naturalist',
      'Complimentary flexible date change up to 7 days before arrival',
    ],
    ctaText: 'Reveal code',
    offerCode: 'CLOUDRIDGE',
    offerBadge: '15% Off + Daily Breakfast',
    consentLine: 'We respect your inbox. No spam. Unsubscribe at any time.',
    successMessage: 'Direct booking code unlocked! Use code at reservation:',
    successHeadline: 'Your booking privilege is unlocked',
    successSubtext: 'Quote this resident code during reservation for 15% off your stay:',
    copyButtonText: 'Copy code',
    copiedButtonText: 'Copied to clipboard',
    imageKey: 'popupImage',
  },

  toggles: {
    showPopup: true,
    showFaq: false,
    showNewsletter: true,
  },

  seo: {
    metaTitle: 'Cloudveil Ridge Homestay | Boutique Mountain Sanctuary in Mukteshwar',
    metaDescription: 'Experience handcrafted boutique hospitality perched at 7,200 ft in Mukteshwar. Hand-hewn stone suites, panoramic Himalayan peaks, slow farm dining, and private cedar trails.',
    keywords: [
      'homestay in mukteshwar',
      'boutique homestay uttarakhand',
      'luxury mountain homestay india',
      'himalayan view homestay',
      'mukteshwar cottage stay',
      'eco retreat kumaon',
    ],
    priceRange: '₹6800 - ₹9800',
    checkinTime: '14:00',
    checkoutTime: '11:00',
    petsAllowed: true,
  },

  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111516.48622159187!2d79.57863581781229!3d29.47228833099951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a099a5e8f5c35b%3A0xb3bc87258079541a!2sMukteshwar%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',

  theme: {
    colors: {
      midnight: '#101B2D',
      plum: '#2B2540',
      snow: '#F5F7F8',
      ivory: '#EFEAE2',
      gold: '#C9993F',
      goldLight: '#E3C27A',
      sage: '#8FA08A',
    },
  },
};

