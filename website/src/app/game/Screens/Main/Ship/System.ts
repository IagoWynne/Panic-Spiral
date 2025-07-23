import { InteractionZone } from "../../../Components";
import { Inputs } from "../../../Utils/keyboardEventHandler";
import { Container, Graphics } from "pixi.js";

export class System extends Container {
  public interactionZone: InteractionZone;
  private _collisionBox: Graphics;

  constructor(
    private id: string,
    tileSize: number,
    interactionZoneWidth: number,
    interactionZoneHeight: number
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
      true,
      this._collisionBox,
      this.onInteract.bind(this)
    );
  }

  public cleanup() {
    Inputs.Keyboard?.removeAllComponentKeyHandlers(this.id);
  }

  protected onInteract() {
    console.log(`Interacted with ${this.id}`);
  }
}
