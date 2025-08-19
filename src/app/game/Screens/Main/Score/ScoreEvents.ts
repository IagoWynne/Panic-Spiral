interface ScoreEventHandler {
  componentId: string;
  action: (newScore: number) => void;
}

interface ScoreIncrementChangedEventHandler {
  componentId: string;
  action: () => void;
}

class ScoreEvents {
  private _scoreEventHandlers: ScoreEventHandler[] = [];
  private _scoreIncrementStoppedEventHandlers: ScoreIncrementChangedEventHandler[] =
    [];
  private _scoreIncrementStartedEventHandlers: ScoreIncrementChangedEventHandler[] =
    [];

  public addScoreListener(eventHandler: ScoreEventHandler) {
    this._scoreEventHandlers.push(eventHandler);
  }

  public removeScoreListener(componentId: string) {
    this.removeListener(componentId, this._scoreEventHandlers);
  }

  private removeListener(
    componentId: string,
    eventHandlers: { componentId: string }[]
  ) {
    const idx = eventHandlers.findIndex(
      (handler) => handler.componentId === componentId
    );

    if (idx > -1) {
      eventHandlers.splice(idx, 1);
    }
  }

  public addScoreIncrementStartedListener(
    eventHandler: ScoreIncrementChangedEventHandler
  ) {
    this._scoreIncrementStartedEventHandlers.push(eventHandler);
  }

  public removeScoreIncrementStartedListener(componentId: string) {
    this.removeListener(componentId, this._scoreIncrementStartedEventHandlers);
  }

  public addScoreIncrementStoppedListener(
    eventHandler: ScoreIncrementChangedEventHandler
  ) {
    this._scoreIncrementStoppedEventHandlers.push(eventHandler);
  }

  public removeScoreIncrementStoppedListener(componentId: string) {
    this.removeListener(componentId, this._scoreIncrementStoppedEventHandlers);
  }

  public onScoreUpdate(newScore: number) {
    this._scoreEventHandlers.forEach((handler) => handler.action(newScore));
  }

  public onScoreIncrementStarted() {
    this._scoreIncrementStartedEventHandlers.forEach((handler) =>
      handler.action()
    );
  }

  public onScoreIncrementStopped() {
    this._scoreIncrementStoppedEventHandlers.forEach((handler) =>
      handler.action()
    );
  }

  public release() {
    this._scoreEventHandlers = [];
    this._scoreIncrementStoppedEventHandlers = [];
    this._scoreIncrementStartedEventHandlers = [];
  }
}

export default new ScoreEvents();
