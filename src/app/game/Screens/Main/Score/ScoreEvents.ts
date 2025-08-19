interface ScoreChangedEventHandler {
  componentId: string;
  action: (newScore: number) => void;
}

interface ScoreIncrementChangedEventHandler {
  componentId: string;
  action: () => void;
}

interface ScoreMultiplerChangedEventHandler {
  componentId: string;
  action: (newMultipler: number) => void;
}

class ScoreEvents {
  private _scoreEventHandlers: ScoreChangedEventHandler[] = [];
  private _scoreIncrementStoppedEventHandlers: ScoreIncrementChangedEventHandler[] =
    [];
  private _scoreIncrementStartedEventHandlers: ScoreIncrementChangedEventHandler[] =
    [];
  private _scoreMultiplerChangedEventHandlers: ScoreMultiplerChangedEventHandler[] =
    [];

  public addScoreListener(eventHandler: ScoreChangedEventHandler) {
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

  public addScoreMultiplierChangedListener(
    eventHandler: ScoreMultiplerChangedEventHandler
  ) {
    this._scoreMultiplerChangedEventHandlers.push(eventHandler);
  }

  public removeScoreMultiplierChangedListener(componentId: string) {
    this.removeListener(componentId, this._scoreMultiplerChangedEventHandlers);
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

  public onScoreMultiplierChanged(newMultipler: number) {
    this._scoreMultiplerChangedEventHandlers.forEach((handler) =>
      handler.action(newMultipler)
    );
  }

  public release() {
    this._scoreEventHandlers = [];
    this._scoreIncrementStoppedEventHandlers = [];
    this._scoreIncrementStartedEventHandlers = [];
    this._scoreMultiplerChangedEventHandlers = [];
  }
}

export default new ScoreEvents();
