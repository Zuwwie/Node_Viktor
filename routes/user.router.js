const router = require('express').Router();

const { ACCESS } = require('../configs/token-type.enum');
const { userController } = require('../controllers');
const { userMiddleware, authMiddleware, fileMiddleware } = require('../middlewares');
const { userValidator } = require('../validators/');

router.get('/', userController.getUsers);

router.post(
    '/',
    userMiddleware.validateDataDynamic('createUserValidator', userValidator),
    fileMiddleware.checkUserAvatar,
    userMiddleware.userEmailSearch(false),
    userController.createUser);

router.put(
    '/:user_id',
    userMiddleware.validateDataDynamic('isUserIdValid', userValidator, 'params'),
    userMiddleware.validateDataDynamic('updateUserValidator', userValidator),
    authMiddleware.checkToken(ACCESS),
    userController.updateUser);

router.get(
    '/:user_id',
    userMiddleware.validateDataDynamic('isUserIdValid', userValidator, 'params'),
    userMiddleware.userIdSearchMiddleware,
    userController.getUserById);

router.delete(
    '/:user_id',
    userMiddleware.validateDataDynamic('isUserIdValid', userValidator, 'params'),
    userMiddleware.userIdSearchMiddleware,
    userController.deleteUser);

router.delete(
    '/',
    authMiddleware.checkToken(ACCESS),
    userController.deleteUser);

module.exports = router;
