import React from 'react';
import GuadalupeRiver1 from '../../assets/GuadalupeRiver.jpeg';

import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="home">
      <header>
        <h2>Find the best places to fish in Texas</h2>
        <img src={GuadalupeRiver1} alt="Guadlupe River by Chandalyn Brietzke" />
      </header>
    </div>
  );
};

export default HomePage;
