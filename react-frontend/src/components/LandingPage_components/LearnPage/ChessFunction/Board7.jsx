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
          (fromPiece === "Q" || fromPiece === "q") &&
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

const Board7 = () => {
  const positions1 = [
    "8/4q3/8/8/8/8/2Q5/8",
    "8/4q3/8/8/Q7/8/8/8",
    "8/8/8/8/Q7/4q3/8/8",
    "8/8/8/8/2Q5/4q3/8/8",
    "8/8/8/8/2Q5/8/3q4/8",
    "6Q1/8/8/8/8/8/3q4/8",
    "6Q1/8/3q4/8/8/8/8/8",
  ];

  const positions2 = [
    "6q1/1P6/4P3/7p/P7/4p3/6p1/3Q4",
    "6q1/1P6/4P3/7p/P7/1Q2p3/6p1/8",
    "8/1P6/4P3/7p/P7/1Q2p1q1/6p1/8",
    "8/1P6/1Q2P3/7p/P7/4p1q1/6p1/8",
    "8/1P6/1Q2P3/7p/P7/4pq2/6p1/8",
    "8/1P6/3QP3/7p/P7/4pq2/6p1/8",
    "8/1P6/3QP3/7p/P5q1/4p3/6p1/8",
  ];

  const positions3 = [
    "4q3/P5P1/8/3p4/P7/3Q3p/6p1/8",
    "4q3/P5P1/8/3p4/P7/7Q/6p1/8",
    "8/P5P1/8/3p4/q7/7Q/6p1/8",
    "8/P5P1/8/3p4/q7/8/6Q1/8",
    "8/q5P1/8/3p4/8/8/6Q1/8",
    "8/q5P1/8/3Q4/8/8/8/8",
    "8/6q1/8/3Q4/8/8/8/8",
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
      <p className="text-3xl text-center font-semibold">Queen</p>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board7-1"
            boardWidth={300}
            arePiecesDraggable={false}
            position={positions1[posIndex1]}
            customArrows={arrow1}
          />
          <p className=" mt-4 text-center w-[300px] px-2 text-xl  ">
            Queen moves <strong>straight and diagonally</strong>, and can move backward. Queen is
            like a combination of rook and bishop.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board7-2"
            boardWidth={300}
            arePiecesDraggable={false}
            position={positions2[posIndex2]}
            customArrows={arrow2}
          />
          <p className=" mt-4 text-center w-[300px] px-2 text-xl  ">
            Queen <strong>cannot jump</strong> over other pieces.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board7-3"
            boardWidth={300}
            arePiecesDraggable={false}
            position={positions3[posIndex3]}
            customArrows={arrow3}
          />
          <p className=" mt-4 text-center w-[300px] px-2 text-xl  ">
            Queen captures the <strong>same way</strong> it moves.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board7;
