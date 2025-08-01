import { Container } from "pixi.js";
import UIEvents from "./UIEvents";
import { TooltipManager } from "./TooltipManager";
import SystemMonitor from "./SystemMonitor";
import { MAIN } from "../../../constants";

export class GameUI extends Container {
  private _tooltipManager = new TooltipManager();
  private _systemMonitor = new SystemMonitor();

  constructor() {
    super();

    this._systemMonitor.x = MAIN.UI.SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING;

    this.addChild(this._systemMonitor);
    this.addChild(this._tooltipManager);
    UIEvents.setTooltipManager(this._tooltipManager);
  }

  public resize(width: number, height: number) {
    this._systemMonitor.y =
      height -
      this._systemMonitor.height -
      MAIN.UI.SYSTEM_MONITOR_DEFAULTS.MONITOR_PADDING;
  }

  public cleanup() {
    UIEvents.cleanup();
    this._systemMonitor.cleanup();
    this.destroy();
  }
}
