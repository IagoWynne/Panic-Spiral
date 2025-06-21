import { Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

interface Props extends CoordinateProps {
  text?: string;
}

const Button = ({ x, y, text }: Props) => {
  const scale = 0.75;
  const spriteRef = useRef(null);

  const [texture, setTexture] = useState(Texture.EMPTY);
  const [textX, setTextX] = useState(0);
  const [textY, setTextY] = useState(0);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      setTexture(Texture.from("button-background"));
    }
  }, [texture]);

  useEffect(() => {
    if (texture) {
      setTextX(Math.floor(texture.width / 2));
      setTextY(Math.floor(texture.height / 2));
    }
  }, [texture]);

  const adjustedX = (x || 0) - ((texture.width || 0) * scale) / 2;
  const adjustedY = (y || 0) - ((texture.height || 0) * scale) / 2;

  return (
    <pixiContainer
      x={adjustedX}
      y={adjustedY}
      anchor={0.5}
    >
      <pixiSprite ref={spriteRef} texture={texture} scale={scale}>
        <pixiText
          text={text}
          style={{ fontSize: 24 }}
          x={textX}
          y={textY - 6}
          anchor={0.5}
        />
      </pixiSprite>
    </pixiContainer>
  );
};

export default Button;
