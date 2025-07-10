import { Bounds, Container } from "pixi.js";

export class CollisionZone {
  constructor(public enabled: boolean, private _collisionBox: Container) {
  }
  
  hasCollided(objBounds: Bounds): boolean {
    const bounds = this._collisionBox.getBounds();
    return (
      this.enabled &&
      objBounds.x < bounds.x + bounds.width &&
      objBounds.x + objBounds.width > bounds.x &&
      objBounds.y < bounds.y + bounds.height &&
      objBounds.y + objBounds.height > bounds.y
    );
  }
}
