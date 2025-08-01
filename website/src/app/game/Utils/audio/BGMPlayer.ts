import { sound, Sound } from "@pixi/sound";
import { initBgm } from "./init";
import gsap from "gsap";
import { COMMON } from "../../constants";

export class BGMPlayer {
  private _globalVolume = COMMON.AUDIO.DEFAULT_BGM_VOLUME;

  private _currentAlias?: string;
  private _current?: Sound | null;

  constructor() {
    initBgm();
  }

  public setVolume(volume: number): void {
    this._globalVolume = volume;
  }

  public getVolume(): number {
    return this._globalVolume;
  }

  public async play(alias: string, volume?: number) {
    if (alias === this._currentAlias) {
      return;
    }

    await this.stop();

    const newTrack = sound.find(alias);

    if (!newTrack) {
      console.warn(`Track with alias '${alias}' not found.`);
      return;
    }

    newTrack.volume = 0;
    newTrack.play({ loop: true });

    await gsap.to(newTrack, {
      volume:
        (volume || 1) * this._globalVolume * COMMON.AUDIO.BGM_VOLUME_MULTIPLIER,
      duration: 1,
      ease: "linear",
    });

    this._current = newTrack;
    this._currentAlias = alias;
  }

  public async stop() {
    if (this._current) {
      gsap.killTweensOf(this._current);
      await gsap.to(this._current, { volume: 0, duration: 1, ease: "linear" });
      this._current.stop();

      this._current = null;
      this._currentAlias = "";
    }
  }
}
