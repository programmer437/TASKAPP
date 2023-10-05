import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css'

const Home = () => {
  return (
    <div className='home container '>
        <h1>Welcome to the <span className='task'>Task app</span> </h1>
        <h2>Let's begin organizing</h2>
        <div className="buttons">
            <button><Link to="/signup" className='link'>Signup</Link></button>
            <button><Link to="/login" className='link'>Login</Link></button>
        </div>
    </div>
  );
};

export default Home;
