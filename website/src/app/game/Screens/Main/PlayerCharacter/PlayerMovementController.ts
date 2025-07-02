import { KEY_BINDINGS } from "@/app/game/keyBindings";
import { Inputs } from "@/app/game/Utils/keyboardEventHandler";
import { Sprite, AnimatedSprite, Ticker } from "pixi.js";
import { PlayerCharacter } from "./PlayerCharacter";
import { IdleStates, initIdleStates } from "./state/Idle";
import { MovingStates, MovingState, initMovingStates } from "./state/Moving";

export class PlayerMovementController {
  private _moveUpPressed = false;
  private _moveLeftPressed = false;
  private _moveRightPressed = false;
  private _moveDownPressed = false;

  private _sprite: Sprite | AnimatedSprite;

  private _idleStates: IdleStates;
  private _movingStates: MovingStates;

  private _movingState: MovingState | null = null;

  constructor(
    private _componentId: string,
    private _playerCharacter: PlayerCharacter
  ) {
    this._idleStates = initIdleStates();
    this._movingStates = initMovingStates(this._idleStates);

    this._sprite = this._idleStates.right.sprite;
    this._playerCharacter.addChild(this._sprite);
  }

  public addListeners() {
    this.addMoveUpListeners();
    this.addMoveLeftListeners();
    this.addMoveDownListeners();
    this.addMoveRightListeners();
  }

  public update(ticker: Ticker) {
    if (this._movingState) {
      [this._playerCharacter.x, this._playerCharacter.y] =
        this._movingState?.updatePosition(
          this._playerCharacter.x,
          this._playerCharacter.y,
          ticker.deltaMS
        );
    }
  }

  private updateState(newState?: MovingState) {
    this.removeCurrentSprite();

    if (newState) {
      this.updateMovementState(newState);
      return;
    }

    if (this._moveUpPressed) {
      this.updateMovementState(this._movingStates.up);
      return;
    }

    if (this._moveLeftPressed) {
      this.updateMovementState(this._movingStates.left);
      return;
    }

    if (this._moveDownPressed) {
      this.updateMovementState(this._movingStates.down);
      return;
    }

    if (this._moveRightPressed) {
      this.updateMovementState(this._movingStates.right);
      return;
    }

    this._sprite = this._movingState!.idle.sprite;
    this._movingState = null;
    this._playerCharacter.addChild(this._sprite);
  }

  private removeCurrentSprite() {
    const childIdx = this._playerCharacter.children.indexOf(this._sprite);
    if (childIdx > -1) {
      this._playerCharacter.removeChildAt(childIdx);
      if (this._sprite instanceof AnimatedSprite) {
        this._sprite.stop();
      }
    }
  }

  private updateMovementState(state: MovingState) {
    this._movingState = state;
    this._movingState.sprite.play();
    this._sprite = this._movingState.sprite;
    this._playerCharacter.addChild(this._sprite);
  }

  private addMoveUpListeners() {
    Inputs.Keyboard?.addKeyDownHandler({
      componentId: this._componentId,
      key: KEY_BINDINGS.PLAYER_CONTROLS.MOVE_UP,
      action: () => {
        this._moveUpPressed = true;
        this.updateState(this._movingStates.up);
      },
    });

    Inputs.Keyboard?.addKeyUpHandler({
      componentId: this._componentId,
      key: KEY_BINDINGS.PLAYER_CONTROLS.MOVE_UP,
      action: () => {
        this._moveUpPressed = false;
        this.updateState();
      },
    });
  }

  private addMoveLeftListeners() {
    Inputs.Keyboard?.addKeyDownHandler({
      componentId: this._componentId,
      key: KEY_BINDINGS.PLAYER_CONTROLS.MOVE_LEFT,
      action: () => {
        this._moveLeftPressed = true;
        this.updateState(this._movingStates.left);
      },
    });

    Inputs.Keyboard?.addKeyUpHandler({
      componentId: this._componentId,
      key: KEY_BINDINGS.PLAYER_CONTROLS.MOVE_LEFT,
      action: () => {
        this._moveLeftPressed = false;
        this.updateState();
      },
    });
  }

  private addMoveDownListeners() {
    Inputs.Keyboard?.addKeyDownHandler({
      componentId: this._componentId,
      key: KEY_BINDINGS.PLAYER_CONTROLS.MOVE_DOWN,
      action: () => {
        this._moveDownPressed = true;
        this.updateState(this._movingStates.down);
      },
    });

    Inputs.Keyboard?.addKeyUpHandler({
      componentId: this._componentId,
      key: KEY_BINDINGS.PLAYER_CONTROLS.MOVE_DOWN,
      action: () => {
        this._moveDownPressed = false;
        this.updateState();
      },
    });
  }

  private addMoveRightListeners() {
    Inputs.Keyboard?.addKeyDownHandler({
      componentId: this._componentId,
      key: KEY_BINDINGS.PLAYER_CONTROLS.MOVE_RIGHT,
      action: () => {
        this._moveRightPressed = true;
        this.updateState(this._movingStates.right);
      },
    });

    Inputs.Keyboard?.addKeyUpHandler({
      componentId: this._componentId,
      key: KEY_BINDINGS.PLAYER_CONTROLS.MOVE_RIGHT,
      action: () => {
        this._moveRightPressed = false;
        this.updateState();
      },
    });
  }
}
