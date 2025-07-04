import { Container } from "pixi.js";
import { Tile } from "../../../Components";

export class Ship extends Container {
  constructor() {
    super();

    for (let i = 0; i < 8; i++) {
      const tile = new Tile(`floor-grey-${i}`, 32 + i * 32, 32, 0.5);
      this.addChild(tile);
    }
  }
}
