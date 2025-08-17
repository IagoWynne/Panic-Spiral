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
import Game from "./Game";
import { GameAudio, SFXPlayer, BGMPlayer } from "./Utils/audio";
import { Inputs, KeyboardEventHandler } from "./Utils/keyboardEventHandler";

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

const GameWrapper = ({ parentRef }: IGameProps) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [audioInitComplete, setAudioInitComplete] = useState(false);
  const [inputListenerSetup, setInputListenerSetup] = useState(false);

  useEffect(() => {
    if (!assetsLoaded) {
      initAssets().then(() => {
        setAssetsLoaded(true);
      });
    }

    if (!audioInitComplete) {
      GameAudio.SFX = new SFXPlayer();
      GameAudio.BGM = new BGMPlayer();

      setAudioInitComplete(true);
    }

    if (!inputListenerSetup) {
      Inputs.Keyboard = new KeyboardEventHandler();
      setInputListenerSetup(true);
    }
    
  }, [assetsLoaded, audioInitComplete, inputListenerSetup]);

  return (
    // wrapping in application provides the pixijs app context
    assetsLoaded && (
      <Application
        resizeTo={parentRef}
        defaultTextStyle={{ fontFamily: "Reconstruct", fill: "#ffffff" }}
      >
        <Game />
      </Application>
    )
  );
};

export default GameWrapper;
