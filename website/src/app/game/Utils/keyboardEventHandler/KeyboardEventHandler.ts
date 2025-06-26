export interface IKeyboardEventHandler {
  addKeyDownHandler: (keyEventHandler: KeyEventHandler) => void;
  removeKeyDownHandler: (componentId: string, key: string) => void;
  addKeyUpHandler: (keyEventHandler: KeyEventHandler) => void;
  removeKeyUpHandler: (componentId: string, key: string) => void;
}

interface KeyEventHandler {
  componentId: string;
  key: string;
  action: () => void;
}

export class KeyboardEventHandler implements IKeyboardEventHandler {
  private keyDownHandlers: KeyEventHandler[];
  private keyUpHandlers: KeyEventHandler[];

  private boundOnKeyDown: (event: KeyboardEvent) => void;
  private boundOnKeyUp: (event: KeyboardEvent) => void;

  constructor() {
    this.boundOnKeyDown = this.onKeyDown.bind(this);
    this.boundOnKeyUp = this.onKeyUp.bind(this);
    this.keyDownHandlers = [];
    this.keyUpHandlers = [];

    this.addEventListeners();
  }

  release() {
    this.keyDownHandlers = [];
    this.keyUpHandlers = [];
    this.removeEventListeners();
  }

  private addEventListeners() {
    window.addEventListener("keydown", this.boundOnKeyDown, false);
    window.addEventListener("keyup", this.boundOnKeyUp, false);
  }

  private removeEventListeners() {
    window.removeEventListener("keydown", this.boundOnKeyDown);
    window.removeEventListener("keyup", this.boundOnKeyUp);
  }

  addKeyDownHandler(keyEventHandler: KeyEventHandler) {
    this.keyDownHandlers.push(keyEventHandler);
  }

  removeKeyDownHandler(componentId: string, key: string) {
    this.removeKeyHandler(componentId, key, this.keyDownHandlers);
  }

  private removeKeyHandler(
    componentId: string,
    key: string,
    handlers: KeyEventHandler[]
  ) {
    const idx = handlers.findIndex(
      (handler) => handler.componentId === componentId && handler.key === key
    );

    if (idx > -1) {
      handlers.splice(idx, 1);
    }
  }

  addKeyUpHandler(keyEventHandler: KeyEventHandler) {
    this.keyUpHandlers.push(keyEventHandler);
  }

  removeKeyUpHandler(componentId: string, key: string) {
    this.removeKeyHandler(componentId, key, this.keyUpHandlers);
  }

  private onKeyDown(event: KeyboardEvent) {
    this.onKeyEvent(event, this.keyDownHandlers);
  }

  private onKeyEvent(event: KeyboardEvent, handlers: KeyEventHandler[]) {
    handlers
      .filter((handler) => handler.key === event.key)
      .forEach((handler) => handler.action());
  }

  private onKeyUp(event: KeyboardEvent) {
    this.onKeyEvent(event, this.keyUpHandlers);
  }
}

export default KeyboardEventHandler;
