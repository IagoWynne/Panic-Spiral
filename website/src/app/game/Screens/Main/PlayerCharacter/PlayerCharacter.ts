import { Inputs } from "@/app/game/Utils/keyboardEventHandler";
import { Container, Ticker } from "pixi.js";
import { PlayerMovementController } from "./PlayerMovementController";

export class PlayerCharacter extends Container {
  private _componentId: string = "player-character";
  private _movementController: PlayerMovementController;

  constructor() {
    super();

    this._movementController = new PlayerMovementController(
      this._componentId,
      this
    );
  }

  public update(ticker: Ticker) {
    this._movementController.update(ticker);
  }

  public addListeners() {
    this._movementController.addListeners();
  }

  public cleanup() {
    Inputs.Keyboard?.removeAllComponentKeyHandlers(this._componentId);
  }
}
