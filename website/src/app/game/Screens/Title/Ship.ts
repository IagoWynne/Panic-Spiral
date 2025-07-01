import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { ShipExhaust } from "./ShipExhaust";

export class Ship {
  public view = new Container();

  private _count = 0;
  private _y = 0;
  private _offsetY = 0;

  private _sprite: Sprite;

  constructor() {
    const exhaust = new ShipExhaust();
    exhaust.position = { x: -150, y: 83 };

    this._sprite = new Sprite(Texture.from("title-ship"));
    this._sprite.scale = 0.5;
    this._sprite.rotation = 0.5 * Math.PI;

    this.view.addChild(exhaust);
    this.view.addChild(this._sprite);
  }

  public setPosition(x: number, y: number) {
    this.view.position.x = x + this._sprite.width / 2;
    this._y = y + this._sprite.height / 2;
    this.view.position.y = this._y + this._offsetY;
  }

  public update() {
    this._count += 0.005;
    this._offsetY = Math.sin(this._count) * 20;
    this.view.position.y = this._y + this._offsetY;
  }
}
