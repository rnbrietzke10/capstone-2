import React from 'react';

import './WeatherCard.scss';

const WeatherCard = ({ weather }) => {
  const dateObj = new Date(weather.date);

  return (
    <div className='future'>
      <h6>{dateObj.toDateString()}</h6>
      <img
        className='condition-icon'
        src={weather.day.condition.icon}
        alt={weather.day.condition.text}
      />
      <div className=''>
        <p className='temperature'>High: {`${weather.day.maxtemp_f}`}&deg;</p>
        <p>Low {weather.day.mintemp_f}&deg;</p>
      </div>
    </div>
  );
};

export default WeatherCard;
