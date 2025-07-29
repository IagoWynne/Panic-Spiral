import { Container } from "pixi.js";
import UIEvents from "./UIEvents";
import { TooltipManager } from "./TooltipManager";

export class GameUI extends Container {
  private _tooltipManager = new TooltipManager();

  constructor() {
    super();
    this.addChild(this._tooltipManager);
    UIEvents.setTooltipManager(this._tooltipManager);
  }

  public cleanup() {
    UIEvents.cleanup();
    this.destroy();
  }
}
