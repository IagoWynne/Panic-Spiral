"use client";

import { sound } from "@pixi/sound";
import { PropsWithChildren, useEffect } from "react";
import AudioPlayerContext, { AudioPlayer } from "./AudioPlayerContext";

const SFXPlayer = ({ children }: PropsWithChildren) => {
  const globalVolume = 0.5;

  const addSound = (alias: string, filePath: string) => {
    if (!sound.exists(alias)) {
      sound.add(alias, filePath);
    }
  };

  useEffect(() => {
    addSound("button-hover", "/audio/ui/button-hover.wav");
    addSound("button-click", "/audio/ui/button-click.wav");
  }, []);

  const playSound = (alias: string, volume?: number) => {
    sound.play(alias, { volume: (volume || 1) * globalVolume });
  };

  const sfxPlayer: AudioPlayer = { play: playSound };

  return <AudioPlayerContext value={sfxPlayer}>{children}</AudioPlayerContext>;
};

export default SFXPlayer;
