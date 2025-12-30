# Project Task List

## Phase 1: Setup & Infrastructure
- [ ] Initialize Next.js App with TypeScript, Tailwind, ESLint
- [ ] Install Shadcn UI and Initialize (`npx shadcn-ui@latest init`)
- [ ] Install Animation Libraries (`framer-motion`, `lenis` for smooth scroll)
- [ ] Configure `next.config.js` for `@cloudflare/next-on-pages`
- [ ] Set up basic folder structure (`components/sections`, `components/ui`)

## Phase 2: Design System & Base Components
- [ ] Configure Tailwind Theme (Colors, Fonts, Container sizes)
- [ ] Create basic Typography components (H1, H2, Paragraph with correct styles)
- [ ] Add `Button` component from Shadcn and customize for the "Awwwards" look
- [ ] Implement `Magnetic` wrapper component for cursor interaction

## Phase 3: Core Sections Implementation
- [ ] **Hero Section**
    - [ ] Layout structure
    - [ ] Typography animation (Fade in / Slide up)
    - [ ] Rotating "Scroll Down" specific component
- [ ] **Header / Navigation**
    - [ ] Floating/Fixed header
    - [ ] Links interaction
- [ ] **Work / Project List**
    - [ ] Create `ProjectItem` component
    - [ ] Implement Hover reveal effect (Image showing up on hover)
    - [ ] Mobile responsive layout
- [ ] **Footer & Contact**
    - [ ] "Get in touch" large button
    - [ ] Social links list

## Phase 4: Polish & Deploy
- [ ] Implement Smooth Scroll (Lenis)
- [ ] Verify Mobile Responsiveness on all sections
- [ ] Audit Accessibility (A11y)
- [ ] Final Build Check
- [ ] Deploy to Cloudflare Pages/Workers
