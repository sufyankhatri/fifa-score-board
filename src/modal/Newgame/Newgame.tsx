import React, { FC } from "react";
import Modal from "react-modal";
interface INewgame {
  isOpen: boolean;
  onRequestClose: () => void;
}

const Newgame: FC<INewgame> = ({ onRequestClose }) => {
  return (
    <Modal isOpen testId="new-game-modal" onRequestClose={onRequestClose}>
      something is in modal
    </Modal>
  );
};

export default Newgame;
