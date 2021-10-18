const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require('../middlewares');

router.get('/', userController.getUsers);

router.post(
    '/',
    userMiddleware.validateDataDynamic('createUserValidator'),
    userMiddleware.userEmailSearch,
    userController.createUser);

router.put(
    '/:user_id',
    userMiddleware.validateDataDynamic('isUserIdValid', 'params'),
    userMiddleware.validateDataDynamic('updateUserValidator'),
    authMiddleware.checkAccessToken,
    // userMiddleware.userIdSearchMiddleware, //
    userController.updateUser);

router.get(
    '/:user_id',
    userMiddleware.validateDataDynamic('isUserIdValid', 'params'),
    userMiddleware.userIdSearchMiddleware,
    userController.getUserById);

router.delete(
    '/:user_id',
    userMiddleware.validateDataDynamic('isUserIdValid', 'params'),
    userMiddleware.userIdSearchMiddleware,
    userController.deleteUser);

router.delete(
    '/',
    authMiddleware.checkAccessToken,
    userController.deleteUser);

module.exports = router;
