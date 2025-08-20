import {
  Container,
  Graphics,
  Point,
  Text,
  Texture,
  Ticker,
  TilingSprite,
} from "pixi.js";
import {
  GameScreen,
  screenManager,
} from "../../Utils/ScreenManager/ScreenManager";
import { COMMON, INSTRUCTIONS_SCREEN } from "../../constants";
import { i18n, i18nKeys } from "../../Utils";
import { KEY_BINDINGS } from "../../keyBindings";
import { Button } from "../../UI";
import TitleScreen from "../Title";

export class InstructionsScreen extends Container implements GameScreen {
  public static SCREEN_ID = "instructions";
  public static assetBundles = [];

  private _background: TilingSprite;
  private _backButton!: Button;

  constructor() {
    super();

    this._background = new TilingSprite({
      texture: Texture.from("pixelart_starfield"),
      width: COMMON.UI.GAME_SIZE.WIDTH,
      height: COMMON.UI.GAME_SIZE.HEIGHT,
    });

    const width =
      COMMON.UI.GAME_SIZE.WIDTH -
      2 * INSTRUCTIONS_SCREEN.UI.INSTRUCTIONS_BOX.MARGIN.HORIZONTAL;
    const height =
      COMMON.UI.GAME_SIZE.HEIGHT -
      2 * INSTRUCTIONS_SCREEN.UI.INSTRUCTIONS_BOX.MARGIN.VERTICAL;

    const screenBackground = new Graphics()
      .roundRect(
        INSTRUCTIONS_SCREEN.UI.INSTRUCTIONS_BOX.MARGIN.HORIZONTAL,
        INSTRUCTIONS_SCREEN.UI.INSTRUCTIONS_BOX.MARGIN.VERTICAL,
        width,
        height,
        INSTRUCTIONS_SCREEN.UI.INSTRUCTIONS_BOX.CORNER_RADIUS
      )
      .stroke({
        color: INSTRUCTIONS_SCREEN.UI.INSTRUCTIONS_BOX.STROKE_COLOUR,
        width: INSTRUCTIONS_SCREEN.UI.INSTRUCTIONS_BOX.STROKE_WIDTH,
      })
      .fill(INSTRUCTIONS_SCREEN.UI.INSTRUCTIONS_BOX.FILL);

    this.addChild(this._background);
    this.addChild(screenBackground);
    this.addChild(
      this.buildUi(
        INSTRUCTIONS_SCREEN.UI.INSTRUCTIONS_BOX.MARGIN.HORIZONTAL,
        INSTRUCTIONS_SCREEN.UI.INSTRUCTIONS_BOX.MARGIN.VERTICAL,
        width,
        height
      )
    );
  }

  public show() {
    this._backButton.prepare();
    return Promise.resolve();
  }

  private buildUi(
    x: number,
    y: number,
    width: number,
    height: number
  ): Container {
    const uiContainer = new Container({ x, y, width, height });

    const gameDescription = this.buildGameDescription(width);
    gameDescription.y = y + INSTRUCTIONS_SCREEN.UI.DESCRIPTION_BOX.MARGIN.TOP;

    uiContainer.addChild(gameDescription);

    const midContainer = new Container({
      y:
        gameDescription.y +
        gameDescription.height +
        INSTRUCTIONS_SCREEN.UI.DESCRIPTION_BOX.MARGIN.BOTTOM,
    });

    const controls = this.buildControlsTable(width / 3);
    controls.x = x;

    midContainer.addChild(controls);

    const systemsDescription = this.buildSystemsDescription((2 * width) / 3);
    systemsDescription.x = width / 3;

    midContainer.addChild(systemsDescription);

    uiContainer.addChild(midContainer);

    this._backButton = new Button(
      "back-button",
      i18n(i18nKeys.BACK),
      KEY_BINDINGS.UI.CANCEL,
      () => screenManager.changeScreen(TitleScreen)
    );

    this._backButton.x = width / 2;
    this._backButton.y =
      y +
      height -
      this._backButton.height -
      INSTRUCTIONS_SCREEN.UI.BACK_BUTTON.PADDING.BOTTOM;

    uiContainer.addChild(this._backButton);

    return uiContainer;
  }

