import { useState } from 'react';
import './App.css';

function App() {
  const API_KEY = '2BZEC6GTT5YUAHME3HH655XZA';
  const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`${BASE_URL}/${location}?key=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Error fetching weather data. Please check your inputs and try again.');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Weather Search</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city or coordinates"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search Weather
        </button>
      </form>

      {loading && <p className="mt-4 text-center">Loading weather data...</p>}

      {error && <p className="mt-4 text-center text-red-600">{error}</p>}

      {weatherData && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Weather for {weatherData.resolvedAddress}</h2>
          <p><strong>Temperature:</strong> {weatherData.currentConditions.temp}°F</p>
          <p><strong>Condition:</strong> {weatherData.currentConditions.conditions}</p>
          <p><strong>Wind Speed:</strong> {weatherData.currentConditions.windspeed} mph</p>
          <p><strong>Humidity:</strong> {weatherData.currentConditions.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
