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

const Board9 = () => {
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
      <p
        className="text-3xl text-center font-semibold pb-6"
        style={{ color: "rgba(133, 114, 81, 1)" }}
      >
        Check
      </p>
      <p className="m-0 font-medium text-2xl">
        What is a check?
        <div
          style={{
            borderTop: "2px solid rgba(0, 0, 0, 0.2)",
            margin: "0.5rem auto",
          }}
        ></div>
      </p>
      <p className="m-0 text-lg">
        Check is a move where it attacks the opponent's king and threatens to
        capture it on the next turn.
        <br />
        <br />
        The player that receives the check <strong>
          must stop the check
        </strong>{" "}
        by saving their king.
        <br />
        <br />
        If a check is ignored and the player does not save their king, it will
        count as an <strong>illegal move</strong>.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board8-1"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions1[posIndex1]}
            customArrows={arrow1}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-xl  ">
            First way to stop check:
            <br />
            <br />
            <strong>Avoid</strong> the check.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board8-2"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions2[posIndex2]}
            customArrows={arrow2}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-xl  ">
            Second way to stop check:
            <br />
            <br />
            <strong>Block</strong> the check.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board8-3"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions3[posIndex3]}
            customArrows={arrow3}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            Third way to stop check:
            <br />
            <br />
            <strong>Capture</strong> the checking piece.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board9;
