export type SystemEventType =
  | "BREAKDOWN"
  | "REPAIRED"
  | "ACTIVATED"
  | "DEACTIVATED";

export interface SystemEventHandler {
  componentId: string;
  system: string;
  systemEventType: SystemEventType;
  action: () => void;
}
