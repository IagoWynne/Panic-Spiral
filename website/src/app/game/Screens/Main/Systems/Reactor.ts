import { System } from "./System";

export class Reactor extends System {
  constructor(
    id: string,
    tileSize: number,
    interactionZoneWidth: number,
    interactionZoneHeight: number,
    cooldown: number,
    private breakdownRate: number
  ) {
    super(id, tileSize, interactionZoneWidth, interactionZoneHeight, cooldown);
  }

  protected doInteraction = () => {
    if (this.broken) {
      this.onRepair();
    }
  };

  protected doCheckForBreakdown = () => {
    const breakdownChance = Math.random();

    if (breakdownChance <= this.breakdownRate) {
      this.onBreakdown();
      return true;
    }

    return false;
  };
}
