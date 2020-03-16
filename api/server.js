const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const accountsRouter = require('../routers/accounts-router')

const server = express()

server.use(helmet())
server.use(morgan('short'))
server.use(express.json())

server.use('/api/accounts', accountsRouter)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' })
})

module.exports = server
