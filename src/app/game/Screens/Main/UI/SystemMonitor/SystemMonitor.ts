import { Container, Graphics, Text } from "pixi.js";
import { SystemStatus } from "./SystemStatus";
import { COMMON, MAIN } from "../../../../constants";

export class SystemMonitor extends Container {
  private _systemStatuses: SystemStatus[] = [];

  constructor() {
    super();

    const header = new Text({
      text: "Systems",
      style: { stroke: MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_FONT_STROKE },
    });
    header.x = MAIN.UI.SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING;
    this.addChild(header);

    const engineMonitor = this.addStatusMonitor(
      MAIN.SYSTEMS.SYSTEM_IDS.ENGINE,
      header
    );
    const medbayMonitor = this.addStatusMonitor(
      MAIN.SYSTEMS.SYSTEM_IDS.MEDBAY,
      engineMonitor
    );
    const oxygenMonitor = this.addStatusMonitor(
      MAIN.SYSTEMS.SYSTEM_IDS.OXYGEN,
      medbayMonitor
    );
    const reactorMonitor = this.addStatusMonitor(
      MAIN.SYSTEMS.SYSTEM_IDS.REACTOR,
      oxygenMonitor
    );
    this.addStatusMonitor(MAIN.SYSTEMS.SYSTEM_IDS.ENGINEERING, reactorMonitor);

    const background = new Graphics()
      .roundRect(
        0,
        0,
        this.width + 2 * MAIN.UI.SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING,
        this.height + MAIN.UI.SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING,
        COMMON.UI.TOOLTIP_DEFAULTS.BACKGROUND_CORNER_RADIUS
      )
      .fill(COMMON.UI.TOOLTIP_DEFAULTS.BACKGROUND_FILL)
      .stroke(COMMON.UI.TOOLTIP_DEFAULTS.BORDER_STROKE);

    this.addChildAt(background, 0);
  }

  private addStatusMonitor(
    systemName: string,
    previousComponent: Container
  ): SystemStatus {
    const newMonitor = new SystemStatus(systemName);
    newMonitor.x = MAIN.UI.SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING;
    newMonitor.y =
      previousComponent.y +
      previousComponent.height +
      MAIN.UI.SYSTEM_MONITOR_DEFAULTS.STATUS_SPACING;

    this._systemStatuses.push(newMonitor);
    this.addChild(newMonitor);

    return newMonitor;
  }

  public cleanup() {
    this._systemStatuses.forEach((systemStatus: SystemStatus) =>
      systemStatus.cleanup()
    );
  }
}
