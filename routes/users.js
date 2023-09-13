const router = require('express').Router();
const { validateEditUser } = require('../middlewares/celebrate');

const { getUserInfo, editUser, getUsers } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', validateEditUser, editUser);

router.get('/all', getUsers);

module.exports = router;
