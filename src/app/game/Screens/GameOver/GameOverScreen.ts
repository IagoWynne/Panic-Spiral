import {
  Container,
  Graphics,
  Text,
  Texture,
  Ticker,
  TilingSprite,
} from "pixi.js";
import {
  GameScreen,
  screenManager,
} from "../../Utils/ScreenManager/ScreenManager";
import { COMMON, GAME_OVER } from "../../constants";
import { i18n, i18nKeys } from "../../Utils";
import { Button } from "../../UI";
import { KEY_BINDINGS } from "../../keyBindings";
import MainScreen from "../Main";
import TitleScreen from "../Title";

interface Data {
  finalScore: number;
}

export class GameOverScreen extends Container implements GameScreen {
  public static SCREEN_ID = "game-over";
  public static assetBundles = [];

  private _background: TilingSprite;
  private _newGameButton!: Button;
  private _quitGameButton!: Button;

  constructor(data: Data) {
    super();

    this._background = new TilingSprite({
      texture: Texture.from("pixelart_starfield"),
      width: COMMON.UI.GAME_SIZE.WIDTH,
      height: COMMON.UI.GAME_SIZE.HEIGHT,
    });

    const gameOverBox = new Graphics()
      .roundRect(
        GAME_OVER.UI.GAME_OVER_BOX.MARGIN.HORIZONTAL,
        GAME_OVER.UI.GAME_OVER_BOX.MARGIN.VERTICAL,
        COMMON.UI.GAME_SIZE.WIDTH -
          2 * GAME_OVER.UI.GAME_OVER_BOX.MARGIN.HORIZONTAL,
        COMMON.UI.GAME_SIZE.HEIGHT -
          2 * GAME_OVER.UI.GAME_OVER_BOX.MARGIN.VERTICAL,
        GAME_OVER.UI.GAME_OVER_BOX.CORNER_RADIUS
      )
      .stroke({
        color: GAME_OVER.UI.GAME_OVER_BOX.STROKE_COLOUR,
        width: GAME_OVER.UI.GAME_OVER_BOX.STROKE_WIDTH,
      })
      .fill(GAME_OVER.UI.GAME_OVER_BOX.FILL);

    const gameOverContainer = this.buildUiComponents(
      gameOverBox.width,
      gameOverBox.height,
      data.finalScore
    );

    this.addChild(this._background);
    this.addChild(gameOverBox);
    this.addChild(gameOverContainer);
  }

  public show() {
    this._newGameButton.prepare();
    this._quitGameButton.prepare();
    return Promise.resolve();
  }

  private buildUiComponents(
    width: number,
    height: number,
    finalScore: number
  ): Container {
    const gameOverContainer = new Container({
      x: GAME_OVER.UI.GAME_OVER_BOX.MARGIN.HORIZONTAL,
      y: GAME_OVER.UI.GAME_OVER_BOX.MARGIN.VERTICAL,
    });

    const gameOverText = new Text({
      text: i18n(i18nKeys.GAME_OVER),
      style: {
        fontSize: GAME_OVER.UI.GAME_OVER_TEXT.FONT_SIZE,
        fill: GAME_OVER.UI.GAME_OVER_TEXT.COLOUR,
      },
      y: GAME_OVER.UI.GAME_OVER_TEXT.MARGIN.TOP,
      x: width / 2,
      anchor: 0.5,
    });

    gameOverContainer.addChild(gameOverText);

    const finalScoreLabel = new Text({
      text: i18n(i18nKeys.FINAL_SCORE),
      style: { fontSize: GAME_OVER.UI.FINAL_SCORE_LABEL.FONT_SIZE },
      y:
        gameOverText.y +
        gameOverText.height +
        GAME_OVER.UI.FINAL_SCORE_LABEL.MARGIN.TOP,
      x: width / 2,
      anchor: 0.5,
    });

    gameOverContainer.addChild(finalScoreLabel);

    const finalScoreText = new Text({
      text: finalScore,
      style: { fontSize: GAME_OVER.UI.FINAL_SCORE_TEXT.FONT_SIZE },
      y:
        finalScoreLabel.y +
        finalScoreLabel.height +
        GAME_OVER.UI.FINAL_SCORE_TEXT.MARGIN.TOP,
      x: width / 2,
      anchor: 0.5,
    });

    gameOverContainer.addChild(finalScoreText);

    const buttonsContainer = this.buildButtonsContainer(width, height);

    gameOverContainer.addChild(buttonsContainer);

    return gameOverContainer;
  }

  private buildButtonsContainer(width: number, height: number): Container {
    const buttonsContainer = new Container();

    this._newGameButton = new Button(
      "new-game",
      i18n(i18nKeys.NEW_GAME),
      KEY_BINDINGS.UI.ACCEPT,
      () => screenManager.changeScreen(MainScreen)
    );

    this._quitGameButton = new Button(
      "quit-game",
      i18n(i18nKeys.QUIT),
      KEY_BINDINGS.UI.CANCEL,
      () => screenManager.changeScreen(TitleScreen)
    );

    this._quitGameButton.y =
      this._newGameButton.y +
      this._newGameButton.height +
      GAME_OVER.UI.NEW_GAME_BUTTON.MARGIN.BOTTOM;

    buttonsContainer.addChild(this._newGameButton);
    buttonsContainer.addChild(this._quitGameButton);

    buttonsContainer.x = (width) / 2;
    buttonsContainer.y =
      height -
      buttonsContainer.height -
      GAME_OVER.UI.BUTTONS_CONTAINER.MARGIN.BOTTOM;

    return buttonsContainer;
  }

  public update(_: Ticker) {
    this._background.tilePosition.x = this._background.tilePosition.x - 0.1;
  }

  public cleanup() {
    this._newGameButton.cleanup();
    this._quitGameButton.cleanup();
  }
}
