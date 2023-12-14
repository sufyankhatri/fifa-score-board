// src/Counter.test.tsx
import {
  fireEvent,
  prettyDOM,
  render,
  screen,
  within,
} from "@testing-library/react";
import Scoreboard from "./Scoreboard";

const startGame = (): HTMLElement => {
  render(<Scoreboard />);
  const newGameButton = screen.getByTestId("new-game-button");
  fireEvent.click(newGameButton);
  const startGameButton = screen.getByTestId("start-button");
  fireEvent.click(startGameButton);
  const inProgressGameContainer = screen.getByTestId("in-progress-game-0");
  expect(inProgressGameContainer).toBeInTheDocument();
  return inProgressGameContainer;
};

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
  const inProgressGameContainer = startGame();
  const { getByTestId } = within(inProgressGameContainer);
  const homeTeam = getByTestId(`in-progress-home-team-0`);
  expect(homeTeam).toBeInTheDocument();

  const awayTeam = getByTestId(`in-progress-away-team-0`);
  expect(awayTeam).toBeInTheDocument();
});

test("check if in progress game container has update score button", () => {
  const inProgressGameContainer = startGame();
  const { getByTestId } = within(inProgressGameContainer);
  const updateScoreButton = getByTestId("update-score-button");
  expect(updateScoreButton).toBeInTheDocument();
});

test("check if update score button opens the update score modal", () => {
  const inProgressGameContainer = startGame();
  const { getByTestId } = within(inProgressGameContainer);
  const updateScoreButton = getByTestId("update-score-button");
  fireEvent.click(updateScoreButton);
  const updateScoreGameModal = screen.getByTestId("update-score-modal");
  expect(updateScoreGameModal).toBeInTheDocument();
});

test("check if update score button functioning properly", () => {
  const inProgressGameContainer = startGame();
  const { getByTestId } = within(inProgressGameContainer);
  const updateScoreButton = getByTestId("update-score-button");
  fireEvent.click(updateScoreButton);
  const updateScoreGameModalContainer = within(
    screen.getByTestId("update-score-modal")
  );
  const inputElementHomeScore = updateScoreGameModalContainer.getByTestId(
    "home-team-score-input"
  );
  const updatingHomeScore = "3";
  fireEvent.change(inputElementHomeScore, {
    target: { value: updatingHomeScore },
  });
  const inputElementAwayScore = updateScoreGameModalContainer.getByTestId(
    "away-team-score-input"
  );
  const updatingTeamScore = "4";
  fireEvent.change(inputElementAwayScore, {
    target: { value: updatingTeamScore },
  });
  const updateScoreButtonInModal = updateScoreGameModalContainer.getByTestId(
    "update-score-button"
  );
  fireEvent.click(updateScoreButtonInModal);
  const homeTeamScore = screen.getByTestId("in-progress-home-team-score");
  expect(homeTeamScore).toHaveTextContent(updatingHomeScore);
  const awayTeamScore = screen.getByTestId("in-progress-away-team-score");
  expect(awayTeamScore).toHaveTextContent(updatingTeamScore);
});

test("check if in progress game has end button and it removes game from score board", () => {
  const inProgressGameContainer = startGame();
  const { getByTestId } = within(inProgressGameContainer);
  const removeGameButton = getByTestId("remove-game-button");
  expect(removeGameButton).toBeInTheDocument();
  fireEvent.click(removeGameButton);
  const inProgressGameContainerUpdated =
    screen.queryByTestId("in-progress-game-0");
  expect(inProgressGameContainerUpdated).toBeNull();
});

test("should render get summary button", () => {
  render(<Scoreboard />);
  const button = screen.getByTestId("summary-button");
  expect(button).toBeInTheDocument();
});

test("should render get summary modal", () => {
  render(<Scoreboard />);
  const button = screen.getByTestId("summary-button");
  fireEvent.click(button);
  const getSummaryModal = screen.getByTestId("summary-modal");
  expect(getSummaryModal).toBeInTheDocument();
});
