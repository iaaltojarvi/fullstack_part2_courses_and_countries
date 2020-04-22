import React, { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({ name: '', capital: '', languages: [], population: '', flag: '' });
  const [showMore, setShowMore] = useState(false);
  const [weather, setWeather] = useState({ temperature: '', wind: '', icon: '' });
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${selectedCountry.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [selectedCountry.capital, api_key])

  const filter = (event) => {
    const filtered = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setCountries(filtered);
  }

  const onShowMore = ({ country }) => {
    setSelectedCountry({
      name: country.name,
      capital: country.capital,
      languages: country.languages,
      population: country.population,
      flag: country.flag
    });
    setShowMore(!showMore);
  }

  const countryInfo = (
    <div>
      <h3>{selectedCountry.name}</h3>
      <p>{`Capital: ${selectedCountry.capital}`}</p>
      <p>{`Population: ${selectedCountry.population}`}</p>
      <p>Languages:</p>
      {selectedCountry.languages.map((language, ix) =>
        <ul key={ix}>
          <li>{language.name}</li>
        </ul>
      )}
      <img src={`${selectedCountry.flag}`} alt="flag" style={{ width: '20%' }} />
      <h3>{`Weather in ${selectedCountry.capital}`}</h3>
      {weather &&
        <>
          <p>{`Temperature: ${weather.temperature} Celsius`}</p>
          <p>{`Wind: ${weather.wind_degree}mph direction ${weather.wind_dir}`}</p>
          <img src={`${weather.weather_icons}`} alt="weather icon" style={{ width: '10%' }} />
        </>
      }
    </div>
  )

  return (
    <div className="App" style={{ marginLeft: 20 }}>
      <h1>Countries</h1>
    Find: <input name="filter" onChange={filter} style={{ marginLeft: 10 }} />
      {countries.length && countries.length > 10 ?
        <p><b>Too many matches, specify another filter</b></p>
        :
        countries.map((country, i) =>
          <ul key={i}>
            <li>{country.name}
              <button style={{ marginLeft: 20 }} onClick={() => onShowMore({ country })}>Show</button>
            </li>
          </ul>
        )}
      {showMore && countryInfo}
    </div>
  );
}

export default App;
