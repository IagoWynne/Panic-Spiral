import { createContext } from "react";

export interface AudioPlayer {
  play(alias: string, volume?: number): void;
}

const AudioPlayerContext = createContext<AudioPlayer>({ play: (_, __) => {} });

export default AudioPlayerContext;
