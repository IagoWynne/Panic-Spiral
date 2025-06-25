import { useCallback, useMemo, useState } from "react";
import TitleScreen from "../../Screens/Title";
import MainScreen from "../../Screens/Main";
import { Scene } from "./types";
import { SceneManager, SceneManagerContext } from "./SceneManagerContext";

interface Props {
  scene: Scene;
}

const SceneManagerProvider = ({ scene }: Props) => {
  const [currentScene, setCurrentScene] = useState(scene);

  const changeScene = useCallback(
    (newScene: Scene) => {
      if (newScene === currentScene) {
        return;
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
