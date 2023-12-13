// src/Counter.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
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
