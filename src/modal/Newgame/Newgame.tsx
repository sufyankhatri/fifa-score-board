import React, { FC, useState } from "react";
import Modal from "react-modal";
import "./Newgame.css";
import { teams } from "../../api/teams";
interface INewgame {
  isOpen: boolean;
  onRequestClose: () => void;
  startGame: (homeTeam: string, awayTeam: string) => void;
}

const Newgame: FC<INewgame> = ({ onRequestClose, startGame }) => {
  const [homeTeam, setHomeTeam] = useState<string>(teams[0]);
  const [awayTeam, setAwayTeam] = useState<string>(teams[1]);

  const handleSelectChange = (value: string, name: string) => {
    if (name === "home") {
      setHomeTeam(value);
    } else {
      setAwayTeam(value);
    }
  };
  return (
    <Modal
      isOpen
      testId="new-game-modal"
      onRequestClose={onRequestClose}
      className="new-game-modal"
    >
      <div className="new-game-modal-header">
        <button data-testid="close-button" onClick={onRequestClose}>
          Close Modal
        </button>
      </div>
      <div className="new-game-modal-body">
        <div className="new-game-modal-team-container">
          <div className="new-game-modal-select-team-container">
            <p>home team</p>
            <select
              data-testid="home-team"
              onChange={(event) => {
                handleSelectChange(event.target.value, "home");
              }}
              value={homeTeam}
            >
              {teams.map((team) => (
                <option value={team}>{team}</option>
              ))}
            </select>
          </div>
          <div className="new-game-modal-select-team-container">
            <p>away team</p>

            <select
              data-testid="away-team"
              onChange={(event) => {
                handleSelectChange(event.target.value, "away");
              }}
              value={awayTeam}
            >
              {teams.map((team) => (
                <option value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="new-game-modal-start-game-container">
        <button
          data-testid="start-button"
          onClick={() => {
            startGame(homeTeam, awayTeam);
          }}
        >
          Start game
        </button>
      </div>
    </Modal>
  );
};

export default Newgame;
