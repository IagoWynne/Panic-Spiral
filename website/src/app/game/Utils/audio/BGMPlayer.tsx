"use client";

import { sound, Sound } from "@pixi/sound";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { initBgm } from "./init";
import { BGMPlayerContext, AudioPlayer } from "./AudioPlayerContext";
import gsap from "gsap";

const DEFAULT_GLOBAL_VOLUME = 0.05;

const BGMPlayer = ({ children }: PropsWithChildren) => {
  const [currentAlias, setCurrentAlias] = useState("");
  const [current, setCurrent] = useState<Sound | null>(null);

  const globalVolume = DEFAULT_GLOBAL_VOLUME;

  useEffect(() => {
    initBgm();

    return () => {
      if (current) {
        gsap.killTweensOf(current);
        current.stop();
      }
    };
  }, []);

  const playTrack = async (alias: string, volume?: number) => {
    if (alias === currentAlias) {
      return;
    }

    if (current) {
      gsap.killTweensOf(current);
      await gsap.to(current, { volume: 0, duration: 1, ease: "linear" });
      current.stop();
    }

    const newTrack = sound.find(alias);

    if (!newTrack) {
      console.warn(`Track with ${alias} not found.`);
      setCurrent(null);
      setCurrentAlias("");
      return;
    }

    newTrack.volume = 0;
    newTrack.play({ loop: true });

    await gsap.to(newTrack, {
      volume: (volume || 1) * globalVolume,
      duration: 1,
      ease: "linear",
    });

    setCurrent(newTrack);
    setCurrentAlias(alias);
  };

  const bgmPlayer: AudioPlayer = useMemo(
    () => ({ play: playTrack }),
    [playTrack]
  );

  return (
    <BGMPlayerContext.Provider value={bgmPlayer}>
      {children}
    </BGMPlayerContext.Provider>
  );
};

export default BGMPlayer;
