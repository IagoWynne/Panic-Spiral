import { createContext } from "react";

export interface AudioPlayer {
  play(alias: string, volume?: number): void;
}

const SFXPlayerContext = createContext<AudioPlayer>({ play: (_, __) => {} });
const BGMPlayerContext = createContext<AudioPlayer>({ play: (_, __) => {} });

export { SFXPlayerContext, BGMPlayerContext };
