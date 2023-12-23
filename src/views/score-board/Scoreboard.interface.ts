interface Team {
  name: string;
  score: number;
}
interface Goal {
  minute: string;
  scorer: string;
}

export interface MatchCard {
  player: string;
  type: "red" | "yellow";
  minute: string;
}
export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  incrementalId: number;
  startTime: Date;
  goals: Goal[];
  cards: MatchCard[];
}
