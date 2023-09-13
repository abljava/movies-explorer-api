const httpConstants = require('http2').constants;
const Movie = require('../models/movie');
const { BadRequest } = require('../errors/bad-request');
// const { Conflict } = require('../errors/conflict');
// const { NotAuthorized } = require('../errors/not-authorized');
const { NotFoundError } = require('../errors/not-found-err');
const { Forbidden } = require('../errors/forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    // .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(httpConstants.HTTP_STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (movie.owner._id.toString() !== req.user._id) {
        throw new Forbidden('Невозможно удалить данные другого пользователя');
      }
      return Movie.deleteOne(movie)
      // return Card.findByIdAndRemove(req.params.cardId)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
