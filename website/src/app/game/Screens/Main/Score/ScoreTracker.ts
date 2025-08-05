import { MAIN } from "../../../constants";
import { SystemEvents } from "../Systems";
import ScoreEvents from "./ScoreEvents";

export class ScoreTracker {
  private _componentId = "score_tracker";
  private _scoreIncreaseTimer: NodeJS.Timeout;
  private _canAutoIncrementScore = true;
  private _score = 0;

  constructor() {
    this._scoreIncreaseTimer = setInterval(
      () => this.onScoreIncreaseTimeout(),
      MAIN.SCORE.SCORE_INCREMENT_INTERVAL
    );

    this.addListeners();
  }

  private addListeners() {
    SystemEvents.addSystemListener({
      system: MAIN.SYSTEMS.SYSTEM_IDS.ENGINE,
      systemEventType: "BREAKDOWN",
      action: () => {
        this._canAutoIncrementScore = false;
        ScoreEvents.onScoreIncrementStopped();
      },
      componentId: this._componentId,
    });

    SystemEvents.addSystemListener({
      system: MAIN.SYSTEMS.SYSTEM_IDS.ENGINE,
      systemEventType: "REPAIRED",
      action: () => {
        this._canAutoIncrementScore = true;
        ScoreEvents.onScoreIncrementStarted();
      },
      componentId: this._componentId,
    });
  }

  private onScoreIncreaseTimeout() {
    if (!this._canAutoIncrementScore) {
      return;
    }

    this._score += MAIN.SCORE.BASE_SCORE_INCREMENT;

    ScoreEvents.onScoreUpdate(this._score);
  }

  public cleanup() {
    this._scoreIncreaseTimer.close();
    SystemEvents.removeSystemListener(
      this._componentId,
      MAIN.SYSTEMS.SYSTEM_IDS.ENGINE
    );
  }
}
