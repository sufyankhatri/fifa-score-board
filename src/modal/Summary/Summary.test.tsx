import { render, screen, within } from "@testing-library/react";
import Summary from "./Summary";
import { Game } from "../../views/score-board/Scoreboard.interface";
import { v4 as uuidv4 } from "uuid";

import { teams } from "../../api/teams";

test("should render summary modal", () => {
  render(<Summary games={[]} onRequestClose={() => {}} />);
  const summaryModal = screen.getByTestId("summary-modal");
  expect(summaryModal).toBeInTheDocument();
});

test("should have close modal button", () => {
  render(<Summary games={[]} onRequestClose={() => {}} />);
  const closeButton = screen.getByTestId("close-button");
  expect(closeButton).toBeInTheDocument();
});

const games: Game[] = [
  {
    id: uuidv4(),
    awayTeam: {
      name: teams[0],
      score: 0,
    },
    homeTeam: {
      name: teams[1],
      score: 5,
    },
    incrementalId: 1,
  },
  {
    id: uuidv4(),
    awayTeam: {
      name: teams[4],
      score: 2,
    },
    homeTeam: {
      name: teams[5],
      score: 2,
    },
    incrementalId: 2,
  },
];
test("should render all the games", () => {
  render(<Summary games={games} onRequestClose={() => {}} />);
  games.forEach((game) => {
    const gameContainer = screen.getByTestId(`game-${game.incrementalId}`);
    expect(gameContainer).toBeInTheDocument();
    const { getByTestId } = within(gameContainer);
    const homeTeamName = getByTestId(`home-team-name-${game.id}`);
    expect(homeTeamName).toBeInTheDocument();
    const homeTeamScore = getByTestId(`home-team-score-${game.id}`);
    expect(homeTeamScore).toBeInTheDocument();
    const awayTeamName = getByTestId(`away-team-name-${game.id}`);
    expect(awayTeamName).toBeInTheDocument();
    const awayTeamScore = getByTestId(`away-team-score-${game.id}`);
    expect(awayTeamScore).toBeInTheDocument();
  });
});
