import './styles.css';
// import './fetchCountries';

const list = document.querySelector('.list');

fetch('https://restcountries.eu/rest/v2/name/south')
  .then(response => {
    console.log(response);
    return response.json();
  })
  .then(data => {
    console.log(data);
    const markup = data.map(
      ({ name, capital }) => `<li><h2>${name}</h2><p>${capital}</p></li>`,
    );
    list.innerHTML = markup;
  });
