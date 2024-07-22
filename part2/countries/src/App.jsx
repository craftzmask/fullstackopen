import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [textSearch, setTextSearch] = useState('')

  const filteredCountries = textSearch === ''
    ? []
    : countries.filter(c => {
        const name = c.name.common.toLowerCase()
        return name.includes(textSearch.toLowerCase())
      })

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => setCountries(res.data))
  }, [])

  const handleTextSearchChange = e => {
    setTextSearch(e.target.value)
  }

  return (
    <>
      <Filter
        value={textSearch}
        onChange={handleTextSearchChange} />

      <Countries countries={filteredCountries} />
    </>
  )
}

export default App
