import { MAIN } from "../../../constants";
import { SystemEvents } from "../Systems";
import ScoreEvents from "./ScoreEvents";

export class ScoreTracker {
  private _componentId = "score_tracker";
  private _scoreIncreaseTimer?: NodeJS.Timeout;
  private _canAutoIncrementScore = true;
  private _multiplier = 1;

  public currentScore = 0;

  constructor() {
    this.addListeners();
  }

  public onRoundStart() {
    this._scoreIncreaseTimer = setInterval(
      () => this.onScoreIncreaseTimeout(),
      MAIN.SCORE.SCORE_INCREMENT_INTERVAL
    );
  }

  public onRoundEnd() {
    this.addScore(MAIN.SCORE.BASE_SCORE_INCREMENT);
    this.addScore(MAIN.SCORE.ROUND_COMPLETION_BONUS);
    this._multiplier = 1;
    ScoreEvents.onScoreMultiplierChanged(this._multiplier);
    clearInterval(this._scoreIncreaseTimer);
  }

  private addScore(score: number) {
    this.currentScore += score;
    ScoreEvents.onScoreUpdate(this.currentScore);
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

    SystemEvents.addSystemListener({
      system: MAIN.SYSTEMS.SYSTEM_IDS.PILOTING,
      systemEventType: "ACTIVATED",
      action: () => {
        this._multiplier++;
        ScoreEvents.onScoreMultiplierChanged(this._multiplier);
      },
      componentId: this._componentId,
    });

    SystemEvents.addSystemListener({
      system: MAIN.SYSTEMS.SYSTEM_IDS.PILOTING,
      systemEventType: "DEACTIVATED",
      action: () => {
        this._multiplier--;
        ScoreEvents.onScoreMultiplierChanged(this._multiplier);
      },
      componentId: this._componentId,
    });
  }

  private onScoreIncreaseTimeout() {
    if (!this._canAutoIncrementScore) {
      return;
    }

    this.addScore(MAIN.SCORE.BASE_SCORE_INCREMENT * this._multiplier);
  }

  public cleanup() {
    clearInterval(this._scoreIncreaseTimer);

    SystemEvents.removeSystemListener(
      this._componentId,
      MAIN.SYSTEMS.SYSTEM_IDS.ENGINE
    );

    SystemEvents.removeSystemListener(
      this._componentId,
      MAIN.SYSTEMS.SYSTEM_IDS.PILOTING
    );
  }
}
