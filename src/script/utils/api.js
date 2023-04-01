import axios from 'axios';

const API_KEY = '2f8796eefe67558dc205b09dd336d022';
const BASEURL = 'https://api.openweathermap.org';

// fetch weather data by location
export const fetchWeatherData = (location) => {
  const { lat, lon } = location;

  return axios
    .get(`${BASEURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
    .then((response) => {
      return { ...response.data, location };
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

// convert input location to coordinates
export const searchLocation = (location) => {
  return axios
    .get(`${BASEURL}/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`)
    .then((response) => response.data[0])
    .catch((error) => {
      throw new Error(error.message);
    });
};

// convert current coordinates to location
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        axios
          .get(`${BASEURL}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
          .then((response) => resolve(response.data[0]))
          .catch((error) => reject(error));
      },
      (error) => {
        reject(error);
      }
    );
  });
};
