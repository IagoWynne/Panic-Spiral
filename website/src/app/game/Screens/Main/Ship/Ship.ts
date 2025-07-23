import { Container, Sprite, Texture } from "pixi.js";
import { Tile } from "../../../Components";
import tileMap from "./map.json";
import { System } from "./System";

export class Ship extends Container {
  public walls = new Container();
  public systems = new Container();
  private _offsetContainer = new Container();
  private _floor = new Container();
  private _background;

  constructor() {
    super();

    this._offsetContainer.x = -400;
    this._offsetContainer.y = -272;

    tileMap.rooms.forEach((r) => {
      r.walls.forEach((tile) => {
        const wall = new Tile(tile.sprite, tile.x * 32, tile.y * 32, true);
        this.walls.addChild(wall);
      });

      r.floors.forEach((tile) => {
        const floor = new Tile(tile.sprite, tile.x * 32, tile.y * 32, false);
        this._floor.addChild(floor);
      });

      r.systems?.forEach((s) => {
        const system = new System(
          s.name,
          32,
          s.interactionZone.x,
          s.interactionZone.y
        );
        system.x = s.position.x * 32;
        system.y = s.position.y * 32;

        this.systems.addChild(system);
      });
    });

    this._background = new Sprite(Texture.from("title-ship"));
    this._background.scale.set(3.2);
    this._background.rotation = 0.5 * Math.PI;
    this._background.anchor = 0.5;

    this._offsetContainer.addChild(this._floor);
    this._offsetContainer.addChild(this.systems);
    this._offsetContainer.addChild(this.walls);

    this.addChild(this._background);
    this.addChild(this._offsetContainer);
  }
}
