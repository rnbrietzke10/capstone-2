import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import CurrentWeatherCard from '../CurrentWeather/CurrentWeatherCard';
import './Weather.scss';
const Weather = ({ weather }) => {
  return (
    <div className='weather-container'>
      <div className='current-weather'>
        <h4> Current Weather</h4>
        <CurrentWeatherCard weather={weather.current} />
      </div>

      <div className='future-weather-container'>
        <h3> Forecast</h3>
        <div className='WeatherCard-container'>
          {weather.forecast.forecastday.map(day => {
            return <WeatherCard weather={day} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Weather;
