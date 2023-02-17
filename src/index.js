import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;
let arrayOfCountryLanguages = [];

input.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY));

function getCountry(evt) {
  const countryName = evt.target.value.trim();

  if (countryName === '') {
    cleanMarkup();
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length <= 10 && data.length >= 2) {
        cleanMarkup();
        createShortMarkup(data);
      } else if (data.length === 1) {
        cleanMarkup();
        sortLanguagesToArray(data);
        //перебирает массив языков и возвращает массив нормальных названий языков (не официальных)
        let stringOfCountryLanguages = arrayOfCountryLanguages.join(',');
        createLongMarkup(data, stringOfCountryLanguages);
        arrayOfCountryLanguages = [];
        // каждый раз после ввода в инпут страны которая возвращает один элемент очищает массив стран, тем самым languages не повторяются после каждого повторного ввода страны которая соответствует условию
      }
    })
    .catch(error => {
      return error;
    });
}

function createShortMarkup(arr) {
  const markup = arr
    .map(country => {
      return `<li class="country-item"><img src="${country.flags.svg}" width="39px" height="39px" alt="${country.name}">${country.name}</li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('afterbegin', markup);
}

function createLongMarkup(arr, languages) {
  // принимает два параметра -  первый - это массив стран с заданыннми параматрами в строке HTTP запроса, второй это строка языков который являются официальными в заданной стране.
  const markup = arr
    .map(country => {
      return ` <div class="flag-and-name-wrap"><img src="${country.flags.svg}" alt="${country.name}" width="39px" height="39px" />
      <p> ${country.name}</p></div>  
      <p class="country-text">Capital: ${country.capital}</p>
      <p class="country-text">Population: ${country.population}</</p>
      <p class="country-text">Languages: ${languages}</p>`;
    })
    .join('');
  countryList.insertAdjacentHTML('afterbegin', markup);
}

function cleanMarkup() {
  countryList.innerHTML = '';
}

function sortLanguagesToArray(data) {
  for (let i = 0; i < data[0].languages.length; i += 1) {
    const separateLanguages = data[0].languages[i].name;
    arrayOfCountryLanguages.push(separateLanguages);
  }
}
