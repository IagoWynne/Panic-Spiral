import { Container, Graphics } from "pixi.js";
import { InteractionZone } from "../../../Components";
import { MAIN } from "../../../constants";
import { UIEvents } from "../UI";
import SystemEvents from "./SystemEvents";
import { AUDIO_FILE_ALIASES, GameAudio } from "@/app/game/Utils/audio";

export class PilotingTerminal extends Container {
  public interactionZone: InteractionZone;
  private _activated: boolean = false;
  private _tooltipId?: string;
  private _activationDuration: number;
  private _deactivationTimer?: NodeJS.Timeout;
  private _cooldownBarUpdateTimer?: NodeJS.Timeout;
  private _cooldownBar: Graphics;
  private _remainingCooldown = 0;

  constructor(
    private id: string,
    tileSize: number,
    interactionZoneWidth: number,
    interactionZoneHeight: number,
    private _tooltipText: string = MAIN.SYSTEMS.DEFAULT_PILOTING_TEXT
  ) {
    super();

    this._activationDuration =
      MAIN.SYSTEMS.PILOTING_TERMINAL_ACTIVE_DURATION[id];

    const collisionBox = new Graphics()
      .rect(
        0,
        0,
        interactionZoneWidth * tileSize,
        interactionZoneHeight * tileSize
      )
      .stroke({ color: "#00000000" });

    this.addChild(collisionBox);

    this._cooldownBar = new Graphics()
      .rect(
        0,
        -MAIN.UI.PILOTING_TERMINAL.COOLDOWN_BAR_OFFSET,
        MAIN.UI.PILOTING_TERMINAL.COOLDOWN_BAR_STARTING_WIDTH,
        5
      )
      .fill(MAIN.UI.PILOTING_TERMINAL.COOLDOWN_BAR_COLOUR);

    this._cooldownBar.visible = false;

    this.addChild(this._cooldownBar);

    this.interactionZone = new InteractionZone(
      this.id,
      true,
      collisionBox,
      () => this.onInteract(),
      () => this.onEnter(),
      () => this.onExit()
    );
  }

  private onInteract() {
    if (this._activated) {
      return;
    }

    this.activate();
  }

  private activate() {
    this._activated = true;

    this.closeInteractionTooltip();
    SystemEvents.onSystemActivated(MAIN.SYSTEMS.SYSTEM_IDS.PILOTING);

    this._deactivationTimer = setTimeout(
      () => this.deactivate(),
      this._activationDuration
    );

    this._remainingCooldown = this._activationDuration;
    this._cooldownBar.width =
      MAIN.UI.PILOTING_TERMINAL.COOLDOWN_BAR_STARTING_WIDTH;
    this._cooldownBar.visible = true;

    this._cooldownBarUpdateTimer = setInterval(
      () => this.updateCooldownBar(),
      1000
    );

    GameAudio.SFX?.play(AUDIO_FILE_ALIASES.MAIN.PILOTING_ACTIVATED, 0.25);
  }

  private deactivate() {
    this.clearTimers();

    this._activated = false;
    this._cooldownBar.visible = false;

    SystemEvents.onSystemDeactivated(MAIN.SYSTEMS.SYSTEM_IDS.PILOTING);
    GameAudio.SFX?.play(AUDIO_FILE_ALIASES.MAIN.PILOTING_DEACTIVATED, 0.25);
  }

  private updateCooldownBar() {
    this._remainingCooldown -= 1000;

    this._cooldownBar.width =
      (this._remainingCooldown / this._activationDuration) *
      MAIN.UI.PILOTING_TERMINAL.COOLDOWN_BAR_STARTING_WIDTH;
  }

  private onEnter() {
    if (!this._activated) {
      this.openInteractionTooltip();
    }
  }

  private openInteractionTooltip() {
    this._tooltipId = UIEvents.openTooltip({
      text: this._tooltipText,
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
    this.closeInteractionTooltip();
  }

  private closeInteractionTooltip() {
    if (this._tooltipId) {
      UIEvents.closeTooltip(this._tooltipId);
      this._tooltipId = undefined;
    }
  }

  private clearTimers() {
    if (this._deactivationTimer) {
      clearTimeout(this._deactivationTimer);
      this._deactivationTimer = undefined;
    }

    if (this._cooldownBarUpdateTimer) {
      clearInterval(this._cooldownBarUpdateTimer);
      this._cooldownBarUpdateTimer = undefined;
    }
  }

  public onRoundEnd() {
    this._cooldownBar.visible = false;
    this.clearTimers();
    this._activated = false;
  }

  public cleanup() {
    this.clearTimers();
  }
}
