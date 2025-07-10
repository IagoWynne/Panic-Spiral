import { Container, Ticker } from "pixi.js";
import { PlayerMovementController } from "./PlayerMovementController";
import { Inputs } from "../../../Utils/keyboardEventHandler";
import { Tile } from "../../../Components";

export class PlayerCharacter extends Container {
  private _componentId: string = "player-character";
  private _movementController: PlayerMovementController;

  constructor(walls: Tile[]) {
    super();

    this._movementController = new PlayerMovementController(
      this._componentId,
      this,
      walls
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
