import AUDIO_FILE_ALIASES from "./aliases";

export interface AliasFileMap {
    alias: string;
    file: string;
}

const ALIAS_FILE_MAP = {
  SFX: {
    UI: [
      { alias: AUDIO_FILE_ALIASES.UI.BUTTON_CLICK, file: "button-click.wav" },
      { alias: AUDIO_FILE_ALIASES.UI.BUTTON_HOVER, file: "button-hover.wav" },
    ],
  },
  BGM: {
    TITLE: [{ alias: AUDIO_FILE_ALIASES.TITLE.BGM, file: "title-bgm-01.wav" }],
  },
};

export default ALIAS_FILE_MAP;
