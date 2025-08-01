import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { ShipExhaust, Tile, TileGrid } from "../../../Components";
import tileMap from "./map.json";
import { buildSystem, SystemEvents } from "../Systems";
import { Decoration, DecorationChangeEvent } from "./Decoration";
import { GRID_OFFSET } from "../../../constants/Map";
import { MAIN } from "../../../constants";
import { SYSTEM_IDS } from "@/app/game/constants/Systems";

export class Ship extends Container {
  public walls = new TileGrid(MAIN.SHIP.TILE_SIZE);
  public systems = new Container();

  private _offsetContainer = new Container();
  private _floor = new TileGrid(MAIN.SHIP.TILE_SIZE);
  private _decorations = new TileGrid(MAIN.SHIP.TILE_SIZE);
  private _background: Sprite;
  private _exhaust: ShipExhaust;
  private _componentId = "main-screen-ship";

  constructor() {
    super();

    this._offsetContainer.x = GRID_OFFSET.X;
    this._offsetContainer.y = GRID_OFFSET.Y;

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
        const wall = new Tile(tile.sprite, true);

        this.walls.addTile(wall, tile.x, tile.y);
      });

      r.floors.forEach((tile) => {
        const floor = new Tile(tile.sprite, false);

        this._floor.addTile(floor, tile.x, tile.y);

        const lighting = new Graphics();
        lighting.rect(
          floor.x,
          floor.y,
          MAIN.SHIP.TILE_SIZE,
          MAIN.SHIP.TILE_SIZE
        );
        lighting.fill({ color: MAIN.SHIP.EMERGENCY_LIGHTING_COLOUR });
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
        const system = buildSystem(s, MAIN.SHIP.TILE_SIZE);

        if (system) {
          system.x = s.position.x * MAIN.SHIP.TILE_SIZE;
          system.y = s.position.y * MAIN.SHIP.TILE_SIZE;

          this.systems.addChild(system);
        }
      });
    });

    this._background = new Sprite(Texture.from("title-ship"));
    this._background.scale.set(MAIN.SHIP.SCALE);
    this._background.rotation = 0.5 * Math.PI;
    this._background.anchor = 0.5;

    this._exhaust = new ShipExhaust(MAIN.SHIP.EXHAUST_SCALE);
    this._exhaust.x = MAIN.SHIP.EXHAUST_POSITION.X;
    this._exhaust.y = MAIN.SHIP.EXHAUST_POSITION.Y;

    this._offsetContainer.addChild(this._floor);
    this._offsetContainer.addChild(this.walls);
    this._offsetContainer.addChild(this._decorations);
    this._offsetContainer.addChild(this.systems);

    this.addChild(this._exhaust);
    this.addChild(this._background);
    this.addChild(this._offsetContainer);

    this.addListeners();
  }

  private addListeners() {
    SystemEvents.addSystemListener({
      componentId: this._componentId,
      system: SYSTEM_IDS.ENGINE,
      systemEventType: "BREAKDOWN",
      action: () => {
        this._exhaust.visible = false;
      },
    });

    SystemEvents.addSystemListener({
      componentId: this._componentId,
      system: SYSTEM_IDS.ENGINE,
      systemEventType: "REPAIRED",
      action: () => {
        this._exhaust.visible = true;
      },
    });
  }

  cleanup() {
    SystemEvents.removeSystemListener(this._componentId, SYSTEM_IDS.ENGINE);
  }
}
