import React from "react";
import { Chessboard } from "react-chessboard";

const Board1 = () => {
  return (
    <Chessboard
      id="Board1"
      boardWidth={400}
      arePiecesDraggable={false}
    />
  );
};

export default Board1;
