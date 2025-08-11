import { MAIN } from "../../../constants";
import RoundEvents from "./RoundEvents";

export class RoundTracker {
  public currentRound = 0;

  private _remainingSeconds: number;
  private _roundTimer?: NodeJS.Timeout;

  constructor() {
    this._remainingSeconds = 0;
  }

  public startRound() {
    this.currentRound += 1;
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
  }
}
