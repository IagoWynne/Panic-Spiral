import { Container, Sprite, Texture } from "pixi.js";

export class PlayerCharacter extends Container {
    constructor() {
        super();

        const sprite = new Sprite(Texture.from("player-forward-0"));
        sprite.anchor = 0.5;

        this.addChild(sprite);
    }
}