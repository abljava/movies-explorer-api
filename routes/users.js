const router = require('express').Router();
// const {
//   validateEditUser,
//   validateEditAvatar,
//   validateUserId,
// } = require('../middlewares/celebrate');

const { getUserInfo } = require('../controllers/users');

// const {
//   getUserInfo,
//   getUsers,
//   getUserById,
//   editUser,
//   editAvatar,
// } = require('../controllers/users');

// router.get('/', getUsers);
router.get('/me', getUserInfo);
// router.get('/:userId', getUserById);
// router.patch('/me', editUser);
// router.patch('/me/avatar', editAvatar);

// router.get('/', getUsers);
// router.get('/me', getUserInfo);
// router.get('/:userId', validateUserId, getUserById);
// router.patch('/me', validateEditUser, editUser);
// router.patch('/me/avatar', validateEditAvatar, editAvatar);

module.exports = router;
