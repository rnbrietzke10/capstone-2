import React from 'react';
import { Link } from 'react-router-dom';

import './Card.scss';

const Card = () => {
  return (
    <div className="card">
      <div className="left">
        <h1>Hello World!</h1>
        <p>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </p>
        <span>Don't have an account?</span>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
      <div className="right">
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Card;
