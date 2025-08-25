import { Container, Graphics, Ticker } from "pixi.js";
import { PlayerMovementController } from "./PlayerMovementController";
import { Inputs } from "../../../Utils/keyboardEventHandler";
import { NavigationService } from "../NavigationService";
import { HealthBar } from "./HealthBar";
import { MAIN } from "../../../constants";

export class PlayerCharacter extends Container {
  public collisionBox!: Graphics;
  private _componentId: string = "player-character";
  private _movementController: PlayerMovementController;
  private _healthBar = new HealthBar();

  constructor(navigationService: NavigationService) {
    super();

    this.setupCollisionBox();

    this._movementController = new PlayerMovementController(
      this._componentId,
      this,
      navigationService
    );

    this._healthBar.x = MAIN.UI.PLAYER_HEALTH_BAR.POSITION.X;
    this._healthBar.y = MAIN.UI.PLAYER_HEALTH_BAR.POSITION.Y;

    this.addChild(this._healthBar);
  }

  private setupCollisionBox() {
    this.collisionBox = new Graphics();

    // transparent as we don't actually want to see the collision box in game
    this.collisionBox.strokeStyle = { color: "#ff000000" };
    this.collisionBox.ellipse(0, 8, 2, 2);
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
    this._healthBar.cleanup();
    Inputs.Keyboard?.removeAllComponentKeyHandlers(this._componentId);
  }
}
