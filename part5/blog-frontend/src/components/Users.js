import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addAllUsers } from '../reducers/usersReducer'



const Users = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  
  if (!user) {
    return null
  }
  return (
    <div className='container mx-auto'>
       <h2 className='text-slate-700 dark:text-slate-200'>Users</h2>
       <table className='table-auto border-solid border-collapse border-blue-100'>
         <thead>
          <tr>
            <td className='text-slate-700 border-solid border-blue-100 dark:border-blue-400/40 p-3 w-60 dark:text-slate-200'><strong>Name</strong></td>
            <td className='text-slate-700 dark:text-slate-200 border-solid border-blue-100 p-3 w-60 dark:border-blue-400/40'><strong>Blogs Created</strong></td>
          </tr>
         </thead>
         <tbody>
          {
            users.map(user => (
                <tr key={user.id}>
                  <td className='border-solid border-blue-100 dark:border-blue-400/40'><Link to={`/users/${user.id}`} className='no-underline text-slate-700 visited:text-slate-700 dark:text-slate-200 dark:visited:text-slate-200 hover:underline hover:decoration-slate-900 dark:hover:decoration-slate-200 p-3  '>{user.name}</Link></td>
                  <td className='text-slate-700 border-solid border-blue-100 p-3 dark:text-slate-200 dark:border-blue-400/40'>{user.blogs.length}</td>
                </tr>
            ))
          }
         </tbody>
       </table>
      </div>
  )
}

export default Users