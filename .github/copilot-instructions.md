# GitHub Copilot Instructions

## Repository Overview
This repository hosts the **Software Crafters Barcelona** website (`softwarecrafters.barcelona`), deployed via GitHub Pages.
- **Framework**: Astro (Static Site Generation).
- **Nature**: A hybrid structure containing the modern Astro app (current year) and a static archive of all previous conference editions.

## Architecture & Directory Structure

### `src/` (Current Site)
Contains the source code for the current active version of the website.
- **`pages/`**: Application routes. Contains `.astro` components (modern) and `.html` files (often redirects or static legacy pages).
- **`components/`**: UI components. `Layout.astro` is the main wrapper utilizing global assets.
- **`clients/`**: Type-safe data fetching clients (e.g., `getMeetupEvents.ts` for GraphQL integration).

### `public/` (Archives & Assets)
This directory is critical as it acts as both the static asset host and the historical archive.
- **`public/YYYY/`** (e.g., `2016/`, `2023/`): Self-contained static HTML dumps of previous years.
  - **Rule**: Only edit these folders if you need to fix historical content. They are not part of the Astro build pipeline logic but are served statically.
- **`public/assets/`**: Shared assets (CSS, JS, Images, Plugins).
  - **Critical**: These assets are used by BOTH the archived sites and the current `src/components/layout.astro`.
  - **Caution**: modifying files here (like `bootstrap` or `fontawesome` in `plugins/`) may break historical layouts.

## Key Development Patterns

### 1. Legacy-Coupled Styling
The modern Astro `Layout.astro` does not import CSS via ESM (e.g., `import 'bootstrap'`). Instead, it links to raw CSS files in `public/assets/plugins/`.
- **Pattern**: Maintain this simplified linkage to ensure consistency with the legacy assets structure.
- **JavaScript**: Verify if jQuery or Bootstrap scripts are loaded via script tags in `Layout.astro`.

### 2. Data Fetching Strategy
Data is fetched at **build time** (SSG).
- **Implementation**: See `src/clients/getMeetupEvents.ts`.
- **Pattern**: Top-level await in `.astro` frontmatter is used to pass data to components.
- **Error Handling**: Build processes might fail if APIs (like Meetup) are unreachable.

### 3. Redirects & Static Pages
- **HTML Files**: `src/pages/*.html` are processed by Astro but often serve as static content or simple redirects (check `src/pages/cfp.html` etc.).

## Workflows

1.  **Development**: `npm run dev` (Starts Astro on port 4321).
2.  **Build**: `npm run build` (Generates `dist/` for deployment).
3.  **Preview**: `npm run preview` to test the production build locally.

## Tech Stack Details
- **Core**: Astro v5+, TypeScript.
- **Styles**: Bootstrap (Legacy version in assets), Custom CSS.
- **Runtime**: Node.js >= 24.
