import { createContext } from "react";
import { Scene } from "./types";

export interface SceneManager {
    changeScene: (scene: Scene) => void;
  }

export const SceneManagerContext = createContext<SceneManager>({
  changeScene: (_) => {},
});
