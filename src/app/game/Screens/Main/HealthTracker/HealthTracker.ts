import GameEvents from "../GameEvents";
import { SystemEvents } from "../Systems";
import HealthEvents from "./HealthEvents";

export type HealthEntity = "SHIP" | "PLAYER";

export abstract class HealthTracker {
  protected _damageTimer?: NodeJS.Timeout;
  private _currentHealth: number;
  private _roundDamageTaken: number = 0;

  constructor(
    maxHealth: number,
    private entityId: HealthEntity,
    protected _componentId: string,
    private healthRestorationSystem: string
  ) {
    this._currentHealth = maxHealth;
    this.addActivatedListeners();
  }

  private addActivatedListeners() {
    SystemEvents.addSystemListener({
      componentId: this._componentId,
      systemEventType: "ACTIVATED",
      system: this.healthRestorationSystem,
      action: () => this.onSystemActivated(),
    });
  }

  private onSystemActivated() {
    this.addHealth(Math.floor(this._roundDamageTaken / 2));
  }

  public removeHealth(healthToRemove: number) {
    if (this._currentHealth <= 0 || healthToRemove <= 0) {
      return;
    }

    this._roundDamageTaken += healthToRemove;

    this._currentHealth = Math.max(0, this._currentHealth - healthToRemove);
    this.onRemoveHealth();

    HealthEvents.onHealthChange(this._currentHealth, this.entityId);

    if (this._currentHealth === 0) {
      GameEvents.onGameOver();
    }
  }

  private addHealth(healthToAdd: number) {
    this._currentHealth += healthToAdd;
    HealthEvents.onHealthChange(this._currentHealth, this.entityId);
  }

  public onRoundEnd() {
    this.clearDamageTimer();
    this._roundDamageTaken = 0;
  }

  protected abstract onRemoveHealth(): void;

  protected clearDamageTimer() {
    if (this._damageTimer) {
      clearInterval(this._damageTimer);
      this._damageTimer = undefined;
    }
  }

  protected removeListener() {
    SystemEvents.removeSystemListener(
      this._componentId,
      this.healthRestorationSystem
    );
  }
}
