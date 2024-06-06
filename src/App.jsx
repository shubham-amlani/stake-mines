import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import { getWallet, updateWallet, logout, getUsername } from './Api';
import {jwtDecode} from 'jwt-decode';
import Form from './components/Form';
import GamePage from './components/GamePage'
import './App.css'

const App = () => {
    const [user, setUser] = useState(null);
    const [amount, setAmount] = useState(0);
    const [username, setusername] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjVmNTFjYTVhY2M5OWIzOWRiOGI1ZWUiLCJ1c2VybmFtZSI6InNodWJoYW0iLCJpYXQiOjE3MTc1NzE2NzQsImV4cCI6MTcyMTE3MTY3NH0.RVi735foM3xqy-pq3hYt2medkil_4-34-L-sm1LYN-M';
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({ token, balance: 0 });
            fetchUsername(token);
            fetchWalletBalance(token);
        }
    }, [localStorage.getItem('token')]);

    const fetchUsername = async (token) =>{
        const data = await getUsername(token);
        setusername(data.username);
    }

    const fetchWalletBalance = async (token) => {
        const data = await getWallet(token);
        setUser(user => ({ ...user, balance: data.balance }));
        setAmount(data.balance);
    };

    const handleUpdateWallet = async (amount) => {
        const data = await updateWallet(user.token, amount);
        setUser(user => ({ ...user, balance: data.balance }));
    };

    const handleLogout = async () => {
        await logout(user.token);
        localStorage.removeItem('token');
        setUser(null);
    };
    return (
        <div>
            {user ? (
                <GamePage logout={logout} amount={amount} setAmount={setAmount} user={user} setUser={setUser} username={username} token={token} handleUpdateWallet={handleUpdateWallet}/>
            ) : (
                <Form setUser={setUser} />
            )}
        </div>
    );
};

export default App;
