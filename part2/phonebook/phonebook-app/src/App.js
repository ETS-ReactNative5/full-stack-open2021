import React, { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'

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

const Persons = ({ valueAll, filter, show, setPersons }) => {
  const delPerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
      .del(id)
      .then(res => {
        console.log(res)
        personService
        .getAll()
        .then(res => {
          setPersons(res.data)
        })
      }) 
    }
  }

  return (
    <>
      {show ? valueAll.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number} <Button onDelete={() => delPerson(person.id, person.name)}/>
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

const Button = ({ onDelete }) => {
  return (
    <>
      <button onClick={onDelete}>Delete</button>
    </>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
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
    
    persons.forEach((person) => {
      if (person.name === nameObject.name && window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with the new one?`)) {
        return (personService
          .update(person.id, nameObject)
          .then(res => {
            console.log(res)
            setMessage(`Changed ${person.name}`)
            setTimeout(() => {
            setMessage(null)
              }, 5000)
            setNewName('')
            setNewNumber('')
            personService
            .getAll()
            .then(res => {
              setPersons(res.data)
            })
          })
          .catch(error => {
            console.log(error)
          })
        )
      } else {
        return (
          personService
          .create(nameObject)
          .then(res => {
            console.log(res);
            setPersons(persons.concat(res.data))
            setNewName('')
            setNewNumber('')
            setMessage(`Added ${nameObject.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            personService
            .getAll()
            .then(res => {
              setPersons(res.data)
            })
          })
          .catch(error => {
            console.log(error)
          })
        )
      }
    })

  }

  const filterPersonList = () => {
    const filteredList = persons.filter(person => person.name.toLowerCase() === newFilter.toLowerCase())
    return filteredList;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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
        setPersons={setPersons}
      />
    </div>
  )
}

export default App

