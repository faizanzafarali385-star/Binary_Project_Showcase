# Project Contribution & Enhancement Guidelines

Welcome to the **Binary Battle Club Projects Showcase** repository!

This document outlines the design standards, technical architecture, and procedures for contributors who wish to add new student projects, update existing ones, or make technical enhancements.

---

## 🎨 UI/UX Design System Rules

To maintain the quality, aesthetic prestige, and identity of the website:

1. **Do Not Redesign the Website**:
   - The site uses a bespoke 3D WebGL ribbon architecture paired with a minimalist dark palette and kinetic typography.
   - Any modifications should enhance content or performance, **not** replace the design language.
2. **Color Hierarchy**:
   - Primary Background: `#0a0a0b`
   - Primary Foreground: `#f4f1ea`
   - Secondary / Monospace: `#8d8b86`
   - Grid & Borders: `rgba(244, 241, 234, 0.14)`
3. **Typography**:
   - Primary: `Inter Tight`
   - Monospace & Numbers: `IBM Plex Mono`

---

## 📁 Project Structure

```
├── .agents/
│   └── skills/
│       └── showcase-project-manager/
│           └── SKILL.md            # AI Agent automation skill
├── public/
│   ├── assets/aistudio/            # Walkthrough videos
│   ├── sites/                      # Project card screenshots (720x452)
│   └── videos/                     # Looped video previews
├── src/
│   ├── App.tsx                     # Main 3D ribbon & UI logic
│   ├── index.css                   # Custom styling & Tailwind imports
│   └── main.tsx                    # React DOM entry
├── AGENTS.md                       # AI Agent rules & constraints
├── PROJECT_GUIDELINES.md           # Contributor documentation
└── README.md                       # Project overview
```

---

## ➕ How to Add a New Project

1. Add your project screenshot (`720x452`) to `public/sites/site<N>.png`.
2. (Optional) Add your looped preview MP4 to `public/videos/v<N>_<name>.mp4`.
3. Open `src/App.tsx` and add a new object to the `WORK` array:
   ```typescript
   {
     title: 'Project Title',
     url: 'https://live-link.com/',
     screenshot: '/sites/site<N>.png',
     cardVideo: '/videos/v<N>_<name>.mp4',
     r2Video: 'designs/roadster-3d-car-landing.mp4',
     category: 'CATEGORY TITLE',
     categoryTag: 'Category',
     description: 'A brief description of what was built and why.',
     number: 11,
   }
   ```
4. If introducing a new category, add the tag to `ALL_CATEGORIES` in `src/App.tsx`.
5. Test locally:
   ```bash
   npm run lint
   npm run dev
   ```

---

## 🏛️ About Binary Battle Club

- **Institution**: Scope Global Skills University (SGSU), Bhopal, Madhya Pradesh, India
- **Platform**: [binarybattelclub.wasmer.app](https://binarybattelclub.wasmer.app/)
- **License**: © 2026 Binary Battle Club. All Rights Reserved.
