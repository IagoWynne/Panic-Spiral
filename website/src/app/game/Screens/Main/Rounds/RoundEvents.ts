interface TimerUpdateEventHandler {
  componentId: string;
  action: (remainingTime: number) => void;
}

interface RoundEndEventHandler {
  componentId: string;
  action: () => void;
}

class RoundEvents {
  private _timerUpdateEventHandlers: TimerUpdateEventHandler[] = [];
  private _roundEndEventHandlers: RoundEndEventHandler[] = [];

  public addTimerUpdateListener(eventHandler: TimerUpdateEventHandler) {
    this._timerUpdateEventHandlers.push(eventHandler);
  }

  public removeTimerUpdateListener(componentId: string) {
    this.removeListener(componentId, this._timerUpdateEventHandlers);
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

  public addRoundEndListener(eventHandler: RoundEndEventHandler) {
    this._roundEndEventHandlers.push(eventHandler);
  }

  public removeRoundEndListener(componentId: string) {
    this.removeListener(componentId, this._roundEndEventHandlers);
  }

  public onTimerUpdate(remainingTime: number) {
    this._timerUpdateEventHandlers.forEach((handler) =>
      handler.action(remainingTime)
    );
  }

  public onRoundEnd() {
    this._roundEndEventHandlers.forEach((handler) => handler.action());
  }

  public release() {
    this._timerUpdateEventHandlers = [];
    this._roundEndEventHandlers = [];
  }
}

export default new RoundEvents();
