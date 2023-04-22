import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(checkFetchName, DEBOUNCE_DELAY));

function checkFetchName(evt) {
  const nameCountryInput = evt.target.value.trim();
  console.log('Name is;', nameCountryInput, nameCountryInput.length);
  if (nameCountryInput.length === 0) {
    Notiflix.Notify.failure('Your input is empty');
    return;
  }
  fetchCountries(nameCountryInput).then(checkCountCountry);
}

function checkCountCountry(data) {
  if (data.length > 10) {
    resetForm();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    if ((data.length >= 2) & (data.length <= 10)) {
      resetForm();
      let markup = data
        .map(dataItem => markUpManyCountries(dataItem))
        .join(' ');
    } else {
      let markupOne = data
        .map(dataItem => markUpOneCountry(dataItem))
        .join(' ');
    }
  }
}

function resetForm() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function markUpManyCountries({ name, flags }) {
  const markupItem = `<li> <img src='${flags.svg}' alt='${flags.alt}' width="24"></img>  ${name.official} </li>`;
  countryList.insertAdjacentHTML('beforeend', markupItem);
}

function markUpOneCountry({ name, capital, population, flags, languages }) {
  const markupItemOne = `
  <div class="list-propertises">
    <span class="name-official"><img src='${flags.svg}' alt='${
    flags.alt
  }' width="50"></img>  ${name.official}</span>
    <span >Capital: ${capital[0]}</span>
    <span>Population: ${population}</span>
    <span>Languages: ${Object.values(languages).join(', ')}</span>
  </div>
    `;
  resetForm();
  countryInfo.innerHTML = markupItemOne;
}
