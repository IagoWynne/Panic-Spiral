import { MAIN } from "../../../constants";
import { Container, Graphics } from "pixi.js";
import { HealthEntity, HealthEvents } from "../HealthTracker";

export class HealthBar extends Container {
  private _componentId = "player-health-bar";
  private _healthEntity: HealthEntity = "PLAYER";
  private _healthRect: Graphics;
  private _damageRect: Graphics;
  private _damageRectVisibleTimer?: NodeJS.Timeout;

  constructor() {
    super();

    const background = new Graphics()
      .rect(
        0,
        0,
        MAIN.UI.PLAYER_HEALTH_BAR.WIDTH,
        MAIN.UI.PLAYER_HEALTH_BAR.HEIGHT
      )
      .fill(MAIN.UI.PLAYER_HEALTH_BAR.BACKGROUND_FILL_COLOUR);

    this._healthRect = new Graphics()
      .rect(
        0,
        0,
        MAIN.UI.PLAYER_HEALTH_BAR.WIDTH,
        MAIN.UI.PLAYER_HEALTH_BAR.HEIGHT
      )
      .fill(MAIN.UI.PLAYER_HEALTH_BAR.BASE_FILL);

    this._healthRect.tint = MAIN.UI.PLAYER_HEALTH_BAR.TINT.HEALTHY;

    this._damageRect = new Graphics()
      .rect(
        0,
        0,
        MAIN.UI.PLAYER_HEALTH_BAR.WIDTH,
        MAIN.UI.PLAYER_HEALTH_BAR.HEIGHT
      )
      .fill(MAIN.UI.PLAYER_HEALTH_BAR.DAMAGE_TAKEN_FILL_COLOR);

    this._damageRect.visible = false;

    this.addChild(background);
    this.addChild(this._healthRect);
    this.addChild(this._damageRect);

    this.addListeners();
  }

  private addListeners() {
    HealthEvents.addHealthChangedListener({
      componentId: this._componentId,
      healthEntity: this._healthEntity,
      action: (remainingHealth: number) =>
        this.onHealthChanged(remainingHealth),
    });
  }

  private onHealthChanged(remainingHealth: number) {
    let colour = MAIN.UI.PLAYER_HEALTH_BAR.TINT.HEALTHY;

    const remainingPercentage = remainingHealth / MAIN.PLAYER.MAX_HEALTH;

    if (remainingPercentage <= MAIN.UI.PLAYER_HEALTH_BAR.THRESHOLDS.DANGER) {
      colour = MAIN.UI.PLAYER_HEALTH_BAR.TINT.DANGER;
    } else if (
      remainingPercentage <= MAIN.UI.PLAYER_HEALTH_BAR.THRESHOLDS.WARNING
    ) {
      colour = MAIN.UI.PLAYER_HEALTH_BAR.TINT.WARNING;
    }

    const newWidth = Math.round(
      (remainingHealth / MAIN.PLAYER.MAX_HEALTH) *
        MAIN.UI.PLAYER_HEALTH_BAR.WIDTH
    );

    this._healthRect.width = newWidth;
    this._healthRect.tint = colour;
    this._damageRect.visible = true;

    this._damageRectVisibleTimer = setTimeout(() => {
      this._damageRect.visible = false;
      this._damageRect.width = newWidth;
      this.clearDamageRectVisibleTimer();
    }, MAIN.UI.PLAYER_HEALTH_BAR.DAMAGE_TAKEN_VISIBLE_MS);
  }

  private clearDamageRectVisibleTimer() {
    if (this._damageRectVisibleTimer) {
      clearTimeout(this._damageRectVisibleTimer);
      this._damageRectVisibleTimer = undefined;
    }
  }

  public cleanup() {
    this.clearDamageRectVisibleTimer();
    HealthEvents.removeHealthChangedListeners(
      this._componentId,
      this._healthEntity
    );
  }
}
