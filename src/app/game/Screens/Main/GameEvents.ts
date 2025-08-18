interface GameOverEventHandler {
  componentId: string;
  action: () => void;
}

class GameEvents {
  private _gameOverEventHandlers: GameOverEventHandler[] = [];

  public addGameOverListener(eventHandler: GameOverEventHandler) {
    this._gameOverEventHandlers.push(eventHandler);
  }

  public removeGameOverListener(componentId: string) {
    const idx = this._gameOverEventHandlers.findIndex(
      (handler) => handler.componentId === componentId
    );

    if (idx > -1) {
      this._gameOverEventHandlers.splice(idx, 1);
    }
  }

  public onGameOver() {
    this._gameOverEventHandlers.forEach((handler) => handler.action());
  }

  public release() {
    this._gameOverEventHandlers = [];
  }
}

export default new GameEvents();
