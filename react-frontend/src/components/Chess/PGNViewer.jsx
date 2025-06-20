import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const PGNViewer = ({ notation }) => {
  const [fen, setFen] = useState("start");
  const [moves, setMoves] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0);
  const chessRef = useRef(new Chess());

  useEffect(() => {
    if (!notation || typeof notation !== "string") return;

    // Clean move numbers and final result like 0-1, 1-0, 1/2-1/2
    const cleaned = notation
      .replace(/\d+\./g, "") // remove move numbers
      .replace(/\b(1-0|0-1|1\/2-1\/2)\b/g, "") // remove result
      .replace(/\s+/g, " ") // normalize whitespace
      .trim();

    const moveList = cleaned.split(" ");
    setMoves(moveList);
    chessRef.current.reset();
    setFen(chessRef.current.fen());
    setMoveIndex(0);
  }, [notation]);

  const nextMove = () => {
    if (moveIndex >= moves.length) return;

    const move = moves[moveIndex];
    const result = chessRef.current.move(move, { sloppy: true });

    if (result) {
      setMoveIndex(moveIndex + 1);
      setFen(chessRef.current.fen());
    } else {
      console.warn("⚠️ Invalid move at index", moveIndex, "→", move);
    }
  };

  const prevMove = () => {
    if (moveIndex <= 0) return;

    const newChess = new Chess();
    const cleaned = notation
      .replace(/\d+\./g, "")
      .replace(/\b(1-0|0-1|1\/2-1\/2)\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const moveList = cleaned.split(" ");

    for (let i = 0; i < moveIndex - 1; i++) {
      newChess.move(moveList[i], { sloppy: true });
    }

    chessRef.current = newChess;
    setMoveIndex(moveIndex - 1);
    setFen(newChess.fen());
  };

  return (
    <div className="flex flex-column align-items-center mt-4">
      <div style={{ width: 500 }}>
        <Chessboard
          position={fen}
          arePiecesDraggable={false}
          boardWidth={500} // ✅ fixed size to prevent resizing
        />
      </div>
      <div className="mt-3 flex gap-4 justify-content-center">
        <button onClick={prevMove} disabled={moveIndex === 0}>
          ◀ Prev
        </button>
        <span>
          Move {moveIndex} / {moves.length}
        </span>
        <button onClick={nextMove} disabled={moveIndex >= moves.length}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default PGNViewer;
