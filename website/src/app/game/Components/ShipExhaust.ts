import { AnimatedSprite, Container, Texture } from "pixi.js";

export class ShipExhaust extends Container {
  constructor(scale: number = 2) {
    super();

    const frames = Array.from({ length: 14 }, (_, i) =>
      Texture.from(`fire_${i + 1}`)
    );

    const animatedSprite = new AnimatedSprite(frames);
    animatedSprite.animationSpeed = 0.5;
    animatedSprite.anchor.set(0.5);
    animatedSprite.loop = true;
    animatedSprite.scale = scale;
    animatedSprite.rotation = -0.5 * Math.PI;
    animatedSprite.play();

    this.addChild(animatedSprite);
  }
}
