import GameEvents from "../GameEvents";
import HealthEvents from "./HealthEvents";

export type HealthEntity = "SHIP" | "PLAYER";

export abstract class HealthTracker {
  protected _damageTimer?: NodeJS.Timeout;
  private _currentHealth: number;

  constructor(
    maxHealth: number,
    private entityId: HealthEntity,
    protected _componentId: string
  ) {
    this._currentHealth = maxHealth;
  }

  public removeHealth(healthToRemove: number) {
    if (this._currentHealth <= 0 || healthToRemove <= 0) {
      return;
    }

    this._currentHealth = Math.max(0, this._currentHealth - healthToRemove);
    this.onRemoveHealth();

    HealthEvents.onHealthChange(this._currentHealth, this.entityId);

    if (this._currentHealth === 0) {
      GameEvents.onGameOver();
    }
  }

  public onRoundEnd() {
    this.clearDamageTimer();
  }

  protected abstract onRemoveHealth(): void;

  protected clearDamageTimer() {
    if (this._damageTimer) {
      clearInterval(this._damageTimer);
      this._damageTimer = undefined;
    }
  }
}
