import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { lakes } from '../../Data/lakes';
import { rivers } from '../../Data/rivers';

import Posts from '../../components/Posts/Posts';
import './Location.scss';
import Weather from '../../components/Weather/Weather';
import { weatherData } from '../../Data/tempWeatherData';

const Location = () => {
  const [weather, setWeather] = useState(null);
  let { lake, river } = useParams();

  const location = lake ? lakes[lake] : rivers[river];

  const { lat, lng } = location;

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';
    const getWeather = async (lat, lng) => {
      const token = await localStorage.getItem('token');
      const data = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lng=${lng}`,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      setWeather(data.data);
    };
    getWeather(lat, lng);
  }, []);

  // console.log('Weather', weather.data);

  return (
    <div className='Location'>
      <main className='info-container'>
        <div className='info-left'>
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

          <div>
            <h3>Common Fish in {location.lakeName}</h3>
            <ul>
              {location.predominantFishSpecies.map(fish => (
                <li key={fish}>{fish}</li>
              ))}
            </ul>
          </div>
        </div>
        <aside className='info-right'>
          <iframe
            className='lake-map'
            src={location.mapUrl}
            width='400'
            height='400'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title={location.lakeName}
          ></iframe>
        </aside>
      </main>
      {/* {weather ? <Weather weather={weather.data} /> : null} */}
      {weatherData ? <Weather weather={weatherData} /> : null}
      <Posts className='location-post' />
    </div>
  );
};

export default Location;
