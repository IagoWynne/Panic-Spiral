import { sound } from "@pixi/sound";
import ALIAS_FILE_MAP, { AliasFileMap } from "./aliasFileMap";

const baseAudioPath = "audio";
const uiAudioPath = "ui";
const mainAudioPath = "main";
const bgmAudioPath = "bgm";

const addSound = (alias: string, filePath: string) => {
  if (!sound.exists(alias)) {
    sound.add(alias, filePath);
  }
};

export const initSfx = () => {
  initUiSfx();
  initMainSfx();
};

export const initBgm = () => {
  initTitleBgm();
  initMainBgm();
};

const getFullUiPath = (filename: string) =>
  `/${baseAudioPath}/${uiAudioPath}/${filename}`;

const getFullMainPath = (filename: string) =>
  `/${baseAudioPath}/${mainAudioPath}/${filename}`;

const mapAliasFiles = (
  maps: AliasFileMap[],
  pathCombiner: (filename: string) => string
) => maps.forEach((map) => addSound(map.alias, pathCombiner(map.file)));

const initUiSfx = () => {
  mapAliasFiles(ALIAS_FILE_MAP.SFX.UI, getFullUiPath);
};

const initMainSfx = () => {
  mapAliasFiles(ALIAS_FILE_MAP.SFX.MAIN, getFullMainPath);
};

const getFullBgmPath = (filename: string) =>
  `/${baseAudioPath}/${bgmAudioPath}/${filename}`;

const initTitleBgm = () => {
  mapAliasFiles(ALIAS_FILE_MAP.BGM.TITLE, getFullBgmPath);
};

const initMainBgm = () => {
  mapAliasFiles(ALIAS_FILE_MAP.BGM.MAIN, getFullBgmPath);
};
