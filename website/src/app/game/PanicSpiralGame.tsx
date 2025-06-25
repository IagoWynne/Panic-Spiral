import { Application, extend } from "@pixi/react";
import {
  AnimatedSprite,
  Container,
  Graphics,
  Sprite,
  Text,
  TilingSprite,
} from "pixi.js";
import { RefObject, useEffect, useState } from "react";
import { initAssets } from "./Utils/assets";
import { BGMPlayer, SFXPlayer } from "./Utils/audio";
import { Scene, SceneManager } from "./Utils/sceneManager";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  Text,
  AnimatedSprite,
  TilingSprite,
});

interface IGameProps {
  parentRef: HTMLElement | Window | RefObject<HTMLElement | null> | undefined;
}

const PanicSpiralGame = ({ parentRef }: IGameProps) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (!assetsLoaded) {
      initAssets().then(() => {
        setAssetsLoaded(true);
      });
    }
  });

  return (
    // wrapping in application provides the pixijs app context
    assetsLoaded && (
      <BGMPlayer>
        <SFXPlayer>
          <Application
            resizeTo={parentRef}
            defaultTextStyle={{ fontFamily: "Reconstruct", fill: "#ffffff" }}
          >
            <SceneManager scene={Scene.Title} />
          </Application>
        </SFXPlayer>
      </BGMPlayer>
    )
  );
};

export default PanicSpiralGame;
