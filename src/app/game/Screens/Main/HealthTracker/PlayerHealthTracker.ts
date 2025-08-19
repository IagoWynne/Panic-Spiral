import { AUDIO_FILE_ALIASES, GameAudio } from "../../../Utils/audio";
import { MAIN } from "../../../constants";
import { SystemEvents } from "../Systems";
import { HealthTracker } from "./HealthTracker";

export class PlayerHealthTracker extends HealthTracker {
  constructor() {
    super(
      MAIN.PLAYER.MAX_HEALTH,
      "PLAYER",
      "player-health-tracker",
      MAIN.SYSTEMS.SYSTEM_IDS.MEDBAY
    );
    this.addListeners();
  }

  private addListeners() {
    SystemEvents.addSystemListener({
      componentId: this._componentId,
      system: MAIN.SYSTEMS.SYSTEM_IDS.OXYGEN,
      systemEventType: "BREAKDOWN",
      action: () => this.onOxygenBreakdown(),
    });

    SystemEvents.addSystemListener({
      componentId: this._componentId,
      system: MAIN.SYSTEMS.SYSTEM_IDS.OXYGEN,
      systemEventType: "REPAIRED",
      action: () => this.onOxygenRepaired(),
    });
  }

  protected onRemoveHealth() {
    GameAudio.SFX?.play(AUDIO_FILE_ALIASES.MAIN.PLAYER_DAMAGE, 0.25);
  }

  private onOxygenBreakdown() {
    this._damageTimer = setInterval(
      () => this.removeHealth(MAIN.SYSTEMS.OXYGEN_HEALTH_DAMAGE),
      MAIN.SYSTEMS.OXYGEN_HEALTH_DAMAGE_INTERVAL
    );
  }

  private onOxygenRepaired() {
    this.clearDamageTimer();
  }

  public cleanup() {
    SystemEvents.removeSystemListener(
      this._componentId,
      MAIN.SYSTEMS.SYSTEM_IDS.OXYGEN
    );

    this.clearDamageTimer();

    super.removeListener();
  }
}
