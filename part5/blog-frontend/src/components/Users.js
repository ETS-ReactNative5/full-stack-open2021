import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// REDUCERS
import { setTheUser } from '../reducers/userReducer'
import { addAllUsers } from '../reducers/usersReducer'

// SERVICES
import userService from '../services/users'


const Users = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(state => state.users)
  
  if (!user) {
    return null
  }


  return (
    <div>
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
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
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