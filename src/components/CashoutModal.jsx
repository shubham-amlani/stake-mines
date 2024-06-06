import React from 'react';
import './CashoutModal.css';

const CashoutModal = ({multiplier, cashoutAmount}) => {

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="modal px-[30px] py-[10px]">
        <div className="modal-content">
          <p className='text-xl'><strong>{multiplier.toFixed(2)}x</strong></p>
          <div className="partition w-8 h-1 mt-2 mb-1 mx-auto"></div>
          <p className='flex text-xs items-center'><strong>₹{cashoutAmount.toFixed(2)}</strong><img src="/rupee-logo.png" alt="" className='w-3 h-3 self-center m-1'/></p>
        </div>
      </div>
      </>
  );
};

export default CashoutModal;
