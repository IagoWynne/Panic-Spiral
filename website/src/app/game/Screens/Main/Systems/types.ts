export type SystemEventType = "BREAKDOWN" | "REPAIRED";

export interface SystemEventHandler {
  componentId: string;
  system: string;
  systemEventType: SystemEventType;
  action: () => void;
}
