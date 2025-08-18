import { Container, Text, Ticker } from "pixi.js";
import { GameScreen } from "../../Utils/ScreenManager/ScreenManager";

export class GameOverScreen extends Container implements GameScreen {
  public static SCREEN_ID = "game-over";
  public static assetBundles = [];

  constructor() {
    super();

    this.addChild(new Text({ text: "Game Over" }));
  }

  resize(width: number, height: number) {}
  public cleanup() {}
}
