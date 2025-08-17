import { Container } from "pixi.js";
import { OpenTooltipRequest } from "./types";
import { Tooltip } from "../../../UI";
import { nanoid } from "nanoid";

export class TooltipManager extends Container {
  private _existingTooltips: Map<string, Tooltip> = new Map();

  public openTooltip(request: OpenTooltipRequest): string {
    const tooltipId = nanoid();

    const tooltip = new Tooltip(request.text);
    tooltip.x = request.position.x;
    tooltip.y = request.position.y;

    this._existingTooltips.set(tooltipId, tooltip);

    this.addChild(tooltip);

    return tooltipId;
  }

  public closeTooltip(tooltipId: string) {
    const tooltip = this._existingTooltips.get(tooltipId);

    if (!tooltip) {
      return;
    }

    this._existingTooltips.delete(tooltipId);

    this.removeChild(tooltip);
    tooltip.destroy();
  }
}
