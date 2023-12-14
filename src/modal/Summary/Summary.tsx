import { FC } from "react";
import Modal from "react-modal";
import { Game } from "../../views/score-board/Scoreboard.interface";
import "./Summary.css";
import { sortGamesForSummary } from "../../util/sortGamesForSummary";
interface ISummary {
  onRequestClose: () => void;
  games: Game[];
}

const Summary: FC<ISummary> = ({ onRequestClose, games }) => {
  const sortedGames = sortGamesForSummary(games);
  return (
    <Modal
      isOpen
      testId="summary-modal"
      onRequestClose={onRequestClose}
      className="summary-modal"
      ariaHideApp={false}
    >
      <div className="summary-modal-header">
        <button data-testid="close-button" onClick={onRequestClose}>
          Close Modal
        </button>
      </div>
      <div className="summary-modal-body">
        {sortedGames.map((game) => (
          <div
            className="summary-modal-team-container"
            data-testid={`game-${game.incrementalId}`}
            key={game.id}
          >
            <div className="summary-modal-home-team-container">
              <div data-testid={`home-team-name-${game.id}`}>
                {game.homeTeam.name}
              </div>
              <div data-testid={`home-team-score-${game.id}`}>
                {game.homeTeam.score}
              </div>
            </div>
            <div className="summary-modal-away-team-container">
              <div data-testid={`away-team-name-${game.id}`}>
                {game.awayTeam.name}
              </div>
              <div data-testid={`away-team-score-${game.id}`}>
                {game.awayTeam.score}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="summary-modal-start-game-container"></div>
    </Modal>
  );
};

export default Summary;
