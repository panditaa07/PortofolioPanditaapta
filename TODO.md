# Portfolio Optimization TODO
Generated from approved improvement plan. Steps to be completed iteratively.

## 1. Setup & Config Updates (High Priority - Perf Foundation) ✓
- [x] package.json: Removed unused (Firebase etc.), added imagetools.
- [x] vite.config.js: Minify, chunks, imagetools.
- [x] tailwind.config.js: font-display=swap, particle opacity.
- [x] index.html: Preconnect/preload, WebP, meta.

## 2. Core Fixes (Debugging/Clean Code) 
- [x] src/supabase.js graceful.
- [x] src/index.css: Particles GPU/mobile opt (10 particles, xs:hidden).
- [ ] Console removals.


## 3. Performance Critical (Lighthouse 90+)
- [ ] Optimize public/Photo.jpg/png: Compress to WebP, lazy loading.
- [ ] src/components/Background.jsx: Reduce animations (10 particles, mobile off), RAF/IO.
- [ ] src/Pages/Home.jsx: Replace Lottie with CSS/SVG animation, optimize typewriter/AOS.

## 4. UI/UX Modernization
- [ ] Audit responsive: Container queries, consistent spacing.
- [ ] Simplify animations: Subtle hover/transitions, no constant motion.

## 5. Testing & Finalization
- [ ] Run Lighthouse on prod build (`npm run build && npm run preview`).
- [ ] Cross-browser/mobile test.
- [ ] Update TODO.md progress after each major step.
- [ ] attempt_completion once all done.

Progress: Starting with config updates...

