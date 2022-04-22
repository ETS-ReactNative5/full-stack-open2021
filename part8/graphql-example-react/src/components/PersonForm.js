import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { ALL_PERSONS, CREATE_PERSON } from '../queries'


const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [ createPerson ] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = (event) => {
    event.preventDefault()

    createPerson({
      variables: {
        name, phone, street, city
      }
    })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <div>
        <h2>Create new</h2>
        <form onSubmit={submit}>
          <div>
            <label>Name: </label>
            <input type="text" value={name} onChange={({ target }) => setName(target.value)} />
          </div>
          <div>
            <label>Phone: </label>
            <input type="text" value={phone} onChange={({ target }) => setPhone(target.value)} />
          </div>
          <div>
            <label>Street: </label>
            <input type="text" value={street} onChange={({ target }) => setStreet(target.value)} />
          </div>
          <div>
            <label>City: </label>
            <input type="text" value={city} onChange={({ target }) => setCity(target.value)} />
          </div>
          <button type='submit'>Add a person</button>
        </form>
      </div>
    </div>
  )
}

export default PersonForm