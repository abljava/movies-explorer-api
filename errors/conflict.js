class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = 'Пользователь с таким email уже существует2';
  }
}

module.exports = { Conflict };
