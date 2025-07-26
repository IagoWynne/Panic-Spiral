import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { Tile } from "../../../Components";
import tileMap from "./map.json";
import { System } from "../Systems/System";
import { buildSystem, Engine, SystemEvents } from "../Systems";
import { Decoration, DecorationChangeEvent } from "./Decoration";

const TILE_SIZE = 32;

export class Ship extends Container {
  public walls = new Container();
  public systems = new Container();

  private _offsetContainer = new Container();
  private _floor = new Container();
  private _decorations = new Container();
  private _background;
  private _componentId = "main-screen-ship";

  constructor() {
    super();

    this._offsetContainer.x = -400;
    this._offsetContainer.y = -272;

    tileMap.rooms.forEach((r) => {
      const floorLighting = new Container();
      floorLighting.visible = false;

      SystemEvents.addSystemListener({
        componentId: this._componentId,
        system: r.name,
        systemEventType: "BREAKDOWN",
        action: () => (floorLighting.visible = true),
      });

      SystemEvents.addSystemListener({
        componentId: this._componentId,
        system: r.name,
        systemEventType: "REPAIRED",
        action: () => (floorLighting.visible = false),
      });

      r.walls.forEach((tile) => {
        const wall = new Tile(
          tile.sprite,
          tile.x * TILE_SIZE,
          tile.y * TILE_SIZE,
          true
        );

        this.walls.addChild(wall);
      });

      r.floors.forEach((tile) => {
        const x = tile.x * TILE_SIZE;
        const y = tile.y * TILE_SIZE;

        const floor = new Tile(tile.sprite, x, y, false);

        this._floor.addChild(floor);

        const lighting = new Graphics();
        lighting.rect(x, y, TILE_SIZE, TILE_SIZE);
        lighting.fill({ color: "#ff000022" });
        floorLighting.addChild(lighting);
      });

      this._floor.addChild(floorLighting);

      r.decorations?.forEach((decoration) => {
        const dec = new Decoration(
          decoration.sprite,
          decoration.x * TILE_SIZE,
          decoration.y * TILE_SIZE,
          decoration.changes as DecorationChangeEvent[]
        );

        this._decorations.addChild(dec);
      });

      r.systems?.forEach((s) => {
        const system = buildSystem(s, TILE_SIZE);

        if (system) {
          system.x = s.position.x * TILE_SIZE;
          system.y = s.position.y * TILE_SIZE;

          this.systems.addChild(system);
        }
      });
    });

    this._background = new Sprite(Texture.from("title-ship"));
    this._background.scale.set(3.2);
    this._background.rotation = 0.5 * Math.PI;
    this._background.anchor = 0.5;

    this._offsetContainer.addChild(this._floor);
    this._offsetContainer.addChild(this.systems);
    this._offsetContainer.addChild(this.walls);
    this._offsetContainer.addChild(this._decorations);

    this.addChild(this._background);
    this.addChild(this._offsetContainer);
  }
}
