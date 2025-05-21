import React from "react";
import PublicNavbar from "../../Layouts/PublicNavbar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PublicNavbar />

      {/* Header Section */}
      <div className="bg-white" style={{ padding: "2rem" }}>
        <div className="flex items-center justify-center gap-4 py-6">
          <img src="./assets/logo/oyachess.svg" alt="Logo" className="h-24" />
          <p className="m-0 font-marlin font-bold text-7xl text-black">
            OyaChess
          </p>
        </div>
        <div
          style={{
            borderTop: "2px solid #000000",
            width: "15%",
            margin: "2rem auto",
          }}
        ></div>
        <p className="text-center p-5 m-5 font-marlin font-bold text-2xl">
          Chess tutorials and more
        </p>
      </div>

      {/* Section: New to Chess */}
      <div className="bg-emerald-700" style={{ padding: "2rem" }}>
        <div className="flex items-center justify-center">
          <p className="m-0 font-marlin font-bold text-5xl text-white">
            New to Chess?
          </p>
        </div>
      </div>

      {/* Section: Chess Intro with Image */}
      <div className="bg-white p-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full max-w-screen-xl mx-auto px-6 md:px-[30rem]">
          <p className="m-0 font-marlin font-normal text-xl text-black basis-full md:basis-2/3">
            You might be wondering, how and where can someone learn the very
            basics of chess?
            <br />
            <br />
            Are you tired of finding chess tutorials that are too complex or
            hard to understand for starters?
            <br />
            <br />
            Do not fret! This website will teach you some of the basic rules of
            chess and will change you from not knowing how to move any pieces to
            someone who can complete a chess game until the end.
          </p>
          <img
            src="./assets/homepage/chessboard.png"
            alt="Chessboard"
            className="h-40 basis-full md:basis-1/3 object-contain"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full max-w-screen-xl mx-auto px-6 md:px-[30rem] mt-5">
          <p className="m-0 font-marlin font-normal text-xl text-black">
            It is never too late to learn chess, and you don't need a reason to
            start playing chess. Maybe you are just bored and want a hobby, or
            you just finished The Queen's Gambit 2020 movie and it piqued your
            interest. Perhaps you encounter people playing chess and want to
            join them, or you just want to look smart by playing chess! There is
            no reason to not learn chess because chess has existed for centuries
            and will always remain in the flow of time.
          </p>
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
