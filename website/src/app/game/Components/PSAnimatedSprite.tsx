import { PixiReactElementProps } from "@pixi/react";
import { AnimatedSprite, Container, Texture } from "pixi.js";
import { useEffect, useRef } from "react";

interface Props {
  frames: Texture[];
  anchor?: number;
  animationSpeed?: number;
  loop?: boolean;
  scale?: number;
  rotation?: number;
}

const PSAnimatedSprite = ({ frames, anchor = 0.5, animationSpeed = 1, loop = true, scale = 1, rotation = 0 }: Props) => {
  const containerRef = useRef<Container>(null);
  const animatedSpriteRef = useRef<AnimatedSprite | null>(null);

  useEffect(() => {
    const animationContainer = containerRef.current;

    if (!animationContainer || !frames || !frames.length) {
      return;
    }
    
    const sprite = new AnimatedSprite(frames);
    sprite.anchor.set(anchor);
    sprite.animationSpeed = animationSpeed;
    sprite.loop = loop;
    sprite.scale = scale;
    sprite.rotation = rotation;
    sprite.play();

    animatedSpriteRef.current = sprite;
    animationContainer.addChild(sprite);

    return () => {
      if (animationContainer && animatedSpriteRef.current) {
        animationContainer.removeChild(animatedSpriteRef.current);
        animatedSpriteRef.current.destroy();
        animatedSpriteRef.current = null;
      }
    };
  }, []);

  return <pixiContainer ref={containerRef}></pixiContainer>;
};

export default PSAnimatedSprite;
