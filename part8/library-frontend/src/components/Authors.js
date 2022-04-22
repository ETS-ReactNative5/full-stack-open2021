import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTH } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')

  const authors = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_BIRTH, {
    refetchQueries: [
      {
        query: ALL_AUTHORS
      },
    ]
  })



  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: name.value,
        setToBorn: birth
      }
    })

    setName('')
    setBirth('')
  }
   let options = []

  if (authors.loading) {
    return <div>loading...</div>
  }
  
  options = authors.data.allAuthors.map((a) => {
    return {
      value: a.name,
      label: a.name
    }
  })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit} >
        <div>
          <Select 
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          <label>Birth: </label>
          <input type="text" value={birth} onChange={({ target }) => setBirth(target.value)} />
        </div>
        <button type='submit'>Change Birthyear</button>
      </form>
    </div>
  )
}

export default Authors
