const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

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
