import React from 'react'

const CreateForm = ({ createBlog, newTitle, newAuthor, newUrl, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
  return (
    <div>
        <form onSubmit={createBlog} style={{ display: 'flex', flexDirection:'column', width:'100px' }}>
        <div style={{ display:'flex'}}>
            title:
            <input 
                type='text'
                name='title'
                value={newTitle}
                onChange={handleTitleChange}
            />
        </div>
        <div style={{display:'flex'}}>
            author:
            <input 
                type='text'
                name='author'
                value={newAuthor}
                onChange={handleAuthorChange}
            />
        </div>
        <div style={{display:'flex'}}>
            url:
            <input 
                type='text'
                name='url'
                value={newUrl}
                onChange={handleUrlChange}
            />
        </div>
        <button type='submit' style={{ width:'60px'}}>create</button>
        </form>
    </div>
  )
}

export default CreateForm