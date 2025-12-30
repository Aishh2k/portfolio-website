# Product Requirements Document (PRD) - Personal Portfolio

## 1. Introduction
**Project Name:** Personal Portfolio (Ewan Kerboas Clone)
**Objective:** Create a high-end, minimalist personal portfolio website that mimics the design and interaction of [ewan-kerboas.fr](https://www.ewan-kerboas.fr/).
**Target Audience:** Potential employers, clients, and other developers.
**Key Attributes:** Minimalist, Dark Mode, High Contrast, Smooth Animations, Responsive.

## 2. Features & Requirements

### 2.1 Core Pages/Sections
Since the reference is a Single Page Application (SPA) feel, the following sections should be present:

*   **Header/Nav:**
    *   Minimalist navigation (Home, Works, About/Contact).
    *   Sticky or hidden-on-scroll behavior.
*   **Hero Section:**
    *   Large, bold typography Introduction ("FRONTEND DEVELOPER").
    *   Rotating/Circular "Scroll Down" text animation.
    *   Availability status indicator ("Open to work").
*   **Work/Projects List:**
    *   List view of recent projects.
    *   **Interaction:** Hovering over a project title should reveal a preview image or change the background/text style significantly.
    *   Clicking navigates to case study or external link.
*   **About/Info:**
    *   Brief bio, location, and skills.
*   **Footer/Contact:**
    *   Strong Call to Action (CTA) "Get in touch".
    *   Social Links (GitHub, LinkedIn, Twitter).

### 2.2 Design System
*   **Visual Style:** "Awwwards" high-end aesthetic.
*   **Color Palette:**
    *   Background: `#000000` (Pure Black) or very dark numeric gray.
    *   Text: `#FFFFFF` (White) and `#888888` (Gray for secondary).
    *   Accents: Minimal usage, mostly strictly monochrome.
*   **Typography:** Large Sans-Serif (Inter, Geist Sans, or similar Grotesque).

### 2.3 Interactions & Animations
*   **Smooth Scroll:** The site must feel fluid.
*   **Entrance Animations:** Text fading/sliding up on scroll.
*   **Micro-interactions:** Magnetic buttons (buttons that slightly follow the cursor), custom cursor (optional but fits the style).

## 3. Technical Stack (User Specified)
*   **Framework:** Next.js (App Router).
*   **Styling:** Tailwind CSS.
*   **UI Library:** Shadcn UI (for accessible primitives like dialogs, buttons).
*   **Hosting:** Cloudflare Workers (requires `next-on-pages` adapter).
*   **AnimationLibrary:** Framer Motion (recommended for React) or GSAP.

## 4. Mobile Responsiveness
*   Text sizes must adapt (fluid typography).
*   Layout shifts from horizontal to vertical stacking where appropriate.
*   Touch-friendly interactables.

## 5. Performance Goals
*   Core Web Vitals usually green.
*   Fast FCP (First Contentful Paint) via Cloudflare Edge caching.
