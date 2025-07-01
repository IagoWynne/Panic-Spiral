import {
  Container,
  Graphics,
  Sprite,
  StrokeInput,
  Text,
  Texture,
} from "pixi.js";
import { AUDIO_FILE_ALIASES, GameAudio } from "../../Utils/audio";
import { Inputs } from "../../Utils/keyboardEventHandler";

export class Button extends Container {
  public onPressed?: () => void;

  private _sprite: Sprite;
  private _hoverGraphic: Graphics;
  private _text: Text;

  private _outline: StrokeInput = { color: "#fc0e1c", width: 2 };

  constructor(
    private _id: string,
    text: string,
    private _keyboardShortcut?: string
  ) {
    super();

    this.eventMode = "static";
    this.cursor = "pointer";

    this._sprite = new Sprite(Texture.from("button-background"));
    this._sprite.scale = 0.75;
    this._sprite.anchor = 0.5;

    this._hoverGraphic = new Graphics();
    this._hoverGraphic.fillStyle = { color: "#ffffff11" };
    this._hoverGraphic.rect(
      -this._sprite.width / 2,
      -this._sprite.height / 2 + 18,
      this._sprite.width,
      30
    );
    this._hoverGraphic.fill();
    this._hoverGraphic.visible = false;

    this._text = new Text({
      text,
      anchor: 0.5,
      style: { fontSize: 20 },
      y: -6,
    });

    this.on("pointerover", () => this._onPointerOver());
    this.on("pointerout", () => this._onPointerOut());
    this.on("pointertap", () => this._onPointerTap());

    this.addChild(this._sprite);
    this.addChild(this._hoverGraphic);
    this.addChild(this._text);
  }

  public addListeners() {
    if (this._keyboardShortcut) {
      Inputs.Keyboard?.addKeyUpHandler({
        componentId: this._id,
        key: this._keyboardShortcut,
        action: () => this._onPointerTap(),
      });
    }
  }

  public cleanup() {
    Inputs.Keyboard?.removeAllComponentKeyHandlers(this._id);
  }

  private _onPointerOver() {
    this._text.style.stroke = this._outline;
    GameAudio.SFX?.play(AUDIO_FILE_ALIASES.UI.BUTTON_HOVER);
  }

  private _onPointerOut() {
    this._text.style.stroke = { width: 0 };
  }

  private _onPointerTap() {
    GameAudio.SFX?.play(AUDIO_FILE_ALIASES.UI.BUTTON_CLICK);
    this.onPressed?.();
  }
}
