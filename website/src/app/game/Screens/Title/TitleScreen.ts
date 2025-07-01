import { Container, Texture, Ticker, TilingSprite, Text } from "pixi.js";
import { GameScreen } from "../../Utils/ScreenManager/ScreenManager";
import { i18n, i18nKeys } from "../../Utils";
import { Ship } from "./Ship";
import { Button } from "../../UI";
import { AUDIO_FILE_ALIASES, GameAudio } from "../../Utils/audio";
import { KEY_BINDINGS } from "../../keyBindings";

export class TitleScreen extends Container implements GameScreen {
  public static SCREEN_ID = "title";
  public static assetBundles = ["title"];

  private _title: Text;
  private _background: TilingSprite;
  private _ship: Ship;
  private _startGameButton: Button;

  constructor() {
    super();

    this._background = new TilingSprite({
      texture: Texture.from("pixelart_starfield"),
    });

    this._title = new Text({
      text: i18n(i18nKeys.GAME_NAME),
      y: 40,
    });

    this._title.anchor = 0.5;
    this._title.style = {
      fill: "#fc0e1c",
      fontSize: 60,
    };

    this._ship = new Ship();

    this._startGameButton = new Button(
      "start-game-button",
      i18n(i18nKeys.START_GAME),
      KEY_BINDINGS.ACCEPT
    );

    this.addChild(this._background);
    this.addChild(this._title);
    this.addChild(this._ship.view);
    this.addChild(this._startGameButton);

    GameAudio.BGM?.play(AUDIO_FILE_ALIASES.TITLE.BGM);
  }

  public update(_: Ticker) {
    this._background.tilePosition.x = this._background.tilePosition.x - 0.2;
    this._ship.update();
  }

  public resize(width: number, height: number) {
    this._background.width = width;
    this._background.height = height;

    this._title.position.x = width / 2;

    this._ship.setPosition(width / 2, 150);

    this._startGameButton.position.x = width / 2;
    this._startGameButton.position.y = height - 100;
  }

  public addListeners() {
    this._startGameButton.addListeners();
  }

  public cleanup() {
    this._startGameButton.cleanup();
  }
}
