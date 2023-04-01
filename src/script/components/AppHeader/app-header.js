import searchIcon from '../../../assets/search.svg';
import style from './app-header.css';

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#searchInput').value;
  }

  render() {
    this.shadowDOM.innerHTML = /* html */ `
    <style>
      ${style}
    </style>

      <header>
        <a href="/" class="brand">Weatherly.</a>

        <div class="search-container">
          <input class="search-input" id="searchInput" type="text" placeholder="Search">
          <button class="search-button" id="searchButton" type="button">
            <img src=${searchIcon} alt="search icon" class="search-icon">
          </button>
        </div>
      </header>
    `;

    const searchButtonElement = this.shadowDOM.querySelector('#searchButton');
    searchButtonElement.addEventListener('click', this._clickEvent);

    const searchInputElement = this.shadowDOM.querySelector('#searchInput');
    searchInputElement.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this._clickEvent();
      }
    });
  }
}

customElements.define('app-header', AppHeader);
