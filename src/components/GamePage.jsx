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
  const [disableGrid, setDisableGrid] = useState(false);
  const [loading, setloading] = useState(false);

  const resetRevealed = () => {
    setRevealed(Array(25).fill(false));
  };

  const cashoutClick = async() => {
    playSound("/sounds/cashout.mpeg");
    setstartGame(false);
    setcahsoutModalState(true);
    setshowProfit(false);
    setloading(true);
    const response = await cashoutClickApi(user.token, {username});
    const gameArray = response.gameArray;
    console.log(startGame)
    allRevealed(gameArray);
    setAmount(response.balance);
    setloading(false);
  };


  const handleTileClick = async (index, e) => {
    if (startGame && !disableGrid) {
      const newFetching = [...tileFetching];
      newFetching[index] = true;
      settileFetching(newFetching);

      setoneTileOpened(true);

      const tileCoords = e.target.getAttribute('coords');
      const openTileData = { tileCoords, username };
      setDisableGrid(true);
      const response = await openTileApi(user.token, openTileData);
      setDisableGrid(false);
      let gameArray;
      if(response.gameArray){
        gameArray = response.gameArray;
      }
      setprofitMultiple(response.profit);
      const newRevealed = [...revealed];
      newRevealed[index] = true;
      setRevealed(newRevealed);

      const newTileResults = [...tileResults];
      if (response.gem) {
        newTileResults[index] = 'gem';
        playSound("/sounds/gem.mp3");
      } else if (response.mine) {
        setloading(true);
        newTileResults[index] = 'mine';
        playSound("/sounds/mine.mp3");
        setstartGame(false);
        setcahsoutModalState(true);
        setshowProfit(false);
        console.log(startGame)
        allRevealed(gameArray);
        setloading(false);
      }
      setTileResults(newTileResults);

      newFetching[index] = false;
      settileFetching(newFetching);
    }
  };


  const allRevealed = async (gameArray) => {
    const newArray = await gameArray.map((item)=>item===1?'mine':'gem');
    setRevealed(Array(25).fill(true));
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
          loading={loading}
          setloading={setloading}
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
