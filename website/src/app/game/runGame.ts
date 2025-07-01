import { Application } from "pixi.js";
import screenManager from "./Utils/ScreenManager";
import TitleScreen from "./Screens/Title";

const runGame = (app: Application) => {
  screenManager.init(app);
  screenManager.resize(app.renderer.width, app.renderer.height);
  screenManager.changeScreen(TitleScreen);
};

export default runGame;
