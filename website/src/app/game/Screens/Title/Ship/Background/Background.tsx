import { useApplication, useTick } from "@pixi/react";
import { Texture } from "pixi.js";
import { useEffect, useState } from "react";

const Background = () => {
  const { app } = useApplication();
  const [texture, setTexture] = useState(Texture.EMPTY);
  const [tilePosition, setTilePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      setTexture(Texture.from("pixelart_starfield"));
    }
  });

  useTick(() => {
    setTilePosition({ ...tilePosition, x: tilePosition.x - 0.2 });
  });

  return (
    <pixiTilingSprite
      texture={texture}
      tilePosition={tilePosition}
      width={app.screen.width}
      height={app.screen.height}
    />
  );
};

export default Background;
