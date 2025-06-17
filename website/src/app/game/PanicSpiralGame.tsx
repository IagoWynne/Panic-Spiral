import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import { RefObject, useEffect, useState } from "react";
import { i18n, i18nKeys } from "./utils";
import { initAssets } from "./utils/assets";
import { Button } from "./ui";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  Text,
});

interface IGameProps {
  parentRef: HTMLElement | Window | RefObject<HTMLElement | null> | undefined;
}

const PanicSpiralGame = ({ parentRef }: IGameProps) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    initAssets().then(() => setAssetsLoaded(true));
  });

  return (
    // wrapping in application provides the pixijs app context
    assetsLoaded && (
      <Application
        resizeTo={parentRef}
        defaultTextStyle={{ fontFamily: "Reconstruct", fill: '#ffffff'}}
      >
        <pixiText
          x={40}
          y={20}
          text={i18n(i18nKeys.GAME_NAME)}
          style={{ fill: "#fc0e1c", fontSize: 36 }}
        />
        <Button x={450} y={400} text={i18n(i18nKeys.START_GAME)} />
      </Application>
    )
  );
};

export default PanicSpiralGame;
