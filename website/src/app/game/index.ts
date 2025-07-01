import dynamic from "next/dynamic";

const Game = dynamic(() => import("./GameWrapper"), { ssr: false });

export default Game;
