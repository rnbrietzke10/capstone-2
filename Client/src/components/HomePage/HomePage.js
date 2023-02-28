import React from 'react';
import GuadalupeRiver1 from '../../assets/GuadalupeRiver.jpeg';

import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <header className="home__header">
        <h2>Find the best places to fish in Texas</h2>
        <img
          src={GuadalupeRiver1}
          alt="Guadlupe River by Chandalyn Brietzke"
          className="home__main_img"
        />
      </header>
    </div>
  );
};

export default HomePage;
