import React, { useState } from 'react';
import axios from 'axios';
function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await axios.get(/api/weather?city=${city});
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="module">
      <h2>Weather Information</h2>
      <form onSubmit={fetchWeather} className="module-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Getting...' : 'Get Weather'}
        </button>
      </form>

      {/* Show loading or error states neatly */}
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {weather && (
        <div className="module-content weather-result">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="desc">{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;