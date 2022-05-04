import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react";
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('all genres')
  const [bookList, setBookList] = useState([])
  const [listView, setListView] = useState([])
  const books = useQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      populateGenres(data)
      setListView(data.allBooks)
      setBookList(data.allBooks)
    }
  })
  
  const populateGenres = (data) => {
    const genreList = ['all genres']
    data.allBooks.map((book) => {
      book.genres.map((genre) => {
        if (!genreList.includes(genre)) {
          genreList.push(genre);
        }
      })
    })
    setGenres(genreList)
  }

  useEffect(() => {
    filteredBooks(genre)
  }, [genre])
  
  const filteredBooks = (genre) => {
    if (genre === 'all genres') {
      setListView(bookList)
      return
    }
    const newBookList = bookList.filter(book => book.genres.includes(genre))
    setListView(newBookList)
  }
  
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genres.map(genre => (
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      {
        <p>in genre: <strong> {genre}</strong></p>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {listView.map((a) => (
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

export default Books
