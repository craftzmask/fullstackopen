import Weather from './Weather'

const CountryDetail = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <div>Capital {country.capital}</div>
    <div>Area {country.area}</div>

    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map(l =>
        <li key={l}>{l}</li>
      )}
    </ul>

    <img 
      src={country.flags.svg}
      alt={`${country.name.common}'s flag`}
      width="150"
    />
    <Weather location={country.capital} />
  </div>
)

export default CountryDetail