import { useApplication } from "@pixi/react";
import runGame from "./runGame";
import { useEffect } from "react";

const Game = () => {
  let { app } = useApplication();

  useEffect(() => {
    if (!app.ticker) {
      return;
    }
    app.stage.removeChildren();

    runGame(app);
  }, [app, app.ticker]);

  return <></>;
};

export default Game;
