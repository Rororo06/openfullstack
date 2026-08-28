import PropTypes from 'prop-types'

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <div>population {country.data.population}</div>
      <div>capital {country.data.capital?.[0]}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.data.name.common}`}
      />
    </div>
  )
}

Country.propTypes = {
  country: PropTypes.shape({
    found: PropTypes.bool.isRequired,
    data: PropTypes.object,
  }),
}

export default Country
