import { Container, Texture, Ticker, TilingSprite } from "pixi.js";
import { GameScreen } from "../../Utils/ScreenManager/ScreenManager";
import PlayerCharacter from "./PlayerCharacter";
import Ship from "./Ship";
import { Tile } from "../../Components";
import { NavigationService } from "./NavigationService";
import { System, SystemEvents, SystemsManager } from "./Systems";
import { SYSTEM_IDS } from "../../constants/Systems";
import { GameUI } from "./UI";
import { AUDIO_FILE_ALIASES, GameAudio } from "../../Utils/audio";

export class MainScreen extends Container implements GameScreen {
  public static SCREEN_ID = "main";
  public static assetBundles = ["main"];

  private _playerCharacter: PlayerCharacter;
  private _ship: Ship;
  private _background: TilingSprite;
  private _navigationService: NavigationService;
  private _systemsManager: SystemsManager;
  private _ui: GameUI;

  constructor() {
    super();

    this._background = new TilingSprite({
      texture: Texture.from("pixelart_starfield_corona"),
    });

    this._ship = new Ship();
    const systems = this._ship.systems.children as System[];
    this._navigationService = new NavigationService({
      tiles: this._ship.walls.children as Tile[],
      systems,
    });

    this._systemsManager = new SystemsManager(systems);

    this._playerCharacter = new PlayerCharacter(this._navigationService);
    this._playerCharacter.x = 900;
    this._playerCharacter.y = 400;

    this._ui = new GameUI();

    this.addChild(this._background);
    this.addChild(this._ship);
    this.addChild(this._playerCharacter);
    this.addChild(this._ui);

    GameAudio.BGM?.play(AUDIO_FILE_ALIASES.MAIN.BGM);
  }

  public resize(width: number, height: number) {
    this._background.width = width;
    this._background.height = height;

    this._ship.x = width / 2;
    this._ship.y = height / 2;

    this._ui.resize(width, height);
  }

  public addListeners() {
    this._playerCharacter.addListeners();
  }

  public update(ticker: Ticker) {
    this._playerCharacter.update(ticker);
    this._systemsManager.onUpdate(ticker.deltaMS);
  }

  public cleanup() {
    this._playerCharacter.cleanup();
    this._navigationService.cleanup();
    this._ship.cleanup();
    SystemEvents.release();
    this.destroy({ children: true });
  }
}
