import { MAIN } from "../../../constants";
import { Container, Graphics } from "pixi.js";

export class HealthBar extends Container {
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

    const healthRect = new Graphics()
      .rect(
        0,
        0,
        MAIN.UI.PLAYER_HEALTH_BAR.WIDTH,
        MAIN.UI.PLAYER_HEALTH_BAR.HEIGHT
      )
      .fill(MAIN.UI.PLAYER_HEALTH_BAR.HEALTHY_FILL_COLOUR);

    this.addChild(background);
    this.addChild(healthRect);
  }
}
