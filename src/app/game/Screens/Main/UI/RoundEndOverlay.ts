import { Container, Graphics, Text, TextStyleOptions } from "pixi.js";
import { COMMON, MAIN } from "../../../constants";
import { Button } from "../../../UI";
import { i18n, i18nKeys } from "../../../Utils";
import { KEY_BINDINGS } from "../../../keyBindings";
import { RoundStats, SystemStats } from "../Rounds";
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

    const scoreHeader = new Text({
      text: i18n(i18nKeys.SCORE_HEADER),
      style: { fontSize: MAIN.UI.ROUND_END.SCORE_HEADER_FONT_SIZE },
      anchor: 0.5,
      x: MAIN.UI.ROUND_END.OVERLAY_WIDTH / 2,
      y:
        headerText.y +
        headerText.height +
        MAIN.UI.ROUND_END.HEADER_PADDING.BOTTOM,
    });

    const scoreSection = this.buildScoreSection(stats);
    scoreSection.y =
      scoreHeader.y +
      scoreHeader.height +
      MAIN.UI.ROUND_END.SCORE_BREAKDOWN_PADDING.BOTTOM;

    scoreSection.x = (MAIN.UI.ROUND_END.OVERLAY_WIDTH - scoreSection.width) / 2;

    const scoreTotalText = new Text({
      text: `${i18n(i18nKeys.TOTAL)}: ${stats.endScore}`,
      style: { fontSize: MAIN.UI.ROUND_END.TOTAL_SCORE_FONT_SIZE },
      anchor: 0.5,
      x: MAIN.UI.ROUND_END.OVERLAY_WIDTH / 2,
      y:
        scoreSection.y +
        scoreSection.height +
        5 * MAIN.UI.ROUND_END.SCORE_BREAKDOWN_PADDING.BOTTOM,
    });

    const nextRoundButton = this.buildNextRoundButton(onNextRoundPressed);

    contentContainer.addChild(headerText);
    contentContainer.addChild(scoreHeader);
    contentContainer.addChild(scoreSection);
    contentContainer.addChild(scoreTotalText);
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

  private buildScoreSection(stats: RoundStats): Container {
    const scoreContainer = new Container();

    const table = new Container({});
    const nameColumn = new Container();
    const valueColumn = new Container();

    table.addChild(nameColumn);
    table.addChild(valueColumn);
    scoreContainer.addChild(table);

    const style = { fontSize: MAIN.UI.ROUND_END.SCORE_BREAKDOWN_FONT_SIZE };

    this.addRow(
      nameColumn,
      valueColumn,
      i18n(i18nKeys.START),
      `  ${stats.startingScore}`,
      style,
      MAIN.UI.ROUND_END.SCORE_BREAKDOWN_PADDING.BOTTOM
    );

    this.addRow(
      nameColumn,
      valueColumn,
      i18n(i18nKeys.DISTANCE),
      `+ ${
        stats.endScore - MAIN.SCORE.ROUND_COMPLETION_BONUS - stats.startingScore
      }`,
      style,
      MAIN.UI.ROUND_END.SCORE_BREAKDOWN_PADDING.BOTTOM
    );

    this.addRow(
      nameColumn,
      valueColumn,
      i18n(i18nKeys.ROUND_COMPLETE_BONUS),
      `+ ${MAIN.SCORE.ROUND_COMPLETION_BONUS}`,
      style,
      MAIN.UI.ROUND_END.SCORE_BREAKDOWN_PADDING.BOTTOM
    );

    valueColumn.x =
      nameColumn.width + MAIN.UI.ROUND_END.SCORE_BREAKDOWN_PADDING.RIGHT;

    return scoreContainer;
  }

  private addRow(
    colA: Container,
    colB: Container,
    name: string,
    val: number | string,
    style: TextStyleOptions,
    rowSpacing: number
  ) {
    const prevItem = colA.children.at(-1);

    const y = prevItem ? prevItem.y + prevItem.height + rowSpacing : 0;

    colA.addChild(
      new Text({
        text: `${name}:`,
        y,
        style,
      })
    );
    colB.addChild(
      new Text({
        text: val,
        y,
        style,
      })
    );
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
