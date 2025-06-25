import { Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

interface Props extends CoordinateProps {}

const PlayerCharacter = ({ x, y }: Props) => {
  const spriteRef = useRef(null);
  const [stationaryTexture, setStationaryTexture] = useState<Texture>(
    Texture.EMPTY
  );

  useEffect(() => {
    if (stationaryTexture === Texture.EMPTY) {
      setStationaryTexture(Texture.from("player-forward-0"));
    }
  }, [stationaryTexture]);

  return (
    stationaryTexture && (
      <pixiContainer x={x || 100} y={y || 100}>
        <pixiSprite ref={spriteRef} texture={stationaryTexture} />
      </pixiContainer>
    )
  );
};

export default PlayerCharacter;
