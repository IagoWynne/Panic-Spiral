import { Container } from "pixi.js";

export class Zone {
    constructor(public enabled: boolean, protected _zone: Container) {

    }

    public getBounds() {
        return this._zone.getBounds();
    }
}