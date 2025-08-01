import { Container, Graphics, Point, Text } from "pixi.js";
import { SystemEvents } from "../../Systems";
import { MAIN } from "../../../../constants";

export class SystemStatus extends Container {
  private _id: string;
  private _fineBackground: Graphics;
  private _brokenBackground: Graphics;
  private _text: Text;

  constructor(private systemName: string) {
    super();
    this._id = `monitor-${this.systemName}`;

    this._text = new Text({
      text: systemName,
      style: {
        stroke: {
          color: MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_FONT_STROKE,
          width: 2,
        },
        fontSize: MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_FONT_SIZE,
      },
    });

    const polygonPoints = [
      new Point(0, 0),
      new Point(MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_POLYGON_WIDTH, 0),
      new Point(
        MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_POLYGON_WIDTH -
          MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_POLYGON_INDENT,
        this._text.height + 2 * MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_PADDING
      ),
      new Point(
        0,
        this._text.height + 2 * MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_PADDING
      ),
    ];

    this._fineBackground = this.buildBackgroundPolygon(
      MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_FINE_BACKGROUND_FILL,
      polygonPoints
    );

    this._brokenBackground = this.buildBackgroundPolygon(
      MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_BROKEN_BACKGROUND_FILL,
      polygonPoints
    );
    this._brokenBackground.visible = false;

    this._text.x = MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_PADDING;
    this._text.y = MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_PADDING;

    this.addChild(this._brokenBackground);
    this.addChild(this._fineBackground);
    this.addChild(this._text);

    this.addListeners();
  }

  private buildBackgroundPolygon(
    colour: string,
    polygonPoints: Point[]
  ): Graphics {
    return new Graphics()
      .poly(polygonPoints)
      .fill(colour)
      .stroke(MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_BACKGROUND_STROKE);
  }

  private addListeners() {
    SystemEvents.addSystemListener({
      system: this.systemName,
      systemEventType: "BREAKDOWN",
      action: this.onBreakdown.bind(this),
      componentId: this._id,
    });

    SystemEvents.addSystemListener({
      system: this.systemName,
      systemEventType: "REPAIRED",
      action: this.onRepaired.bind(this),
      componentId: this._id,
    });
  }

  private onBreakdown() {
    this._fineBackground.visible = false;
    this._brokenBackground.visible = true;
  }

  private onRepaired() {
    this._fineBackground.visible = true;
    this._brokenBackground.visible = false;
  }

  public cleanup() {
    SystemEvents.removeSystemListener(this._id, this.systemName);
  }
}
