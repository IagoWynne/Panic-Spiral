import { MAIN } from "../../../constants";
import { System } from "./System";

export class SystemsManager {
  private _counter: number = 0;

  constructor(private _systems: System[]) {}

  public onUpdate(deltaMs: number) {
    this._counter += deltaMs;

    if (this._counter > MAIN.SYSTEMS.SYSTEM_BREAKDOWN_CHECK) {
      this.checkForBreakdowns(deltaMs);
    }
  }

  private checkForBreakdowns(deltaMs: number) {
    const breakdownOccurred = this._systems.reduce(
      (occurred: boolean, system: System) => {
        if (!occurred && !system.broken) {
          occurred = system.checkForBreakdown(deltaMs);
        }
        return occurred;
      },
      false
    );

    if (breakdownOccurred) {
      this._counter = 0;
    }
  }
}
