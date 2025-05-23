import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

const Board2 = ({ highlight }) => {
  const [styles, setStyles] = useState({});

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const applyHighlight = (condition, color) => {
    const newStyles = {};
    for (let rank = 1; rank <= 8; rank++) {
      for (const file of files) {
        const square = `${file}${rank}`;
        if (condition(file, rank)) {
          newStyles[square] = {
            backgroundColor: color,
            transition: "background-color 0.5s ease",
          };
        }
      }
    }
    setStyles(newStyles);

    setTimeout(() => {
      setStyles({});
    }, 2000);
  };

  useEffect(() => {
    if (highlight === "white") {
      applyHighlight((_, rank) => rank >= 1 && rank <= 4, "rgba(0, 0, 255, 0.3)");
    } else if (highlight === "black") {
      applyHighlight((_, rank) => rank >= 5 && rank <= 8, "rgba(0, 0, 255, 0.3)");
    } else if (highlight === "queen") {
      applyHighlight((file) => ["a", "b", "c", "d"].includes(file), "rgba(0, 0, 255, 0.3)");
    } else if (highlight === "king") {
      applyHighlight((file) => ["e", "f", "g", "h"].includes(file), "rgba(0, 0, 255, 0.3)");
    }
  }, [highlight]);

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
