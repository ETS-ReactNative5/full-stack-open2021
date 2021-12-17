import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleFilter}) => {
  return (
    <div>
        Filter shown with <input onChange={handleFilter}/>
    </div>
  )
}

const PersonForm = ({ onSubmit, valueName, onChangeName, valueNumber, onChangeNumber }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
          <div>
            name: <input value={valueName} onChange={onChangeName}/>
          </div>
          <div>
            number: <input value={valueNumber} onChange={onChangeNumber}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    </>
  )
}

const Persons = ({ valueAll, filter, show }) => {
  return (
    <>
      {show ? valueAll.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        )
      }) : filter().map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        )
      })}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(res => {
      setPersons(res.data)
    })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    if (e.target.value) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
    setNewFilter(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    axios
    .post('http://localhost:3001/persons', nameObject)
    .then(res => {
      console.log(res);
    })
    if (persons[0].name === nameObject.name) {
      alert(`${nameObject.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
    
  }

  const filterPersonList = () => {
    const filteredList = persons.filter(person => person.name.toLowerCase() === newFilter.toLowerCase())
    return filteredList;
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilterChange} />

      <h3> Add a new</h3>

      <PersonForm 
        onSubmit={addPerson} 
        valueName={newName} 
        onChangeName={handleNameChange}
        valueNumber={newNumber}
        onChangeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        valueAll={persons}
        filter={filterPersonList}
        show={showAll}
      />
    </div>
  )
}

export default App

