import React from 'react'
import { useSelector } from 'react-redux'

const ValidMessage = () => {
  const message = useSelector(state => state.valid)

  if (message === null) {
    return null
  }

  return (
    <div className="valid">
      {message}
    </div>
  )
}

export default ValidMessage