import { Container, Graphics, Text } from "pixi.js";
import { COMMON } from "../../constants";

export class Tooltip extends Container {
  constructor(text: string) {
    super();

    const tooltipText = new Text({
      text,
      style: {
        fontSize: COMMON.UI.TOOLTIP_DEFAULTS.FONT_SIZE,
        stroke: COMMON.UI.TOOLTIP_DEFAULTS.STROKE,
        wordWrap: true,
        wordWrapWidth: COMMON.UI.TOOLTIP_DEFAULTS.WORD_WRAP_WIDTH,
      },
    });

    const background = new Graphics();
    background
      .roundRect(
        -COMMON.UI.TOOLTIP_DEFAULTS.PADDING,
        -COMMON.UI.TOOLTIP_DEFAULTS.PADDING,
        tooltipText.width + 2 * COMMON.UI.TOOLTIP_DEFAULTS.PADDING,
        tooltipText.height + 2 * COMMON.UI.TOOLTIP_DEFAULTS.PADDING,
        COMMON.UI.TOOLTIP_DEFAULTS.BACKGROUND_CORNER_RADIUS
      )
      .fill(COMMON.UI.TOOLTIP_DEFAULTS.BACKGROUND_FILL)
      .stroke(COMMON.UI.TOOLTIP_DEFAULTS.BORDER_STROKE);

    this.addChild(background);
    this.addChild(tooltipText);
  }
}
