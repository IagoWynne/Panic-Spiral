import { Container, Graphics, Text } from "pixi.js";
import { ScoreEvents } from "../Score";
import { MAIN, COMMON } from "../../../constants";

export class Score extends Container {
  private _componentId = "ui_score";
  private _scoreText: Text;

  constructor() {
    super();

    const header = new Text({
      text: "Score",
      style: { fontSize: MAIN.UI.SCORE_DEFAULTS.HEADER_FONT_SIZE },
      x: MAIN.UI.SCORE_DEFAULTS.SCORE_PADDING,
      y: MAIN.UI.SCORE_DEFAULTS.SCORE_PADDING,
    });

    this._scoreText = new Text({
      text: 0,
      anchor: 0.5,
      style: { fontSize: MAIN.UI.SCORE_DEFAULTS.SCORE_FONT_SIZE },
      y: header.y + header.height + MAIN.UI.SCORE_DEFAULTS.SCORE_SPACING,
      x: header.width / 2 + MAIN.UI.SCORE_DEFAULTS.SCORE_PADDING,
    });

    this.addChild(header);
    this.addChild(this._scoreText);

    const background = new Graphics()
      .roundRect(
        0,
        0,
        this.width + 2 * MAIN.UI.SCORE_DEFAULTS.SCORE_PADDING,
        this.height + 2 * MAIN.UI.SCORE_DEFAULTS.SCORE_PADDING,
        COMMON.UI.TOOLTIP_DEFAULTS.BACKGROUND_CORNER_RADIUS
      )
      .fill(COMMON.UI.TOOLTIP_DEFAULTS.BACKGROUND_FILL)
      .stroke(COMMON.UI.TOOLTIP_DEFAULTS.BORDER_STROKE);

    this.addChildAt(background, 0);

    this.addListeners();
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
  }

  private onScoreChange(newScore: number) {
    this._scoreText.text = newScore;
  }

  private onScoreIncrementStarted() {
    this._scoreText.style.fill =
      MAIN.UI.SCORE_DEFAULTS.SCORE_INCREMENTING_FONT_COLOUR;
  }

  private onScoreIncrementStopped() {
    this._scoreText.style.fill =
      MAIN.UI.SCORE_DEFAULTS.SCORE_INCREMENT_STOPPED_FONT_COLOUR;
  }

  public cleanup() {
    ScoreEvents.removeScoreListener(this._componentId);
    ScoreEvents.removeScoreIncrementStartedListener(this._componentId);
    ScoreEvents.removeScoreIncrementStoppedListener(this._componentId);
  }
}
