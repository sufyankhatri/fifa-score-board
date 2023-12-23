import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Newgame from "../../modal/Newgame/Newgame";
import Summary from "../../modal/Summary/Summary";
import UpdateScore from "../../modal/UpdateScore/UpdateScore";
import "./Scoreboard.css";
import { Game, MatchCard as MatchCardType } from "./Scoreboard.interface";
import MatchCard from "../../modal/MatchCard/MatchCard";
interface IScoreboard {}

const Scoreboard: FC<IScoreboard> = () => {
  const [showNewGameModal, setShowNewGameModal] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showUpdateScoreModal, setShowUpdateScoreModal] =
    useState<boolean>(false);
  const [showMatchCardModal, setShowMatchCardModal] = useState<boolean>(false);
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
            {game.goals.map((goal) => (
              <span>
                {goal.minute}'' {goal.scorer}
              </span>
            ))}
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
            {game.cards.map((card) => (
              <span>
                {card.minute}'' {card.player} {card.type}
              </span>
            ))}
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
              data-testid="issue-card-button"
              onClick={() => {
                setShowMatchCardModal(true);
                setUpdatingGame(game);
              }}
            >
              issue card
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
                startTime: new Date(),
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
                goals: [],
                cards: [],
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
      {showMatchCardModal && updatingGame && (
        <MatchCard
          onRequestClose={() => setShowMatchCardModal(false)}
          issueCard={(player: string, cardType: "red" | "yellow") => {
            const tempInProgressGames = [...inProgressGames];
            const playerNames = player.split(" ");
            const playerInitials = `(${playerNames[0][0].toUpperCase()}.${playerNames[1][0].toUpperCase()})`;
            const currentTime = new Date();
            const differenceInMs =
              currentTime.getTime() - updatingGame.startTime.getTime();
            const differenceInMinutes = Math.round(differenceInMs / 1000 / 60);
            const updatedGameCards: MatchCardType[] = [
              ...updatingGame.cards,
              {
                player: playerInitials,
                type: cardType,
                minute: differenceInMinutes.toString(),
              },
            ];
            const updatedInProgressGames: Game[] = tempInProgressGames.map(
              (game) => {
                if (game.id === updatingGame.id) {
                  return { ...game, cards: updatedGameCards };
                }
                return game;
              }
            );
            setInProgressGames(updatedInProgressGames);
            setShowMatchCardModal(false);
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
