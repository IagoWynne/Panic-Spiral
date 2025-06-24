import { sound } from "@pixi/sound";
import AUDIO_FILE_ALIASES from "./aliases";

const baseAudioPath = "audio";
const uiAudioPath = "ui";

const addSound = (alias: string, filePath: string) => {
  if (!sound.exists(alias)) {
    sound.add(alias, filePath);
  }
};

const initAudio = () => {
  initUiAudio();
};

const getFullUiPath = (filename: string) =>
  `/${baseAudioPath}/${uiAudioPath}/${filename}`;

const initUiAudio = () => {
  addSound(
    AUDIO_FILE_ALIASES.UI.BUTTON_HOVER,
    getFullUiPath("button-hover.wav")
  );
  addSound(
    AUDIO_FILE_ALIASES.UI.BUTTON_CLICK,
    getFullUiPath("button-click.wav")
  );
};

export default initAudio;
