import { Container, Graphics, Text } from "pixi.js";
import { HealthEntity, HealthEvents } from "../../HealthTracker";
import { MAIN } from "../../../../constants";
import { i18n } from "../../../../Utils";

export class HealthBar extends Container {
  private _componentId: string;
  private _healthBlocks: Graphics[] = [];

  constructor(private maxHealth: number, private healthEntity: HealthEntity) {
    super();

    this._componentId = `health-bar-${healthEntity}`;

    const label = new Text({
      text: i18n(healthEntity),
      style: {
        stroke: {
          color: MAIN.UI.SHIP_HEALTH_BAR.LABEL_STROKE.COLOUR,
          width: MAIN.UI.SHIP_HEALTH_BAR.LABEL_STROKE.WIDTH,
        },
      },
      x: MAIN.UI.SHIP_HEALTH_BAR.LABEL_PADDING.LEFT,
      y: MAIN.UI.SHIP_HEALTH_BAR.LABEL_PADDING.TOP,
    });

    const background = new Graphics()
      .roundRect(
        0,
        0,
        MAIN.UI.SHIP_HEALTH_BAR.WIDTH +
          MAIN.UI.SHIP_HEALTH_BAR.LABEL_PADDING.LEFT +
          label.width,
        MAIN.UI.SHIP_HEALTH_BAR.HEIGHT +
          MAIN.UI.SHIP_HEALTH_BAR.PADDING.TOP +
          MAIN.UI.SHIP_HEALTH_BAR.PADDING.BOTTOM,
        MAIN.UI.SHIP_HEALTH_BAR.CORNER_RADIUS
      )
      .fill(MAIN.UI.SHIP_HEALTH_BAR.BACKGROUND_FILL)
      .stroke({
        color: MAIN.UI.SHIP_HEALTH_BAR.STROKE_COLOUR,
        width: MAIN.UI.SHIP_HEALTH_BAR.STROKE_WIDTH,
      });

    const healthBlockContainer = this.buildHealthBlocks(maxHealth);
    healthBlockContainer.x =
      MAIN.UI.SHIP_HEALTH_BAR.LABEL_PADDING.LEFT + label.width;

    this.addChild(background);
    this.addChild(healthBlockContainer);
    this.addChild(label);

    this.addListeners();
  }

  private buildHealthBlocks(maxHealth: number): Container {
    const healthBlockContainer = new Container({
      y: MAIN.UI.SHIP_HEALTH_BAR.PADDING.TOP,
    });

    const healthBlockWidth = this.getHealthBlockWidth(maxHealth);

    for (let i = 0; i < maxHealth; i++) {
      const healthBlock = new Graphics()
        .rect(
          i * (MAIN.UI.SHIP_HEALTH_BAR.BLOCK_PADDING + healthBlockWidth),
          0,
          healthBlockWidth,
          MAIN.UI.SHIP_HEALTH_BAR.HEIGHT
        )
        .fill(MAIN.UI.SHIP_HEALTH_BAR.FILL.SHIP);

      this._healthBlocks.push(healthBlock);
      healthBlockContainer.addChild(healthBlock);
    }

    return healthBlockContainer;
  }

  private getHealthBlockWidth(maxHealth: number) {
    return (
      (MAIN.UI.SHIP_HEALTH_BAR.WIDTH -
        (maxHealth + 1) * MAIN.UI.SHIP_HEALTH_BAR.BLOCK_PADDING) /
      maxHealth
    );
  }

  private addListeners() {
    HealthEvents.addHealthChangedListener({
      componentId: this._componentId,
      healthEntity: this.healthEntity,
      action: (remainingHealth: number) =>
        this.onHealthChanged(remainingHealth),
    });
  }

  private onHealthChanged(remainingHealth: number) {
    for (let i = remainingHealth; i < this.maxHealth; i++) {
      this._healthBlocks[i].visible = false;
    }
  }

  public cleanup() {
    HealthEvents.removeHealthChangedListeners(
      this._componentId,
      this.healthEntity
    );
  }
}
