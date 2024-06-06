import React, { useState } from "react";
import mineLogo from "../assets/mine.svg";

const Tile = ({
  index,
  coords,
  startGame,
  setstartGame,
  onClick,
  isRevealed,
  result,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  return (
    <>
      <button
        className={`tile tile-hover lg:w-[7rem] lg:h-[7rem] lg:rounded-lg md:w-[5rem] md:h-[5rem] md:rounded-md sm:w-[5rem] sm:h-[5rem] sm:rounded-md w-[3.2rem] h-[3.2rem] rounded-md
          ${isRevealed ? (result === 'mine' ? 'mine' : 'gem') : 'tile-hover'}
         ${isFetching ? "fetching" : ""}`}
        onClick={(e) => {
          onClick(e, index);
        }}
        coords={coords}
      >
        {isRevealed && (
          <>
            {result === "mine" ? (
              <>
                <img
                  alt="mine effect"
                  className="effect translate-x[-2px] sm:translate-y[-25px] translate-y[-12px]"
                  src="/blast.gif"
                />
                <img src={mineLogo} alt="" className="mine mx-auto" />
              </>
            ) : (
              <>
                <div className="gem-image"></div>
              </>
            )}
          </>
        )}
      </button>
    </>
  );
};

export default Tile;

