# Unravel - Hotel Room Listing Web App

A responsive React application for displaying hotel rooms with infinite scrolling, optimized media loading, and performance optimizations.

## Table of Contents

- [Project Setup](#project-setup)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Performance Optimizations](#performance-optimizations)
- [Assumptions & Limitations](#assumptions--limitations)
- [Project Structure](#project-structure)

## Project Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The application will be available at `http://localhost:5173` (default Vite port).

## Architecture & Design Decisions

### Component Architecture

**Feature-based folder structure** with component co-location. Components, styles, and related files are kept together for better maintainability. Each feature module (HotelPage, RoomsList) is self-contained.

### State Management

**React Context API with useReducer pattern** instead of Redux:
- Simpler setup for this application size
- Separate contexts for `Hotel` and `RoomsList` to prevent unnecessary re-renders
- Reducer pattern for predictable state updates
- Context DevTools for debugging in development

**State Flow**:
1. `HotelPage` fetches data and dispatches to both contexts
2. `RoomsList` detects scroll and calls `loadNextPage()` via Intersection Observer
3. Reducer slices next page from `allRooms` and appends to `roomsList` (PAGE_SIZE = 10)

### Infinite Scrolling

**Client-side pagination with Intersection Observer API**:
- Watches the last card with `rootMargin: '100px'` for preloading
- Loading state prevents multiple simultaneous requests
- Smooth user experience with automatic loading

### Media Loading Strategy

**Videos**:
- Two Intersection Observers per video:
  - Play/Pause observer (threshold: 0.3) - controls playback
  - Preload observer (rootMargin: 300px) - controls preloading
- Videos pause when leaving viewport
- `preload="metadata"` when off-screen, `preload="auto"` when near viewport

**Images**:
- Native `loading="lazy"` attribute
- `decoding="async"` for non-blocking image decoding
- Picture element with multiple sources for format support

### Component Memoization

**Strategic use of `React.memo`, `useMemo`**:
- `RoomCard`, `RoomMedia`, `VariantsList`, `VariantsListItem` - wrapped with `React.memo`
- `useMemo` for: `hasVideo`, `imageUrls`, `videoUrl`, `paginationConfig` in `RoomMedia`
- `useMemo` for: `hasDiscount` in `VariantsListItem`

### Error Handling

Error boundaries at page level with user-friendly messages. Try-catch in data fetching with loading indicators during async operations.

## Performance Optimizations

1. **Code Splitting** - Route-based ready (when using React Router)

2. **Image Optimization**
   - Lazy loading with `loading="lazy"`
   - Async decoding with `decoding="async"`
   - Picture element for format fallbacks

3. **Video Optimization**
   - Intersection Observer for viewport-based loading
   - Autoplay only when visible, pause when leaving viewport
   - Preload strategy based on proximity (300px)

4. **List Rendering**
   - Memoized components prevent unnecessary re-renders
   - Efficient key generation using `room_type_code` and index
   - Pagination reduces initial DOM size

5. **Network Optimization**
   - Loading states prevent duplicate requests
   - Videos preload when near viewport

**Performance Metrics**:
- Initial Load Time: Optimized with lazy loading and pagination
- LCP: Optimized with image lazy loading and preloading
- CLS: Stable layouts with proper image dimensions
- FID: Memoization reduces re-renders

## Assumptions & Limitations

### Assumptions

1. **Data Structure**: `sample.json` in `/public` directory, room images in `room_images[0].image_urls`, videos in `video_url.med`
2. **Media Priority**: Videos take precedence over images (per requirements)
3. **Pagination**: All room data loaded initially (client-side pagination with PAGE_SIZE = 10)
4. **Responsive Design**: Mobile-first, breakpoints at 768px (tablet) and 1024px (desktop)
5. **Browser Support**: Modern browsers with Intersection Observer support, ES2020+, CSS Grid/Flexbox

### Limitations

1. **No Server-Side Pagination** - Currently uses client-side pagination, would implement API pagination in production
2. **Single Image Size** - Ready for srcset implementation when multiple sizes available
3. **No Image CDN Integration** - Direct image URLs assumed
4. **Static Data Source** - Uses static JSON file instead of real API
5. **Basic Error Handling** - No retry mechanisms or offline support
6. **Basic Accessibility** - Could enhance with ARIA labels, keyboard navigation

### Future Enhancements

- Server-side pagination with API integration
- Advanced image optimization (multiple sizes, WebP, CDN)
- Skeleton loading placeholders
- Variant media display (videos/images for variant cards)
- Enhanced accessibility (ARIA labels, keyboard navigation)
- Error recovery (retry mechanisms, offline support)

## Project Structure

```
src/
├── api/hotel/              # API functions and types
├── components/             # Header, Footer
├── context/               # Hotel and RoomsList state contexts
│   ├── hotel/            # Hotel reducer, context, action types
│   └── roomsList/        # Rooms list reducer, context, action types
└── pages/HotelPage/
    ├── components/
    │   ├── HotelDetails/ # Hotel image and details
    │   └── RoomsList/    # Room listing with infinite scroll
    │       ├── components/  # RoomCard, RoomMedia, VariantsList, etc.
    │       └── hooks/      # useVideoIntersection
    └── HotelPage.tsx      # Main page component
```

## Deployment

Build for production:
```bash
npm run build
```

Production build will be in the `dist/` directory.

---

**Author**: Mateusz Orawczak  
**Date**: 11.2025
