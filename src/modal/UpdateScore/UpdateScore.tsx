import { FC, useState } from "react";
import Modal from "react-modal";
import { Game } from "../../views/score-board/Scoreboard.interface";
import "./UpdateScore.css";
import { validatePlayerName } from "../../util/validatePlayerName";
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
  const [goalScorer, setGoalScorer] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleScoreChange = (value: number, name: string) => {
    if (name === "home") {
      setHomeTeamScore(value);
    } else {
      setAwayTeamScore(value);
    }
  };

  const handleGoalScorerNameChange = (value: string) => {
    setGoalScorer(value);
  };

  const validateScores = (): boolean => {
    //check if score is not decrimented
    if (
      homeTeamScore - game.homeTeam.score < 0 ||
      awayTeamScore - game.awayTeam.score < 0
    ) {
      setError("decrement in score is not allowed");
      return false;
    }
    //check if atleast one team has scored
    if (
      homeTeamScore === game.homeTeam.score &&
      awayTeamScore === game.awayTeam.score
    ) {
      setError("atleast one team need to score");
      return false;
    }
    //check if only home or away team has scored
    if (
      homeTeamScore !== game.homeTeam.score &&
      awayTeamScore !== game.awayTeam.score
    ) {
      setError("both teams can not score at same time");
      return false;
    }
    //check if the difference of the goals is greater than 1
    if (
      homeTeamScore - game.homeTeam.score > 1 ||
      awayTeamScore - game.awayTeam.score > 1
    ) {
      setError("goal difference should be only of 1 ");
      return false;
    }
    //check if the goal scorer is in input
    if (!validatePlayerName(goalScorer)) {
      return false;
    }
    return true;
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
          <div className="update-score-modal-input-container">
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
          <div className="update-score-goal-scorer-container">
            <p>Scorer</p>
            <input
              value={goalScorer}
              onChange={(e) => handleGoalScorerNameChange(e.target.value)}
            />
          </div>
          <div>
            {error.length > 0 && (
              <div data-testid="update-score-error">{error}</div>
            )}
          </div>
        </div>
      </div>
      <div className="update-score-modal-start-game-container">
        <button
          data-testid="update-score-button"
          onClick={() => {
            if (validateScores()) {
              const currentTime = new Date();
              const differenceInMs =
                currentTime.getTime() - game.startTime.getTime();
              const differenceInMinutes = Math.round(
                differenceInMs / 1000 / 60
              );
              const goalScorerNames = goalScorer.split(" ");
              const goalScorerInitials = `(${goalScorerNames[0][0].toUpperCase()}.${goalScorerNames[1][0].toUpperCase()})`;
              const goal = {
                minute: differenceInMinutes.toString(),
                scorer: goalScorerInitials,
              };

              updateScore({
                ...game,
                homeTeam: { ...game.homeTeam, score: homeTeamScore },
                awayTeam: { ...game.awayTeam, score: awayTeamScore },
                goals: [...game.goals, goal],
              });
            }
          }}
        >
          Update score
        </button>
      </div>
    </Modal>
  );
};

export default UpdateScore;
