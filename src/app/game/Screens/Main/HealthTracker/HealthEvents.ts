import { HealthEntity } from "./HealthTracker";

interface HealthChangedEventHandler {
  componentId: string;
  healthEntity: HealthEntity;
  action: (newHealth: number) => void;
}

class HealthEvents {
  private _healthChangedEventHandlers: HealthChangedEventHandler[] = [];

  public addHealthChangedListener(eventHandler: HealthChangedEventHandler) {
    this._healthChangedEventHandlers.push(eventHandler);
  }

  public removeHealthChangedListeners(
    componentId: string,
    healthEntity: HealthEntity
  ) {
    const idx = this._healthChangedEventHandlers.findIndex(
      (handler) =>
        handler.componentId === componentId &&
        handler.healthEntity === healthEntity
    );

    if (idx > -1) {
      this._healthChangedEventHandlers.splice(idx, 1);
    }
  }

  public onHealthChange(newHealth: number, healthEntity: HealthEntity) {
    this._healthChangedEventHandlers
      .filter((handler) => handler.healthEntity === healthEntity)
      .forEach((handler) => handler.action(newHealth));
  }

  public release() {
    this._healthChangedEventHandlers = [];
  }
}

const healthEvents = new HealthEvents();

export default healthEvents;
