import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { Tile, TileGrid } from "../../../Components";
import tileMap from "./map.json";
import { System } from "../Systems/System";
import { buildSystem, Engine, SystemEvents } from "../Systems";
import { Decoration, DecorationChangeEvent } from "./Decoration";

const TILE_SIZE = 32;

export class Ship extends Container {
  public walls = new TileGrid(TILE_SIZE);
  public systems = new Container();

  private _offsetContainer = new Container();
  private _floor = new TileGrid(TILE_SIZE);
  private _decorations = new TileGrid(TILE_SIZE);
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
          true
        );

        this.walls.addTile(wall, tile.x, tile.y);
      });

      r.floors.forEach((tile) => {
        const floor = new Tile(tile.sprite, false);

        this._floor.addTile(floor, tile.x, tile.y);

        const lighting = new Graphics();
        lighting.rect(floor.x, floor.y, TILE_SIZE, TILE_SIZE);
        lighting.fill({ color: "#ff000022" });
        floorLighting.addChild(lighting);
      });

      this._floor.addChild(floorLighting);

      r.decorations?.forEach((decoration) => {
        const dec = new Decoration(
          decoration.sprite,
          decoration.x,
          decoration.y,
          decoration.changes as DecorationChangeEvent[]
        );

        this._decorations.addTile(dec, decoration.x, decoration.y);
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
