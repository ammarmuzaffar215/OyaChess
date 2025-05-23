import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

const Board1 = () => {
  const [highlight, setHighlight] = useState("");
  const [styles, setStyles] = useState({});

  const refreshHighlight = (type) => {
    if (highlight === type) {
      setHighlight("");
      setTimeout(() => setHighlight(type), 50);
    } else {
      setHighlight(type);
    }
  };

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
      applyHighlight(
        (_, rank) => rank >= 1 && rank <= 4,
        "rgba(0, 0, 255, 0.3)"
      );
    } else if (highlight === "black") {
      applyHighlight(
        (_, rank) => rank >= 5 && rank <= 8,
        "rgba(0, 0, 255, 0.3)"
      );
    } else if (highlight === "queen") {
      applyHighlight(
        (file) => ["a", "b", "c", "d"].includes(file),
        "rgba(0, 0, 255, 0.3)"
      );
    } else if (highlight === "king") {
      applyHighlight(
        (file) => ["e", "f", "g", "h"].includes(file),
        "rgba(0, 0, 255, 0.3)"
      );
    }
  }, [highlight]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 w-full max-w-screen-xl mx-auto p-6">
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-center">
        <div className="mx-auto">
          <Chessboard
            id="Board1-1"
            boardWidth={300}
            arePiecesDraggable={false}
          />
        </div>
        <ul className="list-disc mt-4 text-left max-w-md pl-6 pr-4">
          <li className="text-xl py-1">
            There are <strong>64 squares</strong> in total.
          </li>
          <li className="text-xl py-1">
            32 <strong>light squares</strong> and 32{" "}
            <strong>dark squares</strong>.
          </li>
          <li className="text-xl py-1">
            The 1–8 horizontal coordinates are called "<strong>rank</strong>".
          </li>
          <li className="text-xl py-1">
            The a–h vertical coordinates are called "<strong>file</strong>".
          </li>
        </ul>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center md:items-center">
        <div className="mx-auto">
          <Chessboard
            id="Board1-2"
            boardWidth={300}
            arePiecesDraggable={false}
            customSquareStyles={styles}
          />
        </div>
        <ul className="list-disc mt-4 text-left max-w-md px-4">
          <li className="text-xl py-1">
            The 1st to 4th rank is the{" "}
            <strong
              onClick={() => refreshHighlight("white")}
              className="cursor-pointer text-blue-700"
            >
              White side
            </strong>
            .
          </li>
          <li className="text-xl py-1">
            The 5th to 8th rank is the{" "}
            <strong
              onClick={() => refreshHighlight("black")}
              className="cursor-pointer text-blue-700"
            >
              Black side
            </strong>
            .
          </li>
          <li className="text-xl py-1">
            The a to d file is the{" "}
            <strong
              onClick={() => refreshHighlight("queen")}
              className="cursor-pointer text-blue-700"
            >
              Queen side
            </strong>
            .
          </li>
          <li className="text-xl py-1">
            The e to h file is the{" "}
            <strong
              onClick={() => refreshHighlight("king")}
              className="cursor-pointer text-blue-700"
            >
              King side
            </strong>
            .
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Board1;
