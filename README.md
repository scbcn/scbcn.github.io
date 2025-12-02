# Software Crafters Barcelona Website

Official website for the Software Crafters Barcelona community.

## Prerequisites

- Node.js version 24.0.0 or higher

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321` (or another port if 4321 is in use).

### Building

Build the site for production:

```bash
npm run build
```

The built site will be output to the `./dist` directory.

### Testing the Build

To test the production build locally, you can serve the built site:

```bash
npx serve ./dist
```

Alternatively, use Astro's built-in preview command:

```bash
npm run preview
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `master` branch via GitHub Actions.
