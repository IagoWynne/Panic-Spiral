import { Container, Texture, Ticker, TilingSprite } from "pixi.js";
import {
  GameScreen,
  screenManager,
} from "../../Utils/ScreenManager/ScreenManager";
import PlayerCharacter from "./PlayerCharacter";
import Ship from "./Ship";
import { Tile } from "../../Components";
import { NavigationService } from "./NavigationService";
import {
  PilotingTerminal,
  System,
  SystemEvents,
  SystemsManager,
} from "./Systems";
import { GameUI } from "./UI";
import { AUDIO_FILE_ALIASES, GameAudio } from "../../Utils/audio";
import { Background } from "./Background";
import { ScoreEvents, ScoreTracker } from "./Score";
import { RoundEvents, RoundTracker } from "./Rounds";
import { MAIN } from "../../constants";
import { HealthEvents, ShipHealthTracker } from "./HealthTracker";
import { PlayerHealthTracker } from "./HealthTracker/PlayerHealthTracker";
import GameOverScreen from "../GameOver";
import GameEvents from "./GameEvents";

export class MainScreen extends Container implements GameScreen {
  public static SCREEN_ID = "main";
  public static assetBundles = ["main"];

  private _playerCharacter: PlayerCharacter;
  private _ship: Ship;
  private _background: Background;
  private _navigationService: NavigationService;
  private _systemsManager: SystemsManager;
  private _scoreTracker: ScoreTracker;
  private _roundTracker: RoundTracker;
  private _shipHealthTracker = new ShipHealthTracker();
  private _playerHealthTracker = new PlayerHealthTracker();
  private _systems: System[];
  private _pilotingTerminals: PilotingTerminal[];
  private _ui: GameUI;
  private _paused = false;

  constructor() {
    super();

    this._scoreTracker = new ScoreTracker();
    this._roundTracker = new RoundTracker();

    this._background = new Background();

    this._ship = new Ship();
    this._systems = this._ship.systems.children as System[];
    this._pilotingTerminals = this._ship.pilotingTerminals
      .children as PilotingTerminal[];

    this._navigationService = new NavigationService({
      tiles: this._ship.walls.children as Tile[],
      interactionZones: [
        ...this._systems.map((s) => s.interactionZone),
        ...this._pilotingTerminals.map((p) => p.interactionZone),
      ],
    });

    this._systemsManager = new SystemsManager(this._systems);

    this._playerCharacter = new PlayerCharacter(this._navigationService);

    this._ui = new GameUI();

    this.addChild(this._background);
    this.addChild(this._ship);
    this.addChild(this._playerCharacter);
    this.addChild(this._ui);
  }

  public resize(width: number, height: number) {
    this._background.resize(width, height);

    this._ship.x = width / 2;
    this._ship.y = height / 2;

    this._ui.resize(width, height);
  }

  public addListeners() {
    this._playerCharacter.addListeners();

    RoundEvents.addRoundEndListener({
      componentId: MainScreen.SCREEN_ID,
      action: () => this.onRoundEnd(),
    });

    GameEvents.addGameOverListener({
      componentId: MainScreen.SCREEN_ID,
      action: () => this.onGameOver(),
    });
  }

  public show() {
    this.startRound();
    return Promise.resolve();
  }

  private startRound() {
    this._roundTracker.startRound(this._scoreTracker.currentScore);
    this._ui.updateRoundNumber(this._roundTracker.currentRound);
    GameAudio.BGM?.play(AUDIO_FILE_ALIASES.MAIN.BGM);
    this._systemsManager.onRoundStart();
    this._scoreTracker.onRoundStart();
    this._playerCharacter.x = MAIN.PLAYER_MOVEMENT.PLAYER_START_POSITION.X;
    this._playerCharacter.y = MAIN.PLAYER_MOVEMENT.PLAYER_START_POSITION.Y;
  }

  private onRoundEnd() {
    this.stopGame();
    this._ui.displayRoundEnd(
      this._roundTracker.roundStats[this._roundTracker.roundStats.length - 1],
      () => {
        this._paused = false;
        this.startRound();
      }
    );
  }

  private stopGame() {
    this._paused = true;
    this._systemsManager.onRoundEnd();
    this._scoreTracker.onRoundEnd();
    this._shipHealthTracker.onRoundEnd();
    this._systems.forEach((system) => system.onRoundEnd());
    this._pilotingTerminals.forEach((terminal) => terminal.onRoundEnd());
    GameAudio.BGM?.stop();
  }

  private onGameOver() {
    this.stopGame();
    screenManager.changeScreen(GameOverScreen, {
      finalScore:
        this._roundTracker.roundStats[this._roundTracker.roundStats.length - 1]
          .endScore,
    });
  }

  public update(ticker: Ticker) {
    if (this._paused) {
      return;
    }

    this._playerCharacter.update(ticker);
    this._background.update();
  }

  public cleanup() {
    this._playerCharacter.cleanup();
    this._navigationService.cleanup();
    this._ship.cleanup();
    this._background.cleanup();
    this._systemsManager.cleanup();
    this._scoreTracker.cleanup();
    this._roundTracker.cleanup();
    this._shipHealthTracker.cleanup();
    this._playerHealthTracker.cleanup();
    SystemEvents.release();
    ScoreEvents.release();
    RoundEvents.release();
    HealthEvents.release();
    GameEvents.release();
  }
}
