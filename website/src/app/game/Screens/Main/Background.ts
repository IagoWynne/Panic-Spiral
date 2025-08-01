import { TilingSprite, Texture } from "pixi.js";
import { SystemEvents } from "./Systems";
import { MAIN } from "../../constants";

export class Background extends TilingSprite {
  private _componentId = "game-background";
  private _moving: boolean = true;

  constructor() {
    super(Texture.from("pixelart_starfield_corona"));

    this.addListeners();
  }

  private addListeners() {
    SystemEvents.addSystemListener({
      componentId: this._componentId,
      system: MAIN.SYSTEMS.SYSTEM_IDS.ENGINE,
      systemEventType: "BREAKDOWN",
      action: () => {
        this._moving = false;
      },
    });

    SystemEvents.addSystemListener({
      componentId: this._componentId,
      system: MAIN.SYSTEMS.SYSTEM_IDS.ENGINE,
      systemEventType: "REPAIRED",
      action: () => {
        this._moving = true;
      },
    });
  }

  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public update() {
    if (this._moving) {
      this.tilePosition.x -= MAIN.BACKGROUND.BASE_MOVEMENT_RATE;
    }
  }

  public cleanup() {
    SystemEvents.removeSystemListener(
      this._componentId,
      MAIN.SYSTEMS.SYSTEM_IDS.ENGINE
    );
  }
}
