import CountryDetail from './CountryDetail'

const Countries = ({ countries, countryShown, onClick }) => {
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countries.map(c =>
        <div key={c.name.official}>
          <div>
            {c.name.common}
            <button onClick={() => onClick(c)}>
              show
            </button>
          </div>
          {c.name.official === countryShown?.name.official && <CountryDetail country={c} />}
        </div>
      )}
    </div>
  )
}


export default Countries