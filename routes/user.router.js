const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

router.get('/', userController.getUsers);

router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userMiddleware.userEmailSearch,
    userController.createUser);

router.post(
    '/:user_id',
    userMiddleware.userIdValidationMiddleware,
    userMiddleware.isUserUpdateValid,
    userMiddleware.userIdSearchMiddleware,
    userController.updateUser);

router.get(
    '/:user_id',
    userMiddleware.userIdValidationMiddleware,
    userMiddleware.userIdSearchMiddleware,
    userController.getUserById);

router.delete(
    '/:user_id',
    userMiddleware.userIdValidationMiddleware,
    userMiddleware.userIdSearchMiddleware,
    userController.deleteUser);

module.exports = router;
