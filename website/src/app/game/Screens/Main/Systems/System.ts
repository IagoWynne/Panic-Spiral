import { Container, Graphics } from "pixi.js";
import { InteractionZone } from "../../../Components";
import { Inputs } from "../../../Utils/keyboardEventHandler";
import SystemEvents from "./SystemEvents";
import { MAIN } from "../../../constants";
import { UIEvents } from "../UI";
import { AUDIO_FILE_ALIASES, GameAudio } from "../../../Utils/audio";

export abstract class System extends Container {
  public interactionZone: InteractionZone;
  public broken: boolean = false;
  private _collisionBox: Graphics;
  private _currentCooldown: number = 0;
  private _tooltipId?: string;

  constructor(
    private id: string,
    tileSize: number,
    interactionZoneWidth: number,
    interactionZoneHeight: number,
    private cooldown: number,
    private tooltipText: string = MAIN.SYSTEMS.DEFAULT_INTERACTION_TEXT
  ) {
    super();

    this._collisionBox = new Graphics()
      .rect(
        0,
        0,
        interactionZoneWidth * tileSize,
        interactionZoneHeight * tileSize
      )
      .stroke({ color: "#00000000" });

    this.addChild(this._collisionBox);

    this.interactionZone = new InteractionZone(
      this.id,
      false,
      this._collisionBox,
      this.onInteract.bind(this),
      this.onEnter.bind(this),
      this.onExit.bind(this)
    );
  }

  public cleanup() {
    Inputs.Keyboard?.removeAllComponentKeyHandlers(this.id);
  }

  private onEnter() {
    if (this.broken) {
      this.openInteractionTooltip();
    }
  }

  private openInteractionTooltip() {
    this._tooltipId = UIEvents.openTooltip({
      text: this.tooltipText,
      position: {
        x: this.x + MAIN.SYSTEMS.SYSTEM_TOOLTIP_OFFSET.X,
        y:
          this.y +
          MAIN.SYSTEMS.SYSTEM_TOOLTIP_OFFSET.Y +
          MAIN.SYSTEMS.SYSTEM_TOOLTIP_OFFSET.Y_MODIFIER,
      },
    });
  }

  private onExit() {
    if (this.broken) {
      this.closeInteractionTooltip();
    }
  }

  private closeInteractionTooltip() {
    if (this._tooltipId) {
      UIEvents.closeTooltip(this._tooltipId);
      this._tooltipId = undefined;
    }
  }

  private onInteract() {
    this.doInteraction();
  }

  protected abstract doInteraction: () => void;

  public checkForBreakdown(deltaMs: number): boolean {
    this._currentCooldown -= deltaMs;

    return this._currentCooldown <= 0 && this.doCheckForBreakdown();
  }

  protected abstract doCheckForBreakdown: () => boolean;

  protected onBreakdown() {
    this.interactionZone.enabled = true;
    this.broken = true;

    if (this.interactionZone.playerInZone) {
      this.openInteractionTooltip();
    }

    SystemEvents.onSystemBreakdown(this.id);
    GameAudio.SFX?.play(AUDIO_FILE_ALIASES.MAIN.SYSTEM_BREAK);
  }

  protected onRepair() {
    this._currentCooldown = this.cooldown;
    this.interactionZone.enabled = false;
    this.broken = false;
    this.closeInteractionTooltip();
    SystemEvents.onSystemRepaired(this.id);
    GameAudio.SFX?.play(AUDIO_FILE_ALIASES.MAIN.SYSTEM_REPAIR);
  }
}
