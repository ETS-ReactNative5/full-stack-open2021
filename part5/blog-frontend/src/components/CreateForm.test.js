import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'

test('test the creation of a new blog entry', () => {

    const createBlog = jest.fn()

    render(
        <CreateForm createBlog={createBlog} />
    )

    screen.debug()

    const sendBtn = screen.getByText('create')

    const title = screen.getByPlaceholderText('write the title')
    userEvent.type(title, 'test test')

    const author = screen.getByPlaceholderText('write the author')
    userEvent.type(author, 'federico')

    const url = screen.getByPlaceholderText('write the url')
    userEvent.type(url, 'https://test.test')

    userEvent.click(sendBtn)

    console.log(createBlog.mock.calls[0][0]);
    
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'test test',
        author: 'federico',
        url: 'https://test.test'
    })

})
