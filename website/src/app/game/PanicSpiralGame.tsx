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
import TitleScreen from "./Screens/Title";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  Text,
  AnimatedSprite,
  TilingSprite
});

interface IGameProps {
  parentRef: HTMLElement | Window | RefObject<HTMLElement | null> | undefined;
}

const PanicSpiralGame = ({ parentRef }: IGameProps) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (!assetsLoaded) {
      initAssets().then(() => setAssetsLoaded(true));
    }
  });

  return (
    // wrapping in application provides the pixijs app context
    assetsLoaded && (
      <Application
        resizeTo={parentRef}
        defaultTextStyle={{ fontFamily: "Reconstruct", fill: "#ffffff" }}
      >
        <TitleScreen />
      </Application>
    )
  );
};

export default PanicSpiralGame;
