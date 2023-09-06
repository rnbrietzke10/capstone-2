import React from 'react';
import './CurentWeather.scss';
const CurrentWeatherCard = ({ weather }) => {
  return (
    <div className='current'>
      <div className='condition'>
        <img
          className='condition-icon'
          src={weather.condition.icon}
          alt={weather.condition.text}
        />
      </div>
      <p className='temperature'>Temperature: {`${weather.temp_f}`}&deg;</p>
      <p>Feels like {weather.feelslike_f}&deg;</p>
    </div>
  );
};

export default CurrentWeatherCard;
