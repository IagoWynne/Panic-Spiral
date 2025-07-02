import { Sprite, Texture } from "pixi.js";

export interface IdleState {
  sprite: Sprite;
}

export interface IdleStates {
  up: IdleState;
  left: IdleState;
  down: IdleState;
  right: IdleState;
}

const initIdleStates = (): IdleStates => ({
  up: {
    sprite: new Sprite({
      texture: Texture.from("player-back-0"),
      anchor: 0.5,
    }),
  },
  left: {
    sprite: new Sprite({
      texture: Texture.from("player-left-0"),
      anchor: 0.5,
    }),
  },
  down: {
    sprite: new Sprite({
      texture: Texture.from("player-forward-0"),
      anchor: 0.5,
    }),
  },
  right: {
    sprite: new Sprite({
      texture: Texture.from("player-right-0"),
      anchor: 0.5,
    }),
  },
});

export { initIdleStates };
