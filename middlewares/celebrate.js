const { celebrate, Joi } = require('celebrate');

const validateLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    })
    .unknown(true),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const validateEditUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(50).required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().min(2).max(200).required(),
    nameRU: Joi.string().min(2).max(50).required(),
    nameEN: Joi.string().min(2).max(50).required(),
    movieId: Joi.number().required(),
    image: Joi.string().required().pattern(
      new RegExp(
        '^(https?:\\/\\/)?'
          + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
          + '((\\d{1,3}\\.){3}\\d{1,3}))'
          + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
          + '(\\?[;&a-z\\d%_.~+=-]*)?'
          + '(\\#[-a-z\\d_]*)?$',
        'i',
      ),
    ),
    trailerLink: Joi.string().required().pattern(
      new RegExp(
        '^(https?:\\/\\/)?'
          + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
          + '((\\d{1,3}\\.){3}\\d{1,3}))'
          + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
          + '(\\?[;&a-z\\d%_.~+=-]*)?'
          + '(\\#[-a-z\\d_]*)?$',
        'i',
      ),
    ),
    thumbnail: Joi.string().required().pattern(
      new RegExp(
        '^(https?:\\/\\/)?'
          + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
          + '((\\d{1,3}\\.){3}\\d{1,3}))'
          + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
          + '(\\?[;&a-z\\d%_.~+=-]*)?'
          + '(\\#[-a-z\\d_]*)?$',
        'i',
      ),
    ),

  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateEditUser,
  validateMovieId,
  validateCreateMovie,
};
