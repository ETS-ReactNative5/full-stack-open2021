import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserBlogs = ({ user }) => {
  const navigate = useNavigate()
  if (!user) {
    return null
  }
  return (
    <div className='container mx-auto'>
    <button onClick={() => navigate('/users')} className='font-mono text-center text-slate-700 p-2 w-20 h-9 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:shadow-md hover:transition-all dark:text-slate-200 dark:bg-slate-900 mt-2'>Back</button>
      <h2 className='text-slate-700 dark:text-slate-200'>{user.name}</h2>
      <h3 className='text-slate-700 dark:text-slate-200'>Added blogs</h3>
      <ul className='list-none'>
        {user.blogs.map(blog =>(
          <li key={blog.id} className='text-slate-700 dark:text-slate-200 mb-5 mt-5'>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs