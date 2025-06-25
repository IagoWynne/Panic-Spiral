import { useTick } from "@pixi/react";
import { Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Exhaust from "./Exhaust";

interface Props extends CoordinateProps {}

const Ship = ({ x, y }: Props) => {
  const spriteRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [count, setCount] = useState(0);
  const [texture, setTexture] = useState(Texture.EMPTY);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      setTexture(Texture.from("title-ship"));
    }
  }, [texture]);

  useTick(() => {
    setCount(count + 0.005);
    setOffsetY(Math.sin(count) * 20);
  });

  return (
    <pixiContainer x={x ? x + 60 : 60} y={y ? y + offsetY : offsetY}>
      <Exhaust x={-150} y={83}/>
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
