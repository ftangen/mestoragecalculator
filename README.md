# mestoragecalculator.com

ME Storage Calculator for Applied Energistics 2 + MEGA Cells (ATM10 / Minecraft modpacks).

## Stack
- React 18 + Vite

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
```

Output goes to `/dist` — deploy this folder to any static host (Vercel, Netlify, GitHub Pages, etc).

## Data / recipes

All crafting recipes and material data live at the top of `src/App.jsx`.
When ATM10 updates recipes, only that file needs to change.

### Standard AE2 tiers
1k → 4k → 16k → 64k → 256k

### MEGA Cells tiers
1M → 4M → 16M → 64M → 256M
Each tier = 3× previous + 1 Accumulation Processor + 1 glass + 4 special material

| Tier | Special material | Glass type         |
|------|------------------|--------------------|
| 1M   | Sky Stone Dust   | Quartz Glass       |
| 4M   | Ender Dust       | Quartz Glass       |
| 16M  | Ender Dust       | Vibrant Quartz Glass |
| 64M  | Matter Ball      | Vibrant Quartz Glass |
| 256M | Matter Ball      | Vibrant Quartz Glass |
