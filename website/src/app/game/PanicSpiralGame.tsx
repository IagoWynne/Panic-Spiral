import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite, Text } from "pixi.js";
import BunnySprite from "./BunnySprite";
import { RefObject } from "react";
import { i18n, i18nKeys } from "./utils";

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
  return (
    // wrapping in application provides the pixijs app context
    <Application resizeTo={parentRef}>
      <pixiText
        x={0}
        y={0}
        text={i18n(i18nKeys.HELLO_WORLD)}
        style={{ fill: "#ffffff" }}
      />
      <BunnySprite />
    </Application>
  );
};

export default PanicSpiralGame;
