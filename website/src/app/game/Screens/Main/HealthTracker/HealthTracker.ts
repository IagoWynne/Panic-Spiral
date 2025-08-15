import HealthEvents from "./HealthEvents";

export type HealthEntity = "SHIP";

export abstract class HealthTracker {
  private _currentHealth: number;

  constructor(maxHealth: number, private entityId: HealthEntity) {
    this._currentHealth = maxHealth;
  }

  public removeHealth(healthToRemove: number) {
    if (this._currentHealth <= 0 || healthToRemove <= 0) {
      return;
    }

    this._currentHealth = Math.max(0, this._currentHealth - healthToRemove);
    this.onRemoveHealth();

    HealthEvents.onHealthChange(this._currentHealth, this.entityId);
  }

  protected abstract onRemoveHealth(): void;
}
