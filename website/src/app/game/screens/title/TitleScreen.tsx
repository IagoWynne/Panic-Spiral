import { Button } from "../../ui";
import { i18n, i18nKeys } from "../../utils";
import Ship from "./Ship";

const TitleScreen = () => {
  return (
    <pixiContainer>
      <pixiText
        x={40}
        y={20}
        text={i18n(i18nKeys.GAME_NAME)}
        style={{ fill: "#fc0e1c", fontSize: 36 }}
      />
      <Ship x={650} y={150} />
      <Button x={450} y={400} text={i18n(i18nKeys.START_GAME)} />
    </pixiContainer>
  );
};

export default TitleScreen;
