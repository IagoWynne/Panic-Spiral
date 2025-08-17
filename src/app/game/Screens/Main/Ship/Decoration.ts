import { Sprite, Texture } from "pixi.js";
import { Tile } from "../../../Components";
import { SystemEvents } from "../Systems";
import { SystemEventType } from "../Systems/types";

export interface DecorationChangeEvent {
  event: SystemEventType;
  system: string;
  sprite: string | null;
}

export class Decoration extends Tile {
  private _id: string;
  private _sprites: { [key: string]: Sprite } = {};
  private _currentSprite: Sprite;

  constructor(
    alias: string,
    x: number,
    y: number,
    changes: DecorationChangeEvent[]
  ) {
    super(alias);
    this._currentSprite = this._sprite;

    this._id = `${alias}_${x}_${y}`;

    changes.forEach((c: DecorationChangeEvent) => {
      SystemEvents.addSystemListener({
        componentId: this._id,
        system: c.system,
        systemEventType: c.event,
        action: () => this.changeSprite(c.sprite),
      });
    });
  }

  private changeSprite(alias: string | null) {
    let sprite: Sprite;

    if (!alias) {
      sprite = this._sprite;
    } else if (this._sprites[alias]) {
      sprite = this._sprites[alias];
    } else {
      sprite = new Sprite(Texture.from(alias));
      sprite.scale = this._sprite.scale;
      this._sprites[alias] = sprite;
      this.addChild(sprite);
    }

    this._currentSprite.visible = false;
    sprite.visible = true;
    this._currentSprite = sprite;
  }
}
