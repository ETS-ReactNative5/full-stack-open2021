import { connect } from "react-redux"
import { createNote } from "../reducers/noteReducer"


const NewNote = (props) => {
  console.log(createNote);
  console.log(props.createNote);

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createNote(content)
  }
  return (
    <form onSubmit={addNote}>
      <input name='note' autoComplete='off'/>
      <button type='submit'>add</button>
    </form>
  )
}

export default connect(
  null, // the componenst doesn't need to access the state, so we pass null
  { createNote }
)(NewNote)