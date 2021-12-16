import { useState, useEffect } from "react";
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res => {
      // console.log(res.data)
      setCountries(res.data)
    })
  }, [])

  useEffect(() => {
    if (filter) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }, [filter])

  const handleValueChange = (e) => {
    setFilter(e.target.value)   
  }

  const showLanguages = (filteredData) => {
    const languages = []
    for (const language in filteredData[0].languages){
      languages.push(filteredData[0].languages[language])
    }
    return (
      languages.map((lang, i) => {
        return (
          <li key={i}> {lang} </li>
        )
      })
    )
  }

  const showCountry = (filteredData) => {
    return (
      <div key={1}>
          <h1>{filteredData[0].name.common}</h1>
          <p>Capital: {filteredData[0].capital}</p>
          <p>Population: {filteredData[0].population}</p>
          <h2>Languages</h2>
          {showLanguages(filteredData)}
          <img src={filteredData[0].flags.png}/>
        </div>
    )
  }
  
  const filterCountry = () => {
    let filteredData = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    if (filteredData.length > 10) {
      return <div> Too many matches, specify another filter </div>
    } else if (filteredData.length <= 10 && filteredData.length > 1) {
      return (
        filteredData.map((country, i) => <div key={i}>{country.name.common}</div>)
      )
    } else if (filteredData.length == 1) {
      // console.log(filteredData[0])
      return (
        showCountry(filteredData)
      )
    }
  }

  return (
    <div>
      <p>Find Countries <input onChange={(e) => handleValueChange(e)}/></p>
      {showAll ? countries.map((country, i) => {
          return <div key={i}>{country.name.common}</div>
      }) : filterCountry()}
    </div>
  );
}

export default App;
