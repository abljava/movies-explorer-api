const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

const { validateMovieId, validateCreateMovie } = require('../middlewares/celebrate');

router.get('/', getMovies);
router.post('/', validateCreateMovie, postMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
