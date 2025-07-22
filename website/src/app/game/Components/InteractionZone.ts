import { Container, Text } from "pixi.js";
import { Zone } from "./Zone";

export class InteractionZone extends Zone {
  public playerInZone: boolean = false;
  private _inZoneText: Text = new Text({ text: "I" });

  constructor(enabled: boolean, zone: Container) {
    super(enabled, zone);
  }

  public onEnter() {
    this.playerInZone = true;
    this._zone.addChild(this._inZoneText);
  }

  public onExit() {
    this.playerInZone = false;
    this._zone.removeChild(this._inZoneText);
  }
}
