import { Application, Assets, Container, Renderer, Ticker } from "pixi.js";
import { areBundlesLoaded } from "../assets";

export interface GameScreen extends Container {
  show?: () => Promise<void>;
  hide?: () => Promise<void>;
  resize?: (width: number, height: number) => void;
  update?: (time: Ticker) => void;
  addListeners?: () => void;
  cleanup: () => void;
}

interface GameScreenConstructor {
  readonly SCREEN_ID: string;
  readonly assetBundles?: string[];
  new (): GameScreen;
}

class ScreenManager {
  public screenView = new Container();

  private _currentScreen?: GameScreen;

  private _app!: Application;

  private _width!: number;
  private _height!: number;

  private readonly _screenMap = new Map<string, GameScreen>();

  public init(app: Application) {
    app.stage.addChild(this.screenView);
    this._app = app;
  }

  public async changeScreen(Ctor: GameScreenConstructor) {
    this._showScreen(Ctor);
  }

  private _getScreen(Ctor: GameScreenConstructor) {
    let screen = this._screenMap.get(Ctor.SCREEN_ID);

    if (!screen) {
      screen = new Ctor();
      this._screenMap.set(Ctor.SCREEN_ID, screen);
    }

    return screen;
  }

  private async _showScreen(Ctor: GameScreenConstructor) {
    const current = this._currentScreen;

    if (current) {
      await this._removeScreen(current);
    }

    if (Ctor.assetBundles && !areBundlesLoaded(Ctor.assetBundles)) {
      await Assets.loadBundle(Ctor.assetBundles);
    }

    this._currentScreen = this._getScreen(Ctor);
    await this._addScreen(this._currentScreen);
  }

  private async _addScreen(screen: GameScreen) {
    this.screenView.addChild(screen);

    screen.resize?.(this._width, this._height);

    if (screen.update) {
      this._app.ticker.add(screen.update, screen);
    }

    screen.addListeners?.();

    await screen.show?.();
  }

  private async _removeScreen(screen: GameScreen) {
    await screen.hide?.();

    screen.cleanup();

    if (screen.update) {
      this._app.ticker.remove(screen.update);
    }

    if (screen.parent) {
      screen.parent.removeChild(screen);
    }
  }

  public resize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._currentScreen?.resize?.(width, height);
  }
}

export const screenManager = new ScreenManager();
