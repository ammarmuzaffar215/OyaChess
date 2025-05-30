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
          (fromPiece === "R" || fromPiece === "r") &&
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

const Board6 = () => {
  const positions1 = [
    "8/8/4r3/8/8/1R6/8/8",
    "8/8/4r3/8/8/2R5/8/8",
    "8/8/8/8/8/2R5/4r3/8",
    "8/8/8/8/2R5/8/4r3/8",
    "8/8/8/8/2R5/8/1r6/8",
    "8/8/8/8/6R1/8/1r6/8",
    "1r6/8/8/8/6R1/8/8/8",
  ];

  const positions2 = [
    "3r4/2P3p1/3p4/4P3/1P6/5p2/8/4R3",
    "3r4/2P3p1/3p4/4P3/1P2R3/5p2/8/8",
    "8/2Pr2p1/3p4/4P3/1P2R3/5p2/8/8",
    "8/2Pr2p1/3p4/4P3/1PR5/5p2/8/8",
    "8/2P2rp1/3p4/4P3/1PR5/5p2/8/8",
    "8/2P2rp1/2Rp4/4P3/1P6/5p2/8/8",
    "8/2P3p1/2Rp4/4P3/1P3r2/5p2/8/8",
  ];

  const positions3 = [
    "3r4/1p6/3P2P1/8/1p2p3/6P1/8/4R3",
    "3r4/1p6/3P2P1/8/1p2R3/6P1/8/8",
    "8/1p6/3r2P1/8/1p2R3/6P1/8/8",
    "8/1p6/3r2P1/8/1R6/6P1/8/8",
    "8/1p6/6r1/8/1R6/6P1/8/8",
    "8/1R6/6r1/8/8/6P1/8/8",
    "8/1R6/8/8/8/6r1/8/8",
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

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6">
      <p
        className="text-3xl text-center font-semibold mb-6"
        style={{ color: "rgba(133, 114, 81, 1)" }}
      >
        Rook
      </p>
      <div className="flex flex-wrap justify-center items-start gap-6">
        {[
          {
            id: "Board6-1",
            pos: positions1[posIndex1],
            arrows: arrow1,
            text: "Rook moves *straight* in a '+' pattern and can move backward.",
          },
          {
            id: "Board6-2",
            pos: positions2[posIndex2],
            arrows: arrow2,
            text: "Rook *cannot jump* over other pieces.",
          },
          {
            id: "Board6-3",
            pos: positions3[posIndex3],
            arrows: arrow3,
            text: "Rook captures the *same way* it moves.",
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
              dangerouslySetInnerHTML={{
                __html: text.replace(/\*(.*?)\*/g, "<strong>$1</strong>"),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board6;
