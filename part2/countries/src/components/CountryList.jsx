import Country from './Country'

const CountryList = ({ countries, shownCountry, onClick }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  if (countries.length > 10) {
    return <div>Too many matches, specifiy another filter</div>
  }

  return (
    <div>
      {countries.map(c =>
        <div key={c.name.official}>
          {c.name.common}
          <button onClick={() => onClick(c)}>
            show
          </button>
          
          <div>
            {shownCountry === c.name.common
              ? <Country country={c} />
              : null
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default CountryList