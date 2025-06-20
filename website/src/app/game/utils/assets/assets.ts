import { Assets, UnresolvedAsset } from "pixi.js";

import manifest from "../../../../manifest.json";

const initAssets = async () => {
  await Assets.init({ manifest, basePath: "assets" });

  await Assets.loadBundle(["common", "title", "title/sprites", "default"]);

  const allBundles = manifest.bundles.map(
    (bundle: { name: string }) => bundle.name
  );

  Assets.backgroundLoadBundle(allBundles);
};

const isBundleLoaded = (bundleId: string): boolean => {
  const bundleManifest = manifest.bundles.find(
    (b: { name: string }) => b.name === bundleId
  );

  if (!bundleManifest) {
    return false;
  }

  for (const asset of bundleManifest.assets as UnresolvedAsset[]) {
    if (!Assets.cache.has(asset.alias as string)) {
      return false;
    }
  }

  return true;
};

const areBundlesLoaded = (bundles: string[]) => {
  for (const name of bundles) {
    if (!isBundleLoaded(name)) {
      return false;
    }
  }

  return true;
};

export { initAssets, isBundleLoaded, areBundlesLoaded };
