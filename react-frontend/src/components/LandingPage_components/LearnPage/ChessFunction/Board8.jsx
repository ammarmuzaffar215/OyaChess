import React from "react";
import { Chessboard } from "react-chessboard";

const Board8 = () => {
  return (
    <div className="justify-center items-center gap-6 w-full max-w-screen-xl mx-auto pt-6 md:px-[30rem]">
      <p className="text-3xl text-center font-bold">King</p>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board8-1"
            boardWidth={300}
            arePiecesDraggable={false}
            position="start"
          />
          <p className=" mt-4 text-center w-[300px] px-2 text-xl  ">
            King can only move one square around it.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board8-2"
            boardWidth={300}
            arePiecesDraggable={false}
            position="start"
          />
          <p className=" mt-4 text-center w-[300px] px-2 text-xl  ">
            King captures the <strong>same way</strong> it moves.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <Chessboard
            id="Board8-3"
            boardWidth={300}
            arePiecesDraggable={false}
            position="start"
          />
          <p className=" mt-4 text-center w-[300px] px-2 text-xl  ">
            King cannot move to a square that is controlled by the opponent's
            pieces (squares that allow the king to be captured). It will be
            considered as illegal move.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Board8;
