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
            fromPiece === "Q" ||
            fromPiece === "q" ||
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

  const positions4 = [
    "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR",
    "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR",
  ];

  const positions5 = ["4k3/1R6/R7/8/4K3/8/8/8", "R3k3/1R6/8/8/4K3/8/8/8"];

  const positions6 = [
    "6rk/5ppp/8/6N1/7P/6P1/5PK1/8",
    "6rk/5Npp/8/8/7P/6P1/5PK1/8",
  ];

  const positions7 = ["k7/7Q/4K3/8/8/8/8/8", "k7/2Q5/4K3/8/8/8/8/8"];

  const positions8 = [
    "7k/5K2/2p2N2/2P5/p7/1P6/8/8",
    "7k/5K2/2p2N2/2P5/P7/8/8/8",
  ];

  const positions9 = ["4k3/4P3/5K2/8/8/8/8/8", "4k3/4P3/4K3/8/8/8/8/8"];

  const [posIndex1, setPosIndex1] = useState(0);
  const [posIndex2, setPosIndex2] = useState(0);
  const [posIndex3, setPosIndex3] = useState(0);
  const [posIndex4, setPosIndex4] = useState(0);
  const [posIndex5, setPosIndex5] = useState(0);
  const [posIndex6, setPosIndex6] = useState(0);
  const [posIndex7, setPosIndex7] = useState(0);
  const [posIndex8, setPosIndex8] = useState(0);
  const [posIndex9, setPosIndex9] = useState(0);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosIndex5((prev) => (prev === positions5.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [posIndex5]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosIndex6((prev) => (prev === positions6.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [posIndex6]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosIndex7((prev) => (prev === positions7.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [posIndex7]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosIndex8((prev) => (prev === positions8.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [posIndex8]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosIndex9((prev) => (prev === positions9.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [posIndex9]);

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

  const arrow4 =
    posIndex4 === 0
      ? []
      : (() => {
          const move = findMove(
            positions4[posIndex4 - 1],
            positions4[posIndex4]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow5 =
    posIndex5 === 0
      ? []
      : (() => {
          const move = findMove(
            positions5[posIndex5 - 1],
            positions5[posIndex5]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow6 =
    posIndex6 === 0
      ? []
      : (() => {
          const move = findMove(
            positions6[posIndex6 - 1],
            positions6[posIndex6]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow7 =
    posIndex7 === 0
      ? []
      : (() => {
          const move = findMove(
            positions7[posIndex7 - 1],
            positions7[posIndex7]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow8 =
    posIndex8 === 0
      ? []
      : (() => {
          const move = findMove(
            positions8[posIndex8 - 1],
            positions8[posIndex8]
          );
          return move ? [[...move, "rgba(255, 0, 0, 0.5)"]] : [];
        })();

  const arrow9 =
    posIndex9 === 0
      ? []
      : (() => {
          const move = findMove(
            positions9[posIndex9 - 1],
            positions9[posIndex9]
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

      <div className="flex flex-wrap justify-center items-start gap-6 py-8">
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-1"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions1[posIndex1]}
            customArrows={arrow1}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            First way to stop check:
            <br />
            <br />
            <strong>Avoid</strong> the check.
          </p>
        </div>
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-2"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions2[posIndex2]}
            customArrows={arrow2}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            Second way to stop check:
            <br />
            <br />
            <strong>Block</strong> the check.
          </p>
        </div>
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-3"
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

      <div
        style={{
          borderTop: "2px solid rgba(0, 0, 0, 0.2)",
          margin: "0.5rem auto",
        }}
      ></div>
      <p
        className="text-3xl text-center font-semibold py-6"
        style={{ color: "rgba(133, 114, 81, 1)" }}
      >
        Checkmate
      </p>
      <p className="m-0 font-medium text-2xl">
        What is a checkmate?
        <div
          style={{
            borderTop: "2px solid rgba(0, 0, 0, 0.2)",
            margin: "0.5rem auto",
          }}
        ></div>
      </p>
      <p className="m-0 text-lg">
        Checkmate is a position where the king is in check, but there is no way
        to stop the check.
        <br />
        <br />
        Player that gets their king checkmated loses the game.
        <br />
        <br />
        If there is not enough material to checkmate the king, the game will
        conclude as draw.
      </p>

      <div className="flex flex-wrap justify-center items-start gap-6 py-8">
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-4"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions4[posIndex4]}
            customArrows={arrow4}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            Example 1
            <br />
            (Black gets checkmated)
          </p>
        </div>
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-5"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions5[posIndex5]}
            customArrows={arrow5}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            Example 2
            <br />
            (Black gets checkmated)
          </p>
        </div>
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-6"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions6[posIndex6]}
            customArrows={arrow6}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            Example 3
            <br />
            (Black gets checkmated)
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "2px solid rgba(0, 0, 0, 0.2)",
          margin: "0.5rem auto",
        }}
      ></div>
      <p
        className="text-3xl text-center font-semibold py-6"
        style={{ color: "rgba(133, 114, 81, 1)" }}
      >
        Stalemate
      </p>
      <p className="m-0 font-medium text-2xl">
        What is a stalemate?
        <div
          style={{
            borderTop: "2px solid rgba(0, 0, 0, 0.2)",
            margin: "0.5rem auto",
          }}
        ></div>
      </p>
      <p className="m-0 text-lg">
        Stalemate is a position where the king is not in check, but has no safe
        square to go to, and other pieces are practically impossible to move.
        <br />
        <br />
        In short, stalemate is when it is your turn to move but there is no
        legal move to be done.
        <br />
        <br />
        Stalemate results in draw, even if there are still a lot of pieces left.
      </p>

      <div className="flex flex-wrap justify-center items-start gap-6 py-8">
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-7"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions7[posIndex7]}
            customArrows={arrow7}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            Example 1
            <br />
            (Black gets stalemated)
          </p>
        </div>
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-8"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions8[posIndex8]}
            customArrows={arrow8}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            Example 2
            <br />
            (Black gets stalemated)
          </p>
        </div>
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-9"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions9[posIndex9]}
            customArrows={arrow9}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            Example 3
            <br />
            (Black gets stalemated)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board9;
