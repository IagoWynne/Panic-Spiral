import { Container, Graphics, Text } from "pixi.js";
import { COMMON, MAIN } from "../../../constants";
import { Button } from "../../../UI";
import { i18n, i18nKeys } from "../../../Utils";
import { KEY_BINDINGS } from "../../../keyBindings";
import { RoundStats } from "../Rounds";
import { sprintf } from "sprintf-js";

export class RoundEndOverlay extends Container {
  constructor(stats: RoundStats, onNextRoundPressed: () => void) {
    super();

    this.addBackground();

    const contentContainer = this.buildContentContainer(
      stats,
      onNextRoundPressed
    );

    this.addChild(contentContainer);
  }

  private addBackground() {
    const bgFade = new Graphics()
      .rect(0, 0, MAIN.UI.GAME_SIZE.WIDTH, MAIN.UI.GAME_SIZE.HEIGHT)
      .fill(COMMON.UI.OVERLAY_BACKGROUND_FADE);

    this.addChild(bgFade);

    const overlayOutline = new Graphics()
      .roundRect(
        MAIN.UI.ROUND_END.EXTERNAL_PADDING.X,
        MAIN.UI.ROUND_END.EXTERNAL_PADDING.Y,
        MAIN.UI.ROUND_END.OVERLAY_WIDTH,
        MAIN.UI.ROUND_END.OVERLAY_HEIGHT,
        MAIN.UI.ROUND_END.OVERLAY_CORNER_RADIUS
      )
      .fill(MAIN.UI.ROUND_END.OVERLAY_FILL)
      .stroke({
        color: MAIN.UI.ROUND_END.OVERLAY_STROKE_COLOUR,
        width: MAIN.UI.ROUND_END.OVERLAY_STROKE_WIDTH,
      });

    this.addChild(overlayOutline);
  }

  private buildContentContainer(
    stats: RoundStats,
    onNextRoundPressed: () => void
  ): Container {
    const contentContainer = new Container();
    contentContainer.x = MAIN.UI.ROUND_END.EXTERNAL_PADDING.X;
    contentContainer.y = MAIN.UI.ROUND_END.EXTERNAL_PADDING.Y;
    contentContainer.width = MAIN.UI.ROUND_END.OVERLAY_WIDTH;
    contentContainer.height = MAIN.UI.ROUND_END.OVERLAY_HEIGHT;

    const headerText = this.buildHeader(stats.num);
    const currentScoreText = this.buildCurrentScoreText(stats.endScore);

    currentScoreText.y =
      headerText.y +
      headerText.height +
      MAIN.UI.ROUND_END.HEADER_PADDING.BOTTOM;

    const nextRoundButton = this.buildNextRoundButton(onNextRoundPressed);

    contentContainer.addChild(headerText);
    contentContainer.addChild(currentScoreText);
    contentContainer.addChild(nextRoundButton);

    return contentContainer;
  }

  private buildHeader(roundNumber: number): Text {
    return new Text({
      text: sprintf(i18n(i18nKeys.ROUND_COMPLETE), roundNumber),
      style: { fontSize: MAIN.UI.ROUND_END.HEADER_FONT_SIZE },
      y: MAIN.UI.ROUND_END.HEADER_PADDING.TOP,
      x: MAIN.UI.ROUND_END.OVERLAY_WIDTH / 2,
      anchor: 0.5,
    });
  }

  private buildCurrentScoreText(score: number): Text {
    return new Text({
      text: sprintf(i18n(i18nKeys.CURRENT_SCORE), score),
      x: MAIN.UI.ROUND_END.OVERLAY_WIDTH / 2,
      anchor: 0.5,
    });
  }

  private buildNextRoundButton(onNextRoundPressed: () => void) {
    const nextRoundButton = new Button(
      "next-round-button",
      i18n(i18nKeys.NEXT_ROUND),
      KEY_BINDINGS.UI.ACCEPT,
      onNextRoundPressed
    );

    nextRoundButton.x = MAIN.UI.ROUND_END.OVERLAY_WIDTH / 2;
    nextRoundButton.y =
      MAIN.UI.ROUND_END.OVERLAY_HEIGHT -
      MAIN.UI.ROUND_END.NEXT_ROUND_BUTTON_PADDING.BOTTOM -
      nextRoundButton.height;

    return nextRoundButton;
  }
}
