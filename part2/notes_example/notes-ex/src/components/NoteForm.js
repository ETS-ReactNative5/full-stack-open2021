import React from 'react'

const NoteForm = ({ addNote, newNote, handleNoteChange, logout}) => {
  return (
    <div>
      <button onClick={logout}> logout </button>
        <form onSubmit={addNote}>
            <input 
                value={newNote}
                onChange={handleNoteChange}
            />
            <button type="submit">save</button>
        </form>
    </div>
  )
}

export default NoteForm
