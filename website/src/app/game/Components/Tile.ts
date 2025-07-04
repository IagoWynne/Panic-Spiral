import { Container, Sprite, Texture } from "pixi.js";

export class Tile extends Container {
  constructor(alias: string, x: number, y: number, scale: number = 1) {
    super();

    const sprite = new Sprite(Texture.from(alias));
    sprite.anchor.set(0.5);
    sprite.scale.set(scale);

    this.x = x;
    this.y = y;

    this.addChild(sprite);
  }
}
