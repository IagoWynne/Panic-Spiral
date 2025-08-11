import { Container, Text } from "pixi.js";
import { MAIN } from "../../../constants";
import { RoundEvents } from "../Rounds";

export class RoundInfo extends Container {
  private _componentId = "ui_round_info";
  private _header: Text;
  private _remaining: Text;

  constructor() {
    super();

    this._header = new Text({
      text: "Round 1",
      style: { fontSize: MAIN.UI.ROUND_DEFAULTS.HEADER_FONT_SIZE },
      y: MAIN.UI.ROUND_DEFAULTS.ROUND_PADDING,
      anchor: 0.5,
    });

    this._remaining = new Text({
      style: { fontSize: MAIN.UI.ROUND_DEFAULTS.REMAINING_TIME_FONT_SIZE },
      y:
        this._header.y +
        this._header.height +
        MAIN.UI.ROUND_DEFAULTS.ROUND_SPACING,
      anchor: 0.5,
    });

    this.addChild(this._header);
    this.addChild(this._remaining);

    this.addListeners();
  }

  private addListeners() {
    RoundEvents.addTimerUpdateListener({
      componentId: this._componentId,
      action: (remainingTime) => this.onTimerUpdate(remainingTime),
    });
  }

  private onTimerUpdate(remainingTime: number) {
    this._remaining.text = remainingTime;
  }

  public cleanUp() {
    RoundEvents.removeTimerUpdateListener(this._componentId);
  }
}
