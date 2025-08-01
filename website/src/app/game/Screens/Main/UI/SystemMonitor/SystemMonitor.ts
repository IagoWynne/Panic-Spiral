import { Container, Graphics, Text } from "pixi.js";
import { SystemStatus } from "./SystemStatus";
import { SYSTEM_IDS } from "../../../../constants/Systems";
import {
  SYSTEM_MONITOR_DEFAULTS,
  TOOLTIP_DEFAULTS,
} from "../../../../constants/UI";

export class SystemMonitor extends Container {
  private _systemStatuses: SystemStatus[] = [];

  constructor() {
    super();

    const header = new Text({
      text: "Systems",
      style: { stroke: SYSTEM_MONITOR_DEFAULTS.STATUS_FONT_STROKE },
    });
    header.x = SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING;
    this.addChild(header);

    const engineMonitor = this.addStatusMonitor(SYSTEM_IDS.ENGINE, header);
    const medbayMonitor = this.addStatusMonitor(
      SYSTEM_IDS.MEDBAY,
      engineMonitor
    );
    const oxygenMonitor = this.addStatusMonitor(
      SYSTEM_IDS.OXYGEN,
      medbayMonitor
    );
    const reactorMonitor = this.addStatusMonitor(
      SYSTEM_IDS.REACTOR,
      oxygenMonitor
    );
    this.addStatusMonitor(SYSTEM_IDS.SHIELDS, reactorMonitor);

    const background = new Graphics()
      .roundRect(
        0,
        0,
        this.width + 2 * SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING,
        this.height + SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING,
        TOOLTIP_DEFAULTS.BACKGROUND_CORNER_RADIUS
      )
      .fill(TOOLTIP_DEFAULTS.BACKGROUND_FILL)
      .stroke(TOOLTIP_DEFAULTS.BORDER_STROKE);

    this.addChildAt(background, 0);
  }

  private addStatusMonitor(
    systemName: string,
    previousComponent: Container
  ): SystemStatus {
    const newMonitor = new SystemStatus(systemName);
    newMonitor.x = SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING;
    newMonitor.y =
      previousComponent.y +
      previousComponent.height +
      SYSTEM_MONITOR_DEFAULTS.STATUS_SPACING;

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
