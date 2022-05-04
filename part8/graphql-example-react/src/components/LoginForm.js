import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login ] = useMutation(LOGIN, {
    onError: (e) => {
      setError(e.graphQLErrors[0].message)
    },
    onCompleted: (data) => {
      console.log(data)
      const token = data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  })

  const submit = async (e) => {
    e.preventDefault()

    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>Username</label>
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm