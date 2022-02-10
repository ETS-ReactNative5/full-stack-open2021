const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' })
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    let token
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7)
    } else {
        token = null
    }

    request.token = token

    next()
}

const userExtractor = async (request, response, next) => {
    if (request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if(!decodedToken.id) {
            return response.status(401).json({ erorr: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        request.user = user
        next()

    } else {
        next()
    }

}

module.exports = { unknownEndpoint, tokenExtractor, userExtractor }