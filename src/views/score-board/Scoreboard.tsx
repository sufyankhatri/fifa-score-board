import React, { FC, useState } from "react";
import "./Scoreboard.css";
import Newgame from "../../modal/Newgame/Newgame";
interface IScoreboard {}

const Scoreboard: FC<IScoreboard> = () => {
  const [showNewGameModal, setShowNewGameModal] = useState<boolean>(false);
  return (
    <div className="container">
      <button
        data-testid="new-game-button"
        onClick={() => {
          setShowNewGameModal(true);
        }}
      >
        new game
      </button>
      {showNewGameModal && (
        <Newgame
          isOpen={showNewGameModal}
          onRequestClose={() => setShowNewGameModal(false)}
        />
      )}
    </div>
  );
};

export default Scoreboard;
