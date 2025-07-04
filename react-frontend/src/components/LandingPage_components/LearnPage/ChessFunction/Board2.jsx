import React from "react";
import { Chessboard } from "react-chessboard";

const Board2 = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
        <Chessboard
          id="Board2-1"
          boardWidth={250}
          arePiecesDraggable={false}
          position="8/pppppppp/8/8/8/8/PPPPPPPP/8"
        />
        <p className=" mt-4 text-center w-[250px] text-lg ">
          Step 1:
          <br />
          <br />
          Put all the <strong>pawns</strong> on the second rank of each player.
          <br />
          <br />
          (White pawns on 2nd rank, Black pawn on 7th rank)
        </p>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
        <Chessboard
          id="Board2-2"
          boardWidth={250}
          arePiecesDraggable={false}
          position="rnb2bnr/pppppppp/8/8/8/8/PPPPPPPP/RNB2BNR"
        />
        <p className=" mt-4 text-center w-[250px] text-lg ">
          Step 2:
          <br />
          <br />
          Put the <strong>rooks</strong>, <strong>knights</strong>, and{" "}
          <strong>bishops</strong> in order on all the corners.
        </p>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
        <Chessboard
          id="Board2-3"
          boardWidth={250}
          arePiecesDraggable={false}
          position="rnbq1bnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQ1BNR"
        />
        <p className=" mt-4 text-center w-[250px] text-lg ">
          Step 3:
          <br />
          <br />
          Place the <strong>White queen</strong> on light square, and{" "}
          <strong>Black queen</strong> on dark square.
        </p>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
        <Chessboard
          id="Board2-4"
          boardWidth={250}
          arePiecesDraggable={false}
          position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
        />
        <p className=" mt-4 text-center w-[250px] text-lg ">
          Step 4:
          <br />
          <br />
          Put the <strong>kings</strong> next to the queens.
          <br />
          <br />
          Finish!
        </p>
      </div>
    </div>
  );
};

export default Board2;
