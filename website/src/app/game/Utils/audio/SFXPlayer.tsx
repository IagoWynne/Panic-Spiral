"use client";

import { sound } from "@pixi/sound";
import { PropsWithChildren, useEffect } from "react";
import AudioPlayerContext, { AudioPlayer } from "./AudioPlayerContext";
import initAudio from "./init";

const SFXPlayer = ({ children }: PropsWithChildren) => {
  const globalVolume = 0.5;

  useEffect(() => {
    initAudio();
  }, []);

  const playSound = (alias: string, volume?: number) => {
    sound.play(alias, { volume: (volume || 1) * globalVolume });
  };

  const sfxPlayer: AudioPlayer = { play: playSound };

  return <AudioPlayerContext value={sfxPlayer}>{children}</AudioPlayerContext>;
};

export default SFXPlayer;
