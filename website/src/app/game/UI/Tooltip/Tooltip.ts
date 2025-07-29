import { Container, Graphics, Text } from "pixi.js";
import { TOOLTIP_DEFAULTS } from "../../constants/UI";

export class Tooltip extends Container {
  constructor(text: string) {
    super();

    const tooltipText = new Text({
      text,
      style: {
        fontSize: TOOLTIP_DEFAULTS.FONT_SIZE,
        stroke: TOOLTIP_DEFAULTS.STROKE,
        wordWrap: true,
        wordWrapWidth: TOOLTIP_DEFAULTS.WORD_WRAP_WIDTH,
      },
    });

    const background = new Graphics();
    background
      .roundRect(
        -TOOLTIP_DEFAULTS.PADDING,
        -TOOLTIP_DEFAULTS.PADDING,
        tooltipText.width + 2 * TOOLTIP_DEFAULTS.PADDING,
        tooltipText.height + 2 * TOOLTIP_DEFAULTS.PADDING,
        TOOLTIP_DEFAULTS.BACKGROUND_CORNER_RADIUS
      )
      .fill(TOOLTIP_DEFAULTS.BACKGROUND_FILL)
      .stroke(TOOLTIP_DEFAULTS.BORDER_STROKE);

    this.addChild(background);
    this.addChild(tooltipText);
  }
}
