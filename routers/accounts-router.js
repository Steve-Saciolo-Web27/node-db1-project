const express = require('express')
const query = require('../queries')
// DataBase access using knex
const db = require('../data/dbConfig')

const router = express.Router()

// CREATE/ADD
router.post('/', (req, res) => {
  db('accounts')
    .insert(req.body, 'id')
    .then(account => {
      res.status(201).json(account)
    })
    .catch(error => {
      res.status(500).json(error.message)
    })
})

// READ/GET
// router.get('/', (req, res) => {
//   db.select('*')
//     .from('accounts')
//     .then(accounts => {
//       res.status(200).json(accounts)
//     })
//     .catch(error => {
//       res.status(500).json(error.message)
//     })
// })
router.get('/', (req, res) => {
  const { limit, sortby, sortdir } = req.query
  console.log(limit, sortby, sortdir, 'HELLO')
  // Query builder in queries.js
  // Begin
  query
    .getstuff({ limit, sortby, sortdir })
    // End
    .then(
      accounts => res.status(200).json(accounts) & console.log(accounts.length)
    )
    .catch(err => res.status(500).json(err.message))
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
      console.log(error)
      res.status(404).json(error.message)
    })
})

// UPDATE/EDIT By ID
router.put('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(updated => {
      res.status(202).json(updated)
    })
    .catch(error => {
      res.status(500).json(error.message)
    })
})

// DELETE
router.delete('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .delete()
    .then(account => {
      res.status(200).json(account)
    })
    .catch(error => {
      res.status(500).json(error.message)
    })
})

module.exports = router
