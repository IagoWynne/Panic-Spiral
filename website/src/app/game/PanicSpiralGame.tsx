import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";
import BunnySprite from "./BunnySprite";
import { RefObject } from "react";

// extend tells @pixi/react what Pixi.js components are available
extend({
    Container,
    Graphics,
    Sprite
});

interface IGameProps {
    parentRef: HTMLElement | Window | RefObject<HTMLElement | null> | undefined
}

const PanicSpiralGame = ({parentRef}: IGameProps) => {
    return (
        // wrapping in application provides the pixijs app context
        <Application resizeTo={parentRef}>
            <BunnySprite />
        </Application>
    )
}

export default PanicSpiralGame;