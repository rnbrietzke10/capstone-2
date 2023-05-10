import React from 'react';
import { useParams } from 'react-router-dom';
import { lakes } from '../../Data/lakes';

import './Location.scss';

const Location = () => {
  const { lake } = useParams();

  const location = lakes[lake];
  return (
    <div className="Location">
      <header>
        <div className="location-info">
          <div>
            <h1>{location.lakeName}</h1>
            <ul>
              <li>
                <span>Location: </span>
                {location.location}
              </li>
              <li>
                <span>Lake Acreage: </span>
                {location.surfaceArea}
              </li>
              <li>
                <span>Max Detpth: </span>
                {location.maxDepth}
              </li>
            </ul>
          </div>
          <div className="weather">WEATHER</div>
          <div>
            <h3>Common Fish in {location.lakeName}</h3>
            <ul>
              {location.predominantFishSpecies.map((fish) => (
                <li key={fish}>{fish}</li>
              ))}
            </ul>
          </div>
        </div>
        <iframe
          className="lake-map"
          src={location.mapUrl}
          width="800"
          height="600"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={location.lakeName}
        ></iframe>
      </header>
      <div className=""></div>
    </div>
  );
};

export default Location;
