import { SYSTEM_IDS } from "../../../constants/Systems";
import { System } from "./System";
import { Engine } from "./Engine";

interface SystemData {
  name: string;
  interactionZone: {
    x: number;
    y: number;
  };
  cooldown: number;
  breakdownRate: number;
}

const buildSystem = (data: SystemData, tileSize: number): System | null => {
  switch (data.name) {
    case SYSTEM_IDS.ENGINE: {
      return new Engine(
        data.name,
        tileSize,
        data.interactionZone.x,
        data.interactionZone.y,
        data.cooldown,
        data.breakdownRate
      );
    }
  }

  return null;
};

export default buildSystem;
