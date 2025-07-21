import { Container, Sprite, Texture } from "pixi.js";
import { Tile } from "../../../Components";
import tileMap from "./map.json";

export class Ship extends Container {
  public walls = new Container();
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
    });

    this._background = new Sprite(Texture.from("title-ship"));
    this._background.scale.set(3.2);
    this._background.rotation = 0.5 * Math.PI;
    this._background.anchor = 0.5;

    this._offsetContainer.addChild(this._floor);
    this._offsetContainer.addChild(this.walls);

    this.addChild(this._background);
    this.addChild(this._offsetContainer);
  }
}
