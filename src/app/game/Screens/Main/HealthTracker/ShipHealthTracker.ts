import { AUDIO_FILE_ALIASES, GameAudio } from "@/app/game/Utils/audio";
import { MAIN } from "../../../constants";
import { SystemEvents } from "../Systems";
import { HealthTracker } from "./HealthTracker";

export class ShipHealthTracker extends HealthTracker {
  constructor() {
    super(MAIN.SHIP.MAX_HEALTH, "SHIP", "ship-health-tracker");
    this.addListeners();
  }

  private addListeners() {
    SystemEvents.addSystemListener({
      componentId: this._componentId,
      system: MAIN.SYSTEMS.SYSTEM_IDS.REACTOR,
      systemEventType: "BREAKDOWN",
      action: () => this.onReactorBreakdown(),
    });

    SystemEvents.addSystemListener({
      componentId: this._componentId,
      system: MAIN.SYSTEMS.SYSTEM_IDS.REACTOR,
      systemEventType: "REPAIRED",
      action: () => this.onReactorRepaired(),
    });
  }

  protected onRemoveHealth() {
    GameAudio.SFX?.play(AUDIO_FILE_ALIASES.MAIN.SHIP_DAMAGE, 0.25);
  }

  private onReactorBreakdown() {
    this._damageTimer = setInterval(
      () => this.removeHealth(MAIN.SYSTEMS.REACTOR_HEALTH_DAMAGE),
      MAIN.SYSTEMS.REACTOR_HEALTH_DAMAGE_INTERVAL
    );
  }

  private onReactorRepaired() {
    this.clearDamageTimer();
  }

  public cleanup() {
    SystemEvents.removeSystemListener(
      this._componentId,
      MAIN.SYSTEMS.SYSTEM_IDS.REACTOR
    );
  }
}
