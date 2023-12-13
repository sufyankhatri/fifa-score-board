// src/Counter.test.tsx
import { render, screen, within } from "@testing-library/react";
import { teams } from "../../api/teams";
import Newgame from "./Newgame";

test("renders the modal", () => {
  const { container } = render(
    <Newgame isOpen onRequestClose={() => {}} startGame={() => {}} />
  );
  expect(container).toBeDefined();
});

test("renders the close button", () => {
  render(<Newgame isOpen onRequestClose={() => {}} startGame={() => {}} />);
  const closeButton = screen.getByTestId("close-button");
  expect(closeButton).toBeInTheDocument();
});

test("renders the start button", () => {
  render(<Newgame isOpen onRequestClose={() => {}} startGame={() => {}} />);
  const startButton = screen.getByTestId("start-button");
  expect(startButton).toBeInTheDocument();
});

test("renders the select dropdown for home team and checks if it has all options", () => {
  render(<Newgame isOpen onRequestClose={() => {}} startGame={() => {}} />);
  const homeTeamSelect = screen.getByTestId("home-team");
  expect(homeTeamSelect).toBeInTheDocument();
  const { getByText } = within(homeTeamSelect);

  teams.forEach((team) => {
    const teamOption = getByText(team);
    expect(teamOption).toBeInTheDocument();
  });
});

test("renders the select dropdown for away team and checks if it has all options", () => {
  render(<Newgame isOpen onRequestClose={() => {}} startGame={() => {}} />);
  const awayTeamSelect = screen.getByTestId("away-team");
  expect(awayTeamSelect).toBeInTheDocument();
  const { getByText } = within(awayTeamSelect);

  teams.forEach((team) => {
    const teamOption = getByText(team);
    expect(teamOption).toBeInTheDocument();
  });
});
