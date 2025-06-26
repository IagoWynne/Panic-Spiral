import { Texture } from "pixi.js";
import { useContext, useEffect, useRef, useState } from "react";
import { AUDIO_FILE_ALIASES, SFXPlayerContext } from "../../Utils/audio";
import { KeyboardEventContext } from "../../Utils/keyboardEventHandler";

interface Props extends CoordinateProps {
  id: string;
  text?: string;
  onPressed?: () => void;
  keyboardShortcut?: string;
}

const Button = ({ id, x, y, text, onPressed, keyboardShortcut }: Props) => {
  const scale = 0.75;
  const spriteRef = useRef(null);
  const SFX = useContext(SFXPlayerContext);
  const keyboardEventHandler = useContext(KeyboardEventContext);

  const [texture, setTexture] = useState(Texture.EMPTY);
  const [textX, setTextX] = useState(0);
  const [textY, setTextY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      setTexture(Texture.from("button-background"));
    }
  }, [texture]);

  useEffect(() => {
    if (texture !== Texture.EMPTY) {
      setTextX(Math.floor(texture.width / 2));
      setTextY(Math.floor(texture.height / 2) - 6);
    }
  }, [texture]);

  useEffect(() => {
    if (onPressed && keyboardShortcut) {
      keyboardEventHandler.addKeyUpHandler({
        key: keyboardShortcut,
        action: onPressed,
        componentId: id,
      });
    }

    return () => {
      if (keyboardShortcut) {
        keyboardEventHandler.removeKeyUpHandler(id, keyboardShortcut);
      }
    };
  }, [onPressed, keyboardShortcut, id, keyboardEventHandler]);

  const onPointerOver = () => {
    setIsHovered(true);
    SFX.play(AUDIO_FILE_ALIASES.UI.BUTTON_HOVER);
  };

  const onPointerTap = () => {
    SFX.play(AUDIO_FILE_ALIASES.UI.BUTTON_CLICK);

    if (onPressed) {
      onPressed();
    }
  };

  const adjustedX = (x || 0) - ((texture.width || 0) * scale) / 2;
  const adjustedY = (y || 0) - ((texture.height || 0) * scale) / 2;

  return (
    <pixiContainer
      x={adjustedX}
      y={adjustedY}
      anchor={0.5}
      eventMode="static"
      cursor="pointer"
      onPointerOver={onPointerOver}
      onPointerOut={() => setIsHovered(false)}
      onPointerTap={onPointerTap}
    >
      <pixiSprite ref={spriteRef} texture={texture} scale={scale}>
        {isHovered && (
          <pixiGraphics
            draw={(graphics) => {
              graphics.clear();
              graphics.setFillStyle({ color: "#ffffff11" });
              graphics.rect(15, 20, texture.width - 30, 50);
              graphics.fill();
            }}
          />
        )}
        <pixiText
          text={text}
          style={{ fontSize: 24 }}
          x={textX}
          y={textY}
          anchor={0.5}
        />
      </pixiSprite>
    </pixiContainer>
  );
};

export default Button;
