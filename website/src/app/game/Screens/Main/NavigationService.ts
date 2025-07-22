import { Bounds } from "pixi.js";
import { Tile, CollisionZone } from "../../Components";

export class NavigationService {
  private _collisionObjects: CollisionZone[];

  constructor(map: Tile[]) {
    this._collisionObjects = map.reduce((acc: CollisionZone[], t: Tile) => {
      if (t.collisionZone) {
        acc.push(t.collisionZone);
      }

      return acc;
    }, []);
  }

  public collides(bounds: Bounds): boolean {
    return this._collisionObjects
      .filter((obj) => obj.enabled)
      .some((obj) => this.isOverlapping(bounds, obj.getBounds()));
  }

  private isOverlapping(boundsA: Bounds, boundsB: Bounds) {
    return (
      boundsA.x < boundsB.x + boundsB.width &&
      boundsA.x + boundsA.width > boundsB.x &&
      boundsA.y < boundsB.y + boundsB.height &&
      boundsA.y + boundsA.height > boundsB.y
    );
  }

  public cleanup() {
    this._collisionObjects = [];
  }
}
