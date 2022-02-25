import { React, useState } from 'react'

const CreateForm = ({ createBlog, user }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const getBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <form onSubmit={getBlog} style={{ display: 'flex', flexDirection:'column', width:'100px' }}>
        <div style={{ display:'flex' }}>
            title:
          <input
            type='text'
            name='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div style={{ display:'flex' }}>
            author:
          <input
            type='text'
            name='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div style={{ display:'flex' }}>
            url:
          <input
            type='text'
            name='url'
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit' style={{ width:'60px' }}>create</button>
      </form>
    </div>
  )
}

export default CreateForm