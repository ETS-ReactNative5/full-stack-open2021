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
    console.log(user)
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
            id="title"
            type='text'
            name='title'
            value={newTitle}
            onChange={handleTitleChange}
            placeholder='write the title'
          />
        </div>
        <div style={{ display:'flex' }}>
            author:
          <input
            id="author"
            type='text'
            name='author'
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder='write the author'
          />
        </div>
        <div style={{ display:'flex' }}>
            url:
          <input
            id="url"
            type='text'
            name='url'
            value={newUrl}
            onChange={handleUrlChange}
            placeholder='write the url'
          />
        </div>
        <button type='submit' style={{ width:'60px' }} id="create-button">create</button>
      </form>
    </div>
  )
}

export default CreateForm