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
        if (fromPiece && (fromPiece === "P" || fromPiece === "p") && toPiece !== fromPiece) {
          for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
              if (
                (toBoard[r][c] === fromPiece) &&
                (fromBoard[r][c] !== fromPiece)
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

const Board3 = () => {
  const positions1 = [
    "8/8/8/4p3/6P1/8/8/8",
    "8/8/8/4p1P1/8/8/8/8",
    "8/8/8/6P1/4p3/8/8/8",
    "8/8/6P1/8/4p3/8/8/8",
    "8/8/6P1/8/8/4p3/8/8",
  ];

  const positions2 = [
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR",
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR",
    "rnbqkbnr/pp1ppppp/8/2p1P3/8/8/PPPP1PPP/RNBQKBNR",
    "rnbqkbnr/pp1ppppp/8/4P3/2p5/8/PPPP1PPP/RNBQKBNR",
  ];

  const positions3 = [
    "8/8/6r1/5P2/3p4/2N5/3N4/8",
    "8/8/6P1/8/3p4/2N5/3N4/8",
    "8/8/6P1/8/8/2p5/3N4/8",
    "8/6P1/8/8/8/2p5/3N4/8",
    "8/6P1/8/8/8/8/3p4/8",
  ];

  const positions4 = [
    "8/6n1/2p5/4p1P1/2B5/4P3/8/8",
    "8/6n1/2p5/4p1P1/2B1P3/8/8/8",
    "8/6n1/8/2p1p1P1/2B1P3/8/8/8",
    "8/6n1/6P1/2p1p3/2B1P3/8/8/8",
  ];

  const [posIndex1, setPosIndex1] = useState(0);
  const [posIndex2, setPosIndex2] = useState(0);
  const [posIndex3, setPosIndex3] = useState(0);
  const [posIndex4, setPosIndex4] = useState(0);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosIndex4((prev) => (prev === positions4.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [posIndex4]);

  const arrow1 = posIndex1 === 0 ? [] : (() => {
    const move = findPawnMove(positions1[posIndex1 - 1], positions1[posIndex1]);
    return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
  })();

  const arrow2 = posIndex2 === 0 ? [] : (() => {
    const move = findPawnMove(positions2[posIndex2 - 1], positions2[posIndex2]);
    return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
  })();

  const arrow3 = posIndex3 === 0 ? [] : (() => {
    const move = findPawnMove(positions3[posIndex3 - 1], positions3[posIndex3]);
    return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
  })();

  const arrow4 = posIndex4 === 0 ? [] : (() => {
    const move = findPawnMove(positions4[posIndex4 - 1], positions4[posIndex4]);
    return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
  })();

  return (
    <div className="justify-center items-center gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
      <p className="text-3xl text-center font-semibold">Pawn</p>

      <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board3-1"
            boardWidth={300}
            arePiecesDraggable={false}
            position={positions1[posIndex1]}
            customArrows={arrow1}
          />
          <p className="mt-4 text-center max-w-md px-2 text-xl">
            Pawn can only move forward <strong>one step</strong> each move.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board3-2"
            boardWidth={300}
            arePiecesDraggable={false}
            position={positions2[posIndex2]}
            customArrows={arrow2}
          />
          <p className="mt-4 text-center max-w-md px-2 text-xl">
            But the <strong>first time</strong> a pawn move, it can also move
            forward <strong>two squares</strong>.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board3-3"
            boardWidth={300}
            arePiecesDraggable={false}
            position={positions3[posIndex3]}
            customArrows={arrow3}
          />
          <p className="mt-4 text-center max-w-md px-2 text-xl">
            Pawn captures <strong>sideway</strong> (left and right), and will
            continue to move on the new file it transferred to.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board3-4"
            boardWidth={300}
            arePiecesDraggable={false}
            position={positions4[posIndex4]}
            customArrows={arrow4}
          />
          <p className="mt-4 text-center max-w-md px-2 text-xl">
            Any piece in front of a pawn will <strong>prevent</strong> the pawn
            from moving further, unless the blocker moves away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board3;
