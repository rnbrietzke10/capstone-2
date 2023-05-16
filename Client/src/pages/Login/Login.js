import { useState } from 'react';
import '../../Card.scss';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../ApiHelper';

const Login = () => {
  const INITIAL_STATE = {
    username: null,
    password: null,
  };
  const navigate = useNavigate();

  const [itemData, setItemData] = useState(INITIAL_STATE);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allDataEntered = itemData.username && itemData.password;
    if (allDataEntered) {
      async function login(loginInfo) {
        await Api.loginUser(loginInfo);
      }

      login(itemData);

      setItemData(INITIAL_STATE);
      navigate('/');
    } else {
      alert('Please enter all data');
    }
  };

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
          <form onSubmit={handleSubmit}>
            <input
              id="username"
              type="text"
              name="username"
              value={itemData.itemName}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="on"
              value={itemData.description}
              onChange={handleChange}
              placeholder="Password"
            />
            <button className="btn btn-dark">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
