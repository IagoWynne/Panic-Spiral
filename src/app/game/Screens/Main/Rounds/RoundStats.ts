export interface RoundStats {
  num: number;
  startingScore: number;
  endScore: number;
  breakdowns: SystemStats;
  repairs: SystemStats;
}

export interface SystemStats {
  engine: number;
  medbay: number;
  oxygen: number;
  reactor: number;
  engineering: number;
}
