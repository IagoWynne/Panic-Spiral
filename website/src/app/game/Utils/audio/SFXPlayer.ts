import { sound } from "@pixi/sound";
import { initSfx } from "./init";
import { AUDIO } from "../../constants/Audio";

export class SFXPlayer {
  private _globalVolume = 0.5;

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
      volume: (volume || 1) * this._globalVolume * AUDIO.SFX_VOLUME_MULTIPLIER,
    });
  }
}
