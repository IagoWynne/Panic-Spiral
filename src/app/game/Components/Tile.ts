import { Container, Sprite, Texture } from "pixi.js";
import { Zone } from "./Zone";

export class Tile extends Container {
  public collisionZone?: Zone;
  protected _sprite: Sprite;

  constructor(
    alias: string,
    collidable = false,
  ) {
    super();
    this._sprite = new Sprite(Texture.from(alias));
    this._sprite.scale.set(0.5);

    this.addChild(this._sprite);

    if (collidable) {
      this.collisionZone = new Zone(collidable, this);
    }
  }

  setAnchor(anchor: number) {
    this._sprite.anchor.set(anchor);
  }

  setScale(scale: number) {
    this._sprite.scale.set(scale);
  }
}
