import { useState, useEffect } from 'react'
import countryService from './services/countries.js'
import Filter from './components/Filter'
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [keySearch, setKeySearch] = useState('')
  const [shownCountryName, setShownCountryName] = useState('')
  
  const filteredCountries = countries.filter(c => {
    const name = c.name.common.toLowerCase()
    return keySearch && name.includes(keySearch.toLowerCase())
  })

  useEffect(() => {
    countryService.getAll()
      .then(data => setCountries(data))
  }, [])

  const handleShowClick = (countryName) => {
    setShownCountryName(countryName)
  }

  return (
    <>
      <Filter
        value={keySearch}
        onChange={(e) => setKeySearch(e.target.value)}
      />

      <CountryList
        countries={filteredCountries}
        shownCountryName={shownCountryName}
        onClick={handleShowClick}/>
    </>
  )
}

export default App
