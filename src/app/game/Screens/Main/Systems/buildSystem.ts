import { MAIN } from "../../../constants";
import { System } from "./System";

interface SystemData {
  name: string;
  interactionZone: {
    x: number;
    y: number;
  };
}

const buildSystem = (data: SystemData, tileSize: number): System | null => {
  return new System(
    data.name,
    tileSize,
    data.interactionZone.x,
    data.interactionZone.y,
    MAIN.SYSTEMS.SYSTEM_REPAIR_COOLDOWNS[data.name],
    MAIN.SYSTEMS.SYSTEM_BREAKDOWN_RATE[data.name]
  );
};

export default buildSystem;
