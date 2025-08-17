# Setup
## Running the App
- Run `npm install && npm run prebuild`
- Run `docker compose up -d`

This automatically runs the website in dev mode (with hot reload) on port 25880

## Asset Organisation
Asset bundling is done with `@assetpack/core` - this is the recommended package by pixi js
NOTE: this package does have dependencies on vulnerable packages. Since this isn't a professional project, this is overlooked for now. There is an open issue on github to have this fixed.

- Assets are placed in `src/app/game/raw-assets`
- Assets which are used across multiple scenes should go in `common{m}`
    - e.g. UI assets, or sprites used in many places
- Assets specific to a screen should be placed in a folder named after that screen. E.g. assets for the `title` screen would go in `title{m}`
- If in doubt, place the asset in the screen specific folder. If it is required for multiple screens later, it can be moved into common
- Textures should go in a sub-folder within the screen folder named `sprites{tps}`
    - This tells assetpack to pack the textures
- Assets can then be used with `Texture.from("{asset-file-name}")` e.g. `Texture.from("ship");`