  private buildGameDescription(width: number): Container {
    const container = new Container();

    const gameDescriptionText = new Text({
      text: i18n(i18nKeys.GAME_INSTRUCTIONS),
      anchor: new Point(0.5, 0),
      style: {
        wordWrap: true,
        wordWrapWidth:
          width -
          INSTRUCTIONS_SCREEN.UI.DESCRIPTION_BOX.MARGIN.LEFT -
          INSTRUCTIONS_SCREEN.UI.DESCRIPTION_BOX.MARGIN.RIGHT,
        align: "center",
        fontSize: INSTRUCTIONS_SCREEN.UI.DESCRIPTION_BOX.DESCRIPTION_FONT_SIZE,
      },
      x: width / 2,
    });
    container.addChild(gameDescriptionText);

    return container;
  }

  private buildControlsTable(width: number): Container {
    const controlsContainer = new Container();

    const header = new Text({
      text: i18n(i18nKeys.CONTROLS),
      anchor: 0.5,
      x: width / 2,
      style: { fontSize: INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX.HEADER_FONT_SIZE },
    });

    controlsContainer.addChild(header);

    const controlsTable = new Container({
      y:
        header.y +
        header.height +
        INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX.HEADER_MARGIN.BOTTOM,
    });

    const leftColumn = new Container({
      x: INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX.KEY_BINDING.MARGIN.LEFT,
    });
    const rightColumn = new Container();

    controlsTable.addChild(leftColumn, rightColumn);

    this.addControlRow(
      leftColumn,
      rightColumn,
      KEY_BINDINGS.PLAYER_CONTROLS.MOVE_UP,
      i18n(i18nKeys.MOVE_UP),
      INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX.KEY_BINDING.MARGIN.BOTTOM
    );

    this.addControlRow(
      leftColumn,
      rightColumn,
      KEY_BINDINGS.PLAYER_CONTROLS.MOVE_LEFT,
      i18n(i18nKeys.MOVE_LEFT),
      INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX.KEY_BINDING.MARGIN.BOTTOM
    );

    this.addControlRow(
      leftColumn,
      rightColumn,
      KEY_BINDINGS.PLAYER_CONTROLS.MOVE_DOWN,
      i18n(i18nKeys.MOVE_DOWN),
      INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX.KEY_BINDING.MARGIN.BOTTOM
    );

    this.addControlRow(
      leftColumn,
      rightColumn,
      KEY_BINDINGS.PLAYER_CONTROLS.MOVE_RIGHT,
      i18n(i18nKeys.MOVE_RIGHT),
      INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX.KEY_BINDING.MARGIN.BOTTOM
    );

    this.addControlRow(
      leftColumn,
      rightColumn,
      KEY_BINDINGS.PLAYER_CONTROLS.INTERACT,
      i18n(i18nKeys.INTERACT),
      INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX.KEY_BINDING.MARGIN.BOTTOM
    );

    rightColumn.x =
      width -
      rightColumn.width -
      INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX.KEY_BINDING.MARGIN.RIGHT;

    controlsContainer.addChild(controlsTable);

    return controlsContainer;
  }

  private addControlRow(
    colA: Container,
    colB: Container,
    keybind: string,
    description: string,
    rowSpacing: number
  ) {
    const prevItem = colA.children.at(-1);

    const y = prevItem ? prevItem.y + prevItem.height + rowSpacing : 0;

    const control = this.buildControlDisplay(keybind);
    control.y = y;

    colA.addChild(control);
    colB.addChild(
      new Text({
        text: description,
        y:
          y +
          INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX.KEY_BINDING.DESCRIPTION_PADDING
            .TOP,
      })
    );
  }

