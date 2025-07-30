import CountryDetail from './CountryDetail'

const CountryList = ({
  countries,
  shownCountryName,
  onClick
}) => {
  const n = countries.length
  if (n === 1) {
    return <CountryDetail country={countries[0]} />
  }

  if (n > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    <>
      {countries.map(c => {
        const name = c.name.common
        return (
          <div key={name}>
            {name}
            <button onClick={() => onClick(name)}>show</button>
            {shownCountryName === name && <CountryDetail country={c} />}
          </div>
        )
      })}
    </>
  )
}

export default CountryList