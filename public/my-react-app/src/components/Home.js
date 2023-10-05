import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Page</h1>
      {/* Create a link to the Login page */}
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Home;
