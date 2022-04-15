import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// REDUCERS
import { setTheUser } from '../reducers/userReducer'

// SERVICES
import userService from '../services/users'


const Users = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  const clearLocStor = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(setTheUser(null))
    navigate('/')
  }

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await userService.getAllUsers()
      setUsers(allUsers)
    }
    getUsers()
  }, [])
  

  return (
    <div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={clearLocStor}>log out</button>
      </div>
      <div>
       <h2>Users</h2>
       <table>
         <thead>
          <tr>
            <td><strong>Name</strong></td>
            <td><strong>Blogs Created</strong></td>
          </tr>
         </thead>
         <tbody>
          {
            users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.blogs.length}</td>
                </tr>
            ))
          }
         </tbody>
       </table>
      </div>
    </div>
  )
}

export default Users