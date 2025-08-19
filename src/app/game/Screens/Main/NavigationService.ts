import { Bounds } from "pixi.js";
import { InteractionZone, Tile, Zone } from "../../Components";
import { System } from "./Systems";

export class NavigationService {
  private _collisionObjects: Zone[] = [];
  private _interactableObjects: InteractionZone[] = [];

  constructor(map: { tiles: Tile[]; systems: System[] }) {
    map.tiles.forEach((t: Tile) => {
      if (t.collisionZone) {
        this._collisionObjects.push(t.collisionZone);
      }
    });

    map.systems.forEach((s: System) =>
      this._interactableObjects.push(s.interactionZone)
    );
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

  public checkInteractionZones(bounds: Bounds) {
    this._interactableObjects
      .forEach((obj) => {
        const isOverlapping = this.isOverlapping(bounds, obj.getBounds());

        if (obj.playerInZone && !isOverlapping) {
          obj.onExit();
        } else if (!obj.playerInZone && isOverlapping) {
          obj.onEnter();
        }
      });
  }

  public cleanup() {
    this._collisionObjects = [];
  }
}
