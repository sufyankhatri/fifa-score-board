// src/Counter.test.tsx
import { render, screen } from "@testing-library/react";
import { randomUUID } from "crypto";
import { teams } from "../../api/teams";
import { Game } from "../../views/score-board/Scoreboard.interface";
import UpdateScore from "./UpdateScore";

const game: Game = {
  id: randomUUID(),
  awayTeam: {
    name: teams[0],
    score: 1,
  },
  homeTeam: {
    name: teams[0],
    score: 1,
  },
  incrementalId: 1,
};

test("renders the modal", () => {
  const { container } = render(
    <UpdateScore onRequestClose={() => {}} updateScore={() => {}} game={game} />
  );
  expect(container).toBeDefined();
});

test("renders the close button", () => {
  render(
    <UpdateScore onRequestClose={() => {}} updateScore={() => {}} game={game} />
  );
  const closeButton = screen.getByTestId("close-button");
  expect(closeButton).toBeInTheDocument();
});

test("renders the score update button", () => {
  render(
    <UpdateScore onRequestClose={() => {}} updateScore={() => {}} game={game} />
  );
  const updateScoreButton = screen.getByTestId("update-score-button");
  expect(updateScoreButton).toBeInTheDocument();
});
