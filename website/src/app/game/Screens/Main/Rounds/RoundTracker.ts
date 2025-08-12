import { MAIN } from "../../../constants";
import { ScoreEvents } from "../Score";
import RoundEvents from "./RoundEvents";
import { RoundStats } from "./RoundStats";

export class RoundTracker {
  private _id = "round-tracker";
  public currentRound = 0;
  public roundStats: RoundStats[] = [];

  private _remainingSeconds: number;
  private _roundTimer?: NodeJS.Timeout;
  private _currentRoundStats!: RoundStats;

  constructor() {
    this._remainingSeconds = 0;
    this.addListeners();
  }

  private addListeners() {
    ScoreEvents.addScoreListener({
      componentId: this._id,
      action: (newScore: number) => {
        this._currentRoundStats.endScore = newScore;
      },
    });
  }

  public startRound(currentScore: number) {
    this.currentRound += 1;
    this._currentRoundStats = {
      num: this.currentRound,
      startingScore: currentScore,
      endScore: currentScore,
    };

    this.roundStats.push(this._currentRoundStats);

    this._remainingSeconds = MAIN.ROUND.DEFAULT_ROUND_DURATION_SECONDS;
    RoundEvents.onTimerUpdate(this._remainingSeconds);

    this._roundTimer = setInterval(
      () => this.onRoundTimerInterval(),
      MAIN.ROUND.ROUND_TIMER_DECREMENT_INTERVAL
    );
  }

  private onRoundTimerInterval() {
    this._remainingSeconds--;
    RoundEvents.onTimerUpdate(this._remainingSeconds);

    if (this._remainingSeconds === 0) {
      RoundEvents.onRoundEnd();
      this.stopTimer();
    }
  }

  private stopTimer() {
    if (this._roundTimer) {
      clearInterval(this._roundTimer);
      this._roundTimer = undefined;
    }
  }

  public cleanup() {
    this.stopTimer();
    ScoreEvents.removeScoreListener(this._id);
  }
}
