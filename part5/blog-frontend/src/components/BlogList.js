import React from 'react'
import Blog from './Blog'
import CreateForm from './CreateForm'
import ValidMessage from './ValidMessage'

const BlogList = ({ blogs, userLogged, clearLocStor, createBlog, newTitle, newAuthor, newUrl, handleTitleChange, handleAuthorChange, handleUrlChange, validMessage }) => {
  return (
    <div>
    <h2>blogs</h2>
    <ValidMessage message={validMessage}/>
    <p>{userLogged.name} logged in</p>
    <button onClick={clearLocStor}>log out</button>
    <h2>create new</h2>
    <CreateForm 
      createBlog={createBlog}
      newTitle={newTitle}
      newAuthor={newAuthor}
      newUrl={newUrl}
      handleTitleChange={handleTitleChange}
      handleAuthorChange={handleAuthorChange}
      handleUrlChange={handleUrlChange}
    />

    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
    </div>
  )
}

export default BlogList