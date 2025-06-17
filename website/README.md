This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Panic Spiral Game
### Asset Organisation
Asset bundling is done with `@assetpack/core` - this is the recommended package by pixi js
NOTE: this package does have dependencies on vulnerable packages. Since this isn't a professional project, this is overlooked for now. There is an open issue on github to have this fixed.

- Assets are placed in `src/app/game/raw-assets`
- Assets which are used across multiple scenes should go in `common{m}`
    - e.g. UI assets, or sprites used in many places
- Assets specific to a screen should be placed in a folder named after that screen. E.g. assets for a `ship` screen would go in `ship{m}`
- If in doubt, place the asset in the screen specific folder. If it is required for multiple screens later, it can be moved into common
- Textures should go in a sub-folder named after the screen with `-tps{tps}` appended. E.g. textures for the ship screen go in `ship{m}/ship-tps{tps}`
    - This tells assetpack to pack the textures