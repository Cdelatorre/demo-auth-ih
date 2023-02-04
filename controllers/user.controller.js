const Book = require('../models/Book.model')
const User = require('../models/User.model')

module.exports.profile = (req, res, next) => {
  console.log('process.env.GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID)
  Book.find({ user: req.user.id })
    .populate('user')
    .then(books => {
      res.render('user/profile', { books })
    })
    // .catch(err => next(err))
    .catch(next)
}

module.exports.adminPanel = (req, res, next) => {
  User.find()
    .then(users => {
      res.render('user/admin-panel', { users })
    })
    .catch(next)

}


module.exports.doAdmin = (req, res, next) => {
  const { id } = req.params

  User.findByIdAndUpdate(id, { role: 'ADMIN' }, { new: true })
    .then((user) => {
      if (user) {
        res.status(200).send('OK')
      }
    })
    .catch(next)

}