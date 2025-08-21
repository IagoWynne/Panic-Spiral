import { MAIN } from "../../../constants";
import { ScoreEvents } from "../Score";
import { SystemEvents } from "../Systems";
import RoundEvents from "./RoundEvents";
import { RoundStats, SystemStats } from "./RoundStats";

export class RoundTracker {
  private _id = "round-tracker";
  public currentRound = 0;
  public roundStats: RoundStats[] = [];

  private _remainingSeconds: number;
  private _roundTimer?: NodeJS.Timeout;
  private _currentRoundStats!: RoundStats;

  constructor() {
    this._remainingSeconds = 0;
    this.addListeners();
  }

  private addListeners() {
    ScoreEvents.addScoreListener({
      componentId: this._id,
      action: (newScore: number) => {
        this._currentRoundStats.endScore = newScore;
      },
    });

    this.addSystemListeners(MAIN.SYSTEMS.SYSTEM_IDS.ENGINE);
    this.addSystemListeners(MAIN.SYSTEMS.SYSTEM_IDS.MEDBAY);
    this.addSystemListeners(MAIN.SYSTEMS.SYSTEM_IDS.OXYGEN);
    this.addSystemListeners(MAIN.SYSTEMS.SYSTEM_IDS.REACTOR);
    this.addSystemListeners(MAIN.SYSTEMS.SYSTEM_IDS.ENGINEERING);
  }

  private addSystemListeners(systemName: string) {
    SystemEvents.addSystemListener({
      componentId: this._id,
      systemEventType: "BREAKDOWN",
      system: systemName,
      action: () => this.onSystemBreakdown(systemName),
    });

    SystemEvents.addSystemListener({
      componentId: this._id,
      systemEventType: "REPAIRED",
      system: systemName,
      action: () => this.onSystemRepaired(systemName),
    });
  }

  private onSystemBreakdown(systemName: string) {
    this.systemStatIncrease(systemName, this._currentRoundStats.breakdowns);
  }

  private onSystemRepaired(systemName: string) {
    if (this._remainingSeconds > 0) {
      this.systemStatIncrease(systemName, this._currentRoundStats.repairs);
    }
  }

  private systemStatIncrease(systemName: string, stats: SystemStats) {
    switch (systemName) {
      case MAIN.SYSTEMS.SYSTEM_IDS.ENGINE: {
        stats.engine++;
        break;
      }
      case MAIN.SYSTEMS.SYSTEM_IDS.MEDBAY: {
        stats.medbay++;
        break;
      }
      case MAIN.SYSTEMS.SYSTEM_IDS.OXYGEN: {
        stats.oxygen++;
        break;
      }
      case MAIN.SYSTEMS.SYSTEM_IDS.REACTOR: {
        stats.reactor++;
        break;
      }
      case MAIN.SYSTEMS.SYSTEM_IDS.ENGINEERING: {
        stats.engineering++;
        break;
      }
    }
  }

  public startRound(currentScore: number) {
    this.currentRound += 1;
    this._currentRoundStats = this.getNewRoundStats(currentScore);

    this.roundStats.push(this._currentRoundStats);

    this._remainingSeconds = MAIN.ROUND.DEFAULT_ROUND_DURATION_SECONDS;
    RoundEvents.onTimerUpdate(this._remainingSeconds);

    this._roundTimer = setInterval(
      () => this.onRoundTimerInterval(),
      MAIN.ROUND.ROUND_TIMER_DECREMENT_INTERVAL
    );
  }

  private getNewRoundStats(startingScore: number): RoundStats {
    return {
      num: this.currentRound,
      startingScore: startingScore,
      endScore: startingScore,
      breakdowns: {
        engine: 0,
        medbay: 0,
        oxygen: 0,
        engineering: 0,
        reactor: 0,
      },
      repairs: {
        engine: 0,
        medbay: 0,
        oxygen: 0,
        engineering: 0,
        reactor: 0,
      },
    };
  }

  private onRoundTimerInterval() {
    this._remainingSeconds--;
    RoundEvents.onTimerUpdate(this._remainingSeconds);

    if (this._remainingSeconds === 0) {
      RoundEvents.onRoundEnd();
      this.stopTimer();
    }
  }

  private stopTimer() {
    if (this._roundTimer) {
      clearInterval(this._roundTimer);
      this._roundTimer = undefined;
    }
  }

  public cleanup() {
    this.stopTimer();
    ScoreEvents.removeScoreListener(this._id);
    SystemEvents.removeSystemListener(this._id, MAIN.SYSTEMS.SYSTEM_IDS.ENGINE);
    SystemEvents.removeSystemListener(this._id, MAIN.SYSTEMS.SYSTEM_IDS.MEDBAY);
    SystemEvents.removeSystemListener(this._id, MAIN.SYSTEMS.SYSTEM_IDS.OXYGEN);
    SystemEvents.removeSystemListener(
      this._id,
      MAIN.SYSTEMS.SYSTEM_IDS.REACTOR
    );
    SystemEvents.removeSystemListener(
      this._id,
      MAIN.SYSTEMS.SYSTEM_IDS.ENGINEERING
    );
  }
}
