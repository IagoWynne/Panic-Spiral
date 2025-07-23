import { Container, Graphics, Ticker } from "pixi.js";
import { PlayerMovementController } from "./PlayerMovementController";
import { Inputs } from "../../../Utils/keyboardEventHandler";
import { NavigationService } from "../NavigationService";

export class PlayerCharacter extends Container {
  public collisionBox!: Graphics;
  private _componentId: string = "player-character";
  private _movementController: PlayerMovementController;

  constructor(navigationService: NavigationService) {
    super();

    this.setupCollisionBox();

    this._movementController = new PlayerMovementController(
      this._componentId,
      this,
      navigationService
    );
  }

  private setupCollisionBox() {
    this.collisionBox = new Graphics();

    // transparent as we don't actually want to see the collision box in game
    this.collisionBox.strokeStyle = { color: "#ff000000" };
    this.collisionBox.ellipse(0, 8, 4, 4);
    this.collisionBox.stroke();

    this.addChild(this.collisionBox);
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
