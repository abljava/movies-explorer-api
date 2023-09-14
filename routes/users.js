const router = require('express').Router();
const { validateEditUser } = require('../middlewares/celebrate');

const { getUserInfo, editUser } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', validateEditUser, editUser);

module.exports = router;
