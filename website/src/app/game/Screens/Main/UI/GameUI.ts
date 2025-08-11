import { Container } from "pixi.js";
import UIEvents from "./UIEvents";
import { TooltipManager } from "./TooltipManager";
import SystemMonitor from "./SystemMonitor";
import { MAIN } from "../../../constants";
import { Score } from "./Score";
import { RoundInfo } from "./RoundInfo";

export class GameUI extends Container {
  private _tooltipManager = new TooltipManager();
  private _systemMonitor = new SystemMonitor();
  private _scoreDisplay = new Score();
  private _roundInfo = new RoundInfo();

  constructor() {
    super();

    this._systemMonitor.x = MAIN.UI.SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING;
    this._scoreDisplay.y = MAIN.UI.SCORE_DEFAULTS.SCORE_PADDING;
    this._roundInfo.y = MAIN.UI.ROUND_DEFAULTS.ROUND_PADDING * 2;

    this.addChild(this._systemMonitor);
    this.addChild(this._scoreDisplay);
    this.addChild(this._roundInfo);
    this.addChild(this._tooltipManager);
    UIEvents.setTooltipManager(this._tooltipManager);
  }

  public resize(width: number, height: number) {
    this._systemMonitor.y =
      height -
      this._systemMonitor.height -
      MAIN.UI.SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING;

    this._scoreDisplay.x =
      width - this._scoreDisplay.width - MAIN.UI.SCORE_DEFAULTS.SCORE_PADDING;

    this._roundInfo.x = width / 2;
  }

  public cleanup() {
    UIEvents.cleanup();
    this._scoreDisplay.cleanup();
    this._systemMonitor.cleanup();
    this._roundInfo.cleanUp();
    this.destroy();
  }
}
