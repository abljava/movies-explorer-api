const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Обязательнрое поле'],
      minlength: [2, 'Минимум 2 символа'],
      maxlength: [30, 'Максимум 30 символов'],
    },
    director: {
      type: String,
      required: [true, 'Обязательнрое поле'],
      minlength: [2, 'Минимум 2 символа'],
      maxlength: [50, 'Максимум 50 символов'],
    },
    duration: {
      type: Number,
      required: [true, 'Обязательнрое поле'],
    },
    year: {
      type: String,
      required: [true, 'Обязательнрое поле'],
    },
    description: {
      type: String,
      required: [true, 'Обязательнрое поле'],
      minlength: [2, 'Минимум 2 символа'],
      maxlength: [200, 'Максимум 200 символов'],
    },
    image: {
      type: String,
      required: [true, 'Обязательнрое поле'],
      validate: {
        validator(url) {
          const urlPattern = new RegExp(
            '^(https?:\\/\\/)?'
            + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
            + '((\\d{1,3}\\.){3}\\d{1,3}))'
            + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
            + '(\\?[;&a-z\\d%_.~+=-]*)?'
            + '(\\#[-a-z\\d_]*)?$',
            'i',
          );
          return urlPattern.test(url);
        },
        message: 'Введите адрес ссылки',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Обязательнрое поле'],
      validate: {
        validator(url) {
          const urlPattern = new RegExp(
            '^(https?:\\/\\/)?'
            + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
            + '((\\d{1,3}\\.){3}\\d{1,3}))'
            + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
            + '(\\?[;&a-z\\d%_.~+=-]*)?'
            + '(\\#[-a-z\\d_]*)?$',
            'i',
          );
          return urlPattern.test(url);
        },
        message: 'Введите адрес ссылки',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Обязательнрое поле'],
      validate: {
        validator(url) {
          const urlPattern = new RegExp(
            '^(https?:\\/\\/)?'
            + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
            + '((\\d{1,3}\\.){3}\\d{1,3}))'
            + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
            + '(\\?[;&a-z\\d%_.~+=-]*)?'
            + '(\\#[-a-z\\d_]*)?$',
            'i',
          );
          return urlPattern.test(url);
        },
        message: 'Введите адрес ссылки',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: [true, 'Обязательнрое поле'],
      minlength: [2, 'Минимум 2 символа'],
      maxlength: [50, 'Максимум 50 символов'],
    },
    nameEN: {
      type: String,
      required: [true, 'Обязательнрое поле'],
      minlength: [2, 'Минимум 2 символа'],
      maxlength: [50, 'Максимум 50 символов'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
