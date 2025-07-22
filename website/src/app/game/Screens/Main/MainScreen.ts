import { Container, Texture, Ticker, TilingSprite } from "pixi.js";
import { GameScreen } from "../../Utils/ScreenManager/ScreenManager";
import PlayerCharacter from "./PlayerCharacter";
import Ship from "./Ship";
import { Tile } from "../../Components";
import { NavigationService } from "./NavigationService";

export class MainScreen extends Container implements GameScreen {
  public static SCREEN_ID = "main";
  public static assetBundles = ["main"];

  private _playerCharacter: PlayerCharacter;
  private _ship: Ship;
  private _background: TilingSprite;
  private _navigationService: NavigationService;

  constructor() {
    super();

    this._background = new TilingSprite({
      texture: Texture.from("pixelart_starfield_corona"),
    });

    this._ship = new Ship();
    this._navigationService = new NavigationService(this._ship.walls.children as Tile[]);

    this._playerCharacter = new PlayerCharacter(
      this._navigationService
    );
    this._playerCharacter.x = 900;
    this._playerCharacter.y = 400;

    this.addChild(this._background);
    this.addChild(this._ship);
    this.addChild(this._playerCharacter);
  }

  public resize(width: number, height: number) {
    this._background.width = width;
    this._background.height = height;

    this._ship.x = width / 2;
    this._ship.y = height / 2;
  }

  public addListeners() {
    this._playerCharacter.addListeners();
  }

  public update(ticker: Ticker) {
    this._playerCharacter.update(ticker);
  }

  public cleanup() {
    this._playerCharacter.cleanup();
    this._navigationService.cleanup();
    this.destroy({ children: true });
  }
}
