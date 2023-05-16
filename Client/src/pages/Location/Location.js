import React from 'react';
import { useParams } from 'react-router-dom';
import { lakes } from '../../Data/lakes';
import { rivers } from '../../Data/rivers';

import './Location.scss';

const Location = () => {
  let { lake, river } = useParams();
  const location = lake ? lakes[lake] : rivers[river];
  return (
    <div className="Location">
      <header>
        <div className="location-info">
          <div>
            <h1>{location.name}</h1>
            <ul>
              <li>
                <span>Location: </span>
                {location.location}
              </li>
              {lake ? (
                <li>
                  <span>Lake Acreage: </span>
                  {location.surfaceArea}
                </li>
              ) : (
                ''
              )}
              {lake ? (
                <li>
                  <span>Max Depth: </span>
                  {location.maxDepth}
                </li>
              ) : (
                ''
              )}
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
