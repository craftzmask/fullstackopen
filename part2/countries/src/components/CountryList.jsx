import CountryDetail from './CountryDetail'

const CountryList = ({ countries }) => {
  const n = countries.length
  if (n === 1) {
    return <CountryDetail country={countries[0]} />
  }

  if (n > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    <>
      {countries.map(c =>
        <div key={c.name.official}>{c.name.common}</div>
      )}
    </>
  )
}

export default CountryList