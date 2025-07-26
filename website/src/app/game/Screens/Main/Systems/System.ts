import { InteractionZone } from "../../../Components";
import { Inputs } from "../../../Utils/keyboardEventHandler";
import { Container, Graphics } from "pixi.js";
import SystemEvents from "./SystemEvents";

export abstract class System extends Container {
  public interactionZone: InteractionZone;
  public broken: boolean = false;
  private _collisionBox: Graphics;
  private _currentCooldown: number = 0;

  constructor(
    private id: string,
    tileSize: number,
    interactionZoneWidth: number,
    interactionZoneHeight: number,
    private cooldown: number
  ) {
    super();

    this._collisionBox = new Graphics()
      .rect(
        0,
        0,
        interactionZoneWidth * tileSize,
        interactionZoneHeight * tileSize
      )
      .stroke({ color: "#0000ffff" });

    this.addChild(this._collisionBox);

    this.interactionZone = new InteractionZone(
      this.id,
      false,
      this._collisionBox,
      this.onInteract.bind(this)
    );
  }

  public cleanup() {
    Inputs.Keyboard?.removeAllComponentKeyHandlers(this.id);
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
    SystemEvents.onSystemBreakdown(this.id);
  }

  protected onRepair() {
    this._currentCooldown = this.cooldown;
    this.interactionZone.enabled = false;
    this.broken = false;
    SystemEvents.onSystemRepaired(this.id);
  }
}
