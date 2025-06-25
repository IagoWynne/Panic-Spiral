"use client";

import { sound } from "@pixi/sound";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { SFXPlayerContext, AudioPlayer } from "./AudioPlayerContext";
import { initSfx } from "./init";

const DEFAULT_GLOBAL_VOLUME = 0.5;

const SFXPlayer = ({ children }: PropsWithChildren) => {
  const globalVolume = DEFAULT_GLOBAL_VOLUME;

  useEffect(() => {
    initSfx();
  }, []);

  const playSound = (alias: string, volume?: number) => {
    sound.play(alias, { volume: (volume || 1) * globalVolume });
  };

  const sfxPlayer: AudioPlayer = useMemo(
    () => ({ play: playSound }),
    [playSound]
  );

  return (
    <SFXPlayerContext.Provider value={sfxPlayer}>
      {children}
    </SFXPlayerContext.Provider>
  );
};

export default SFXPlayer;
