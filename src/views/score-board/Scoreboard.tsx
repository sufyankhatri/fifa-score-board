import React, { FC, useState } from "react";
import "./Scoreboard.css";
import Newgame from "../../modal/Newgame/Newgame";
import { Game } from "./Scoreboard.interface";
interface IScoreboard {}

const Scoreboard: FC<IScoreboard> = () => {
  const [showNewGameModal, setShowNewGameModal] = useState<boolean>(false);
  const [inProgressGames, setInProgressGames] = useState<Game[]>([]);
  console.log("inProgressGames", inProgressGames);
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
      </div>
      <div className="body">
        {inProgressGames.map((game, i) => (
          <div
            data-testid={`in-progress-game-${i}`}
            className="in-progress-game-container"
          >
            <div
              className="score-board-team-container"
              data-testid={`in-progress-home-team-${i}`}
            >
              <div>{game.homeTeam.name}</div>
              <div>{game.homeTeam.score}</div>
            </div>
            <div
              className="score-board-team-container"
              data-testid={`in-progress-away-team-${i}`}
            >
              <div>{game.awayTeam.name}</div>
              <div>{game.awayTeam.score}</div>
            </div>
          </div>
        ))}
      </div>
      {showNewGameModal && (
        <Newgame
          isOpen={showNewGameModal}
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
              },
            ]);
            setShowNewGameModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Scoreboard;
