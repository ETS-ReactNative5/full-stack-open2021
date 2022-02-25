import React from 'react'

const ValidMessage = ({ message }) => {
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