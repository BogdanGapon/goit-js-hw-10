const url = `https://restcountries.com/v2/`;

function fetchCountries(name) {
  return fetch(
    `${url}name/${name}?fields=name,capital,population,flags,languages`
  ).then(respond => respond.json());
}

export { fetchCountries };
