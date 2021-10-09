const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);

router.post(
    '/',
    userMiddleware.userEmailSearch,
    userController.updateUser);

router.post(
    '/',
    userMiddleware.isUserBodyValid,
    userMiddleware.userEmailSearch,
    userController.createUser);

router.get(
    '/:user_id',
    userMiddleware.userIdValidationMiddleware,
    userMiddleware.userIdSearchMiddleware,
    userController.getUserById);


router.delete('/:email', userController.deleteUser);

module.exports = router;
