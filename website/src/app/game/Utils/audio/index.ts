import dynamic from "next/dynamic";
import {SFXPlayerContext, BGMPlayerContext} from "./AudioPlayerContext";
import AUDIO_FILE_ALIASES from "./aliases";

const SFXPlayer = dynamic(() => import("./SFXPlayer"), { ssr: false });
const BGMPlayer = dynamic(() => import("./BGMPlayer"), { ssr: false });

export { SFXPlayer, BGMPlayer, SFXPlayerContext, BGMPlayerContext, AUDIO_FILE_ALIASES };
