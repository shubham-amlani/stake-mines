import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import {redirect} from 'react-router-dom'
import { authenticate } from '../Api';
import '../Form.css'

const Form = ({setUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await authenticate(username, password);
    localStorage.setItem('token', data.token);
    setUser({ token: data.token, balance: data.balance });
};

  return (
    <div className="form-container">
      <form className="username-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          id="username"
          className="form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-input'/>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
}

export default Form;
