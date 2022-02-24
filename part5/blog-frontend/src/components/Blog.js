import { React, useState } from 'react'

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] = useState(false)
  const hideShow = {
    display: view ? '' : 'none'
  }

  const toggleView = () => {
    console.log(blog);
    setView(!view)
  }


  return (
    <>
      <div style={blogStyle}>
        {blog.title}
        <button onClick={toggleView}>{view ? 'hide' : 'view'}</button>
        <div style={hideShow}>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={() => console.log('like it baby')}>like</button></div>
          <div>{blog.author}</div>
        </div>
      </div>  
    </>
  )
} 


export default Blog