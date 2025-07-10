import { Container, Sprite, Texture } from "pixi.js";
import { CollisionZone } from "./CollisionZone";

export class Tile extends Container {
  public collisionZone?: CollisionZone;

  constructor(alias: string, x: number, y: number, collidable = false) {
    super();
    const sprite = new Sprite(Texture.from(alias));
    sprite.anchor.set(0.5);
    sprite.scale.set(0.5);

    this.x = x;
    this.y = y;

    this.addChild(sprite);

    if (collidable) {
      this.collisionZone = new CollisionZone(collidable, this);
    }
  }
}
