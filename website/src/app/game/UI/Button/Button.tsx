import { Texture } from "pixi.js";
import { useContext, useEffect, useRef, useState } from "react";
import AudioPlayerContext from "../../Utils/audio/AudioPlayerContext";
// import { SFX } from "../../Utils/audio";

interface Props extends CoordinateProps {
  text?: string;
}

const Button = ({ x, y, text }: Props) => {
  const scale = 0.75;
  const spriteRef = useRef(null);
  const SFX = useContext(AudioPlayerContext);

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

  const onPointerOver = () => {
    setIsHovered(true);
    SFX.play("button-hover");
  };

  const onClick = () => {
    SFX.play("button-click");
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
      onClick={onClick}
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
