import { useApplication } from "@pixi/react";
import { Button } from "../../UI";
import { i18n, i18nKeys } from "../../Utils";
import Ship from "./Ship";
import Background from "./Ship/Background";
import { useContext, useEffect } from "react";
import { AUDIO_FILE_ALIASES, BGMPlayerContext } from "../../Utils/audio";

const TitleScreen = () => {
  const { app } = useApplication();
  const bgmPlayer = useContext(BGMPlayerContext);

  useEffect(() => {
    bgmPlayer.play(AUDIO_FILE_ALIASES.TITLE.BGM);
  }, [bgmPlayer]);

  return (
    app.renderer && (
      <pixiContainer>
        <Background />
        <pixiText
          x={app.screen.width / 2}
          y={40}
          anchor={0.5}
          text={i18n(i18nKeys.GAME_NAME)}
          style={{ fill: "#fc0e1c", fontSize: 60 }}
        />
        <Ship x={app.screen.width / 2} y={150} />
        <Button
          x={app.screen.width / 2}
          y={app.screen.height - 100}
          text={i18n(i18nKeys.START_GAME)}
        />
      </pixiContainer>
    )
  );
};

export default TitleScreen;
