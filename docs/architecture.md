# System Architecture

## 1. High-Level Overview
The application is a **Next.js** static/hybrid site designed to run on **Cloudflare Workers** (Edge Runtime). It leverages **Tailwind CSS** for styling and **Shadcn UI** for component primitives.

## 2. Technology Stack

### Frontend
*   **Framework:** Next.js 14+ (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Components:** Shadcn UI (Radix UI based)
*   **Icons:** Lucide React
*   **Animations:** Framer Motion (for layout transitions, hover effects, scroll animations)

### Backend / Infrastructure
*   **Runtime:** Edge Runtime (Cloudflare Workers)
*   **Deployment Adapter:** `@cloudflare/next-on-pages`
*   **hosting:** Cloudflare Pages (preferred for static/Next.js) or Workers.

## 3. Directory Structure
```
/
├── app/
│   ├── layout.tsx       # Root layout (fonts, metadata, providers)
│   ├── page.tsx         # Home page (Hero, Works, Contact sections)
│   ├── globals.css      # Tailwind imports & base styles
│   └── components/      # (Optional) specific page components
├── components/
│   ├── ui/              # Shadcn primitives (button, etc.)
│   ├── sections/        # Hero, Works, Footer sections
│   └── animation/       # Reusable animation wrappers (FadeIn, MagneticButton)
├── lib/
│   └── utils.ts         # cn() utility
├── public/              # Static assets (images, fonts)
└── next.config.js       # Cloudflare adapter config
```

## 4. Cloudflare Integration
Since Cloudflare Workers has a specific runtime environment (Edge), we must ensure:
*   We use `export const runtime = 'edge'` in our page/layout configurations.
*   We avoid Node.js specific APIs (fs, child_process) in client components or edge routes.
*   Image optimization: Use `next/image` with a custom loader or Cloudflare Image Resizing (if available on plan), otherwise standard `img` tags or unoptimized next/image for static export.

## 5. Component Strategy
*   **Atomic Design:** Small reusable atoms (Buttons, Typography) -> Molecules (ProjectCard) -> Organisms (HeroSection).
*   **Client vs Server:**
    *   Most sections will be Server Components (better performance).
    *   Interactive parts (Hover effects, Framer Motion animations) will be Client Components (`"use client"`).

## 6. Key Implementation Details
*   **Smooth Scroll:** Use a library like `lenis` for smooth scrolling behavior characteristic of high-end portfolios.
*   **Typography:** Import fonts via `next/font` (Inter or similar) to prevent layout shift.
