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


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks: [Book!]!
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
      setToBorn: String
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

    allBooks: async () => { return Book.find({}) },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount(parent) {
      return books.filter(a => a.author === parent.name).length
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
    editAuthor: (root, args) => {
      const authorSelected = authors.find(a => a.name === args.name)
      if (!authorSelected) {
        return null
      }

      const updatedAuthor = { ...authorSelected, born: args.setToBorn }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
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