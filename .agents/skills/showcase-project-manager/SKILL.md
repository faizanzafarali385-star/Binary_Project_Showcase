---
name: showcase-project-manager
description: Manage, add, or update projects in the Binary Battle Club Showcase website while strictly preserving the 3D WebGL ribbon design, aesthetics, and interaction patterns.
---

# Showcase Project Manager Skill

This skill provides step-by-step instructions for safely adding, editing, or managing projects within the **Binary Battle Club Projects** showcase website without compromising the existing UI/UX design system.

---

## Core Philosophy: Enhance, Do Not Redesign

When working on this codebase:
1. **Never dismantle the Three.js 3D canvas** or replace it with standard CSS cards.
2. **Never change the core design tokens**:
   - Palette: `#0a0a0b` background, `#f4f1ea` text, `#8d8b86` secondary, subtle line borders.
   - Typography: `Inter Tight` and `IBM Plex Mono`.
3. **Always preserve all interactive elements**:
   - The scroll-reactive ribbon that flows into a 3D grid.
   - The kinetic headings that translate horizontally on scroll.
   - The modal preview system (live iframe + video player).
   - The slide-out drawer menu with search and category filters.
   - The follower hover badge (`#name`).

---

## Workflow: Adding a New Project

### Step 1: Prepare Media Assets
1. **Screenshot**:
   - Dimension: `720x452` (matching `CARD_W / CARD_H` aspect ratio).
   - Format: PNG.
   - Path: `/public/sites/site<N>.png`.
2. **Looped Preview Video** (Optional):
   - Format: MP4, lightweight (under 2.5 MB).
   - Path: `/public/videos/v<N>_<slug>.mp4`.
3. **Walkthrough Video** (Optional):
   - Format: MP4.
   - Path: `/public/assets/aistudio/<slug>.mp4`.

### Step 2: Add Entry to `WORK` in `src/App.tsx`
Locate the `WORK` array in `src/App.tsx` and append the new project item:

```typescript
{
  title: 'Your Project Name',
  url: 'https://your-project.example.app/',
  screenshot: '/sites/site<N>.png',
  cardVideo: '/videos/v<N>_preview.mp4',       // optional
  fullVideo: '/assets/aistudio/walkthrough.mp4', // optional
  r2Video: 'designs/roadster-3d-car-landing.mp4', // fallback R2 video
  category: 'CATEGORY IN ALL CAPS',
  categoryTag: 'Short Category',                // e.g. 'AI & Tech', 'Education', 'Finance'
  description: '1-2 sentence concise description of the project and its purpose.',
  number: <Next Sequential Number>,
}
```

### Step 3: Update Category Filters
If the new project uses a new `categoryTag`, add it to `ALL_CATEGORIES`:
```typescript
const ALL_CATEGORIES = ['All', 'Education', 'AI & Tech', ..., 'Your New Category'];
```

### Step 4: Verify Card Texture Generation
The WebGL rendering pipeline automatically:
- Creates a canvas texture for each card in the `cards` array.
- Draws the top-right number badge (`01`, `02`, etc.).
- Draws the category tag, title, description, and `VIEW PROJECT ↗` button.
- Updates the 3D grid dimensions (`totalRows`, `cols`, `scrollPanY`) dynamically based on `cards.length`.

### Step 5: Verification and Quality Assurance
Always execute the following validation steps:
```bash
# 1. Type check
npm run lint

# 2. Production build check
npm run build
```
Verify in the browser:
- Card appears in the 3D grid at the appropriate scroll depth.
- Card hover shows the follower tooltip with number, title, and category.
- Clicking the card opens the project modal with working iframe/video preview and external link.
- Menu drawer lists the new project and filter/search functions accurately.

---

## Troubleshooting Common Issues

- **Iframe shows refused to connect**: Some external domains forbid iframe embedding via `X-Frame-Options` or `Content-Security-Policy`. The modal already includes the `OPEN LIVE SITE ↗` button so users can open the site in a separate tab without friction.
- **Card appears blank in 3D canvas**: Ensure the screenshot path is correct in `/public/sites/` and that the file exists. The shader will automatically display a dark fallback with the project title if the image fails to load.
- **Video fails to play on Chromium**: Ensure the `<video>` element is created inside the hidden `videoPool` DOM node with `muted`, `playsinline`, and `loop` attributes, as configured in `App.tsx`.
