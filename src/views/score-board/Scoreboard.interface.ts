interface Team {
  name: string;
  score: number;
}
export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  incrementalId: number;
}
