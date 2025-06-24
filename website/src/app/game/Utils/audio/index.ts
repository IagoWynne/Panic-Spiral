import dynamic from "next/dynamic";
import AudioPlayerContext from "./AudioPlayerContext";
import AUDIO_FILE_ALIASES from "./aliases";

const SFXPlayer = dynamic(() => import("./SFXPlayer"), { ssr: false });

export { SFXPlayer, AudioPlayerContext, AUDIO_FILE_ALIASES };
