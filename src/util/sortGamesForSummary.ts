import { Game } from "../views/score-board/Scoreboard.interface";

export const sortGamesForSummary = (games: Game[]): Game[] => {
  return games.sort((a, b) => {
    const totalScoreA = a.awayTeam.score + a.homeTeam.score;
    const totalScoreB = b.awayTeam.score + b.homeTeam.score;
    if (totalScoreA !== totalScoreB) {
      return totalScoreA < totalScoreB ? 1 : -1;
    }
    return a.incrementalId > b.incrementalId ? -1 : 1;
  });
};
