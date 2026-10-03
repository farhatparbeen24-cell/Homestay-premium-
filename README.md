# Cloudveil Ridge — Premium Homestay Website Template

A production-ready, config-driven homestay website template built with Next.js (App Router), TypeScript (strict), Tailwind CSS, Zod, and Supabase (server-side only).

---

## 1. Design System & Palette Tokens

The site has been updated to the refined mountain sanctuary palette:
- **Midnight (`#101B2D`)**: Deep architectural navy for navigation, dark sections, modal frames, and footer
- **Twilight Plum (`#2B2540`)**: Second end of dark atmospheric gradients
- **Snow (`#F5F7F8`)**: Crisp, light page background
- **Ivory (`#EFEAE2`)**: High-contrast, gentle text on dark sections
- **Brass Gold (`#C9993F`)**: High-intent focal CTA buttons and delicate hairlines only; CTA buttons get a subtle gradient `#C9993F` to `#E3C27A`
- **Sage (`#8FA08A`)**: Subtle earthy accents and detail badges
- **Dark Sections & Hero Overlay**: Use a smooth midnight-to-twilight-plum gradient (`from-[#101B2D] to-[#2B2540]`). The hero overlay has been lightened slightly to preserve photo vibrancy while maintaining AA text contrast.
- **Section Dividers**: Thin gold hairline dividers (`border-t border-[#C9993F]/20`) added between all major sections.
- **Consistent Warm Tone Overlay**: Applied via the shared `SafeImage` component (`bg-[#C9993F]/[0.07] mix-blend-multiply`) across all imagery for visual cohesion.
- **Fail-Safe Gradient Image Fallback**: In `SafeImage`, if an image URL fails to load, it displays a midnight-plum gradient tile with the image's alt text and brand label—never a blank grey box.

---

## 2. Summary of Changes Made

### 1. Palette & Theme Tokens
- Updated `business.config.ts` theme tokens to `midnight`, `plum`, `snow`, `ivory`, `gold`, `goldLight`, and `sage`.
- Synced `app/globals.css` `:root` and `@theme` variables.
- Replaced previous legacy color references (`#1E2A36`, `#EDF0F1`, `#D69A3E`, `#BF852E`, `#6F8466`) across all components, layout, and sub-pages.
- Added thin gold hairline dividers (`border-[#C9993F]/20`) between major sections on the home page.
- Applied the consistent warm tone overlay across all photos via `SafeImage`.
- Lightened the hero overlay scrims slightly for photo clarity.

### 2. Images Map (`src/config/images.ts`)
Every image in the registry has been verified to match its caption and hill-stay context (all returning HTTP 200 with valid JPEG/WebP MIME types):
- **Bundle main image (`bundleMain`)**: Replaced with an intimate candlelit dinner and fireside mountain dining scene (`photo-1544025162-d76694265947`). Removed any hotel sign photo.
- **Bundle gallery 4 (`bundleMini1` – `bundleMini4`)**:
  - `bundleMini1`: Yoga / sunrise deck (`photo-1506126613408-eca07ce68773`)
  - `bundleMini2`: Farm-to-table food & mountain preserves (`photo-1540420773420-3366772f4999`)
  - `bundleMini3`: Cosy stone hearth lounge with warm timber accents (`photo-1513694203232-719a280e022f`). Removed game controller.
  - `bundleMini4`: Panoramic Himalayan peak vista from the upper ridge (`photo-1464822759023-fed622ff2c3b`).
- **Story section (`hostStory`)**: Replaced studio portrait with a warm photo of hands holding a steaming cup of tea in a cosy sweater on the homestay porch (`photo-1514432324607-a09d9b4aefdd`). No stock portrait of a single person.
- **Two-tile section**:
  - Left (`tileGallery`): Dramatic starry mountain sky over Himalayan silhouette (`photo-1519681393784-d120267933ba`).
  - Right (`tileCta`): Traditional stone and timber hill cottage surrounded by evergreen alpine forest (`photo-1470770841072-f978cf4d019e`). Not a modern villa or palm trees.
- **Stories scroller circle tile (`storyTile2`)**: Fixed with a verified working image of a ceramic mug with steaming freshly brewed wild thyme herbal tea (`photo-1517256064527-09c73fc73e38`).
- **Image Fallback**: Shared `SafeImage` renders a midnight-to-plum gradient tile with the alt text whenever a network or resource error occurs.
- **Unverified Images**: None. All 29 image assets in `src/config/images.ts` have been actively curled and verified.

### 3. Design Rules & Typographic Hierarchy
- Removed all-caps tracked eyebrow labels above headings everywhere (`LOCATION & ALTITUDE`, `OUR STORY`, `ACCOMMODATIONS`, etc.) across all sections, replacing them with sentence-case typography (`Location & altitude`, `Our story`, `Accommodations`, `Guest reflections`, etc.).
- Final CTA tile: Added a dark gradient scrim under the text so that the label and headline pass WCAG AA contrast.
- Renamed the package from "The Mountain Dusk Immersive Residency" to business-specific "Ridge Retreat Package" in `business.config.ts` and throughout the app.
- Reviews header: Only shows the Google rating and review count when `reviews.googleVerified: true` in config (defaults to `false`, displaying a clean "Guest reviews" label).

### 4. Direct Booking Popup Modal (`WelcomePopup.tsx`)
- Config-toggled (`businessConfig.toggles.showPopup`, defaults to `true`).
- Centered modal over a dimmed backdrop (`bg-black/65 backdrop-blur-xs`), large border radius (`rounded-3xl`), split into two halves (stacked on mobile).
- **Left half**: Tall arch-top photo with a small pill badge showing the offer (`15% Off + Daily Breakfast`).
- **Right half**: Headline, one line of subtext, one email input, full-width dark pill button "Reveal code", small consent line, close button (X) in top right.
- Opens once per visitor shortly after load (~2.2s delay).
- Closes on X click, Escape key press, or clicking the backdrop outside the modal.
- Focus is trapped inside the modal while open.
- Dismissal state is remembered in `localStorage` wrapped in a safe `try/catch` block.
- On submit, executes a real insert into the Supabase `newsletter_subscribers` table with `source: "popup"` via the Next.js route handler (`/api/newsletter`).
- Only after real database success does it reveal the offer code (`CLOUDRIDGE`) with an instant copy button.
- If Supabase environment keys (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) are missing, the popup is automatically hidden to prevent fake success.
- All popup copy, badges, titles, and button labels originate from `businessConfig.popup`.

### 5. Large Footer Wordmark
- Added a full-width display wordmark of the homestay name below the link columns over a dark textured image band with a midnight-plum gradient.
- Copyright and privacy policy links positioned directly above the display band.
- Responsive with CSS fluid clamping (`clamp(1.5rem, 7.8vw, 9.5rem)`), ensuring no horizontal overflow even on small 360px mobile viewports.
- Honors `prefers-reduced-motion` across Ken Burns zoom, transitions, autoplay, and animations.

---

## 3. Configuration & Single Source of Truth

To adapt this website to another client:
1. **Business Config**: Update `/src/config/business.config.ts` (business name, coordinates, contact, rooms, pricing, popup text, bundle inclusions).
2. **Imagery**: Update `/src/config/images.ts` with client-provided photography.
3. **Database**: Provide `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` to enable server-side lead capture and newsletter subscriptions.
