import { FC, useState } from "react";
import Modal from "react-modal";
import { Game } from "../../views/score-board/Scoreboard.interface";
import "./UpdateScore.css";
interface IUpdateScore {
  onRequestClose: () => void;
  game: Game;
  updateScore: (game: Game) => void;
}

const UpdateScore: FC<IUpdateScore> = ({
  onRequestClose,
  updateScore,
  game,
}) => {
  const [homeTeamScore, setHomeTeamScore] = useState<number>(
    game.homeTeam.score
  );
  const [awayTeamScore, setAwayTeamScore] = useState<number>(
    game.awayTeam.score
  );

  const handleScoreChange = (value: number, name: string) => {
    if (name === "home") {
      setHomeTeamScore(value);
    } else {
      setAwayTeamScore(value);
    }
  };
  return (
    <Modal
      isOpen
      testId="update-score-modal"
      onRequestClose={onRequestClose}
      className="update-score-modal"
      ariaHideApp={false}
    >
      <div className="update-score-modal-header">
        <button data-testid="close-button" onClick={onRequestClose}>
          Close Modal
        </button>
      </div>
      <div className="update-score-modal-body">
        <div className="update-score-modal-team-container">
          <div className="update-score-modal-home-team-container">
            <p>home score</p>
            <input
              data-testid="home-team-score-input"
              value={homeTeamScore}
              type="number"
              onChange={(e) => handleScoreChange(+e.target.value, "home")}
            />
          </div>
          <div className="update-score-modal-away-team-container">
            <p>away score</p>
            <input
              data-testid="away-team-score-input"
              value={awayTeamScore}
              type="number"
              onChange={(e) => handleScoreChange(+e.target.value, "away")}
            />
          </div>
        </div>
      </div>
      <div className="update-score-modal-start-game-container">
        <button
          data-testid="update-score-button"
          onClick={() => {
            updateScore({
              ...game,
              homeTeam: { ...game.homeTeam, score: homeTeamScore },
              awayTeam: { ...game.awayTeam, score: awayTeamScore },
            });
          }}
        >
          Update score
        </button>
      </div>
    </Modal>
  );
};

export default UpdateScore;
