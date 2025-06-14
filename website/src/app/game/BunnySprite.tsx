import { Assets, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

const BunnySprite = () => {
  // ref for the pixi.js sprite
  const spriteRef = useRef(null);

  const [texture, setTexture] = useState(Texture.EMPTY);
  const [isHovered, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // preloads the sprite if it hasn't been loaded yet
  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load<Texture>("https://pixijs.com/assets/bunny.png").then(
        (result) => {
          setTexture(result);
        }
      );
    }
  }, [texture]);

  return (
    <pixiSprite
      ref={spriteRef}
      anchor={0.5}
      eventMode={"static"}
      onClick={() => setIsActive(!isActive)}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      scale={isActive || isHovered ? 1 : 1.5}
      texture={texture}
      x={100}
      y={100}
    />
  );
};

export default BunnySprite;