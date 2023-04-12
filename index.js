// seleccionar el input y el boton
const inputCountry = document.querySelector('#input-country');
const searchBtn = document.querySelector('#btn-search');
const container = document.querySelector('#container');
const results = document.querySelector('#results');
let countries = [ ];

    
const UseAPI = async ( ) => {
    try{
        const API_COUNTRY = await fetch('https://restcountries.com/v3.1/all');
        const data = await API_COUNTRY.json( );
        countries = [...data];
    }catch(error){
        console.log(error);
    }
}
UseAPI();

const UseAPI_WEATHER = async ( lat, lon) => {
  try{
      const API_WEATHER = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=272998403e432de46bc8a6334ee88c42`);
      const data = await API_WEATHER.json( );
      return data;
      // para hacer la temperatura
  }catch(error){;
      console.log(error);
  }
};


inputCountry.addEventListener('input', async e => { 
    e.preventDefault( );
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(inputCountry.value.toLowerCase( )));
    // console.log(filteredCountries)

    // Limpiar resultados anteriores
  results.innerHTML = "";

  if (filteredCountries.length > 10) {
    results.innerHTML += '<span id="advice">su busqueda tiene que ser mas especifica</span>';
  }

  if (filteredCountries.length >= 1 && filteredCountries.length < 10) {
    // hacer un for con un contador para que pueda mostrar a los demas paises cuando son menores a 10 
    // para ello hice una variable cambiante de i con valor a 0, y lo hice menor a la longitud de filtered countries ademas de colocar el i++ para que pueda funcionar cada vez que se agg un pais de la lista 
    for (let i = 0; i < filteredCountries.length; i++) {
      results.innerHTML += `
        <div class='svg-h2'>
        <img src='${filteredCountries[i].flags.svg}' class ='flags'>
            <h2 class = 'tittle-h2'>${filteredCountries[i].name.common}</h2>
        </div>
        `;
    }
  }
    if (filteredCountries.length ===1 && inputCountry.value !== "" ) {
      const lat = filteredCountries[0].latlng[0];
      const lon = filteredCountries[0].latlng[1];
      const weatherApi  =  await UseAPI_WEATHER(lat,lon);

      // console.log(weatherApi.weather[0].description);
      // console.log(weatherApi.main.temp); 
        results.innerHTML = " ";
        results.innerHTML += `
        <div class='container-flags'>
            <img src='${filteredCountries[0].flags.svg}' class ='flags'>
            <h2 class = 'tittle-h2-p'>${filteredCountries[0].name.common}</h2>
            <div class='info-p'>
                <p class='content-p'>Capital: ${filteredCountries[0].capital}</p>
                <p class='content-p'>Population: ${filteredCountries[0].population}</p>
                <p class='content-p'>Region: ${filteredCountries[0].region}</p>
                <p class='temp'>${weatherApi.main.temp} C°</p>
                <p class='content-p'>Weather: ${weatherApi.weather[0].description}</p>
                <img  class='icon-weather' src="https://openweathermap.org/img/wn/${weatherApi.weather[0].icon}@2x.png" >

            </div>
        </div>
        `
    };

});




