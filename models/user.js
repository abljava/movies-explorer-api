const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Обязательное поле'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Введен некорректный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Обязательное поле'],
      select: false,
    },
    name: {
      type: String,
      // default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимум 2 символа'],
      maxlength: [30, 'Максимум 30 символов'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
