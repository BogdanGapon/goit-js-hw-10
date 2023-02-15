import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');

input.addEventListener('input', getCountry);

function getCountry(evt) {
  const countryName = evt.target.value;

  fetchCountries(countryName)
    .then(data => {
      return data
        .map(d => {
          `<li class="country"><img src="${d.flag}" alt="${d.name}" />${d.name}</li>`;
        })
        .join('');
    })
    .then(country => {
      console.log(country);
    });
}
