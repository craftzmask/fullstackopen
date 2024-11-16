const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>

      <p><strong>languages:</strong></p>
      <ul>
        {Object.values(country.languages).map(l =>
          <li key={l}>{l}</li>
        )}
      </ul>

      <img
        src={country.flags.svg}
        alt={`${country.name.common}'s flag`}
        width="150" />
    </div>
  )
}

export default Country