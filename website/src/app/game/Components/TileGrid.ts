import { Container } from "pixi.js";

export class TileGrid extends Container {
  constructor(private tileSize: number) {
    super();
  }

  public addTile(tile: Container, x: number, y: number) {
    tile.x = x * this.tileSize;
    tile.y = y * this.tileSize;
    this.addChild(tile);
  }
}
