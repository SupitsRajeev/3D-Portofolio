# 3D Portfolio

## Overview

Personal portfolio website for "Rajeev Neupane" — full-stack developer and creative technologist.

## Stack

- **Package manager**: npm
- **Node.js version**: 18+
- **TypeScript version**: 5.9
- **Frontend framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **3D rendering**: Three.js, React Three Fiber, @react-three/drei
- **Animations**: Framer Motion

## Structure

```text
3D-Portofolio/
├── artifacts/
│   └── portfolio/          # Frontend application (npm project)
│       ├── src/
│       │   ├── components/ # React components (including 3D effects)
│       │   ├── pages/      # Page components
│       │   ├── hooks/      # Custom React hooks
│       │   └── lib/        # Utility functions
│       ├── public/         # Static assets
│       ├── vite.config.ts  # Vite configuration
│       ├── tsconfig.json   # TypeScript configuration
│       └── package.json    # Project dependencies
├── package.json            # Root scripts
└── README.md               # This file
```

## Getting Started

```bash
# Install dependencies
cd artifacts/portfolio
npm install

# Run development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve

# Type-check
npm run typecheck
```

Or from the root:

```bash
npm run dev       # starts the dev server
npm run build     # production build
npm run serve     # preview production build
npm run typecheck # type-check
```

## Portfolio Sections

- **Hero** — 3D interactive icosahedron with mouse parallax
- **About** — Background and skills overview
- **Projects** — Featured project showcase
- **Skills** — Technology stack
- **3D Effects Gallery** — Showcase of six Three.js animations:
  - Floating Model (rotating box + OrbitControls)
  - Particle System (2,000+ animated particles)
  - Gradient Sphere (animated sphere with dynamic lighting)
  - DNA Helix (wireframe double-helix with rungs)
  - Glowing Torus Knot (emissive glow effect)
  - Physics Simulation (bouncing balls with gravity)
- **Contact** — Contact form

