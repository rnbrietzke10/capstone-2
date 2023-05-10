import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Api from '../../ApiHelper';

import '../../Card.scss';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  };

  const [itemData, setItemData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allDataEntered =
      itemData.firstName &&
      itemData.lastName &&
      itemData.username &&
      itemData.email &&
      itemData.password;
    if (allDataEntered) {
      async function registerUser() {
        const tokenValue = await Api.createUser(itemData);

        let { password, ...user } = itemData;

        localStorage.setItem('token', JSON.stringify(tokenValue));
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      }
      registerUser();
    } else {
      alert('Please enter all data');
    }
  };

  return (
    <div className="container">
      <div className="card register">
        <div className="col left">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Username"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-dark">
              Register
            </button>
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
