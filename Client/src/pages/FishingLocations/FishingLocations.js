import React from 'react';

import './FishingLocations.scss';
import { Link } from 'react-router-dom';

const FishingLocations = () => {
  const lakes = ['Cayon Lake', 'Lake Austin', 'Lake Buchanan'];
  return (
    <div className="fishing-locations">
      <ul>
        {lakes.map((lake) => (
          <li key={lake}>
            <Link to={`/lakes/${lake.replace(/\s+/g, '-').toLowerCase()}`}>
              {lake}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FishingLocations;
