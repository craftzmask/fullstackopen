const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <p><strong>languages:</strong></p>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>

      <img
        src={country.flags.png}
        alt={`${country.name.common}'s flag`}
        width='150' />
    </div>
  )
}

export default CountryDetail