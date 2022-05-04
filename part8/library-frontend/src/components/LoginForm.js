import React, { useState } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login ] = useMutation(LOGIN, {
    onError: (e) => {
      console.log(e.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      console.log(data);
      const token = data.login.value
      setToken(token)
      localStorage.setItem('book-user-token', token)
      setPage('authors')
    }
  })

  if (!show) {
    return null
  }

  const submit = (e) => {
    e.preventDefault()

    login({
      variables: {
        username, password
      }
    })

    setUsername('')
    setPassword('')
  }


  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>username: </label>
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <label>password:</label>
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm