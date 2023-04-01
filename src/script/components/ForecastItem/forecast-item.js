import * as style from './forecast-item.css';
import moment from 'moment';

class ForecastItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set forecastItem(forecastItem) {
    this._forecastItem = forecastItem;
    this.render();
  }

  render() {
    if (!this._forecastItem) return null;

    const { dt, temp, weather } = this._forecastItem;

    const time = moment.unix(dt).format('ddd');
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
    const tempMin = Math.round(temp.min);
    const tempMax = Math.round(temp.max);

    this.shadowDOM.innerHTML = /* html */`
      <style>
        ${style}
      </style>

      <p class="date">${time}</p>

      <div class="info">
        <img src=${weatherIconUrl} alt=${weather[0].description} class="weather-icon">
        <div class="weather-status">${weather[0].description}</div>
      </div>

      <div class="temp">${tempMax}&deg; / ${tempMin}&deg;</div>
    `;
  }
}

customElements.define('forecast-item', ForecastItem);
