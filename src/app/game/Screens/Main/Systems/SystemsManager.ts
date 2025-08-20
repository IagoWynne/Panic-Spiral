import { MAIN } from "../../../constants";
import { RoundEvents } from "../Rounds";
import { System } from "./System";

export class SystemsManager {
  private _id = "systems-manager";
  private _startupCooldownTimer?: NodeJS.Timeout;
  private _breakdownsAllowed = false;
  private _breakdownCheckTimer?: NodeJS.Timeout;
  private _breakdownRateIncrease: number = 0;

  constructor(private _systems: System[]) {
    RoundEvents.addTimerUpdateListener({
      componentId: this._id,
      action: (remainingTime: number) => {
        if (remainingTime <= MAIN.SYSTEMS.ROUND_END_SAFE_TIME) {
          this._breakdownsAllowed = false;
        }
      },
    });
  }

  private onStartupCooldownElapsed() {
    this._breakdownsAllowed = true;
    this._startupCooldownTimer = undefined;

    this._breakdownCheckTimer = setInterval(
      () => this.checkForBreakdowns(),
      MAIN.SYSTEMS.SYSTEM_BREAKDOWN_CHECK_INTERVAL
    );
  }

  public onRoundStart() {
    this._breakdownRateIncrease += MAIN.SYSTEMS.BREAKDOWN_RATE_SCALING;
    this._startupCooldownTimer = setTimeout(
      () => this.onStartupCooldownElapsed(),
      MAIN.SYSTEMS.SYSTEM_BREAKDOWN_CHECK_START
    );
  }

  public onRoundEnd() {
    this.stopTimer(this._breakdownCheckTimer);
  }

  private checkForBreakdowns() {
    if (!this._breakdownsAllowed) {
      return;
    }

    this._systems.reduce((occurred: boolean, system: System) => {
      if (!occurred && !system.broken) {
        occurred = system.checkForBreakdown(this._breakdownRateIncrease);
      }
      return occurred;
    }, false);
  }

  private stopTimer(timer?: NodeJS.Timeout) {
    if (timer) {
      clearInterval(timer);
    }
  }

  public cleanup() {
    this.stopTimer(this._startupCooldownTimer);
    this._startupCooldownTimer = undefined;

    this.stopTimer(this._breakdownCheckTimer);
    this._breakdownCheckTimer = undefined;

    RoundEvents.removeTimerUpdateListener(this._id);
  }
}
