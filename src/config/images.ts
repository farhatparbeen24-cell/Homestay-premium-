export interface ImageAsset {
  url: string;
  alt: string;
  objectPosition?: string;
}

export const IMAGES: Record<string, ImageAsset> = {
  // Hero slides
  heroView: {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
    alt: 'Panoramic mountain ridge at sunrise draped in cool morning mist and soft alpine glow',
    objectPosition: 'center 40%',
  },
  heroRoom: {
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=85',
    alt: 'Minimalist bedroom suite with floor-to-ceiling glass windows framing evergreen pine forest',
    objectPosition: 'center center',
  },
  heroFood: {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1920&q=85',
    alt: 'Fresh organic farm-to-table breakfast served on an open-air cedar wooden terrace',
    objectPosition: 'center 60%',
  },
  heroExperience: {
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=85',
    alt: 'Sunbeams filtering through ancient Himalayan cedar forest trails during a guided morning walk',
    objectPosition: 'center 35%',
  },
  heroEvening: {
    url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1920&q=85',
    alt: 'Warm stone hearth and dusk terrace illuminated by glowing lanterns against dark mountain silhouettes',
    objectPosition: 'center 50%',
  },

  // Room cards
  roomCedar: {
    url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85',
    alt: 'Cedar Forest Suite with king bed, stone accent wall and panoramic forest overlook',
    objectPosition: 'center 50%',
  },
  roomMistValley: {
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    alt: 'Mist Valley Loft featuring vaulted timber ceilings and private balcony facing the gorge',
    objectPosition: 'center 45%',
  },
  roomRidgePenthouse: {
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85',
    alt: 'The Ridge Penthouse with 270-degree mountain glass walls, freestanding copper tub and daybed',
    objectPosition: 'center 55%',
  },
  roomPineCottage: {
    url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=85',
    alt: 'Pine Cottage standalone wooden sanctuary with private garden patio and fireplace',
    objectPosition: 'center 50%',
  },

  // Bundle card & mini gallery
  bundleMain: {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
    alt: 'Intimate candlelit fireside dinner table prepared for evening mountain dining',
    objectPosition: 'center 45%',
  },
  bundleMini1: {
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=85',
    alt: 'Morning yoga and breathwork on the pine-scented sunrise deck',
    objectPosition: 'center center',
  },
  bundleMini2: {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85',
    alt: 'Wholesome organic farm-to-table breakfast and local Kumaoni preserves',
    objectPosition: 'center center',
  },
  bundleMini3: {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85',
    alt: 'Cosy stone hearth lounge with warm timber accents and fireside books',
    objectPosition: 'center center',
  },
  bundleMini4: {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=85',
    alt: 'Panoramic Himalayan peak vista and pine ridgelines from the upper ridge',
    objectPosition: 'center center',
  },

  // USP section background
  uspBackground: {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85',
    alt: 'Dramatic cloud inversion over emerald pine ridgelines at 7,200 feet altitude',
    objectPosition: 'center 35%',
  },

  // Story section: warm hands holding tea cup (replaces portrait)
  hostStory: {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=85',
    alt: 'Hands holding a warm steaming cup of tea in a cosy sweater on the homestay porch',
    objectPosition: 'center 40%',
  },

  // Testimonials
  testimonialGuest1: {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    alt: 'Portrait of Elena Rostova, architect and weekend traveler',
    objectPosition: 'center 20%',
  },
  testimonialGuest2: {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    alt: 'Portrait of Devendra Sharma, creative director',
    objectPosition: 'center 20%',
  },
  testimonialGuest3: {
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    alt: 'Portrait of Sarah Jenkins, travel author',
    objectPosition: 'center 20%',
  },
  testimonialGuest4: {
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    alt: 'Portrait of Kabir & Ananya, landscape photographers',
    objectPosition: 'center 25%',
  },

  // Stories Scroller (mixed-shape tiles)
  storyTile1: {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
    alt: 'Whispering cedar canopy at sunrise',
    objectPosition: 'center center',
  },
  storyTile2: {
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
    alt: 'Ceramic mug with steaming freshly brewed wild thyme herbal tea',
    objectPosition: 'center center',
  },
  storyTile3: {
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    alt: 'Raw local stone masonry and hand-planed timber architecture',
    objectPosition: 'center center',
  },
  storyTile4: {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    alt: 'Sun-drenched reading nook overlooking the valley',
    objectPosition: 'center center',
  },
  storyTile5: {
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    alt: 'Freshly baked sourdough and local orchard wild berry preserves',
    objectPosition: 'center center',
  },

  // Two tiles section: left = starry mountain sky; right = stone/timber hill cottage
  tileGallery: {
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85',
    alt: 'Dramatic starry mountain night sky over Himalayan silhouette',
    objectPosition: 'center 40%',
  },
  tileCta: {
    url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85',
    alt: 'Traditional stone and timber hill cottage surrounded by evergreen alpine forest',
    objectPosition: 'center 50%',
  },

  // Popup modal image (tall arch-top)
  popupImage: {
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85',
    alt: 'Mountain sanctuary suite window looking toward pine ridge',
    objectPosition: 'center center',
  },

  // Footer dark textured band
  footerBand: {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
    alt: 'Dark textured Himalayan ridge at dusk',
    objectPosition: 'center center',
  },
};

