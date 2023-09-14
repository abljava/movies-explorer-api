const router = require('express').Router();

const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/celebrate');
const { NotFoundError } = require('../errors/not-found-err');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
