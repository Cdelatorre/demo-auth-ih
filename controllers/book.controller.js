const mongoose = require('mongoose');
const Book = require('../models/Book.model');

module.exports.create = (req, res, next) => {
  res.render('book/form')
}

module.exports.doCreate = (req, res, next) => {
  console.log(req.file)
  const renderWithErrors = errors => {
    res.render(
      'book/form',
      {
        book: req.body,
        errors
      }
    )
  }

  const newBook = {
    title: req.body.title,
    description: req.body.description,
    user: req.user.id
  }

  console.log(req.file)

  if (req.file) {
    newBook.image = req.file.path
  }

  Book.create(newBook)
    .then(book => {
      res.redirect('/profile')
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors)
      } else {
        next(err)
      }
    })
}

module.exports.doDelete = (req, res, next) => {
  Book.findByIdAndDelete(req.params.id)
    .then(book => {
      res.send('book deleted')
    })
    .catch(next)
}