import { sprintf } from "sprintf-js";
import { KEY_BINDINGS } from "../../keyBindings";
import { i18n, i18nKeys } from "../../Utils";
import { GRID_OFFSET } from "./Ship";

export const SYSTEM_IDS = {
  ENGINE: "Engine",
  MEDBAY: "Medbay",
  OXYGEN: "O2",
  REACTOR: "Reactor",
  SHIELDS: "Shields",
};

export const SYSTEM_TRANSLATION_KEYS = {
  [SYSTEM_IDS.ENGINE]: i18nKeys.ENGINE,
  [SYSTEM_IDS.MEDBAY]: i18nKeys.MEDBAY,
  [SYSTEM_IDS.OXYGEN]: i18nKeys.OXYGEN,
  [SYSTEM_IDS.REACTOR]: i18nKeys.REACTOR,
  [SYSTEM_IDS.SHIELDS]: i18nKeys.SHIELDS,
};

export const SYSTEM_BREAKDOWN_CHECK = 5000;

export const DEFAULT_INTERACTION_TEXT = sprintf(
  i18n(i18nKeys.REPAIR_INSTRUCTIONS),
  KEY_BINDINGS.PLAYER_CONTROLS.INTERACT
);

export const SYSTEM_TOOLTIP_OFFSET = {
  X: -GRID_OFFSET.X / 2,
  Y: -GRID_OFFSET.Y / 2,
  Y_MODIFIER: -50,
};
