const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const { userExtractor } = require('./utils/middleware')
const config = require('./utils/config')
require('express-async-errors')

logger.info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('Connected to MongoDB');
})
.catch((error) => {
    logger.error('Failed to connect to MongoDB: ', error)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)

module.exports = app