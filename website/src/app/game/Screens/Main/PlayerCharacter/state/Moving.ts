import { AnimatedSprite, Texture } from "pixi.js";
import { IdleState, IdleStates } from "./Idle";
import { PLAYER_MOVEMENT } from "../../../../constants/PlayerMovement";

export interface MovingState {
  sprite: AnimatedSprite;
  updatePosition: (x: number, y: number, delta: number) => [number, number];
  idle: IdleState;
}

export interface MovingStates {
  up: MovingState;
  left: MovingState;
  down: MovingState;
  right: MovingState;
}

const initMovingStates = (idleStates: IdleStates): MovingStates => {
  return {
    up: {
      sprite: getMovementSprite("back"),
      updatePosition: (x: number, y: number, delta: number) => {
        return [x, y - PLAYER_MOVEMENT.MOVEMENT_SPEED_MODIFIER * delta];
      },
      idle: idleStates.up,
    },
    left: {
      sprite: getMovementSprite("left"),
      updatePosition: (x: number, y: number, delta: number) => {
        return [x - PLAYER_MOVEMENT.MOVEMENT_SPEED_MODIFIER * delta, y];
      },
      idle: idleStates.left,
    },
    down: {
      sprite: getMovementSprite("forward"),
      updatePosition: (x: number, y: number, delta: number) => {
        return [x, y + PLAYER_MOVEMENT.MOVEMENT_SPEED_MODIFIER * delta];
      },
      idle: idleStates.down,
    },
    right: {
      sprite: getMovementSprite("right"),
      updatePosition: (x: number, y: number, delta: number) => {
        return [x + PLAYER_MOVEMENT.MOVEMENT_SPEED_MODIFIER * delta, y];
      },
      idle: idleStates.right,
    },
  };
};

const getMovementSprite = (direction: string): AnimatedSprite => {
  const sprite = new AnimatedSprite(
    Array.from({ length: 8 }, (_, i) =>
      Texture.from(`player-${direction}-${i}`)
    )
  );
  sprite.animationSpeed = PLAYER_MOVEMENT.ANIMATION_SPEED;
  sprite.anchor = 0.5;

  return sprite;
};

export { initMovingStates };
