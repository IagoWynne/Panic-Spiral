import { SystemEventHandler, SystemEventType } from "./types";

class SystemEvents {
  private _systemEventHandlers: SystemEventHandler[] = [];

  public addSystemListener(eventHandler: SystemEventHandler) {
    this._systemEventHandlers.push(eventHandler);
  }

  public removeSystemListener(componentId: string, system: string) {
    const idx = this._systemEventHandlers.findIndex(
      (handler) =>
        handler.componentId === componentId && handler.system === system
    );

    if (idx > -1) {
      this._systemEventHandlers.splice(idx, 1);
    }
  }

  public onSystemBreakdown(system: string) {
    this.onSystemEvent(system, "BREAKDOWN");
  }

  public onSystemRepaired(system: string) {
    this.onSystemEvent(system, "REPAIRED");
  }

  public onSystemActivated(system: string) {
    this.onSystemEvent(system, "ACTIVATED");
  }

  public onSystemDeactivated(system: string) {
    this.onSystemEvent(system, "DEACTIVATED");
  }

  private onSystemEvent(system: string, type: SystemEventType) {
    this._systemEventHandlers
      .filter(
        (handler) =>
          handler.system === system && handler.systemEventType === type
      )
      .forEach((handler) => handler.action());
  }

  public release() {
    this._systemEventHandlers = [];
  }
}

export default new SystemEvents();
