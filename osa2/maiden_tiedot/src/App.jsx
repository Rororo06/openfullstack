import { useEffect, useState } from 'react'
import Country from './components/Country'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    countryService.getAll().then(data => setCountries(data))
  }, [])

  const handleQueryChange = event => {
    setQuery(event.target.value)
    setSelected(null)
  }

  const matches = query
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const shown = selected ?? (matches.length === 1 ? matches[0] : null)

  const result = () => {
    if (shown) {
      return <Country country={shown} />
    }
    if (matches.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    return (
      <div>
        {matches.map(country => (
          <div key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => setSelected(country)}>show</button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div>
        find countries <input value={query} onChange={handleQueryChange} />
      </div>
      {result()}
    </div>
  )
}

export default App
