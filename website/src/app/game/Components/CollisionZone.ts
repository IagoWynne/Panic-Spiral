import { Bounds, Container } from "pixi.js";

export class CollisionZone {
  constructor(public enabled: boolean, private _collisionBox: Container) {
  }

  public getBounds() {
    return this._collisionBox.getBounds();
  }
}
