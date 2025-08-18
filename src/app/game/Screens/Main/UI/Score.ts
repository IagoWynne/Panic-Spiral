import { Container, Graphics, Point, Text } from "pixi.js";
import { ScoreEvents } from "../Score";
import { MAIN, COMMON } from "../../../constants";

export class Score extends Container {
  private _componentId = "ui_score";
  private _scoreText: Text;
  private _multiplierText: Text;

  // TODO: make multiplier UI look pretty
  // TODO: listen for multiplier changed event and update multiplier with incoming value

  constructor() {
    super();

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

    this._multiplierText = new Text({
      text: "x1",
      style: {
        fontSize: MAIN.UI.SCORE.SCORE_FONT_SIZE,
      },
      anchor: new Point(0, 0.5),
      x: header.width + MAIN.UI.SCORE.SCORE_PADDING * 2,
      y: this._scoreText.y,
    });

    this.addChild(header);
    this.addChild(this._scoreText);
    this.addChild(this._multiplierText);

    const background = new Graphics()
      .roundRect(
        0,
        0,
        this.width + 2 * MAIN.UI.SCORE.SCORE_PADDING,
        this.height + 2 * MAIN.UI.SCORE.SCORE_PADDING,
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
    this._scoreText.style.fill = MAIN.UI.SCORE.SCORE_INCREMENTING_FONT_COLOUR;
  }

  private onScoreIncrementStopped() {
    this._scoreText.style.fill =
      MAIN.UI.SCORE.SCORE_INCREMENT_STOPPED_FONT_COLOUR;
  }

  public cleanup() {
    ScoreEvents.removeScoreListener(this._componentId);
    ScoreEvents.removeScoreIncrementStartedListener(this._componentId);
    ScoreEvents.removeScoreIncrementStoppedListener(this._componentId);
  }
}
