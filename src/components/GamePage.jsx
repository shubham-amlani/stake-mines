import React, { useState } from "react";
import Navbar from "./Navbar";
import Grid from "./Grid";
import Sidebar from "./Sidebar";
import { playSound } from "./SoundPlayer";
import { openTileApi, cashoutClickApi } from "../Api";

const GamePage = ({ amount, setAmount, user, setUser, username, handleUpdateWallet, token }) => {
  const [startGame, setstartGame] = useState(false);
  const [revealed, setRevealed] = useState(Array(25).fill(false));
  const [tileFetching, settileFetching] = useState(Array(25).fill(false));
  const [tileResults, setTileResults] = useState(Array(25).fill(null));
  const [cahsoutModalState, setcahsoutModalState] = useState(false);
  const [oneTileOpened, setoneTileOpened] = useState(false);
  const [profitMultiple, setprofitMultiple] = useState("1.00");
  const [showProfit, setshowProfit] = useState(false);
  const [betamount, setbetamount] = useState("0.00");

  const resetRevealed = () => {
    setRevealed(Array(25).fill(false));
  };

  const cashoutClick = async() => {
    playSound("/sounds/cashout.mpeg");
    setstartGame(false);
    setcahsoutModalState(true);
    setshowProfit(false);
    const response = await cashoutClickApi(user.token, {username});
    const gameArray = response.gameArray;
    allRevealed(gameArray);
    setAmount(response.balance);
  };


  const handleTileClick = async (index, e) => {
    if (startGame) {
      const newFetching = [...tileFetching];
      newFetching[index] = true;
      settileFetching(newFetching);

      setoneTileOpened(true);
  
      const tileCoords = e.target.getAttribute('coords');
      const openTileData = { tileCoords, username };
      const response = await openTileApi(user.token, openTileData);

      setprofitMultiple(response.profit);
      const newRevealed = [...revealed];
      newRevealed[index] = true;
      setRevealed(newRevealed);
  
      const newTileResults = [...tileResults];
      if (response.gem) {
        newTileResults[index] = 'gem';
        playSound("/sounds/gem.mp3");
      } else {
        newTileResults[index] = 'mine';
        playSound("/sounds/mine.mp3");
        setstartGame(false);
        const gameArray = response.gameArray;
        allRevealed(gameArray);
        setcahsoutModalState(true);
        setshowProfit(false);
      }
      setTileResults(newTileResults);

      newFetching[index] = false;
      settileFetching(newFetching);
    }
  };

  const allRevealed = (gameArray) => {
    setRevealed(Array(25).fill(true));
    const newArray = gameArray.map((item)=>item===1?'mine':'gem'); //this array will be fetched from database on gameEnd
    setTileResults(newArray);
  };

  return (
    <>
      <Navbar
        amount={amount}
        setAmount={setAmount}
        user={user}
        setUser={setUser}
        handleUpdateWallet={handleUpdateWallet}
        username={username}
        token={token}
      />
      <div className="warning text-white font-medium text-center my-2 text-lg">Please open the tiles one by one only</div>
      <div className="flex mx-auto my-[5vh] justify-center items-center flex-col-reverse md:flex-row">
        <Sidebar
          startGame={startGame}
          setstartGame={setstartGame}
          resetRevealed={resetRevealed}
          allRevealed={allRevealed}
          user={user}
          username={username}
          setcahsoutModalState={setcahsoutModalState}
          setAmount={setAmount}
          amount={amount}
          handleUpdateWallet={handleUpdateWallet}
          oneTileOpened={oneTileOpened}
          setoneTileOpened={setoneTileOpened}
          profitMultiple={profitMultiple}
          showProfit={showProfit}
          setshowProfit={setshowProfit}
          setprofitMultiple={setprofitMultiple}
          betamount={betamount}
          setbetamount={setbetamount}
          cashoutClick={cashoutClick}
        />

        <Grid
          startGame={startGame}
          setstartGame={setstartGame}
          revealed={revealed}
          tileResults={tileResults}
          onTileClick={handleTileClick}
          cahsoutModalState={cahsoutModalState}
          profitMultiple={profitMultiple}
          betamount={betamount}
          setbetamount={setbetamount}
          tileFetching={tileFetching}
        />

      </div>
    </>
  );
};

export default GamePage;
