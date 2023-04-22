import Notiflix from 'notiflix';

export default function fetchCountries(name) {
//   console.log(name);
  //   console.log('TEST =', name.target.value);
  //   const nameOfCountry = name.target.value;
  const option = 'fields=name,capital,population,flags,languages';
  // name.official - повна назва країни
  // capital - столиця
  // population - населення
  // flags.svg - посилання на зображення прапора
  // languages - масив мов

  const url = 'https://restcountries.com/v3.1/name/';
  //   console.log(`${url}${nameOfCountry}?${option}`);

  return fetch(`${url}${name}?${option}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
    //   console.log(response);
      return response.json();
    })
    .then(data => {
    //   console.log(data);
      return data;
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      // resetForm
    });
}
