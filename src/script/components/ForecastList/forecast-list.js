import * as style from './forecast-list.css';
import '../ForecastItem/forecast-item.js';

class ForecastList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set forecastList(forecastList) {
    this._forecastList = forecastList;
    this.render();
  }

  renderError() {
    this.shadowDOM.innerHTML = '';
  }

  render() {
    if (!this._forecastList) return;

    this.shadowDOM.innerHTML = `
      <style>
        ${style}
      </style>
      <h1 class="forecast-title">Daily Forecast</h1>
      <div class="forecast-container"></div>
    `;

    const forecastContainer = this.shadowDOM.querySelector('.forecast-container');

    this._forecastList.forEach((forecast) => {
      const forecastItemElement = document.createElement('forecast-item');
      forecastItemElement.forecastItem = forecast;
      forecastContainer.appendChild(forecastItemElement);
    });
  }
}

customElements.define('forecast-list', ForecastList);
