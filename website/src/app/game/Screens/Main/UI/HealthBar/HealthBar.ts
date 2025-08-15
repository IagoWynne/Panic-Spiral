import { Container, Graphics, Text } from "pixi.js";
import { HealthEntity } from "../../HealthTracker";
import { MAIN } from "../../../../constants";
import { i18n } from "../../../../Utils";

export class HealthBar extends Container {
  private _healthBlocks: Graphics[] = [];

  constructor(maxHealth: number, healthEntity: HealthEntity) {
    super();

    const label = new Text({
      text: i18n(healthEntity),
      style: {
        stroke: {
          color: MAIN.UI.HEALTH_BAR.LABEL_STROKE.COLOUR,
          width: MAIN.UI.HEALTH_BAR.LABEL_STROKE.WIDTH,
        },
      },
      x: MAIN.UI.HEALTH_BAR.LABEL_PADDING.LEFT,
      y: MAIN.UI.HEALTH_BAR.LABEL_PADDING.TOP,
    });

    const background = new Graphics()
      .roundRect(
        0,
        0,
        MAIN.UI.HEALTH_BAR.WIDTH +
          MAIN.UI.HEALTH_BAR.LABEL_PADDING.LEFT +
          label.width,
        MAIN.UI.HEALTH_BAR.HEIGHT +
          MAIN.UI.HEALTH_BAR.PADDING.TOP +
          MAIN.UI.HEALTH_BAR.PADDING.BOTTOM,
        MAIN.UI.HEALTH_BAR.CORNER_RADIUS
      )
      .fill(MAIN.UI.HEALTH_BAR.BACKGROUND_FILL)
      .stroke({
        color: MAIN.UI.HEALTH_BAR.STROKE_COLOUR,
        width: MAIN.UI.HEALTH_BAR.STROKE_WIDTH,
      });

    const healthBlockContainer = this.buildHealthBlocks(maxHealth);
    healthBlockContainer.x =
      MAIN.UI.HEALTH_BAR.LABEL_PADDING.LEFT + label.width;

    this.addChild(background);
    this.addChild(healthBlockContainer);
    this.addChild(label);
  }

  private buildHealthBlocks(maxHealth: number): Container {
    const healthBlockContainer = new Container({
      y: MAIN.UI.HEALTH_BAR.PADDING.TOP,
    });

    const healthBlockWidth = this.getHealthBlockWidth(maxHealth);

    for (let i = 0; i < maxHealth; i++) {
      const healthBlock = new Graphics()
        .rect(
          i * (MAIN.UI.HEALTH_BAR.BLOCK_PADDING + healthBlockWidth),
          0,
          healthBlockWidth,
          MAIN.UI.HEALTH_BAR.HEIGHT
        )
        .fill(MAIN.UI.HEALTH_BAR.FILL.SHIP);

      this._healthBlocks.push(healthBlock);
      healthBlockContainer.addChild(healthBlock);
    }

    return healthBlockContainer;
  }

  private getHealthBlockWidth(maxHealth: number) {
    return (
      (MAIN.UI.HEALTH_BAR.WIDTH -
        (maxHealth + 1) * MAIN.UI.HEALTH_BAR.BLOCK_PADDING) /
      maxHealth
    );
  }
}
