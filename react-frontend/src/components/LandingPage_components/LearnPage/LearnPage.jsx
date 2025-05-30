import React, { useState } from "react";
import PublicNavbar from "../../Layouts/PublicNavbar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import Board1 from "./ChessFunction/Board1";
import Board2 from "./ChessFunction/Board2";
import Board3 from "./ChessFunction/Board3";
import Board4 from "./ChessFunction/Board4";
import Board5 from "./ChessFunction/Board5";
import Board6 from "./ChessFunction/Board6";
import Board7 from "./ChessFunction/Board7";
import Board8 from "./ChessFunction/Board8";
import Board9 from "./ChessFunction/Board9";
import Board10 from "./ChessFunction/Board10";

const LearnPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PublicNavbar />

      {/* Header Section */}
      <div className="bg-white" style={{ padding: "2rem" }}>
        <div className="flex items-center justify-center gap-4 py-4">
          <p className="m-0 font-marlin font-bold text-6xl text-black">Learn</p>
        </div>
        <div
          style={{
            borderTop: "2px solid #000000",
            width: "15%",
            margin: "2rem auto",
          }}
        ></div>
      </div>

      {/* Section: New to Chess */}
      <div className="bg-emerald-700" style={{ padding: "2rem" }}>
        <div className="flex items-center justify-center">
          <p className="m-0 font-marlin font-bold text-5xl text-white">
            How to play Chess?
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-white p-8">
        <div className="flex items-center justify-center gap-2 w-full max-w-screen-xl mx-auto px-6 md:px-[30rem]">
          <p className="m-0 font-marlin font-normal text-xl text-black">
            In this page, I have listed all the important rules a chess player
            must know to start playing. Enjoy learning!
          </p>
        </div>
      </div>
      <div className="bg-white py-4 px-8">
        <div className="flex items-center justify-center gap-2 w-full max-w-screen-xl mx-auto px-6 md:px-[30rem]">
          <p className="m-0 font-marlin font-bold text-4xl text-black">
            Contents
          </p>
        </div>
      </div>

      {/* Chess Lesson*/}
      <div className="bg-white p-8">
        <div className="card">
          <Accordion multiple>
            {/* Lesson 1 */}
            <AccordionTab
              header={
                <span className="text-2xl font-semibold">
                  Lesson 1: Chess Rules
                </span>
              }
            >
              <div className="justify-center items-center gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
                <p className="m-0 font-medium text-xl">
                  How to start a chess game?
                  <div
                    style={{
                      borderTop: "2px solid rgba(0, 0, 0, 0.2)",
                      margin: "0.5rem auto",
                    }}
                  ></div>
                </p>
                <p className="m-0 text-lg">
                  To play chess, <strong>TWO</strong> players are needed. This
                  is because chess has two sides, White and Black.
                </p>
                <br />
                <br />
                <p className="m-0 font-medium text-xl">
                  Who starts the game first?
                  <div
                    style={{
                      borderTop: "2px solid rgba(0, 0, 0, 0.2)",
                      margin: "0.5rem auto",
                    }}
                  ></div>
                </p>
                <p className="m-0 text-lg">
                  White will start first, and then followed by Black. The
                  players alternate move until the game ends.
                </p>
              </div>
            </AccordionTab>

            {/* Lesson 2 */}
            <AccordionTab
              header={
                <span className="text-2xl font-semibold">
                  Lesson 2: Chess Board
                </span>
              }
            >
              <Board1 />
            </AccordionTab>

            {/* Lesson 3 */}
            <AccordionTab
              header={
                <span className="text-2xl font-semibold">
                  Lesson 3: Chess Pieces
                </span>
              }
            >
              <div className="m-0 space-y-4 flex justify-center">
                <div className="grid grid-cols-3 gap-6 text-center">
                  {[
                    { src: "./assets/chess/wp.svg", label: "Pawn" },
                    { src: "./assets/chess/wn.svg", label: "Knight" },
                    { src: "./assets/chess/wb.svg", label: "Bishop" },
                    { src: "./assets/chess/wr.svg", label: "Rook" },
                    { src: "./assets/chess/wq.svg", label: "Queen" },
                    { src: "./assets/chess/wk.svg", label: "King" },
                  ].map(({ src, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center justify-center"
                    >
                      <img src={src} alt={label} className="w-40 h-40" />
                      <p className="mt-2 font-medium text-xl">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionTab>

            <AccordionTab
              header={
                <span className="text-2xl font-semibold">
                  Lesson 4: Starting Setup
                </span>
              }
            >
              <Board2 />
            </AccordionTab>
            <AccordionTab
              header={
                <span className="text-2xl font-semibold">
                  Lesson 5: Piece Movement
                </span>
              }
            >
              <Board3 />
              <div
                style={{
                  borderTop: "2px solid rgba(0, 0, 0, 0.2)",
                  margin: "0.5rem auto",
                }}
              ></div>
              <Board4 />
              <div
                style={{
                  borderTop: "2px solid rgba(0, 0, 0, 0.2)",
                  margin: "0.5rem auto",
                }}
              ></div>
              <Board5 />
              <div
                style={{
                  borderTop: "2px solid rgba(0, 0, 0, 0.2)",
                  margin: "0.5rem auto",
                }}
              ></div>
              <Board6 />
              <div
                style={{
                  borderTop: "2px solid rgba(0, 0, 0, 0.2)",
                  margin: "0.5rem auto",
                }}
              ></div>
              <Board7 />
              <div
                style={{
                  borderTop: "2px solid rgba(0, 0, 0, 0.2)",
                  margin: "0.5rem auto",
                }}
              ></div>
              <Board8 />
            </AccordionTab>
            <AccordionTab
              header={
                <span className="text-2xl font-semibold">
                  Lesson 6: Pieces Value
                </span>
              }
            >
              <div className="m-0 space-y-4 flex justify-center">
                <div className="grid grid-cols-3 gap-6 text-center">
                  {[
                    { src: "./assets/chess/wp.svg", label: "1 point" },
                    { src: "./assets/chess/wn.svg", label: "3 points" },
                    { src: "./assets/chess/wb.svg", label: "3 points" },
                    { src: "./assets/chess/wr.svg", label: "5 points" },
                    { src: "./assets/chess/wq.svg", label: "9 points" },
                    { src: "./assets/chess/wk.svg", label: "Infinite" },
                  ].map(({ src, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center justify-center"
                    >
                      <img src={src} alt={label} className="w-40 h-40" />
                      <p className="mt-2 font-medium text-xl">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionTab>
            <AccordionTab
              header={
                <span className="text-2xl font-semibold">
                  Lesson 7: Check, Checkmate and Stalemate
                </span>
              }
            >
              <Board9 />
            </AccordionTab>
            <AccordionTab
              header={
                <span className="text-2xl font-semibold">
                  Lesson 8: Special Moves
                </span>
              }
            >
              <Board10 />
            </AccordionTab>
          </Accordion>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="bg-white  pb-5">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full max-w-screen-xl mx-auto px-6 md:px-[30rem]">
          <p className="m-0 font-marlin font-normal text-xl text-black">
           Want to learn more? Join my classes now to become a good chess player!
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full max-w-screen-xl mx-auto p-5 md:px-[30rem]">
          <Button
            label="Click here to jump to Coaching"
            className="!border-black bg-green-500 text-white"
            onClick={() => navigate("/coaching")}
          />
        </div>
        <div className="flex items-center justify-center w-full max-w-screen-xl mx-auto p-1 mt-5 md:px-[30rem]">
          <p className="m-0 font-marlin font-normal text-sm text-black">
            Copyright © 2023 OyaChess
          </p>
        </div>
      </div>
    </>
  );
};

export default LearnPage;
