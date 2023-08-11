import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { lakes } from '../../Data/lakes';
import { rivers } from '../../Data/rivers';

import Posts from '../../components/Posts/Posts';
import './Location.scss';

const Location = () => {
  const [weather, setWeather] = useState(null);
  let { lake, river } = useParams();

  const location = lake ? lakes[lake] : rivers[river];

  const { lat, lng } = location;

  useEffect(() => {
    const getWeather = async (lat, lng) => {
      const token = await localStorage.getItem('token');
      const data = await axios.get(
        `http://localhost:8080/weather?lat=${lat}&lng=${lng}`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log('DATA', data);
      setWeather(data.data);
    };
    getWeather(lat, lng);
  }, []);

  console.log('Weather', weather);

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
      {weather ? (
        <div className='weather-container'>
          <div className='weather-card current'>
            <h3> Current Weather</h3>
            <div className='condition'>
              <img
                className='condition-icon'
                src={weather.data.current.condition.icon}
                alt={weather.data.current.condition.text}
              />

              <h4 className='temperature'>
                {`${weather.data.current.temp_f}`}&deg;
              </h4>
            </div>
            <p>Feels like {weather.data.current.feelslike_f}&deg;</p>
          </div>
          <div className='future-weather-container'>
            <h3> Future Weather</h3>
            <div className='weather-card future'>
              <div className='condition'>
                <img
                  className='condition-icon'
                  src={weather.data.current.condition.icon}
                  alt={weather.data.current.condition.text}
                />
              </div>
              <h4 className='temperature'>
                {`Temperature: ${weather.data.current.temp_f}`}&deg;
              </h4>
            </div>
          </div>
        </div>
      ) : null}
      <Posts />
    </div>
  );
};

export default Location;
