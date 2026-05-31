# Task Plan - Project Setup and Feature Implementation

## Current Focus
* Initializing Next.js project on `salev.tech` workspace.
* Configuring TypeScript, ESLint, and opting out of Tailwind CSS in favor of Vanilla CSS modules.

## Roadmap & Progress

- [ ] Next.js Initialization
  - [ ] Run `create-next-app` CLI with `--no-tailwind`
  - [ ] Set up basic configuration files
- [ ] Base Design System & CSS
  - [ ] Setup global variables and utility classes in `src/app/globals.css`
  - [ ] Define theme tokens, dark mode base styles, glassmorphism rules
- [ ] Content & Layout Setup
  - [ ] Define application mock schemas and static descriptions in `src/data/apps.ts`
  - [ ] Setup legal mock texts in `src/data/legal.ts`
- [ ] Component Construction
  - [ ] Develop responsive glassmorphism `Header`
  - [ ] Develop generic/flexible `Footer` with legal links
  - [ ] Develop `AppCard` component with hover animations
  - [ ] Develop general `LegalLayout` side-navigation layout
- [ ] Route & Pages Development
  - [ ] Implement index showcase (`/`) with Hero, App showcase, and stats counters
  - [ ] Implement Dynamic route `/apps/[slug]` for app details
  - [ ] Implement `/privacy-policy` (Gizlilik Beyanı)
  - [ ] Implement `/terms-of-service` (Kullanım Koşulları)
  - [ ] Implement `/cookie-policy` (Çerez Politikası)
  - [ ] Implement `/gdpr` (KVKK / GDPR Uyum)
- [ ] Build & Verify
  - [ ] Run typescript checks and linting
  - [ ] Run full Next.js production build (`npm run build`)
