import { Container } from "pixi.js";
import UIEvents from "./UIEvents";
import { TooltipManager } from "./TooltipManager";
import SystemMonitor from "./SystemMonitor";
import { MAIN } from "../../../constants";
import { Score } from "./Score";
import { RoundInfo } from "./RoundInfo";
import { RoundEndOverlay } from "./RoundEndOverlay";
import { RoundStats } from "../Rounds";
import HealthBar from "./HealthBar";

export class GameUI extends Container {
  private _tooltipManager = new TooltipManager();
  private _systemMonitor = new SystemMonitor();
  private _scoreDisplay = new Score();
  private _roundInfo = new RoundInfo();
  private _roundEndOverlay?: RoundEndOverlay;
  private _healthBarsContainer = new Container();
  private _shipHealthBar = new HealthBar(MAIN.SHIP.MAX_HEALTH, "SHIP");

  constructor() {
    super();

    this._systemMonitor.x = MAIN.UI.SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING;
    this._scoreDisplay.y = MAIN.UI.SCORE_DEFAULTS.SCORE_PADDING;
    this._roundInfo.y = MAIN.UI.ROUND_DEFAULTS.ROUND_PADDING * 2;

    this._healthBarsContainer = new Container({
      x: MAIN.UI.SHIP_HEALTH_BAR.MARGIN.LEFT,
      y: MAIN.UI.SHIP_HEALTH_BAR.MARGIN.TOP,
    });

    this._healthBarsContainer.addChild(this._shipHealthBar);

    this.addChild(this._systemMonitor);
    this.addChild(this._scoreDisplay);
    this.addChild(this._roundInfo);
    this.addChild(this._healthBarsContainer);
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

  public updateRoundNumber(roundNumber: number) {
    this._roundInfo.updateRoundNumber(roundNumber);
  }

  public displayRoundEnd(stats: RoundStats, onNextRoundPressed: () => void) {
    this._roundEndOverlay = new RoundEndOverlay(stats, () => {
      if (this._roundEndOverlay) {
        this.removeChild(this._roundEndOverlay);
        this._roundEndOverlay.destroy();
      }

      onNextRoundPressed();
    });

    this.addChild(this._roundEndOverlay);
  }

  public cleanup() {
    UIEvents.cleanup();
    this._scoreDisplay.cleanup();
    this._systemMonitor.cleanup();
    this._roundInfo.cleanUp();
    this._shipHealthBar.cleanup();
    this.destroy();
  }
}
