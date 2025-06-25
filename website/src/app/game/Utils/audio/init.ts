import { sound } from "@pixi/sound";
import AUDIO_FILE_ALIASES from "./aliases";
import ALIAS_FILE_MAP, { AliasFileMap } from "./aliasFileMap";

const baseAudioPath = "audio";
const uiAudioPath = "ui";
const bgmAudioPath = "bgm";

const addSound = (alias: string, filePath: string) => {
  if (!sound.exists(alias)) {
    sound.add(alias, filePath);
  }
};

export const initSfx = () => {
  initUiSfx();
};

export const initBgm = () => {
  initTitleBgm();
};

const getFullUiPath = (filename: string) =>
  `/${baseAudioPath}/${uiAudioPath}/${filename}`;

const mapAliasFiles = (
  maps: AliasFileMap[],
  pathCombiner: (filename: string) => string
) => maps.forEach((map) => addSound(map.alias, pathCombiner(map.file)));

const initUiSfx = () => {
  mapAliasFiles(ALIAS_FILE_MAP.SFX.UI, getFullUiPath);
};

const getFullBgmPath = (filename: string) =>
  `/${baseAudioPath}/${bgmAudioPath}/${filename}`;

const initTitleBgm = () => {
  mapAliasFiles(ALIAS_FILE_MAP.BGM.TITLE, getFullBgmPath);
};
