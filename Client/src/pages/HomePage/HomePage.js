import React from 'react';
import { Link } from 'react-router-dom';
import GuadalupeRiver1 from '../../assets/GuadalupeRiver.jpeg';

import './HomePage.scss';

const HomePage = () => {
  const loggedIn = false;
  return (
    <div className="home">
      <header>
        <div>
          <h2>Find the best places to fish in Texas</h2>
          <div>
            <h3>Current Top Three Locations</h3>
            <ul>
              <li>
                <Link to="/lakes/canyon-lake">Canyon Lake: </Link> Excellent
              </li>
              <li>
                <Link to="/lakes/lake-travis">Lake Travis:</Link> Great
              </li>
              <li>
                <Link to="/lakes/lake-buchanan">Lake Buchanan:</Link> Great
              </li>
            </ul>
          </div>
        </div>

        <img src={GuadalupeRiver1} alt="Guadlupe River by Chandalyn Brietzke" />
      </header>
    </div>
  );
};

export default HomePage;
