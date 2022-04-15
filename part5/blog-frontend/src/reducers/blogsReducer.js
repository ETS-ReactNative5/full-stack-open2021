import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { timedValid } from './validReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      const newState = [...state, action.payload]
      return newState
    }
  }
})

export const { setBlogs, addBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const updateBlogLike = (blogPost, id) => {
  return async dispatch => {
    await blogService.updateLike(blogPost, id)
    dispatch(initializeBlogs())
  }
}

export const deleteBlogPost = (id, user) => {
    return async dispatch => {
      await blogService.deleteBlog({
      id: id,
      user: user
    })
    dispatch(initializeBlogs())
    dispatch(timedValid('The blog entry has been deleted'))
  }
}

export const addAComment = (post, id) => {
  return async dispatch => {
    await blogService.addComment(post, id)
    dispatch(initializeBlogs())
    dispatch(timedValid('The comment has been added!'))
  }
}

export default blogSlice.reducer