module.exports.isAdmin = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    next()
  } else {
    res.redirect('/profile')
  }
}
