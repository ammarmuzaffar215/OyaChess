import React from "react";
import { Chessboard } from "react-chessboard";

const Board7 = () => {
  return (
    <div className="justify-center items-center gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
      <p className="text-3xl text-center font-bold">Queen</p>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board7-1"
            boardWidth={300}
            arePiecesDraggable={false}
            position="start"
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
            position="start"
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
            position="start"
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
