import React from "react";
import { Chessboard } from "react-chessboard";

const Board2 = ({ highlight }) => {
  const styles = {};

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const applyHighlight = (condition, color) => {
    for (let rank = 1; rank <= 8; rank++) {
      for (const file of files) {
        const square = `${file}${rank}`;
        if (condition(file, rank)) {
          styles[square] = {
            backgroundColor: color,
            animation: "pulse 2s infinite",
          };
        }
      }
    }
  };

  if (highlight === "white") {
    applyHighlight(
      (_, rank) => rank >= 1 && rank <= 4,
      "rgba(255, 255, 0, 0.4)"
    );
  } else if (highlight === "black") {
    applyHighlight((_, rank) => rank >= 5 && rank <= 8, "rgba(0, 0, 255, 0.3)");
  } else if (highlight === "queen") {
    applyHighlight(
      (file, _) => ["a", "b", "c", "d"].includes(file),
      "rgba(0, 255, 0, 0.3)"
    );
  } else if (highlight === "king") {
    applyHighlight(
      (file, _) => ["e", "f", "g", "h"].includes(file),
      "rgba(255, 0, 0, 0.3)"
    );
  }

  return (
    <Chessboard
      id="Board2"
      boardWidth={400}
      arePiecesDraggable={false}
      customSquareStyles={styles}
    />
  );
};

export default Board2;
