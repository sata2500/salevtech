# System Architecture - salev.tech

This document maps out the system architecture, file organization, and component structure for the `salev.tech` Android application showcase platform.

## 1. Directory Structure

The project uses Next.js App Router inside a `src` directory:

```text
salev.tech/
├── .ai-workspace/             # AI agent memory and planning
│   ├── research/              # Technical research logs
│   ├── plans/                 # Task plans and roadmap
│   └── architecture/          # Architecture maps
├── src/
│   ├── app/                   # App Router pages and routes
│   │   ├── globals.css        # Global CSS variables, resets, and utility classes
│   │   ├── layout.tsx         # Root layout with HTML/Body structure and SEO
│   │   ├── page.tsx           # Home landing page (Showcase)
│   │   ├── apps/
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # Dynamic App Detail page
│   │   ├── privacy-policy/
│   │   │   └── page.tsx       # Privacy Policy page
│   │   ├── terms-of-service/
│   │   │   └── page.tsx       # Terms of Service page
│   │   ├── cookie-policy/
│   │   │   └── page.tsx       # Cookie Policy page
│   │   └── gdpr/
│   │       └── page.tsx       # GDPR / KVKK Compliance page
│   ├── components/            # Reusable UI components
│   │   ├── Header/            # Navigation Header (Glassmorphism)
│   │   ├── Footer/            # Footer with legal links
│   │   ├── AppCard/           # App showcase card (Premium animations)
│   │   ├── Hero/              # Dynamic Hero section with glow effects
│   │   ├── ContactForm/       # Premium contact form with validation
│   │   └── LegalLayout/       # Side-nav layout for legal documents
│   ├── data/                  # Static site data (app details, legal content)
│   │   └── apps.ts            # Local app data mock (titles, descriptions, store links)
│   └── utils/                 # General utility functions
```

## 2. Component Design & Styling (Vanilla CSS Modules)
* **Glassmorphism Base**: High blur (`12px` to `20px`), subtle border (`rgba(255, 255, 255, 0.08)` for dark mode), and translucent gradients.
* **Colors**: Premium dark-mode default (deep dark-blue/grey background, cyan/purple/indigo accent glows, crisp white typography).
* **Grid Layouts**: Flexible grid structures for dynamic content like screenshots and features.

## 3. Navigation Flows
* **Landing Page (`/`)**: Main Hub. Hero section -> App Showcase Grid -> Metrics -> About -> Contact.
* **App Detail (`/apps/[slug]`)**: Detailed features, changelog, download options, screenshots.
* **Legal Hub (`/[legal-slug]`)**: Fast loading, high-contrast typography, sidebar to jump between documents.
