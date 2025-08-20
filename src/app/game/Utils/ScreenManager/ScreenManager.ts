import { Application, Assets, Container, Ticker } from "pixi.js";
import { areBundlesLoaded } from "../assets";

export interface GameScreen extends Container {
  show?: () => Promise<void>;
  hide?: () => Promise<void>;
  resize?: (width: number, height: number) => void;
  update?: (time: Ticker) => void;
  addListeners?: () => void;
  cleanup: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface GameScreenConstructor<T = any> {
  readonly SCREEN_ID: string;
  readonly assetBundles?: string[];
  new (data?: T): GameScreen;
}

class ScreenManager {
  public screenView = new Container();

  private _currentScreen?: GameScreen;

  private _app!: Application;

  private _width!: number;
  private _height!: number;

  public init(app: Application) {
    app.stage.addChild(this.screenView);
    this._app = app;
  }

  public async changeScreen<T>(Ctor: GameScreenConstructor, data?: T) {
    this._showScreen(Ctor, data);
  }

  private _getScreen<T>(Ctor: GameScreenConstructor, data?: T) {
    const screen = new Ctor(data);

    return screen;
  }

  private async _showScreen<T>(Ctor: GameScreenConstructor, data?: T) {
    const current = this._currentScreen;

    if (current) {
      await this._removeScreen(current);
    }

    if (Ctor.assetBundles && !areBundlesLoaded(Ctor.assetBundles)) {
      await Assets.loadBundle(Ctor.assetBundles);
    }

    this._currentScreen = this._getScreen(Ctor, data);
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
      this._app.ticker.remove(screen.update, screen);
    }

    if (screen.parent) {
      screen.parent.removeChild(screen);
    }

    screen.destroy({ children: true });
  }

  public resize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._currentScreen?.resize?.(width, height);
  }
}

export const screenManager = new ScreenManager();
