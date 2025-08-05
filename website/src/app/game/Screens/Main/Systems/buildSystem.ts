import { MAIN } from "../../../constants";
import { System } from "./System";
import { Engine } from "./Engine";

interface SystemData {
  name: string;
  interactionZone: {
    x: number;
    y: number;
  };
}

const buildSystem = (data: SystemData, tileSize: number): System | null => {
  switch (data.name) {
    case MAIN.SYSTEMS.SYSTEM_IDS.ENGINE: {
      return new Engine(
        data.name,
        tileSize,
        data.interactionZone.x,
        data.interactionZone.y,
        MAIN.SYSTEMS.SYSTEM_REPAIR_COOLDOWNS[data.name],
        MAIN.SYSTEMS.SYSTEM_BREAKDOWN_RATE[data.name]
      );
    }
  }

  return null;
};

export default buildSystem;
