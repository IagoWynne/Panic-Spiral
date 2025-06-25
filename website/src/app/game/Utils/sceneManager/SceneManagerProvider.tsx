import { useCallback, useMemo, useState } from "react";
import TitleScreen from "../../Screens/Title";
import MainScreen from "../../Screens/Main";
import { Scene } from "./types";
import { SceneManager, SceneManagerContext } from "./SceneManagerContext";
import { sceneToBundleMap } from "./sceneToBundleMap";
import { areBundlesLoaded } from "../assets";
import { Assets } from "pixi.js";

interface Props {
  scene: Scene;
}

const SceneManagerProvider = ({ scene }: Props) => {
  const [currentScene, setCurrentScene] = useState(scene);

  const changeScene = useCallback(
    async (newScene: Scene) => {
      if (newScene === currentScene) {
        return;
      }

      const requiredBundles = sceneToBundleMap.find(
        (m) => m.scene === newScene
      )?.bundles;

      if (requiredBundles && !areBundlesLoaded(requiredBundles)) {
        await Assets.loadBundle(requiredBundles);
      }

      setCurrentScene(newScene);
    },
    [currentScene]
  );

  const context: SceneManager = useMemo(
    () => ({
      changeScene,
    }),
    [changeScene]
  );

  return (
    <SceneManagerContext.Provider value={context}>
      {currentScene === Scene.Title && <TitleScreen />}
      {currentScene === Scene.Main && <MainScreen />}
    </SceneManagerContext.Provider>
  );
};

export default SceneManagerProvider;
