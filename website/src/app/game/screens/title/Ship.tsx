import { useTick } from "@pixi/react";
import { Assets, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

interface Props extends CoordinateProps {}

const Ship = ({ x, y }: Props) => {
  const spriteRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [count, setCount] = useState(0);

  useTick(() => {
    setCount(count + 0.005);
    setOffsetY(Math.sin(count) * 20);
  });

  const [texture, setTexture] = useState(Texture.EMPTY);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      setTexture(Texture.from("title-ship"));
      console.log(texture);
    }
  }, [texture]);

  return (
    <pixiContainer x={x} y={y ? y + offsetY : offsetY}>
      <pixiSprite
        ref={spriteRef}
        texture={texture}
        scale={0.5}
        rotation={0.5 * Math.PI}
      />
    </pixiContainer>
  );
};

export default Ship;
