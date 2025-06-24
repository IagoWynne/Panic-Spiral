import dynamic from "next/dynamic";
import AudioPlayerContext from "./AudioPlayerContext";

const SFXPlayer = dynamic(() => import("./SFXPlayer"), { ssr: false });

export { SFXPlayer, AudioPlayerContext };
