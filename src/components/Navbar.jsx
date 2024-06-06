import React, {useState} from 'react'
import stakeLogo from '../assets/stake-logo.svg'
import stakeLogoMobile from '../assets/stake-logo-mobile.svg'
import { FaUser } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import Modal from './Modal';

const Navbar = ({amount, setAmount, user, setUser, username, token}) => {
  const handleLogout = async () => {
    // await logout(user.token);
    localStorage.removeItem('token');
    setUser(null);
};

const [wallet, setwallet] = useState(false);
 
const handleClose = () => {
  setwallet(false);
};

const handleOpen = () => {
    setwallet(true);
};

  return (
    <>
    <nav className='flex navbar justify-around w-full'>
      <img src={stakeLogo} alt="" className='w-16 cursor-pointer main-logo'/>
      <img src={stakeLogoMobile} alt="" className='w-6 h-9 cursor-pointer mobile-logo mt-3 ml-3'/>
      <div className="wallet py-2 px-3 flex">
        <div className="amount-box flex px-4 py-3 rounded-l-md cursor-pointer"><span className='text-sm font-bold self-center'>₹ {amount?amount.toFixed(2):'0.00'}</span> <img src="../src/assets/rupee-logo.png" alt="" className='w-4 h-4 self-center m-1'/></div>
        <div className="wallet-btn flex justify-center rounded-r-md cursor-pointer" onClick={handleOpen}><span className='self-center px-4 font-bold text-white text-xs wallet-text'>Wallet</span><GiWallet className="text-white self-center wallet-icon m-4"/></div>
      </div>
      <div className="user-part flex items-center justify-center cursor-pointer" onClick={handleLogout}><FaUser className='fill-white'/><span className="text-white mx-2 font-bold">Logout</span></div>
    </nav>
    <Modal isOpen={wallet} onClose={handleClose} username={username} token={token} setAmount={setAmount}/>
    </>
  )
}

export default Navbar
