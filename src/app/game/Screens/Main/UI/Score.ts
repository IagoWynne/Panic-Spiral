import { Container, Graphics, Point, Text } from "pixi.js";
import { ScoreEvents } from "../Score";
import { MAIN, COMMON } from "../../../constants";

export class Score extends Container {
  private _componentId = "ui_score";
  private _scoreText: Text;
  private _multiplierText: Text;
  private _multiplierLights: Graphics[] = [];

  constructor() {
    super();

    const scoreContainer = new Container();

    const header = new Text({
      text: "Score",
      style: { fontSize: MAIN.UI.SCORE.HEADER_FONT_SIZE },
      x: MAIN.UI.SCORE.SCORE_PADDING,
      y: MAIN.UI.SCORE.SCORE_PADDING,
    });

    this._scoreText = new Text({
      text: 0,
      anchor: 0.5,
      style: { fontSize: MAIN.UI.SCORE.SCORE_FONT_SIZE },
      y: header.y + header.height + MAIN.UI.SCORE.SCORE_SPACING,
      x: header.width / 2 + MAIN.UI.SCORE.SCORE_PADDING,
    });

    scoreContainer.addChild(header);
    scoreContainer.addChild(this._scoreText);

    this._multiplierText = new Text({
      text: "x1",
      style: {
        fontSize: MAIN.UI.SCORE.SCORE_FONT_SIZE,
      },
      anchor: 0.5,
      x: header.x + header.width + 8 * MAIN.UI.SCORE.SCORE_PADDING,
      y: scoreContainer.height / 2 + MAIN.UI.SCORE.SCORE_PADDING,
    });
    scoreContainer.addChild(this._multiplierText);

    const separator = new Graphics({
      x: header.x + header.width + MAIN.UI.SCORE.SCORE_PADDING,
      y: 0,
    })
      .lineTo(0, scoreContainer.height + 2 * MAIN.UI.SCORE.SCORE_PADDING)
      .stroke(COMMON.UI.TOOLTIP_DEFAULTS.BORDER_STROKE);

    scoreContainer.addChild(
      this.buildMultiplierUI(
        header.x + header.width + 2 * MAIN.UI.SCORE_MULTIPLIER.LIGHTS_MARGIN.X
      )
    );

    const background = new Graphics()
      .roundRect(
        0,
        0,
        scoreContainer.width + 4 * MAIN.UI.SCORE.SCORE_PADDING,
        scoreContainer.height + 2 * MAIN.UI.SCORE.SCORE_PADDING,
        COMMON.UI.TOOLTIP_DEFAULTS.BACKGROUND_CORNER_RADIUS
      )
      .fill(COMMON.UI.TOOLTIP_DEFAULTS.BACKGROUND_FILL)
      .stroke(COMMON.UI.TOOLTIP_DEFAULTS.BORDER_STROKE);

    scoreContainer.addChildAt(background, 0);
    scoreContainer.addChild(separator);
    this.addChild(scoreContainer);

    this.addListeners();
  }

  private buildMultiplierUI(x: number): Container {
    const multiplierLightsContainer = new Container({
      x,
      y: MAIN.UI.SCORE_MULTIPLIER.LIGHTS_MARGIN.Y,
    });

    for (let i = 0; i < 3; i++) {
      const [multiplierLightOutline, multiplierLight] =
        this.buildMultiplierLight(i);

      multiplierLightsContainer.addChild(multiplierLightOutline);
      multiplierLightsContainer.addChild(multiplierLight);
    }

    return multiplierLightsContainer;
  }

  private buildMultiplierLight(index: number): [Graphics, Graphics] {
    const multiplierLightOutline = new Graphics({
      x:
        index * 2 * MAIN.UI.SCORE_MULTIPLIER.LIGHTS.SPACING +
        MAIN.UI.SCORE_MULTIPLIER.LIGHTS.SPACING,
    })
      .rect(
        0,
        0,
        MAIN.UI.SCORE_MULTIPLIER.LIGHTS.WIDTH,
        MAIN.UI.SCORE_MULTIPLIER.LIGHTS.WIDTH
      )
      .stroke(MAIN.UI.SCORE_MULTIPLIER.LIGHTS.COLOUR);

    const multiplierLight = new Graphics({
      x:
        index * 2 * MAIN.UI.SCORE_MULTIPLIER.LIGHTS.SPACING +
        MAIN.UI.SCORE_MULTIPLIER.LIGHTS.SPACING,
    })
      .rect(
        0,
        0,
        MAIN.UI.SCORE_MULTIPLIER.LIGHTS.WIDTH,
        MAIN.UI.SCORE_MULTIPLIER.LIGHTS.WIDTH
      )
      .fill(MAIN.UI.SCORE_MULTIPLIER.LIGHTS.COLOUR);

    multiplierLight.visible = false;

    this._multiplierLights.push(multiplierLight);

    return [multiplierLightOutline, multiplierLight];
  }

  private addListeners() {
    ScoreEvents.addScoreListener({
      componentId: this._componentId,
      action: (newScore: number) => this.onScoreChange(newScore),
    });

    ScoreEvents.addScoreIncrementStartedListener({
      componentId: this._componentId,
      action: () => this.onScoreIncrementStarted(),
    });

    ScoreEvents.addScoreIncrementStoppedListener({
      componentId: this._componentId,
      action: () => this.onScoreIncrementStopped(),
    });

    ScoreEvents.addScoreMultiplierChangedListener({
      componentId: this._componentId,
      action: (newMultipler: number) =>
        this.onScoreMultiplerChanged(newMultipler),
    });
  }

  private onScoreChange(newScore: number) {
    this._scoreText.text = newScore;
  }

  private onScoreIncrementStarted() {
    this._scoreText.style.fill = MAIN.UI.SCORE.SCORE_INCREMENTING_FONT_COLOUR;
  }

  private onScoreIncrementStopped() {
    this._scoreText.style.fill =
      MAIN.UI.SCORE.SCORE_INCREMENT_STOPPED_FONT_COLOUR;
  }

  private onScoreMultiplerChanged(newMultipler: number) {
    this._multiplierText.text = `x${newMultipler}`;

    this._multiplierLights.forEach((light: Graphics, idx: number) => {
      light.visible = idx + 1 < newMultipler;
    });
  }

  public cleanup() {
    ScoreEvents.removeScoreListener(this._componentId);
    ScoreEvents.removeScoreIncrementStartedListener(this._componentId);
    ScoreEvents.removeScoreIncrementStoppedListener(this._componentId);
    ScoreEvents.removeScoreMultiplierChangedListener(this._componentId);
  }
}
