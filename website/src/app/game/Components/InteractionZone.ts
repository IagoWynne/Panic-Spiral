import { Container, Text } from "pixi.js";
import { Zone } from "./Zone";
import { Inputs } from "../Utils/keyboardEventHandler";
import { KEY_BINDINGS } from "../keyBindings";

export class InteractionZone extends Zone {
  public playerInZone: boolean = false;

  constructor(
    private id: string,
    enabled: boolean,
    zone: Container,
    private onInteract: () => void
  ) {
    super(enabled, zone);
  }

  public onEnter() {
    this.playerInZone = true;
    console.log(`Player entered ${this.id}`);
    Inputs.Keyboard?.addKeyUpHandler({
      key: KEY_BINDINGS.PLAYER_CONTROLS.INTERACT,
      action: this.onInteract,
      componentId: this.id,
    });
  }

  public onExit() {
    this.playerInZone = false;
    console.log(`Player exited ${this.id}`);
    Inputs.Keyboard?.removeKeyUpHandler(
      this.id,
      KEY_BINDINGS.PLAYER_CONTROLS.INTERACT
    );
  }
}
