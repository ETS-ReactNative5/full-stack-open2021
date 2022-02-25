import React from 'react'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


test('render blog title and author by default', async () => {
    const blog = {
        likes: '10',
        author:'federico',
        title: 'component testing 1',
        url: 'https://fedpregnolato.io',
    }

    render(
        <Blog blog={blog} />
    )

    screen.debug()

    const element = screen.getByText('component testing 1 federico')

    expect(element).toBeDefined()
})

test("blog's url and number of likes are shown after pushing the button", () => {
    const blog = {
        likes: '10',
        author:'federico',
        title: 'component testing 1',
        url: 'https://fedpregnolato.io',
    }

    render(
        <Blog blog={blog} />
    )

    screen.debug()
    
    const buttonView = screen.getByText('view')
    userEvent.click(buttonView)

    const buttonHide = screen.getByText('hide')
    
    expect(buttonHide).toBeDefined()
    
    screen.debug()

    const url = screen.getByText('https://fedpregnolato.io')
    const likes = screen.getByText('likes 10')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
})

test('check if the like button works twice', () => {
    const blog = {
        likes: '10',
        author:'federico',
        title: 'component testing 1',
        url: 'https://fedpregnolato.io',
    }
    const mockLike = jest.fn()

    const content = render(
        <Blog blog={blog} updateLike={mockLike} />
    )

    const buttonView = screen.getByText('view')
    userEvent.click(buttonView)

    const buttonLike = content.getByTestId('#like')
    console.log(buttonLike);
    userEvent.click(buttonLike)
    userEvent.click(buttonLike)

    expect(mockLike.mock.calls).toHaveLength(2)

})