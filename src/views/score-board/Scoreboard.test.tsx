// src/Counter.test.tsx
import { fireEvent, render, screen, within } from "@testing-library/react";
import Scoreboard from "./Scoreboard";

test("renders the score board component", () => {
  const { container } = render(<Scoreboard />);
  expect(container).toBeDefined();
});

test("should render new game button", () => {
  render(<Scoreboard />);
  const button = screen.getByTestId("new-game-button");
  expect(button).toBeInTheDocument();
});

test("should render new game modal", () => {
  render(<Scoreboard />);
  const button = screen.getByTestId("new-game-button");
  fireEvent.click(button);
  const newGameModal = screen.getByTestId("new-game-modal");
  expect(newGameModal).toBeInTheDocument();
});

test("should render in progress game", () => {
  render(<Scoreboard />);
  const newGameButton = screen.getByTestId("new-game-button");
  fireEvent.click(newGameButton);
  const startGameButton = screen.getByTestId("start-button");
  fireEvent.click(startGameButton);
  const inProgressGameContainer = screen.getByTestId("in-progress-game-0");
  expect(inProgressGameContainer).toBeInTheDocument();
  const { getByTestId } = within(inProgressGameContainer);
  const homeTeam = getByTestId(`in-progress-home-team-0`);
  expect(homeTeam).toBeInTheDocument();

  const awayTeam = getByTestId(`in-progress-away-team-0`);
  expect(awayTeam).toBeInTheDocument();
});
