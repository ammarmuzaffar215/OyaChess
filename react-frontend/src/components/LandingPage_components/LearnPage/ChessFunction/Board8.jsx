import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";

const fenToBoardArray = (fen) => {
  const [piecePlacement] = fen.split(" ");
  const rows = piecePlacement.split("/");
  const board = [];

  for (const row of rows) {
    const rowArr = [];
    for (const char of row) {
      if (isNaN(char)) {
        rowArr.push(char);
      } else {
        for (let i = 0; i < parseInt(char); i++) {
          rowArr.push(null);
        }
      }
    }
    board.push(rowArr);
  }
  return board;
};

const indexToSquare = (row, col) => {
  const files = "abcdefgh";
  return files[col] + (8 - row);
};

const findMove = (fromFen, toFen) => {
  const fromBoard = fenToBoardArray(fromFen);
  const toBoard = fenToBoardArray(toFen);

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const fromPiece = fromBoard[row][col];
      const toPiece = toBoard[row][col];

      if (fromPiece !== toPiece) {
        if (
          fromPiece &&
          (fromPiece === "K" ||
            fromPiece === "k" ||
            fromPiece === "R" ||
            fromPiece === "r" ||
            fromPiece === "B" ||
            fromPiece === "b" ||
            fromPiece === "N" ||
            fromPiece === "n" ||
            fromPiece === "P" ||
            fromPiece === "p") &&
          toPiece !== fromPiece
        ) {
          for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
              if (
                toBoard[r][c] === fromPiece &&
                fromBoard[r][c] !== fromPiece
              ) {
                const fromSquare = indexToSquare(row, col);
                const toSquare = indexToSquare(r, c);
                return [fromSquare, toSquare];
              }
            }
          }
        }
      }
    }
  }
  return null;
};

const Board8 = () => {
  const positions1 = [
    "8/4k3/8/8/8/8/4P3/4K3",
    "8/4k3/8/8/8/8/3KP3/8",
    "8/8/4k3/8/8/4K3/4P3/8",
    "8/8/8/3k4/8/4K3/4P3/8",
    "8/8/8/3k4/8/3K4/4P3/8",
    "8/8/8/4k3/8/3K4/4P3/8",
    "8/8/8/4k3/8/4K3/4P3/8",
    "8/8/4k3/8/8/4K3/4P3/8",
    "8/8/4k3/8/4K3/8/4P3/8",
  ];

  const positions2 = [
    "8/8/PP5K/2PPk2p/7p/5p2/8/8",
    "8/8/PP6/2PPk2K/7p/5p2/8/8",
    "8/8/PP6/2Pk3K/7p/5p2/8/8",
    "8/8/PP6/2Pk4/7K/5p2/8/8",
    "8/8/PP6/2k5/7K/5p2/8/8",
    "8/8/PP6/2k5/8/5pK1/8/8",
    "8/8/Pk6/8/8/5pK1/8/8",
    "8/8/Pk6/8/8/5K2/8/8",
    "8/8/k7/8/8/5K2/8/8",
  ];

  const positions3 = [
    "8/8/8/3k4/1P5R/8/1B2NN2/4K3",
    "8/8/8/3k4/1P3N1R/8/1B3N2/4K3",
    "8/8/3k4/8/1P3N1R/8/1B3N2/4K3",
    "8/8/3k4/8/1P2NN1R/8/1B6/4K3",
    "8/4k3/8/8/1P2NN1R/8/1B6/4K3",
    "8/4k2R/8/8/1P2NN2/8/1B6/4K3",
    "3k4/7R/8/8/1P2NN2/8/1B6/4K3",
    "3k4/7R/4N3/8/1P2N3/8/1B6/4K3",
    "2k5/7R/4N3/8/1P2N3/8/1B6/4K3",
    "2k5/7R/3NN3/8/1P6/8/1B6/4K3",
    "1k6/7R/3NN3/8/1P6/8/1B6/4K3",
    "1k6/7R/3NN3/8/1P1B4/8/8/4K3",
    "k7/7R/3NN3/8/1P1B4/8/8/4K3",
    "k7/7R/3NN3/1P6/3B4/8/8/4K3",
    "1k6/7R/3NN3/1P6/3B4/8/8/4K3",
  ];

  const [posIndex1, setPosIndex1] = useState(0);
  const [posIndex2, setPosIndex2] = useState(0);
  const [posIndex3, setPosIndex3] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosIndex1((prev) => (prev === positions1.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [posIndex1]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosIndex2((prev) => (prev === positions2.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [posIndex2]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosIndex3((prev) => (prev === positions3.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [posIndex3]);

  const arrow1 =
    posIndex1 === 0
      ? []
      : (() => {
          const move = findMove(
            positions1[posIndex1 - 1],
            positions1[posIndex1]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow2 =
    posIndex2 === 0
      ? []
      : (() => {
          const move = findMove(
            positions2[posIndex2 - 1],
            positions2[posIndex2]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow3 =
    posIndex3 === 0
      ? []
      : (() => {
          const move = findMove(
            positions3[posIndex3 - 1],
            positions3[posIndex3]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const infoTexts = [
    "King moves <strong>one square</strong> in any direction.",
    "King must avoid <strong>moving into check</strong>.",
    "King cannot move to a square that is controlled by the opponent's pieces (squares that allow the king to be captured). It will be considered as illegal move.",
  ];

  const positions = [positions1, positions2, positions3];
  const arrows = [arrow1, arrow2, arrow3];
  const indices = [posIndex1, posIndex2, posIndex3];

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6">
      <p
        className="text-3xl text-center font-semibold mb-6"
        style={{ color: "rgba(133, 114, 81, 1)" }}
      >
        King
      </p>
      <div className="flex flex-wrap justify-center items-start gap-6">
        {positions.map((posSet, idx) => (
          <div
            key={`king-board-${idx}`}
            className="flex flex-col items-center w-[250px]"
          >
            <Chessboard
              id={`king-${idx}`}
              boardWidth={250}
              arePiecesDraggable={false}
              position={posSet[indices[idx]]}
              customArrows={arrows[idx]}
            />
            <p
              className="mt-4 text-center text-lg px-2"
              dangerouslySetInnerHTML={{ __html: infoTexts[idx] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board8;
