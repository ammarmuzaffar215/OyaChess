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

const Board10 = () => {
  const positions1 = [
    "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
    "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQ1RK1",
  ];

  const positions2 = [
    "r2q1rk1/pp1bppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/R3K2R",
    "r2q1rk1/pp1bppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/2KR3R",
  ];

  const positions3 = [
    "8/8/8/8/4p3/8/3P4/8",
    "8/8/8/8/3Pp3/8/8/8",
    "8/8/8/8/8/3p4/8/8",
  ];

  const positions4 = [
    "r1bqk2r/1ppnppbp/3p1np1/8/p2PP3/P4N2/1PPNBPPP/R1BQ1RK1",
    "r1bqk2r/1ppnppbp/3p1np1/8/pP1PP3/P4N2/2PNBPPP/R1BQ1RK1",
    "r1bqk2r/1ppnppbp/3p1np1/8/3PP3/Pp3N2/2PNBPPP/R1BQ1RK1",
  ];

  const positions5 = [
    "8/5K1k/8/8/8/8/P7/8",
    "8/5K1k/8/8/P7/8/8/8",
    "8/5K2/7k/8/P7/8/8/8",
    "8/5K2/7k/P7/8/8/8/8",
    "8/5K1k/8/P7/8/8/8/8",
    "8/5K1k/P7/8/8/8/8/8",
    "8/5K2/P6k/8/8/8/8/8",
    "8/P4K2/7k/8/8/8/8/8",
    "8/P4K1k/8/8/8/8/8/8",
    "Q7/5K1k/8/8/8/8/8/8",
    "Q6k/5K2/8/8/8/8/8/8",
    "7k/5K2/8/8/8/8/8/7Q",
  ];

  const positions6 = [
    "8/3qkP1r/p7/1p6/1P1Q4/1KP5/8/8",
    "8/3QkP1r/p7/1p6/1P6/1KP5/8/8",
    "8/3k1P1r/p7/1p6/1P6/1KP5/8/8",
    "5N2/3k3r/p7/1p6/1P6/1KP5/8/8",
    "5N2/4k2r/p7/1p6/1P6/1KP5/8/8",
    "8/4k2N/p7/1p6/1P6/1KP5/8/8",
  ];

  const [posIndex1, setPosIndex1] = useState(0);
  const [posIndex2, setPosIndex2] = useState(0);
  const [posIndex3, setPosIndex3] = useState(0);
  const [posIndex4, setPosIndex4] = useState(0);
  const [posIndex5, setPosIndex5] = useState(0);
  const [posIndex6, setPosIndex6] = useState(0);

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

  return (
    <div className="justify-center items-center gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
      <p
        className="text-3xl text-center font-semibold pb-6"
        style={{ color: "rgba(133, 114, 81, 1)" }}
      >
        Castling
      </p>
      <p className="m-0 font-medium text-2xl">
        What is a castling?
        <div
          style={{
            borderTop: "2px solid rgba(0, 0, 0, 0.2)",
            margin: "0.5rem auto",
          }}
        ></div>
      </p>
      <p className="m-0 text-lg">
        Castling is a move where the king move two steps towards one of the rook
        and the rook switch next to the king.
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
            Castling Kingside
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
            Castling Queenside
          </p>
        </div>
      </div>
      <p className="m-0 font-medium text-2xl">
        Conditions needed to perform castling:
        <div
          style={{
            borderTop: "2px solid rgba(0, 0, 0, 0.2)",
            margin: "0.5rem auto",
          }}
        ></div>
      </p>
      <p className="m-0 text-lg pb-8">
        1. The king and the rook (the rook that wants to perform castling) have
        not moved.
        <br />
        <br />
        2. The king is not in check.
        <br />
        <br />
        3. The squares between the king and the involved rook are empty.
        <br />
        <br />
        4. The two squares the king move through are not controlled by the
        opponent's pieces. Meaning:
        <ul className="list-disc list-inside ml-2 text-lg">
          <li>
            If White king wants to castle kingside, make sure both{" "}
            <strong>f1 and g1</strong> are not controlled by any Black pieces.
          </li>
          <li>
            If White king wants to castle queenside, make sure both{" "}
            <strong>c1 and d1</strong> are not controlled by any Black pieces.
          </li>
          <li>
            If Black king wants to castle kingside, make sure both{" "}
            <strong>f8 and g8</strong> are not controlled by any White pieces.
          </li>
          <li>
            If Black king wants to castle queenside, make sure both{" "}
            <strong>c8 and d8</strong> are not controlled by any White pieces.
          </li>
        </ul>
      </p>

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
        En-Passant
      </p>
      <p className="m-0 font-medium text-2xl">
        What is en-passant?
        <div
          style={{
            borderTop: "2px solid rgba(0, 0, 0, 0.2)",
            margin: "0.5rem auto",
          }}
        ></div>
      </p>
      <ul className="m-0 text-lg list-disc list-inside">
        <li>
          En-passant can be done when a pawn moves forward two square from its
          starting square, but end up next to an opponent's pawn.
        </li>
        <li>
          That pawn then can be captured like a normal capture as if it only
          moved one square forward.
        </li>
        <li>
          En-passant can only be done on the turn right after the two-square
          pawn advance. If the turn is used for moving other pieces, then
          en-passant can no longer be done on that pawn.
        </li>
      </ul>

      <div className="flex flex-wrap justify-center items-start gap-6 py-8">
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-3"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions3[posIndex3]}
            customArrows={arrow3}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            Example 1
          </p>
        </div>
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-4"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions4[posIndex4]}
            customArrows={arrow4}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            Example 2
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
        Pawn Promotion
      </p>
      <p className="m-0 font-medium text-2xl">
        What is pawn promotion?
        <div
          style={{
            borderTop: "2px solid rgba(0, 0, 0, 0.2)",
            margin: "0.5rem auto",
          }}
        ></div>
      </p>
      <p className="m-0 text-lg">
        Pawn promotion happens when a pawn reached the end of the board, meaning
        it arrived at the first rank of the opponent's territory.
        <br />
        <br />
        The pawn that reached the end can be promoted to any other pieces (free
        to choose), except the king.
      </p>

      <div className="flex flex-wrap justify-center items-start gap-6 py-8">
        <div className="flex flex-col items-center w-[250px]">
          <Chessboard
            id="Board9-5"
            boardWidth={250}
            arePiecesDraggable={false}
            position={positions5[posIndex5]}
            customArrows={arrow5}
          />
          <p className=" mt-4 text-center w-[250px] px-2 text-lg  ">
            The White pawn is promoted to a queen and can move like the original
            queen.
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
            The White pawn is promoted to a knight and can move like the
            original knight.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board10;
