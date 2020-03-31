import './styles.css';
// import './fetchCountries';
import PNotify from 'pnotify/dist/es/PNotify.js';
const debounce = require('lodash.debounce');

const list = document.querySelector('.list');
const input = document.querySelector('.input');

function findCountries(event) {
  const value = event.target.value;
  fetch(`https://restcountries.eu/rest/v2/name/${value}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.length === 1) {
        const markup = data
          .map(
            ({
              name,
              capital,
              population,
              languages,
              flag,
            }) => `<h2 class="name">${name}</h2>
        <div class="info">
          <div class="info--text">
            <p class="capital"><strong>Capital: </strong>${capital}</p>
            <p class="population"><strong>Population: </strong>${population}</p>
            <p class="languages"><strong>Languages: </strong></p>
            <ul class="languages-list">
              {{#each languages}}
              <li class="language">{{this.name}}</li>
              {{/each}}
            </ul>
            </div>
            <img src="${flag}" alt="flag of "${name}" class="flag" />
        </div>`,
          )
          .join('');
        list.innerHTML = markup;
        return;
      } else if (data.length > 1 && data.length < 11) {
        const markup = data.map(({ name }) => `<li>${name}</li>`).join('');
        list.innerHTML = markup;
        return;
      } else if (data.length >= 11) {
        PNotify.error({
          text: 'Too many matches found, enter more specific query',
          delay: 5000,
        });
      }
    });
}

input.addEventListener('input', debounce(findCountries, 500));
