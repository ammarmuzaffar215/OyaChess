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

const findPawnMove = (fromFen, toFen) => {
  const fromBoard = fenToBoardArray(fromFen);
  const toBoard = fenToBoardArray(toFen);

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const fromPiece = fromBoard[row][col];
      const toPiece = toBoard[row][col];

      if (fromPiece !== toPiece) {
        if (
          fromPiece &&
          (fromPiece === "B" || fromPiece === "b") &&
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

const Board5 = () => {
  const positions1 = [
    "8/8/6b1/8/1B6/8/8/8",
    "8/4B3/6b1/8/8/8/8/8",
    "8/4B3/8/5b2/8/8/8/8",
    "8/8/8/5bB1/8/8/8/8",
    "8/8/8/6B1/8/8/2b5/8",
    "8/8/8/8/8/4B3/2b5/8",
    "8/8/8/8/b7/4B3/8/8",
  ];

  const positions2 = [
    "2b5/8/p3P3/3p3P/p3P3/8/8/7B",
    "2b5/8/p3P3/3p3P/p3P3/5B2/8/8",
    "8/1b6/p3P3/3p3P/p3P3/5B2/8/8",
    "8/1b6/p3P3/3p3P/p3P1B1/8/8/8",
    "8/8/p1b1P3/3p3P/p3P1B1/8/8/8",
    "8/8/p1b1P3/3p1B1P/p3P3/8/8/8",
    "8/8/p3P3/1b1p1B1P/p3P3/8/8/8",
    "8/7B/p3P3/1b1p3P/p3P3/8/8/8",
    "8/7B/p3P3/3p3P/p3P3/8/8/5b2",
  ];

  const positions3 = [
    "8/7b/3p4/1P3P2/1p6/3P2p1/8/4B3",
    "8/7b/3p4/1P3P2/1p6/3P2B1/8/8",
    "8/8/3p4/1P3b2/1p6/3P2B1/8/8",
    "8/8/3B4/1P3b2/1p6/3P4/8/8",
    "8/8/3B4/1P6/1p6/3b4/8/8",
    "8/8/8/1P6/1B6/3b4/8/8",
    "8/8/8/1b6/1B6/8/8/8",
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
          const move = findPawnMove(
            positions1[posIndex1 - 1],
            positions1[posIndex1]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow2 =
    posIndex2 === 0
      ? []
      : (() => {
          const move = findPawnMove(
            positions2[posIndex2 - 1],
            positions2[posIndex2]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow3 =
    posIndex3 === 0
      ? []
      : (() => {
          const move = findPawnMove(
            positions3[posIndex3 - 1],
            positions3[posIndex3]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  return (
    <div className="justify-center items-center gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
      <p className="text-3xl text-center font-semibold">Bishop</p>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board5-1"
            boardWidth={300}
            arePiecesDraggable={false}
            position={positions1[posIndex1]}
            customArrows={arrow1}
          />
          <p className=" mt-4 text-center w-[300px] px-2 text-xl  ">
            Bishop moves <strong>diagonally</strong> in an "X" pattern and can
            move backward.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board5-2"
            boardWidth={300}
            arePiecesDraggable={false}
            position={positions2[posIndex2]}
            customArrows={arrow2}
          />
          <p className=" mt-4 text-center w-[300px] px-2 text-xl  ">
            Bishop <strong>cannot jump</strong> over other pieces.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board5-3"
            boardWidth={300}
            arePiecesDraggable={false}
            position={positions3[posIndex3]}
            customArrows={arrow3}
          />
          <p className=" mt-4 text-center w-[300px] px-2 text-xl  ">
            Bishop captures the <strong>same way</strong> it moves.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board5;
