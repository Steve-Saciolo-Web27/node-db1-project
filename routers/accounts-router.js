const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

// READ/GET
router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

// READ/GET By ID
router.get('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account)
    })
    .catch(error => {
      res.status(404).json({ error: 'Account with specified ID not found!' })
    })
})

module.exports = router
