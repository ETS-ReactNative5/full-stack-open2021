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
      <form onSubmit={getBlog} >
        <div className='mb-4'>
            <label className='mr-6 dark:text-slate-200'>Title: </label>
          <input
            id="title"
            type='text'
            name='title'
            required
            value={newTitle}
            onChange={handleTitleChange}
            placeholder='write the title'
            className='font-mono w-72 h-6 p-1 pl-3 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:transition-all hover:shadow-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-200'
          />
        </div>
        <div className='mb-4'>
          <label className='mr-3 dark:text-slate-200'>Author: </label>
          <input
            id="author"
            type='text'
            name='author'
            required
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder='write the author'
            className='font-mono w-72 h-6 p-1 pl-3 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:transition-all hover:shadow-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-200'
          />
        </div>
        <div className='mb-4'>
          <label className='mr-10 dark:text-slate-200'>URL: </label>
          <input
            id="url"
            type='text'
            name='url'
            value={newUrl}
            required
            onChange={handleUrlChange}
            placeholder='write the url'
            className='font-mono w-72 h-6 p-1 pl-3 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:transition-all hover:shadow-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500 dark:bg-slate-900 dark:text-slate-200 dark:text-slate-200 dark:placeholder:text-slate-200'
          />
        </div>
        <button type='submit' id="create-button" className='font-mono p-2 w-32 rounded-md border-solid border-blue-400/30 hover:border-blue-400 hover:shadow-md hover:transition-all dark:text-white dark:bg-slate-900'>Create</button>
      </form>
    </div>
  )
}

export default CreateForm