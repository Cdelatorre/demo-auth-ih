const passport = require('passport');
const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const booksController = require('../controllers/book.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const upload = require('../config/cloudinary.config');

router.get('/', (req, res, next) => res.send('hola'))

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
]

// Auth
router.get(
  '/signup',
  authMiddleware.isNotAuthenticated,
  authController.signup
);
router.post('/signup', authController.doSignup)

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get('/login/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/auth/google/callback', authController.doLoginGoogle)

router.get('/logout', authController.logout)

// User
router.get('/profile', authMiddleware.isAuthenticated, userController.profile);
router.get('/admin-panel', authMiddleware.isAuthenticated, roleMiddleware.isAdmin, userController.adminPanel);
router.patch('/user/:id/admin', authMiddleware.isAuthenticated, roleMiddleware.isAdmin, userController.doAdmin);

// Book
router.delete('/books/:id', booksController.doDelete)
router.get('/books/create', authMiddleware.isAuthenticated, booksController.create)
router.post('/books', authMiddleware.isAuthenticated, upload.single('image'), booksController.doCreate)

module.exports = router;
