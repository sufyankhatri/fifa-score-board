import React, { FC, useState } from "react";
import "./Scoreboard.css";
import Newgame from "../../modal/Newgame/Newgame";
import { v4 as uuidv4 } from "uuid";
import { Game } from "./Scoreboard.interface";
import UpdateScore from "../../modal/UpdateScore/UpdateScore";
import Summary from "../../modal/Summary/Summary";
interface IScoreboard {}

const Scoreboard: FC<IScoreboard> = () => {
  const [showNewGameModal, setShowNewGameModal] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showUpdateScoreModal, setShowUpdateScoreModal] =
    useState<boolean>(false);
  const [updatingGame, setUpdatingGame] = useState<Game>();
  const [inProgressGames, setInProgressGames] = useState<Game[]>([]);
  return (
    <div className="container">
      <div className="header">
        <button
          data-testid="new-game-button"
          onClick={() => {
            setShowNewGameModal(true);
          }}
        >
          new game
        </button>
        <button
          data-testid="summary-button"
          onClick={() => {
            setShowSummaryModal(true);
          }}
        >
          get summary
        </button>
      </div>
      <div className="body">
        {inProgressGames.map((game, i) => (
          <div
            data-testid={`in-progress-game-${i}`}
            className="in-progress-game-container"
            key={game.id}
          >
            <div
              className="score-board-team-container"
              data-testid={`in-progress-home-team-${i}`}
            >
              <div data-testid="in-progress-home-team-name">
                {game.homeTeam.name}
              </div>
              <div data-testid="in-progress-home-team-score">
                {game.homeTeam.score}
              </div>
            </div>
            <div
              className="score-board-team-container"
              data-testid={`in-progress-away-team-${i}`}
            >
              <div data-testid="in-progress-home-team-name">
                {game.awayTeam.name}
              </div>
              <div data-testid="in-progress-away-team-score">
                {game.awayTeam.score}
              </div>
            </div>
            <button
              data-testid="update-score-button"
              onClick={() => {
                setShowUpdateScoreModal(true);
                setUpdatingGame(game);
              }}
            >
              update score
            </button>
            <button
              data-testid="remove-game-button"
              onClick={() => {
                setInProgressGames((inProgressGames) =>
                  inProgressGames.filter((g) => g.id !== game.id)
                );
              }}
            >
              remove game
            </button>
          </div>
        ))}
      </div>
      {showNewGameModal && (
        <Newgame
          onRequestClose={() => setShowNewGameModal(false)}
          startGame={(homeTeam: string, awayTeam: string) => {
            setInProgressGames((inProgressGames) => [
              ...inProgressGames,
              {
                awayTeam: {
                  name: awayTeam,
                  score: 0,
                },
                homeTeam: {
                  name: homeTeam,
                  score: 0,
                },
                id: uuidv4(),
                incrementalId:
                  inProgressGames.length > 0
                    ? inProgressGames[inProgressGames.length - 1]
                        .incrementalId + 1
                    : 1,
              },
            ]);
            setShowNewGameModal(false);
          }}
        />
      )}
      {showUpdateScoreModal && updatingGame && (
        <UpdateScore
          game={updatingGame}
          onRequestClose={() => setShowUpdateScoreModal(false)}
          updateScore={(updatedGame: Game) => {
            const tempInProgressGames = [...inProgressGames];
            const updatedInProgressGames: Game[] = tempInProgressGames.map(
              (game) => {
                if (game.id === updatedGame.id) {
                  return updatedGame;
                }
                return game;
              }
            );
            setInProgressGames(updatedInProgressGames);
            setShowUpdateScoreModal(false);
          }}
        />
      )}
      {showSummaryModal && (
        <Summary
          games={[...inProgressGames]}
          onRequestClose={() => setShowSummaryModal(false)}
        />
      )}
    </div>
  );
};

export default Scoreboard;
