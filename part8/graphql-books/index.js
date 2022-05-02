const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks: [Book]
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (parent) => {
      const allBooks = await Book.find({ author: parent}).populate('author')
      return allBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log(context.currentUser);
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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

      return Book.findById(book._id).populate('author')
    },
    editAuthor: async (root, args) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const authorSelected = Author.findOne({ name: args.name })
      console.log('found');
      if (!authorSelected) {
        return null
      }
      const bornInt = parseInt(args.setToBorn)
      const updatedAuthor = await Author.updateOne({ name: args.name}, { $set: { born: bornInt } } )
      console.log(updatedAuthor);
      
      return authorSelected
    },
    createUser: async (root, args) => {
      const user = await new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(e => {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("Wrong credentials")
      }

      const userToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userToken, process.env.JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})