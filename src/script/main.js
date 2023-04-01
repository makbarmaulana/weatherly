import './components/AppHeader/app-header.js';
import './components/CurrentWeather/current-weather.js';
import './components/ForecastList/forecast-list.js';
import {
  fetchWeatherData,
  getCurrentLocation,
  searchLocation,
} from './utils/api.js';

export const main = () => {
  const appHeaderElement = document.querySelector('app-header');
  const currentWeatherElement = document.querySelector('current-weather');
  const forecastListElement = document.querySelector('forecast-list');

  const useCurrentLocation = () => {
    getCurrentLocation()
      .then((location) => fetchWeatherData(location))
      .then((data) => showWeatherInfo(data))
      .catch((error) => {
        console.error(error.message);
        fallbackResult(`Error: ${error.message}`);
      });
  };

  const handleSearch = () => {
    if (!appHeaderElement.value) {
      alert('please input location');
      useCurrentLocation();
      return;
    }

    searchLocation(appHeaderElement.value)
      .then((location) => fetchWeatherData(location))
      .then((data) => showWeatherInfo(data))
      .catch((error) =>
        fallbackResult(
          'Error: Location not found, please enter correct location.'
        )
      );
  };

  const showWeatherInfo = (data) => {
    currentWeatherElement.currentInfo = data;
    forecastListElement.forecastList = data.daily;
  };

  const fallbackResult = (message) => {
    currentWeatherElement.renderError(message);
    forecastListElement.renderError(null);
  };

  appHeaderElement.clickEvent = handleSearch;

  useCurrentLocation();
};
