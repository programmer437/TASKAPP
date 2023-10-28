import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';


export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        // Render header when the user is logged in
        <div className='Header'>
        <div className='logo'>
            <img src="" alt="" />
            <span>Task</span>
            <span>Manager</span>
        </div>
        <div className='links'>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        </div>

    </div>
      ) : null}
    </div>


   
  )
}
