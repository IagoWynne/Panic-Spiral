"use client";

import { sound } from "@pixi/sound";
import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import AudioPlayerContext, { AudioPlayer } from "./AudioPlayerContext";
import initAudio from "./init";

const DEFAULT_GLOBAL_VOLUME = 0.5;

const SFXPlayer = ({ children }: PropsWithChildren) => {
  const globalVolume = DEFAULT_GLOBAL_VOLUME;

  useEffect(() => {
    initAudio();
  }, []);

  const playSound = (alias: string, volume?: number) => {
    sound.play(alias, { volume: (volume || 1) * globalVolume });
  };

  const sfxPlayer: AudioPlayer = useMemo(
    () => ({ play: playSound }),
    [playSound]
  );

  return (
    <AudioPlayerContext.Provider value={sfxPlayer}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default SFXPlayer;
