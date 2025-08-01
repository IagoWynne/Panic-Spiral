import { sound } from "@pixi/sound";
import { initSfx } from "./init";
import { COMMON } from "../../constants";

export class SFXPlayer {
  private _globalVolume = COMMON.AUDIO.DEFAULT_SFX_VOLUME;

  constructor() {
    initSfx();
  }

  public setVolume(volume: number): void {
    this._globalVolume = volume;
  }

  public getVolume(): number {
    return this._globalVolume;
  }

  public play(alias: string, volume?: number) {
    sound.play(alias, {
      volume:
        (volume || 1) * this._globalVolume * COMMON.AUDIO.SFX_VOLUME_MULTIPLIER,
    });
  }
}
