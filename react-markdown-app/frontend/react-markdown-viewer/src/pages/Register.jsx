import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', { username, password });
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2 className='text-center'>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className='text-center mt-5'>
        <button type="submit" className=" btn btn-dark">Register</button>
        </div>
       
      </form>
    </div>
  );
};

export default Register;
