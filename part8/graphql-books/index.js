const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
require('dotenv').config()
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')

// Connecting to MongoDB
console.log("Connecting to: ", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch ((e) => {
  console.error('Error connection to MongoDB: ', e.message)
})

const typeDefs = gql`

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks: [Book]
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]
    ): Book!
    editAuthor(
      name: String!
      setToBorn: String!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      if (Object.keys(args).length === 0){
        return Book.collection.countDocuments()
      }

      const bookAuthor = Book.findAll({ author: args.author })
      return bookAuthor.length
    },

    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async () => { 
      const allBooks = await Book.find({})
      allBooks.map(async (book) => {
        const author = await Author.findById(book.author)
        book['author'] = author
        console.log(book);
      })
      return allBooks 
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (parent) => {
      const allBooks = await Book.find({ author: parent})
      return allBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if (author === null){
        const newAuthor = new Author({ name: args.author })
        console.log('waiting to save author...'); 
        await newAuthor.save()
        console.log('new author saved');
      }

      const authorSaved = await Author.findOne({ name: args.author })
      const book = new Book({...args, author: authorSaved._id})

      try {
        await book.save()
        console.log('success');
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }

      return args
    },
    editAuthor: async (root, args) => {
      const authorSelected = Author.findOne({ name: args.name })
      console.log('found');
      if (!authorSelected) {
        return null
      }
      const bornInt = parseInt(args.setToBorn)
      const updatedAuthor = await Author.updateOne({ name: args.name}, { $set: { born: bornInt } } )
      console.log(updatedAuthor);
      
      return authorSelected
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})