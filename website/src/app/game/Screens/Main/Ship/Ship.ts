import { Container } from "pixi.js";
import { Tile } from "../../../Components";

export class Ship extends Container {
  private _floor = new Container();
  public walls = new Container();

  constructor() {
    super();

    for (let i = 0; i < 8; i++) {
      const tile = new Tile(`floor-grey-${i}`, 32 + i * 32, 32);
      this._floor.addChild(tile);
    }

    for (let i = 0; i < 7; i++) {
      const wall = new Tile(`wall-grey-${i}`, 32 + i * 32, 128, true);
      this.walls.addChild(wall);
    }

    this.walls.addChild(new Tile("wall-grey-6", 200, 200, true));

    this.addChild(this._floor);
    this.addChild(this.walls);
  }
}
