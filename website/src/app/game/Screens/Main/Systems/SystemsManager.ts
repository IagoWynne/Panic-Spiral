import { MAIN } from "../../../constants";
import { System } from "./System";

export class SystemsManager {
  private _startupCooldownTimer?: NodeJS.Timeout;
  private _breakdownsAllowed = false;
  private _breakdownCheckTimer?: NodeJS.Timeout;

  constructor(private _systems: System[]) {
    this._startupCooldownTimer = setTimeout(
      () => this.onStartupCooldownElapsed(),
      MAIN.SYSTEMS.SYSTEM_BREAKDOWN_CHECK_START
    );
  }

  private onStartupCooldownElapsed() {
    this._breakdownsAllowed = true;
    this._startupCooldownTimer = undefined;

    this._breakdownCheckTimer = setInterval(
      () => this.checkForBreakdowns(),
      MAIN.SYSTEMS.SYSTEM_BREAKDOWN_CHECK_INTERVAL
    );
  }

  private checkForBreakdowns() {
    if (!this._breakdownsAllowed) {
      return;
    }

    const breakdownOccurred = this._systems.reduce(
      (occurred: boolean, system: System) => {
        if (!occurred && !system.broken) {
          occurred = system.checkForBreakdown();
        }
        return occurred;
      },
      false
    );
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
  }
}
