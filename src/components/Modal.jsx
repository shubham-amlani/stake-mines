import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { handleDepositApi, handleWithdrawApi } from "../Api";
import "../Modal.css";

const Modal = ({ isOpen, onClose, username, token, setAmount }) => {
  const [deposit, setdeposit] = useState('');
  const [withdraw, setwithdraw] = useState('');

  const handleDepositChange = (e) => {
    setdeposit(e.target.value);
  };

  const handleWithdrawChange = (e) => {
    setwithdraw(e.target.value);
  };

  const handleDeposit = async () => {
    const amount = deposit;
    const data = { username, amount };
    const response = await handleDepositApi(token, data);
    setAmount(response.balance);
    setdeposit('')
};
const handleWithdraw = async () => {
    const amount = withdraw;
    const data = { username, amount };
    const response = await handleWithdrawApi(token, data);
    setAmount(response.balance);
    setwithdraw('')
  };

  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center w-[100%] h-[100%] main-div">
      <div className="h-[300px] w-[300px] inner-div m-auto p-[2%] rounded-lg shadow-md flex flex-col  gap-5">
        <div className="deposit flex flex-col">
          <div className="text-white self-end cursor-pointer" onClick={onClose}>
            <IoMdCloseCircleOutline className="w-7 h-7" />
          </div>
          <span className="text-sm text-gray-400 font-bold">
            Deposit Amount
          </span>
          <input
            type="number"
            name=""
            id=""
            className="text-white font-medium h-7 my-1 p-1"
            value={deposit}
            onChange={(e)=>handleDepositChange(e)}
          />
          <button
            className="bet-btn font-bold text-sm w-[100%] mx-auto my-1 h-8 rounded-md"
            onClick={handleDeposit}
          >
            Deposit
          </button>
        </div>
        <div className="deposit flex flex-col">
          <span className="text-sm text-gray-400 font-bold">
            Withdraw Amount
          </span>
          <input
            type="number"
            name="withdraw"
            id=""
            className="text-white font-medium h-7 my-1 p-1"
            value={withdraw}
            onChange={(e)=>handleWithdrawChange(e)}
          />
          <button
            className="blue-btn font-bold text-sm w-[100%] mx-auto my-1 h-8 rounded-md"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
