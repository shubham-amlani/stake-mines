import React, { useState } from "react";
import Tile from "./Tile";
import CahsoutModal from "./CashoutModal";
import MoonLoader from "react-spinners/MoonLoader";

const Grid = ({
  startGame,
  setstartGame,
  onTileClick,
  revealed,
  tileResults,
  cahsoutModalState,
  profitMultiple,
  betamount,
  tileFetching,
  loading
}) => {
  const handleTileClick = async (index, e) => {
    const response = await onTileClick(index, e);
    // Pass the response to the tile
    setTileResult({ index, result: response.gem ? "gem" : "mine" });
  };

  const [tileResult, setTileResult] = useState({ index: null, result: null });

  return (
    <>
      <div className="grid-main flex justify-center md:rounded-r-md lg:w-[790px] md:w-[610px] sm:w-[460px] w-[310px] rounded-t-sm relative">
        {cahsoutModalState && (
          <CahsoutModal
            multiplier={profitMultiple}
            cashoutAmount={profitMultiple * betamount}
          />
        )}
         {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <MoonLoader
              loading={loading}
              size={150}
              color="#1fff20"
              className="absolute"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}

        <div className="grid-inner grid grid-cols-5 grid-rows-5 gap-2 md:py-5 sm:py-3 lg:w-[590px] md:w-[440px] sm:w-[440px] w-[300px] py-2">
          {revealed.map((isRevealed, index) => (
            <Tile
              key={index}
              coords={index}
              startGame={startGame}
              setstartGame={setstartGame}
              isRevealed={isRevealed}
              tileFetching={tileFetching[index]}
              onClick={(e) => onTileClick(index, e)}
              result={tileResults[index]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Grid;
