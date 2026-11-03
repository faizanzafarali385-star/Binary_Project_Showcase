# BINARY BATTLE CLUB SHOWCASE — AGENT & CONTRIBUTOR RULES

> **CRITICAL DIRECTIVE: DO NOT REDESIGN THIS WEBSITE.**  
> Any changes made to this repository must **PRESERVE AND ENHANCE** the existing UI/UX design system. You must work with the existing design, never replace it.

---

## 1. Absolute Preservation Principles

When editing this codebase, you must retain **at least 85–90%** of the existing design language and visual architecture:
- **Preserve the 3D Ribbon & WebGL Grid**: The Three.js Catmull-Rom spline ribbon (`#gl`), shader materials, camera interpolation, and scroll-bound physics must remain intact.
- **Preserve Color Palette**:
  - Background: `#0a0a0b` (`--bg`)
  - Primary text / accents: `#f4f1ea` (`--ink`)
  - Secondary text / borders: `#8d8b86` (`--mid`)
  - Subtle borders: `rgba(244, 241, 234, 0.14)` (`--line`)
- **Preserve Typography**:
  - Primary UI & Headings: `'Inter Tight', system-ui, sans-serif`
  - Monospace Data / Badges / Labels: `'IBM Plex Mono', monospace`
- **Preserve Layout & Navigation**:
  - Sticky hero stage (`#stage` inside `#track`)
  - Kinetic scroll headings (`#l1`, `#l2`)
  - Header with logo, pager (`←` / `→`), and action pills (`.acts a`)
  - Bottom bar footer (`.bot`)
  - Interactive project detail modal
  - Slide-out project index drawer (`MENU`)
  - Hover tooltip follower (`#name`)

---

## 2. Adding or Updating Projects

All projects are declared in the `WORK` array in [`src/App.tsx`](src/App.tsx).

### Project Data Schema
```typescript
interface ProjectItem {
  title: string;              // Official project title
  url: string;                // Valid HTTPS URL (opens in new tab / iframe)
  screenshot: string;         // Path to 720x452 screenshot in /public/sites/
  cardVideo?: string;         // (Optional) Path to looping card video in /public/videos/
  fullVideo?: string;         // (Optional) Path to HD walkthrough in /public/assets/aistudio/
  r2Video: string;            // Cloud showreel fallback identifier
  category: string;           // Full category (e.g. 'EDUCATION & EDTECH')
  categoryTag: string;        // Filter tag (e.g. 'Education', 'AI & Tech', etc.)
  description: string;        // 1-2 sentence description
  number: number;             // Sequential integer (1, 2, 3...)
  procedural3DPreview?: boolean; // Set true ONLY for WebGL canvas simulations (e.g. Aegis 3D)
}
```

### Steps to Add a New Project:
1. **Place Media Files**:
   - Save website screenshot as `/public/sites/site<N>.png`.
   - (Optional) Save looping MP4 video in `/public/videos/v<N>_<slug>.mp4`.
2. **Add Entry to `WORK` Array** in [`src/App.tsx`](src/App.tsx):
   - Set sequential `number: <N>`.
   - Assign appropriate `category` and `categoryTag`.
   - Provide accurate student project URL.
3. **Update Categories (if needed)**:
   - If a new `categoryTag` is introduced, ensure it is added to `ALL_CATEGORIES` in [`src/App.tsx`](src/App.tsx).
4. **Card Rendering Automatic Handling**:
   - The WebGL texture generator automatically draws the card index badge, title, category, description snippet, and `VIEW PROJECT ↗` button.
   - The 3D grid layout automatically computes column and row positioning.

---

## 3. Allowed Enhancements vs. Forbidden Actions

| Allowed Enhancements ✅ | Strictly Forbidden Redesigns ❌ |
|---|---|
| Adding, editing, or reordering items in `WORK` | Replacing Three.js canvas with standard HTML card grid |
| Adding new category tags or filter options | Changing the dark monochromatic aesthetic to light/colorful theme |
| Updating project screenshots, videos, or URLs | Swapping out `Inter Tight` or `IBM Plex Mono` fonts |
| Enhancing modal previews or accessibility attributes | Removing the hero kinetic scroll animation |
| Refining performance (FPS, memory leaks, asset loading) | Replacing Tailwind / Vanilla CSS with another UI framework |
| Updating institutional copy for Binary Battle Club / SGSU | Removing search, filter, or modal functionality |

---

## 4. Verification Checklist Before Committing
- [ ] Run `npm run lint` — Must exit with 0 errors.
- [ ] Run `npm run build` — Must produce production bundle successfully.
- [ ] Verify 3D ribbon animation flows smoothly into the grid.
- [ ] Verify all project links open properly in a new tab.
- [ ] Verify project modal displays both video walkthrough (if available) and live site preview.
- [ ] Verify drawer search and category filters function correctly.
