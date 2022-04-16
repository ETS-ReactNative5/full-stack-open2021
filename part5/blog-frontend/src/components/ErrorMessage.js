import React from 'react'
import { useSelector } from 'react-redux'

const ErrorMessage = () => {
  const message = useSelector(state => state.error)

  if (message === null) {
    return null
  }
  
  return (
    <div className='text-2xl text-pink-600 font-semibold border-solid rounded-md border-pink-500 px-6 py-3 w-full'>
      {message}
    </div>
  )
}

export default ErrorMessage