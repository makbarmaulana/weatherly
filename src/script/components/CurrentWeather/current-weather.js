import style from './current-weather.css';
import moment from 'moment-timezone';
import humidityIcon from '../../../assets/humidity.svg';
import windIcon from '../../../assets/wind.svg';
import visibilityIcon from '../../../assets/visibility.svg';

class CurrentWeather extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set currentInfo(currentInfo) {
    this._currentInfo = currentInfo;
    this.render();
  }

  renderError(message) {
    this.shadowDOM.innerHTML = /* html */ `
      <style>
        .error-message {
          text-align: center;
          font-weight: 400;
          color: #1c1c1c;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      </style>
    `;

    this.shadowDOM.innerHTML += `<h2 class="error-message">${message}</h2>`;
  }

  render() {
    if (!this._currentInfo) return null;

    const { current, location, timezone } = this._currentInfo;
    const { dt, temp, humidity, visibility, wind_speed, weather } = current;
    const { name, state, country } = location;

    const time = moment.unix(dt).tz(timezone);
    const formattedTime = time.calendar();
    const hour = time.hour();
    const isDayTime = hour >= 6 && hour <= 18;
    const weatherIconCode = weather[0].icon.slice(0, -1);
    const weatherIconDay = `${weatherIconCode}d@4x.png`;
    const weatherIconNight = `${weatherIconCode}n@4x.png`;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${isDayTime ? weatherIconDay : weatherIconNight}`;

    this.shadowDOM.innerHTML = /* html */ `
      <style>
        ${style}
      </style>

      <section class="current-weather">
        <div class="time-zone">
          <h3>${name}, ${state ? state : country}</h3>
        </div>

        <div class="weather-status">
          <figure class="thumb-container">
            <img src="${weatherIconUrl}" alt="${weather[0].description}">
          </figure>
          <div class="location-info">
            <p class="weather">${weather[0].description}</p>
            <p class="date">${formattedTime}</p>
            <div class="temp">
              <p class="parameter">${Math.round(temp)}</p>
              <p class="deg">&deg;</p>
              <p class="unit">C</p>
            </div>
          </div>
        </div>

        <div class="weather-detail">
          <div class="humidity">
            <img src=${humidityIcon} alt="humidity icon">
            <h3>Humidity</h3>
            <p>${humidity} %</p>
          </div>
          <div class="wind">
            <img src=${windIcon} alt="wind icon">
            <h3>Wind Speed</h3>
            <p>${(wind_speed * 3.6).toFixed(2)} km/h</p>
          </div>
          <div class="visibility">
            <img src=${visibilityIcon} alt="visibility icon">
            <h3>Visibility</h3>
            <p>${visibility / 1000} km</p>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('current-weather', CurrentWeather);
