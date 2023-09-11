const httpConstants = require('http2').constants;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequest } = require('../errors/bad-request');
const { Conflict } = require('../errors/conflict');
const { NotAuthorized } = require('../errors/not-authorized');
const { NotFoundError } = require('../errors/not-found-err');

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = 'SECRET_KEY';

// добавление пользователя
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      return res.status(httpConstants.HTTP_STATUS_CREATED).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
      } else if (err.code === 11000) {
        next(new Conflict('Такой email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

// логин
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new NotAuthorized('Неправильные почта или пароль');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : secretKey,
        {
          expiresIn: '7d',
        },
      );

      res.send({ token });
    })
    .catch(next);
};

// возвращает информацию о пользователе (email и имя)
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с таким id не найден'));
      } else {
        next(err);
      }
    });
};
