# Next.js App Router & CSS Modules Best Practices

**Date**: May 31, 2026
**Topic**: Next.js App Router initialization, Vercel Deployment, and CSS Modules structure.

## 1. Next.js Version and Setup
* **Latest Stable Version**: Next.js 16.x (or latest 15.x/16.x stable).
* **Router Type**: App Router (`/app` directory) is standard and mandatory for modern architecture, avoiding the deprecated Pages Router.
* **Initialization command**: 
  `npx -y create-next-app@latest ./ --ts --no-tailwind --eslint --app --src-dir --import-alias "@/*"`
  *(Note: Opted out of Tailwind CSS as per user rule to use Vanilla CSS for maximum styling control).*

## 2. CSS Modules and Styling Strategy (Vanilla CSS)
* **Design System**: Global variables defined in `src/app/globals.css` (color tokens, font variables, responsive breakpoints, transitions, shadows, glassmorphism templates).
* **Component Styling**: Co-located CSS modules (`Component.module.css` next to `Component.tsx`).
* **Glassmorphism**: Use `backdrop-filter: blur(xpx)` combined with semi-transparent background and border colors for premium modern designs.
* **CSS Variable Naming**: Grouped by token type (e.g. `--color-primary`, `--bg-glass`, `--shadow-neon`).

## 3. SEO Best Practices
* Use Next.js Metadata API (`export const metadata` in `layout.tsx` and `page.tsx`).
* Dynamic metadata for dynamic app pages (`generateMetadata` function).
* Include OpenGraph, Twitter cards, robots, and canonical URLs.
* Semantic HTML5: `header`, `main`, `footer`, `article`, `section`.
* Unique testing IDs: Use `id` attributes on interactive elements.

## 4. Vercel Deployment Optimization
* Use standard server-side rendering (SSR) for dynamic paths or static site generation (SSG) with `generateStaticParams` for app routes if apps are static.
* Next.js Image Component (`next/image`) for optimized screenshots and logos.
* Ensure code compiles without TypeScript or ESLint errors (since Vercel builds fail on these).
