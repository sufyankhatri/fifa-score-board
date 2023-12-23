import { FC, useState } from "react";
import Modal from "react-modal";
import { validatePlayerName } from "../../util/validatePlayerName";
import "./MatchCard.css";
interface IMatchCard {
  onRequestClose: () => void;
  issueCard: (player: string, cardType: "red" | "yellow") => void;
}

const MatchCard: FC<IMatchCard> = ({ onRequestClose, issueCard }) => {
  const [cardType, setCardType] = useState<"red" | "yellow">("red");
  const [playerName, setPlayerName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSelectChange = (value: string) => {
    if (value === "red") setCardType("red");
    else setCardType("yellow");
  };

  return (
    <Modal
      isOpen
      testId="match-card-game-modal"
      onRequestClose={onRequestClose}
      className="match-card-game-modal"
      ariaHideApp={false}
    >
      <div className="match-card-game-modal-header">
        <button data-testid="close-button" onClick={onRequestClose}>
          Close Modal
        </button>
      </div>
      <div className="match-card-game-modal-body">
        <div className="match-card-game-modal-team-container">
          <div className="match-card-game-modal-select-team-container">
            <p>Issue card</p>
            <select
              data-testid="home-team"
              onChange={(event) => {
                handleSelectChange(event.target.value);
              }}
              value={cardType}
            >
              <option value="red">red</option>
              <option value="yellow">yellow</option>
            </select>
          </div>
        </div>
        <div>
          <p>Player name</p>
          <input
            name="player"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
            }}
          />
        </div>
        {error && <div> {error}</div>}
      </div>
      <div className="match-card-game-modal-start-game-container">
        <button
          data-testid="start-button"
          onClick={() => {
            //check if the goal scorer is in input
            if (validatePlayerName(playerName)) {
              issueCard(playerName, cardType);
            } else {
              setError("Player name format is not correct");
            }
          }}
        >
          Issue card
        </button>
      </div>
    </Modal>
  );
};

export default MatchCard;
