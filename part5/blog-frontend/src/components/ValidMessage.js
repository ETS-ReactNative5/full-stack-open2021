import React from 'react'
import { useSelector } from 'react-redux'

const ValidMessage = () => {
  const message = useSelector(state => state.valid)

  if (message === null) {
    return null
  }

  return (
    <div className="className='text-2xl text-green-600 font-semibold border-solid rounded-md border-green-500 px-6 py-3 w-full'">
      {message}
    </div>
  )
}

export default ValidMessage