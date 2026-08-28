import { useEffect, useState } from 'react'
import weatherService from '../services/weather'
import Weather from './Weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const capital = country.capital ? country.capital[0] : null

  useEffect(() => {
    if (!capital) {
      return
    }

    setWeather(null)
    weatherService
      .getByCity(capital, country.cca2)
      .then(data => setWeather(data))
      .catch(() => setWeather(null))
  }, [capital, country.cca2])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {capital}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages ?? {}).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt ?? `flag of ${country.name.common}`} />
      {capital && <Weather city={capital} weather={weather} />}
    </div>
  )
}

export default Country
