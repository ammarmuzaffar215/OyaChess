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

const findQueenMove = (fromFen, toFen) => {
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
          const move = findQueenMove(
            positions1[posIndex1 - 1],
            positions1[posIndex1]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow2 =
    posIndex2 === 0
      ? []
      : (() => {
          const move = findQueenMove(
            positions2[posIndex2 - 1],
            positions2[posIndex2]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow3 =
    posIndex3 === 0
      ? []
      : (() => {
          const move = findQueenMove(
            positions3[posIndex3 - 1],
            positions3[posIndex3]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const positions = [positions1, positions2, positions3];
  const arrows = [arrow1, arrow2, arrow3];
  const indices = [posIndex1, posIndex2, posIndex3];

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6">
      <p
        className="text-3xl text-center font-semibold mb-6"
        style={{ color: "rgba(133, 114, 81, 1)" }}
      >
        Queen
      </p>
      <div className="flex flex-wrap justify-center items-start gap-6">
        {[
          {
            id: "Board7-1",
            pos: positions1[posIndex1],
            arrows: arrow1,
            text: 'Queen moves <strong>straight and diagonally</strong>, and can move backward. Queen is like a combination of rook and bishop.',
          },
          {
            id: "Board7-2",
            pos: positions2[posIndex2],
            arrows: arrow2,
            text: "Queen <strong>cannot jump</strong> over other pieces.",
          },
          {
            id: "Board7-3",
            pos: positions3[posIndex3],
            arrows: arrow3,
            text: "Queen captures the <strong>same way</strong> it moves.",
          },
        ].map(({ id, pos, arrows, text }) => (
          <div key={id} className="flex flex-col items-center w-[250px]">
            <Chessboard
              id={id}
              boardWidth={250}
              arePiecesDraggable={false}
              position={pos}
              customArrows={arrows}
            />
            <p
              className="mt-4 text-center text-lg px-2"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board7;
