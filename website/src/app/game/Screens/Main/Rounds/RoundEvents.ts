interface TimerUpdateEventHandler {
  componentId: string;
  action: (remainingTime: number) => void;
}

class RoundEvents {
  private _timerUpdateEventHandlers: TimerUpdateEventHandler[] = [];

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

  public onTimerUpdate(remainingTime: number) {
    this._timerUpdateEventHandlers.forEach((handler) =>
      handler.action(remainingTime)
    );
  }

  public onRoundEnd() {
    console.log("Round over");
  }

  public release() {
    this._timerUpdateEventHandlers = [];
  }
}

export default new RoundEvents();
