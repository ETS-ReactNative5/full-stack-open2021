import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show }) => {
  const { loading, error, data } = useQuery(ME)
  const books = useQuery(ALL_BOOKS)

  if (loading) {
    return "loading..."
  }

  if (books.loading) {
    return "loading"
  }

  if (!show) {
    return null
  }
  const bookList = []
  books.data.allBooks.map((book) => {
    console.log(book.genres);
    if (book.genres.includes(data.me.favoriteGenre)) {
      bookList.push(book)
    }
  })

  return (
    <div>
    <h1>Recommendations</h1>
      {<p>books in your favorite genre <strong>{data.me.favoriteGenre}</strong></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations