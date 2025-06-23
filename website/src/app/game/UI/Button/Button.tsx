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

  const adjustedX = (x || 0) - ((texture.width || 0) * scale) / 2;
  const adjustedY = (y || 0) - ((texture.height || 0) * scale) / 2;

  return (
    <pixiContainer
      x={adjustedX}
      y={adjustedY}
      anchor={0.5}
      eventMode="static"
      cursor="pointer"
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <pixiSprite ref={spriteRef} texture={texture} scale={scale}>
        {isHovered && (
          <pixiGraphics
            draw={(graphics) => {
              graphics.clear();
              graphics.setFillStyle({ color: "#ffffff11" });
              graphics.rect(15, 20, texture.width-30, 50);
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
