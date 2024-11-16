import Country from './Country'

const CountryList = ({ countries }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  if (countries.length > 10) {
    return <div>Too many matches, specifiy another filter</div>
  }

  return (
    <div>
      {countries.map(c =>
        <div key={c.name.official}>{c.name.common}</div>
      )}
    </div>
  )
}

export default CountryList