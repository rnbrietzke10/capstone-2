import React from 'react';

import '../../Card.scss';
import './Register.scss';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="container">
      <div className="card register">
        <div className="col left">
          <h2>Register</h2>
          <form>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className="btn btn-dark">Register</button>
          </form>
        </div>
        <div className="col right bg-img">
          <h1>Welcome to TX Anglers!</h1>
          <p>
            A place to find fishing locations near you and share your fishing
            experiences.
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button className="btn btn-light">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
