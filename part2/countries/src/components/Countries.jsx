import CountryDetail from './CountryDetail'

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countries.map(c =>
        <div key={c.name.official}>{c.name.common}</div>
      )}
    </div>
  )
}

export default Countries