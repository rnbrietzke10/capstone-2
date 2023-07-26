import { Link } from 'react-router-dom';
import GuadalupeRiver1 from '../../assets/GuadalupeRiver.jpeg';
import Posts from '../../components/Posts/Posts';

import './HomePage.scss';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';

const HomePage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div className='home'>
      <header>
        <div className='info-container'>
          <h2>
            {currentUser
              ? `Welcome back, ${currentUser.firstName}!`
              : 'Welcome to the best place to share your love for fishing!'}
          </h2>
          <div className='info'>
            <h3>BEST FISHING</h3>
            <ul>
              <li>
                <Link to='/lakes/canyon-lake' className='info_link'>
                  Canyon Lake:
                </Link>
                <span>Excellent</span>
              </li>
              <li>
                <Link to='/lakes/lake-travis' className='info_link'>
                  Lake Travis:
                </Link>
                <span>Great</span>
              </li>
              <li>
                <Link to='/lakes/lake-buchanan' className='info_link'>
                  Lake Buchanan:
                </Link>
                <span>Great</span>
              </li>
            </ul>
          </div>
        </div>

        <img src={GuadalupeRiver1} alt='Guadlupe River by Chandalyn Brietzke' />
      </header>
      {currentUser ? <Posts /> : ''}
    </div>
  );
};

export default HomePage;
