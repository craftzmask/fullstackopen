import { useState, useEffect } from 'react'

import countryService from './services/countries'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [shownCountry, setShownCountry] = useState('')

  const countriesToShow = countries.filter(c => {
    if (search === '') return false;
    const name = c.name.common.toLowerCase()
    return name.includes(search.toLowerCase())
  })

  useEffect(() => {
    countryService
      .getAll()
      .then(data => setCountries(data))
  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const handleClick = country => {
    setShownCountry(country.name.common)
  }

  return (
    <div>
      <div>
        find countries
        <input
          value={search}
          onChange={handleChange} />
      </div>
      <CountryList
        countries={countriesToShow}
        shownCountry={shownCountry}
        onClick={handleClick} />
    </div>
  )
}

export default App