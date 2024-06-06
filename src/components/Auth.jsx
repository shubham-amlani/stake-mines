import React, { useState } from 'react';
import { authenticate } from '../Api';

const Auth = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await authenticate(username, password);
        localStorage.setItem('token', data.token);
        setUser({ token: data.token, balance: data.balance });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login / Register</button>
        </form>
    );
};

export default Auth;
