import React from 'react';
import '../../Card.scss';
import './Login.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container">
      <div className="card login">
        <div className="col left bg-img">
          <h1>Welcome Back!</h1>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button className="btn btn-light">Register</button>
          </Link>
        </div>
        <div className="col right">
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className="btn btn-dark">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
