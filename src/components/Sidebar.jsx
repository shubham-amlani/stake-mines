import React, { useState } from "react";
import { playSound } from "./SoundPlayer";
import { startGameApi, cashoutClickApi } from "../Api";
import { FaBomb } from "react-icons/fa";
import Alert, { showAlert } from "./Alert";
import ClipLoader from "react-spinners/ClipLoader";

const Sidebar = ({
  startGame,
  setstartGame,
  resetRevealed,
  user,
  username,
  allRevealed,
  setAmount,
  amount,
  setcahsoutModalState,
  oneTileOpened,
  setoneTileOpened,
  profitMultiple,
  showProfit,
  setshowProfit,
  setprofitMultiple,
  betamount,
  setbetamount,
  cashoutClick,
  loading,
  setloading
}) => {
  const [Mines, setMines] = useState(3);

  const betClick = async () => {
    if (amount < betamount) {
      showAlert("Insufficient balance");
      return;
    }
    setloading("true");
    setoneTileOpened(false);
    setcahsoutModalState(false);
    resetRevealed();
    playSound("/sounds/click.mp3");
    setprofitMultiple(0);

    const betData = { mines: Mines, betamount: betamount, username: username };
    const response = await startGameApi(user.token, betData);
    setloading(false);

    if (response.activegame) {
      showAlert("Active game running for this user");
    } else {
      setshowProfit(true);
      setstartGame(true);
      setAmount(amount - betamount);
    }
  };

  const betInput = (e) => {
    setbetamount(e.target.value);
  };

  const mineInput = (e) => {
    setMines(e.target.value);
  };

  return (
    <div className="sidebar md:rounded-l-md flex flex-col lg:w-[300px] lg:h-[632px] md:h-[472px] sm:w-[456px] w-[310px]">
      <div className="sidebar-btns sm:w-[290px] sm:h-[60px] rounded-full flex justify-center items-center mx-2 my-3 h-[40px]">
        <div className="btn-box rounded-full p-1 flex w-[99%] h-[95%] gap-2">
          <button className="rounded-full px-5 w-[48%] font-bold text-white sidebar-active text-sm">
            Manual
          </button>
          <button className="rounded-full px-5 w-[48%] font-bold text-white text-sm">
            Auto
          </button>
        </div>
      </div>
      <div className="bet-form">
        <div className="flex justify-between mx-4">
          <span className="text-sm text-gray-400 font-bold">Bet Amount</span>
          <span className="text-sm text-gray-400 font-bold">₹0.00</span>
        </div>
        <div className="input-div mx-4 my-1 flex">
          <input
            type="number"
            name="bet-amount"
            id=""
            className="rounded-sm m-0.5 h-9 text-white font-bold text-sm p-2 w-[70%]"
            onChange={betInput}
            value={betamount}
          />
          <span className="half font-bold text-sm text-white p-2 cursor-pointer">
            {" "}
            1/2
          </span>
          <span className="double font-bold text-sm text-white p-2 cursor-pointer">
            2x
          </span>
        </div>

        <div className="flex justify-between mx-4 my-1">
          <span className="text-sm text-gray-400 font-bold">Mines</span>
        </div>
        <div className="mx-4 w-[90%]">
          <select
            name="mines"
            id=""
            className="rounded-sm h-9 text-white font-bold text-sm p-2 w-full"
            onChange={mineInput}
            value={Mines}
          >
            {Array.from({ length: 24 }, (_, index) => (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        {showProfit && (
          <div className="flex flex-col">
            <div className="flex justify-between mx-4 mt-2">
              <span className="text-sm text-gray-400 font-bold">Profit</span>
              <span className="text-sm text-gray-400 font-bold">
                {profitMultiple}x
              </span>
            </div>
            <input
              type="number"
              name="bet-amount"
              id=""
              className="rounded-sm h-9 w-[90%] p-2 mx-auto text-white font-bold text-sm"
              value={
                oneTileOpened
                  ? (betamount * profitMultiple - betamount).toFixed(2)
                  : "0.00"
              }
              readOnly={true}
            />
          </div>
        )}
        <button
          className="bet-btn font-bold text-sm w-[90%] mx-4 my-3 h-12 rounded-md"
          disabled={!oneTileOpened && startGame}
          onClick={startGame ? cashoutClick : betClick}
        >
          {!loading ? (
            startGame ? (
              "Cashout"
            ) : (
              "Bet"
            )
          ) : (
            <ClipLoader
              loading={loading}
              disabled={loading}
              size={20}
              className="loading"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </button>
      </div>
      <Alert />
    </div>
  );
};

export default Sidebar;
