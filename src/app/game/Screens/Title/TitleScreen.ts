import { Container, Texture, Ticker, TilingSprite, Text } from "pixi.js";
import {
  GameScreen,
  screenManager,
} from "../../Utils/ScreenManager/ScreenManager";
import { i18n, i18nKeys } from "../../Utils";
import { Ship } from "./Ship";
import { Button } from "../../UI";
import { AUDIO_FILE_ALIASES, GameAudio } from "../../Utils/audio";
import { KEY_BINDINGS } from "../../keyBindings";
import MainScreen from "../Main";
import InstructionsScreen from "../Instructions";
import { COMMON, TITLE } from "../../constants";

export class TitleScreen extends Container implements GameScreen {
  public static SCREEN_ID = "title";
  public static assetBundles = ["title"];

  private _title: Text;
  private _background: TilingSprite;
  private _ship: Ship;
  private _startGameButton: Button;
  private _controlsButton: Button;

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
      KEY_BINDINGS.UI.ACCEPT,
      () => screenManager.changeScreen(MainScreen)
    );

    this._controlsButton = new Button(
      "controls-button",
      i18n(i18nKeys.CONTROLS),
      KEY_BINDINGS.UI.HELP,
      () => screenManager.changeScreen(InstructionsScreen)
    );

    this._controlsButton.x = COMMON.UI.GAME_SIZE.WIDTH / 2;
    this._controlsButton.y =
      COMMON.UI.GAME_SIZE.HEIGHT - TITLE.UI.CONTROLS_BUTTON.MARGIN.BOTTOM;

    this._startGameButton.position.x = COMMON.UI.GAME_SIZE.WIDTH / 2;
    this._startGameButton.position.y =
      this._controlsButton.y -
      this._startGameButton.height -
      TITLE.UI.START_BUTTON.MARGIN.BOTTOM;

    this.addChild(this._background);
    this.addChild(this._title);
    this.addChild(this._ship.view);
    this.addChild(this._startGameButton);
    this.addChild(this._controlsButton);

    GameAudio.BGM?.play(AUDIO_FILE_ALIASES.TITLE.BGM);
  }

  public show() {
    this._startGameButton.prepare();
    this._controlsButton.prepare();

    return Promise.resolve();
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
  }

  public cleanup() {
    this._startGameButton.cleanup();
  }
}
