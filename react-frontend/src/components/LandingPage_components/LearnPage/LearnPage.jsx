import React from "react";
import PublicNavbar from "../../Layouts/PublicNavbar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";

const HomePage = () => {
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

      {/* Section: Chess Intro with Image */}
      <div className="bg-white p-8">
        <div className="card">
          <Accordion multiple activeIndex={[0]}>
            <AccordionTab
              header={
                <span className="text-2xl font-semibold">
                  Lesson 1: Chess Rules
                </span>
              }
            >
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </AccordionTab>
            <AccordionTab header={
                <span className="text-2xl font-semibold">
                  Lesson 2: Chess Board
                </span>
              }>
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header={
                <span className="text-2xl font-semibold">
                  Lesson 3: Chess Pieces
                </span>
              }>
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header={
                <span className="text-2xl font-semibold">
                  Lesson 4: Starting Setup
                </span>
              }>
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header={
                <span className="text-2xl font-semibold">
                  Lesson 5: Piece Movement
                </span>
              }>
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header={
                <span className="text-2xl font-semibold">
                  Lesson 6: Pieces Value
                </span>
              }>
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header={
                <span className="text-2xl font-semibold">
                  Lesson 7: Check, Checkmate and Stalemate
                </span>
              }>
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header={
                <span className="text-2xl font-semibold">
                  Lesson 8: Special Moves
                </span>
              }>
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
          </Accordion>
        </div>
      </div>

      {/* Section: Closing intro */}
      <div className="bg-emerald-500 p-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full max-w-screen-xl mx-auto px-6 md:px-[30rem]">
          <p className="m-0 font-marlin font-normal text-xl text-black basis-full md:basis-full">
            But of course, first you need to know what chess looks like. It is
            not the same as checkers. Here I put a video example of a chess game
            played by two Chess Grandmasters: Magnus Carlsen VS Hikaru Nakamura
            in 2019. (Source: ChessBase India). You can also refer to the 2d
            chess board.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-screen-xl mx-auto p-6 md:px-[30rem]">
          <div className="basis-full md:basis-1/2 w-full">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/L2cbT3elGl8?si=P2xeB1Qt5Jaon69k"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="basis-full md:basis-1/2 w-full">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://lichess.org/study/embed/lgmQP9MX/UgHJJxVG#0"
                title="Magnus Carlsen vs Hikaru Nakamura"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Next */}
      <div className="bg-white p-8 pb-5 ">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full max-w-screen-xl mx-auto px-6 md:px-[30rem]">
          <p className="m-0 font-marlin font-normal text-xl text-black">
            Already got a hang of it? Then let's start learning!
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full max-w-screen-xl mx-auto p-5 md:px-[30rem]">
          <Button
            label="Click here to jump to Learn"
            className="!border-black bg-green-500 text-white"
            onClick={() => navigate("/learn")}
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

export default HomePage;
