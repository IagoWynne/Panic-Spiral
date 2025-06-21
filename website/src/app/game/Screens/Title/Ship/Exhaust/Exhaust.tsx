import { PixiReactElementProps } from "@pixi/react";
import { AnimatedSprite, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { PSAnimatedSprite } from "../../../../Components";

interface Props extends CoordinateProps {}

const Exhaust = ({ x, y }: Props) => {
  const ref = useRef<AnimatedSprite>(null);
  const [frames, setFrames] = useState<Texture[]>([]);

  useEffect(() => {
    if (frames.length === 0) {
      const textures: Texture[] = [];

      for (let i = 1; i < 15; i++) {
        textures.push(Texture.from(`fire_${i}`));
      }

      setFrames(textures);
    }
  }, [frames]);

  useEffect(() => {
    if (frames.length > 0) {
      ref.current?.play();
    }
  }, [frames, ref]);

  return (
    frames.length > 0 && (
      <pixiContainer x={x} y={y}>
        <PSAnimatedSprite
          frames={frames}
          animationSpeed={0.5}
          loop
          scale={2}
          rotation={-0.5 * Math.PI}
        />
      </pixiContainer>
    )
  );
};

export default Exhaust;
