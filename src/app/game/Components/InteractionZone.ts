import { Container } from "pixi.js";
import { Zone } from "./Zone";
import { Inputs } from "../Utils/keyboardEventHandler";
import { KEY_BINDINGS } from "../keyBindings";

export class InteractionZone extends Zone {
  public playerInZone: boolean = false;

  constructor(
    private id: string,
    enabled: boolean,
    zone: Container,
    private onInteract: () => void,
    private _onEnter?: () => void,
    private _onExit?: () => void
  ) {
    super(enabled, zone);
  }

  public onEnter() {
    this.playerInZone = true;

    if (this._onEnter) {
      this._onEnter();
    }

    Inputs.Keyboard?.addKeyUpHandler({
      key: KEY_BINDINGS.PLAYER_CONTROLS.INTERACT,
      action: this.onInteract,
      componentId: this.id,
    });
  }

  public onExit() {
    this.playerInZone = false;

    if (this._onExit) {
      this._onExit();
    }

    Inputs.Keyboard?.removeKeyUpHandler(
      this.id,
      KEY_BINDINGS.PLAYER_CONTROLS.INTERACT
    );
  }
}
