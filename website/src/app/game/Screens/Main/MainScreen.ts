import { Container, Ticker } from "pixi.js";
import { GameScreen } from "../../Utils/ScreenManager/ScreenManager";
import PlayerCharacter from "./PlayerCharacter";
import Ship from "./Ship";

export class MainScreen extends Container implements GameScreen {
  public static SCREEN_ID = "main";
  public static assetBundles = ["main"];

  private _playerCharacter: PlayerCharacter;
  private _ship: Ship;

  constructor() {
    super();

    this._ship = new Ship();

    this._playerCharacter = new PlayerCharacter();
    this._playerCharacter.x = 100;
    this._playerCharacter.y = 100;

    this.addChild(this._ship);
    this.addChild(this._playerCharacter);
  }

  public addListeners() {
    this._playerCharacter.addListeners();
  }

  public update(ticker: Ticker) {
    this._playerCharacter.update(ticker);
  }

  public cleanup() {
    this._playerCharacter.cleanup();
    this.destroy({ children: true });
  }
}
