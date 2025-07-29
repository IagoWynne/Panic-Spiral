import { TooltipManager } from "./TooltipManager";
import { OpenTooltipRequest } from "./types";

class UIEvents {
  private _tooltipManager?: TooltipManager;

  public setTooltipManager(tooltipManager: TooltipManager) {
    this._tooltipManager = tooltipManager;
  }

  public openTooltip(request: OpenTooltipRequest): string {
    return this._tooltipManager?.openTooltip(request) ?? "";
  }

  public closeTooltip(tooltipId: string) {
    this._tooltipManager?.closeTooltip(tooltipId);
  }

  public cleanup() {
    this._tooltipManager = undefined;
  }
}

export default new UIEvents();
