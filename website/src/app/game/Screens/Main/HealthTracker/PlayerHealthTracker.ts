import { MAIN } from "../../../constants";
import { HealthTracker } from "./HealthTracker";

export class PlayerHealthTracker extends HealthTracker {
  constructor() {
    super(MAIN.PLAYER.MAX_HEALTH, "PLAYER", "player-health-tracker");
  }

  protected onRemoveHealth(): void {
    // add SFX here in future
  }
}
