import React from 'react';

import './WeatherCard.scss';

const WeatherCard = ({ weather }) => {
  const dateArray = weather.date.split('-');
  const monthArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className='future'>
      <h6>{`${monthArray[dateArray[1] - 1]} ${dateArray[2]}, ${
        dateArray[0]
      }`}</h6>
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
