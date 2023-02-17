const countryList = document.querySelector('.country-list');
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

export { createShortMarkup, createLongMarkup };