  private buildControlDisplay(keybind: string): Container {
    const container = new Container();

    const { KEY_BINDING } = INSTRUCTIONS_SCREEN.UI.CONTROLS_BOX;

    const background = new Graphics()
      .roundRect(
        0,
        0,
        KEY_BINDING.BOX.WIDTH,
        KEY_BINDING.BOX.HEIGHT,
        KEY_BINDING.BOX.CORNER_RADIUS
      )
      .stroke(KEY_BINDING.BOX.STROKE_COLOUR);

    container.addChild(background);
    container.addChild(
      new Text({
        text: keybind,
        anchor: 0.5,
        x: KEY_BINDING.TEXT.X,
        y: KEY_BINDING.TEXT.Y,
      })
    );

    return container;
  }

  private buildSystemsDescription(width: number): Container {
    const { SYSTEMS_BOX } = INSTRUCTIONS_SCREEN.UI;
    const systemsDescriptionContainer = new Container();

    const header = new Text({
      text: i18n(i18nKeys.SYSTEMS),
      anchor: 0.5,
      style: { fontSize: SYSTEMS_BOX.HEADER_FONT_SIZE },
      x: width / 2,
    });

    systemsDescriptionContainer.addChild(header);

    const rowsContainer = new Container({
      y: header.y + header.height + SYSTEMS_BOX.HEADER_MARGIN.BOTTOM,
      x: SYSTEMS_BOX.PADDING.LEFT,
    });

    const rowWidth =
      width - SYSTEMS_BOX.PADDING.LEFT - SYSTEMS_BOX.PADDING.RIGHT;

    const engineRow = this.buildSystemRow(
      i18n(i18nKeys.ENGINE),
      i18n(i18nKeys.ENGINE_DESCRIPTION),
      rowWidth
    );

    rowsContainer.addChild(engineRow);

    const o2Row = this.buildSystemRow(
      i18n(i18nKeys.OXYGEN),
      i18n(i18nKeys.OXYGEN_DESCRIPTION),
      rowWidth
    );

    o2Row.y = engineRow.y + engineRow.height + SYSTEMS_BOX.ROW_MARGIN.BOTTOM;

    rowsContainer.addChild(o2Row);

    const reactorRow = this.buildSystemRow(
      i18n(i18nKeys.REACTOR),
      i18n(i18nKeys.REACTOR_DESCRIPTION),
      rowWidth
    );

    reactorRow.y = o2Row.y + o2Row.height + SYSTEMS_BOX.ROW_MARGIN.BOTTOM;

    rowsContainer.addChild(reactorRow);

    const medbayRow = this.buildSystemRow(
      i18n(i18nKeys.MEDBAY),
      i18n(i18nKeys.MEDBAY_DESCRIPTION),
      rowWidth
    );

    medbayRow.y =
      reactorRow.y + reactorRow.height + SYSTEMS_BOX.ROW_MARGIN.BOTTOM;

    rowsContainer.addChild(medbayRow);

    const shieldRow = this.buildSystemRow(
      i18n(i18nKeys.SHIELDS),
      i18n(i18nKeys.SHIELDS_DESCRIPTION),
      rowWidth
    );

    shieldRow.y =
      medbayRow.y + medbayRow.height + SYSTEMS_BOX.ROW_MARGIN.BOTTOM;

    rowsContainer.addChild(shieldRow);

    systemsDescriptionContainer.addChild(rowsContainer);

    return systemsDescriptionContainer;
  }

  private buildSystemRow(
    name: string,
    description: string,
    maxWidth: number
  ): Container {
    const row = new Container();

    const nameText = new Text({ text: name });
    const descriptionText = new Text({
      text: description,
      x: INSTRUCTIONS_SCREEN.UI.SYSTEMS_BOX.DESCRIPTION_PADDING.LEFT,
      style: {
        fontSize: INSTRUCTIONS_SCREEN.UI.SYSTEMS_BOX.DESCRIPTION_FONT_SIZE,
        wordWrap: true,
        wordWrapWidth:
          maxWidth -
          INSTRUCTIONS_SCREEN.UI.SYSTEMS_BOX.DESCRIPTION_PADDING.LEFT,
      },
    });

    row.addChild(nameText);
    row.addChild(descriptionText);

    return row;
  }

  public update(_: Ticker) {
    this._background.tilePosition.x = this._background.tilePosition.x - 0.1;
  }

  public cleanup() {
    this._backButton.cleanup();
  }
}
