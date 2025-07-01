import { BGMPlayer } from "./BGMPlayer";
import { SFXPlayer } from "./SFXPlayer";

export const GameAudio: { SFX?: SFXPlayer | null; BGM?: BGMPlayer | null } = {
  SFX: null,
  BGM: null,
};
